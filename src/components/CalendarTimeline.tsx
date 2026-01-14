/**
 * CalendarTimeline Component
 *
 * Displays the vertical timeline with time slots for the calendar.
 * Synchronized with CalendarGrid for proper alignment.
 *
 * Features:
 * - Timeline vertical with full 24-hour day (00:00 - 24:00)
 * - Configurable time slots (15, 30, 60 minutes)
 * - Grid visual dividing each hour
 * - 24-hour format (00:00 to 24:00)
 * - Sticky positioning for scroll synchronization
 * - Performance optimized with useMemo
 *
 * @component
 */

import { useMemo } from 'react';
import { useWorkingHoursContext } from '../hooks/useWorkingHoursContext';
import { MINUTES_IN_HOUR } from '../constants/calendar';

/**
 * Interface for a time slot
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
   * Display label in 24-hour format (e.g., "09:00", "09:30")
   */
  label: string;

  /**
   * Whether this is the start of a new hour
   */
  isHourStart: boolean;
}

/**
 * Props for the CalendarTimeline component
 */
export interface CalendarTimelineProps {
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
   * Ref to the timeline scroll container for synchronization
   */
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Generate time slots based on interval
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
 * @returns Array of time slots synchronized with CalendarGrid
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

      const hourStr = hour.toString().padStart(2, '0');
      const minuteStr = minute.toString().padStart(2, '0');

      slots.push({
        hour,
        minute,
        label: `${hourStr}:${minuteStr}`,
        isHourStart: minute === 0,
      });
    }
  }

  return slots;
}

/**
 * CalendarTimeline component
 * Displays time slots with proper synchronization to the grid
 */
export default function CalendarTimeline({
  slotInterval = 30,
  startHour = 0,
  endHour = 24,
  scrollRef,
}: CalendarTimelineProps) {
  /**
   * Access working hours from context
   */
  const { workingHours } = useWorkingHoursContext();
  /**
   * Memoized time slots generation to prevent unnecessary recalculations
   */
  const timeSlots = useMemo(
    () => generateTimeSlots(startHour, endHour, slotInterval),
    [startHour, endHour, slotInterval]
  );

  /**
   * Check if a time slot is within working hours
   */
  const isWithinWorkingHours = (hour: number): boolean => {
    return hour >= workingHours.startHour && hour < workingHours.endHour;
  };

  return (
    <aside
      className="relative bg-[var(--color-surface)] border-r border-[var(--color-border)] w-[var(--time-column-width)] flex-shrink-0 overflow-y-auto overflow-x-hidden max-lg:w-[60px] max-md:w-[50px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="complementary"
      aria-label="Timeline de horarios"
      ref={scrollRef}
    >
      <div className="relative">
        {/* Spacer to align with grid column headers */}
        <div className="sticky top-0 z-[var(--z-sticky)] bg-[var(--color-surface)] border-b-2 border-[var(--color-border)] p-[var(--spacing-md)] flex items-center gap-[var(--spacing-sm)] max-lg:p-[var(--spacing-sm)] max-md:p-[var(--spacing-sm)] max-md:px-[var(--spacing-xs)] max-md:gap-[var(--spacing-xs)] max-[480px]:p-[var(--spacing-xs)]">
          {/* Empty spacer with same height as grid headers - horizontal layout */}
          <div className="text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] leading-[var(--line-height-tight)] max-lg:text-[var(--font-size-xs)] max-md:text-[11px] opacity-0">
            Día
          </div>
          <div className="text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] leading-[var(--line-height-tight)] max-lg:text-[var(--font-size-xs)] max-md:text-[11px] w-[36px] h-[36px] max-lg:w-[32px] max-lg:h-[32px] max-md:w-[28px] max-md:h-[28px] opacity-0">
            13
          </div>
        </div>

        {/* Time Slots */}
        <div className="flex flex-col">
          {timeSlots.map((slot, index) => {
            const isWorking = isWithinWorkingHours(slot.hour);
            return (
              <div
                key={`${slot.hour}-${slot.minute}`}
                className={`relative flex items-start justify-end pr-[var(--spacing-sm)] pt-[calc(var(--spacing-xs)/2)] border-t max-md:pr-[var(--spacing-xs)] ${
                  slot.isHourStart
                    ? 'border-[var(--grid-line-bold)]'
                    : 'border-[var(--grid-line-color)]'
                } ${index === 0 ? 'border-t-0' : ''} ${!isWorking ? 'opacity-50' : ''}`}
                style={{
                  height: 'var(--slot-height)',
                  ...((!isWorking) && {
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, var(--color-border) 10px, var(--color-border) 11px)',
                  }),
                }}
                role="rowheader"
                aria-label={`Hora: ${slot.label}${!isWorking ? ' (Cerrado)' : ''}`}
              >
                {/* Only show label for hour starts to reduce clutter */}
                {slot.isHourStart && (
                  <span
                    className={`text-[var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-tight)] select-none max-lg:text-[10px] max-md:text-[9px] -translate-y-[calc(var(--spacing-xs)/2)] ${
                      isWorking ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-muted)]'
                    }`}
                    aria-hidden="false"
                  >
                    {slot.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
