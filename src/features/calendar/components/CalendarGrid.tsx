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

import { useMemo, useState, useEffect, useCallback } from 'react';
import type { CalendarView } from '../types/calendar';
import type { Appointment } from '../types/appointment';
import { format, addDays, startOfWeek, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import CalendarColumn from './CalendarColumn';
import {
  filterAppointmentsByDate,
  detectOverlappingAppointments,
} from '../utils/appointmentHelpers';
import { useWorkingHoursContext } from '../hooks/useWorkingHoursContext';
import { MINUTES_IN_HOUR } from '../../../constants/calendar';

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

  /**
   * Height of each slot in pixels
   * @default 60
   */
  slotHeightPx?: number;
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
  slotHeightPx = 60,
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
   * Roving TabIndex State
   * Tracks the currently focused cell coordinates {col, row}
   */
  const [focusedCell, setFocusedCell] = useState<{ col: number; row: number }>({ col: 0, row: 0 });

  // Focus the element when focusedCell changes
  useEffect(() => {
    if (!scrollRef?.current) return;

    // Find the slot element with matching data attributes
    const slotElement = scrollRef.current.querySelector(
      `[data-col="${focusedCell.col}"][data-row="${focusedCell.row}"]`
    ) as HTMLElement;

    if (slotElement) {
      slotElement.focus();
    }
  }, [focusedCell, scrollRef]);

  /**
   * Keyboard navigation handler
   */
  const handleKeyDown = useCallback((
    e: React.KeyboardEvent,
    colIndex: number,
    slotIndex: number,
    date: Date,
    hour: number,
    minute: number
  ) => {
    // Handle activation
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSlotClick?.(date, hour, minute);
      return;
    }

    // Handle navigation
    let newCol = colIndex;
    let newRow = slotIndex;
    const maxRows = timeSlots.length - 1;
    const maxCols = datesToDisplay.length - 1;
    let handled = true;

    switch (e.key) {
      case 'ArrowUp':
        newRow = Math.max(0, slotIndex - 1);
        break;
      case 'ArrowDown':
        newRow = Math.min(maxRows, slotIndex + 1);
        break;
      case 'ArrowLeft':
        newCol = Math.max(0, colIndex - 1);
        break;
      case 'ArrowRight':
        newCol = Math.min(maxCols, colIndex + 1);
        break;
      default:
        handled = false;
    }

    if (handled) {
      e.preventDefault();
      setFocusedCell({ col: newCol, row: newRow });
    }
  }, [datesToDisplay.length, timeSlots.length, onSlotClick]);



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
      {/* Unified Scroll Container
          This handles BOTH horizontal (dates) and vertical (time) scrolling.
          Putting headers and grid in the same container ensures perfect alignment.
      */}
      <div
        ref={scrollRef}
        className="h-full overflow-auto relative [overscroll-behavior:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[var(--color-background)] [&::-webkit-scrollbar-thumb]:bg-[var(--color-border)] [&::-webkit-scrollbar-thumb]:rounded-[var(--radius-full)] [&::-webkit-scrollbar-thumb:hover]:bg-[var(--color-text-muted)] snap-x snap-mandatory"
      >
        <div className="w-full flex flex-col">
          {/* Column Headers - Sticky to top */}
          <div className="flex bg-[var(--color-surface)] border-b-2 border-[var(--color-border)] sticky top-0 z-[var(--z-sticky)] shadow-[var(--shadow-sm)] w-full">
            {datesToDisplay.map((date, index) => {
              const isTodayDate = isToday(date);
              return (
                <div
                  key={date.toISOString()}
                  className={`flex-1 snap-start p-[var(--spacing-md)] flex items-center justify-center gap-[var(--spacing-sm)] border-r border-[var(--color-border)] bg-[var(--color-surface)] max-lg:p-[var(--spacing-sm)] max-md:p-[var(--spacing-sm)] max-md:px-[var(--spacing-xs)] max-md:gap-[var(--spacing-xs)] max-[480px]:p-[var(--spacing-xs)] ${view === 'day' ? 'min-w-[85vw]' : 'min-w-0'
                    } ${index === datesToDisplay.length - 1 ? 'border-r-0' : ''
                    }`}
                  role="columnheader"
                >
                  {/* Desktop (lg+): Horizontal layout */}
                  <div className="hidden lg:flex items-center gap-[var(--spacing-sm)]">
                    <div
                      className="text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] capitalize leading-[var(--line-height-tight)]"
                      style={{ color: isTodayDate ? 'var(--color-primary)' : 'var(--color-text-primary)' }}
                    >
                      {format(date, 'EEEE', { locale: es })}
                    </div>
                    <div
                      className={`text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] leading-[var(--line-height-tight)] w-[36px] h-[36px] flex items-center justify-center ${isTodayDate
                        ? 'bg-[var(--color-primary)] text-white rounded-full'
                        : 'text-[var(--color-text-secondary)]'
                        }`}
                    >
                      {format(date, 'd', { locale: es })}
                    </div>
                  </div>

                  {/* Tablet (md-lg): Vertical stack */}
                  <div className="hidden md:flex lg:hidden flex-col items-center gap-1">
                    <div
                      className="text-[var(--font-size-xs)] font-[var(--font-weight-semibold)] capitalize leading-[var(--line-height-tight)]"
                      style={{ color: isTodayDate ? 'var(--color-primary)' : 'var(--color-text-primary)' }}
                    >
                      {format(date, 'EEEE', { locale: es })}
                    </div>
                    <div
                      className={`text-[var(--font-size-xs)] font-[var(--font-weight-semibold)] leading-[var(--line-height-tight)] w-[32px] h-[32px] flex items-center justify-center ${isTodayDate
                        ? 'bg-[var(--color-primary)] text-white rounded-full'
                        : 'text-[var(--color-text-secondary)]'
                        }`}
                    >
                      {format(date, 'd', { locale: es })}
                    </div>
                  </div>

                  {/* Mobile (<md): Abbreviated vertical */}
                  <div className="flex md:hidden flex-col items-center gap-1">
                    <div
                      className="text-[11px] font-[var(--font-weight-semibold)] capitalize leading-[var(--line-height-tight)]"
                      style={{ color: isTodayDate ? 'var(--color-primary)' : 'var(--color-text-primary)' }}
                    >
                      {format(date, 'EEEEEE', { locale: es })}
                    </div>
                    <div
                      className={`text-[11px] font-[var(--font-weight-semibold)] leading-[var(--line-height-tight)] w-[28px] h-[28px] flex items-center justify-center ${isTodayDate
                        ? 'bg-[var(--color-primary)] text-white rounded-full'
                        : 'text-[var(--color-text-secondary)]'
                        }`}
                    >
                      {format(date, 'd', { locale: es })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Grid Columns */}
          <div className="flex flex-1 w-full">
            {datesToDisplay.map((date, colIndex) => {
              const dateKey = date.toISOString();
              const appointmentData = appointmentDataByDate.get(dateKey);

              const dayAppointments = appointmentData?.dayAppointments || [];
              const overlappingGroups = appointmentData?.overlappingGroups || new Map();

              return (
                <CalendarColumn
                  key={dateKey}
                  date={date}
                  view={view}
                  isLastCol={colIndex === datesToDisplay.length - 1}
                  timeSlots={timeSlots}
                  dayAppointments={dayAppointments}
                  overlappingGroups={overlappingGroups}
                  slotHeightPx={slotHeightPx}
                  slotInterval={slotInterval}
                  workingHours={workingHours}
                  focusedCell={focusedCell}
                  colIndex={colIndex}
                  onSlotClick={onSlotClick}
                  onAppointmentClick={onAppointmentClick}
                  setFocusedCell={setFocusedCell}
                  handleKeyDown={handleKeyDown}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
