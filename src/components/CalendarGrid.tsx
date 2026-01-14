/**
 * CalendarGrid Component
 *
 * Displays the multi-column grid for calendar appointments.
 * Synchronized with CalendarTimeline for proper slot alignment.
 *
 * Features:
 * - Column per each day in the view
 * - Column headers with day and date
 * - Grid synchronized with timeline
 * - Smooth horizontal scroll for multi-day views
 * - Responsive design (collapse on mobile)
 * - Performance optimized with useMemo
 *
 * @component
 */

import { useMemo } from 'react';
import type { CalendarView } from '../types/calendar';
import type { Appointment } from '../types/appointment';
import { format, addDays, startOfWeek, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import AppointmentCard from './AppointmentCard';
import {
  filterAppointmentsByDate,
  detectOverlappingAppointments,
  calculateAppointmentOffset,
} from '../utils/appointmentHelpers';
import { useWorkingHoursContext } from '../hooks/useWorkingHoursContext';
import { MINUTES_IN_HOUR } from '../constants/calendar';

/**
 * Props for the CalendarGrid component
 */
export interface CalendarGridProps {
  /**
   * Currently selected date
   */
  selectedDate: Date;

  /**
   * Current calendar view mode
   */
  view: CalendarView;

  /**
   * Time slot interval in minutes (15, 30, or 60)
   * @default 30
   */
  slotInterval?: 15 | 30 | 60;

  /**
   * Start hour (24-hour format)
   * @default 0
   */
  startHour?: number;

  /**
   * End hour (24-hour format)
   * @default 24
   */
  endHour?: number;

  /**
   * Ref to the grid scroll container for synchronization
   */
  scrollRef?: React.RefObject<HTMLDivElement | null>;

  /**
   * Array of appointments to display on the calendar
   */
  appointments?: Appointment[];

  /**
   * Callback fired when an appointment is clicked
   */
  onAppointmentClick?: (appointment: Appointment) => void;

  /**
   * Callback fired when an empty slot is clicked
   */
  onSlotClick?: (date: Date, hour: number, minute: number) => void;
}

/**
 * Interface for a time slot in the grid
 */
interface TimeSlot {
  /**
   * Hour in 24-hour format
   */
  hour: number;

  /**
   * Minute (0, 15, 30, or 45)
   */
  minute: number;

  /**
   * Whether this is the start of a new hour
   */
  isHourStart: boolean;
}

/**
 * Get the dates to display based on the current view
 */
function getDatesToDisplay(selectedDate: Date, view: CalendarView): Date[] {
  switch (view) {
    case 'day':
      return [selectedDate];
    case '3-day':
      return [selectedDate, addDays(selectedDate, 1), addDays(selectedDate, 2)];
    case 'week': {
      const weekStart = startOfWeek(selectedDate, { locale: es });
      return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    }
    default:
      return [selectedDate];
  }
}

/**
 * Generate time slots based on interval
 * Must match CalendarTimeline's slot generation
 *
 * Slot Generation Logic:
 * ----------------------
 * Example with working hours 8:00-18:00 and 30-minute intervals:
 *
 * Generated slots: 8:00, 8:30, 9:00, 9:30, ..., 17:00, 17:30, 18:00
 *
 * Key behaviors:
 * 1. ✓ Appointments CAN be scheduled at 17:30 (ending at 18:00)
 * 2. ✓ The 18:00 slot exists as the END boundary marker
 * 3. ✓ Appointments CANNOT start at 18:00 or later (outside working hours)
 * 4. ✓ The slot at 18:30 is correctly excluded (would end at 19:00)
 *
 * The endHour represents "appointments can end at this time but not start at it".
 * This allows scheduling appointments in the last interval (e.g., 17:30-18:00).
 *
 * @param startHour - Start of day (e.g., 8 for 8:00 AM)
 * @param endHour - End of day boundary (e.g., 18 for 6:00 PM)
 * @param interval - Slot duration in minutes (15, 30, or 60)
 * @returns Array of time slots synchronized with CalendarTimeline
 */
function generateTimeSlots(
  startHour: number,
  endHour: number,
  interval: 15 | 30 | 60
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const slotsPerHour = MINUTES_IN_HOUR / interval;

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let slotIndex = 0; slotIndex < slotsPerHour; slotIndex++) {
      const minute = slotIndex * interval;

      // Only generate the top-of-hour slot (minute = 0) for the endHour.
      // This creates the END boundary marker but prevents scheduling appointments
      // that would extend beyond working hours.
      //
      // Example (endHour = 18, interval = 30):
      // - hour 18, minute 0  → Generate 18:00 ✓ (boundary marker, allows 17:30-18:00 appointments)
      // - hour 18, minute 30 → Skip 18:30 ✓ (would require appointment to end at 19:00)
      if (hour === endHour && minute > 0) {
        break;
      }

      slots.push({
        hour,
        minute,
        isHourStart: minute === 0,
      });
    }
  }

  return slots;
}

