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
import type { CalendarView } from '../types/calendar';

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
   * Ref to the timeline scroll container for synchronization
   */
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Generate time slots based on interval
 */
function generateTimeSlots(
  startHour: number,
  endHour: number,
  interval: 15 | 30 | 60
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const slotsPerHour = 60 / interval;

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let slotIndex = 0; slotIndex < slotsPerHour; slotIndex++) {
      const minute = slotIndex * interval;

      // Skip the last interval of the last hour to prevent overflow
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
  view: _view,
  slotInterval = 30,
  startHour = 0,
  endHour = 24,
  scrollRef,
}: CalendarTimelineProps) {
  /**
   * Memoized time slots generation to prevent unnecessary recalculations
   */
  const timeSlots = useMemo(
    () => generateTimeSlots(startHour, endHour, slotInterval),
    [startHour, endHour, slotInterval]
  );

  return (
    <aside
      className="relative bg-[var(--color-surface)] border-r border-[var(--color-border)] w-[var(--time-column-width)] flex-shrink-0 overflow-y-auto overflow-x-hidden max-lg:w-[60px] max-md:w-[50px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="complementary"
      aria-label="Timeline de horarios"
      ref={scrollRef}
    >
      <div className="relative">
        {/* Spacer to align with grid column headers */}
        <div className="sticky top-0 z-[var(--z-sticky)] bg-[var(--color-surface)] border-b-2 border-[var(--color-border)] p-[var(--spacing-md)] max-lg:p-[var(--spacing-sm)] max-md:p-[var(--spacing-sm)] max-md:px-[var(--spacing-xs)] max-[480px]:p-[var(--spacing-xs)]">
          {/* Empty spacer with same height as grid headers */}
          <div className="text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] leading-[var(--line-height-tight)] mb-[var(--spacing-xs)] max-lg:text-[var(--font-size-xs)] max-md:text-[11px] opacity-0">
            Día
          </div>
          <div className="text-[var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-tight)] max-lg:text-[10px] max-md:text-[9px] opacity-0">
            1 Ene
          </div>
        </div>

        {/* Time Slots */}
        <div className="flex flex-col">
          {timeSlots.map((slot, index) => (
            <div
              key={`${slot.hour}-${slot.minute}`}
              className={`relative flex items-start justify-end pr-[var(--spacing-sm)] pt-[calc(var(--spacing-xs)/2)] border-t max-md:pr-[var(--spacing-xs)] ${
                slot.isHourStart
                  ? 'border-[var(--grid-line-bold)]'
                  : 'border-[var(--grid-line-color)]'
              } ${index === 0 ? 'border-t-0' : ''}`}
              style={{ height: 'var(--slot-height)' }}
              role="rowheader"
              aria-label={`Hora: ${slot.label}`}
            >
              {/* Only show label for hour starts to reduce clutter */}
              {slot.isHourStart && (
                <span
                  className="text-[var(--font-size-xs)] font-[var(--font-weight-medium)] text-[var(--color-text-secondary)] leading-[var(--line-height-tight)] select-none max-lg:text-[10px] max-md:text-[9px] -translate-y-[calc(var(--spacing-xs)/2)]"
                  aria-hidden="false"
                >
                  {slot.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