/**
 * CalendarGrid component
 * Displays multi-column grid synchronized with timeline
 */
export default function CalendarGrid({
  selectedDate,
  view,
  slotInterval = 30,
  startHour = 0,
  endHour = 24,
  scrollRef,
  appointments = [],
  onAppointmentClick,
  onSlotClick,
}: CalendarGridProps) {
  /**
   * Access working hours from context
   */
  const { workingHours } = useWorkingHoursContext();
  /**
   * Memoized dates to display based on view
   */
  const datesToDisplay = useMemo(
    () => getDatesToDisplay(selectedDate, view),
    [selectedDate, view]
  );

  /**
   * Memoized time slots generation - must match CalendarTimeline
   */
  const timeSlots = useMemo(
    () => generateTimeSlots(startHour, endHour, slotInterval),
    [startHour, endHour, slotInterval]
  );

  /**
   * Memoized slot height from CSS variable (default to 30px if not set)
   * NOTE: Recalculated when slotInterval changes as slot height may be dynamic
   */
  const slotHeightPx = useMemo(() => {
    if (typeof window === 'undefined') return 30;
    const rootStyles = getComputedStyle(document.documentElement);
    const slotHeight = rootStyles.getPropertyValue('--slot-height').trim();
    return parseInt(slotHeight) || 30;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotInterval]);

  /**
   * Check if a time slot is within working hours
   */
  const isWithinWorkingHours = (hour: number): boolean => {
    return hour >= workingHours.startHour && hour < workingHours.endHour;
  };

  /**
   * Memoized appointment data per date for performance
   * Pre-computes filtered appointments and overlapping groups for each date
   */
  const appointmentDataByDate = useMemo(() => {
    return new Map(
      datesToDisplay.map((date) => {
        const dayAppointments = filterAppointmentsByDate(appointments, date);
        const overlappingGroups = detectOverlappingAppointments(dayAppointments);
        return [date.toISOString(), { dayAppointments, overlappingGroups }];
      })
    );
  }, [datesToDisplay, appointments]);

  return (
    <main
      className="relative flex-1 overflow-hidden bg-[var(--color-background)]"
      role="main"
      aria-label="Grid de citas del calendario"
    >
      <div className="relative h-full flex flex-col overflow-hidden">
        {/* Column Headers */}
        <div className="flex bg-[var(--color-surface)] border-b-2 border-[var(--color-border)] sticky top-0 z-[var(--z-sticky)] shadow-[var(--shadow-sm)] max-md:static">
          {datesToDisplay.map((date, index) => {
            const isTodayDate = isToday(date);
            return (
              <div
                key={date.toISOString()}
                className={`flex-1 min-w-0 p-[var(--spacing-md)] flex items-center justify-center gap-[var(--spacing-sm)] border-r border-[var(--color-border)] bg-[var(--color-surface)] max-lg:p-[var(--spacing-sm)] max-md:p-[var(--spacing-sm)] max-md:px-[var(--spacing-xs)] max-md:gap-[var(--spacing-xs)] max-[480px]:p-[var(--spacing-xs)] ${index === datesToDisplay.length - 1 ? 'border-r-0' : ''}`}
                role="columnheader"
              >
                {/* Day name */}
                <div
                  className={`text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] capitalize leading-[var(--line-height-tight)] max-lg:text-[var(--font-size-xs)] max-md:text-[11px]`}
                  style={{ color: isTodayDate ? 'var(--color-primary)' : 'var(--color-text-primary)' }}
                >
                  {format(date, 'EEEE', { locale: es })}
                </div>
                {/* Day number with conditional circle for today */}
                <div
                  className={`text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] leading-[var(--line-height-tight)] max-lg:text-[var(--font-size-xs)] max-md:text-[11px] ${
                    isTodayDate
                      ? 'bg-[var(--color-primary)] text-white rounded-full w-[36px] h-[36px] flex items-center justify-center max-lg:w-[32px] max-lg:h-[32px] max-md:w-[28px] max-md:h-[28px]'
                      : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  {format(date, 'd', { locale: es })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Grid Columns - Scrollable container */}
        <div
          ref={scrollRef}
          className="flex flex-1 overflow-x-auto overflow-y-auto relative [overscroll-behavior:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[var(--color-background)] [&::-webkit-scrollbar-thumb]:bg-[var(--color-border)] [&::-webkit-scrollbar-thumb]:rounded-[var(--radius-full)] [&::-webkit-scrollbar-thumb:hover]:bg-[var(--color-text-muted)] max-md:flex-col"
        >
          {datesToDisplay.map((date, colIndex) => (
            <div
              key={date.toISOString()}
              className={`relative flex-1 min-w-0 h-fit border-r border-[var(--color-border)] bg-[var(--color-surface)] max-md:border-r-0 max-md:border-b max-md:min-h-[400px] ${colIndex === datesToDisplay.length - 1 ? 'border-r-0 max-md:border-b-0' : ''}`}
              role="grid"
              aria-label={`Columna para ${format(date, 'EEEE, d MMMM', {
                locale: es,
              })}`}
            >
              {/* Time slots grid (synchronized with timeline) */}
              <div className="flex flex-col w-full flex-shrink-0">
                {timeSlots.map((slot, slotIndex) => {
                  const isWorking = isWithinWorkingHours(slot.hour);
                  return (
                    <div
                      key={`${slot.hour}-${slot.minute}`}
                      className={`relative border-t transition-colors duration-[var(--transition-fast)] cursor-pointer ${
                        slot.isHourStart
                          ? 'border-[var(--grid-line-bold)]'
                          : 'border-[var(--grid-line-color)]'
                      } ${slotIndex === 0 ? 'border-t-0' : ''} ${
                        isWorking
                          ? 'hover:bg-[var(--hover-overlay)]'
                          : 'opacity-50'
                      }`}
                      style={{
                        height: 'var(--slot-height)',
                        ...((!isWorking) && {
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, var(--color-border) 10px, var(--color-border) 11px)',
                        }),
                      }}
                      data-hour={slot.hour}
                      data-minute={slot.minute}
                      data-is-working={isWorking}
                      onClick={() => onSlotClick?.(date, slot.hour, slot.minute)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Crear cita para ${format(date, 'EEEE d MMMM', { locale: es })} a las ${slot.hour.toString().padStart(2, '0')}:${slot.minute.toString().padStart(2, '0')}${!isWorking ? ' (Fuera de horario)' : ''}`}
                      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSlotClick?.(date, slot.hour, slot.minute);
                        }
                      }}
                    />
                  );
                })}
              </div>

              {/* Appointments Container */}
              <div
                className="absolute inset-0 pointer-events-none z-[var(--z-base)] [&>*]:pointer-events-auto"
                style={{ right: '1px' }}
                aria-live="polite"
              >
                {(() => {
                  // Get pre-computed appointment data for this date
                  const dateKey = date.toISOString();
                  const appointmentData = appointmentDataByDate.get(dateKey);

                  if (!appointmentData) return null;

                  const { dayAppointments, overlappingGroups } = appointmentData;

                  // Render each appointment
                  return dayAppointments.map((appointment) => {
                    const { offsetIndex, totalOverlapping } = calculateAppointmentOffset(
                      appointment.id,
                      overlappingGroups
                    );

                    return (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        slotHeightPx={slotHeightPx}
                        slotInterval={slotInterval}
                        offsetIndex={offsetIndex}
                        totalOverlapping={totalOverlapping}
                        onClick={onAppointmentClick}
                      />
                    );
                  });
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
