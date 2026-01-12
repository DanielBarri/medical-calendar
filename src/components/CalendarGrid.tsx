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
import { format, addDays, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';

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
}: CalendarGridProps) {
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

  return (
    <main
      className="relative flex-1 overflow-hidden bg-[var(--color-background)]"
      role="main"
      aria-label="Grid de citas del calendario"
    >
      <div className="relative h-full flex flex-col overflow-hidden">
        {/* Column Headers */}
        <div className="flex bg-[var(--color-surface)] border-b-2 border-[var(--color-border)] sticky top-0 z-[var(--z-sticky)] shadow-[var(--shadow-sm)] max-md:static">
          {datesToDisplay.map((date, index) => (
            <div
              key={date.toISOString()}
              className={`flex-1 min-w-0 p-[var(--spacing-md)] text-center border-r border-[var(--color-border)] bg-[var(--color-surface)] max-lg:p-[var(--spacing-sm)] max-md:p-[var(--spacing-sm)] max-md:px-[var(--spacing-xs)] max-[480px]:p-[var(--spacing-xs)] ${index === datesToDisplay.length - 1 ? 'border-r-0' : ''}`}
              role="columnheader"
            >
              <div className="text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)] capitalize mb-[var(--spacing-xs)] leading-[var(--line-height-tight)] max-lg:text-[var(--font-size-xs)] max-md:text-[11px]">
                {format(date, 'EEEE', { locale: es })}
              </div>
              <div className="text-[var(--font-size-xs)] font-[var(--font-weight-medium)] text-[var(--color-text-secondary)] uppercase leading-[var(--line-height-tight)] max-lg:text-[10px] max-md:text-[9px]">
                {format(date, 'd MMM', { locale: es })}
              </div>
            </div>
          ))}
        </div>

        {/* Grid Columns - Scrollable container */}
        <div
          ref={scrollRef}
          className="flex flex-1 overflow-x-auto overflow-y-auto relative scroll-smooth [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[var(--color-background)] [&::-webkit-scrollbar-thumb]:bg-[var(--color-border)] [&::-webkit-scrollbar-thumb]:rounded-[var(--radius-full)] [&::-webkit-scrollbar-thumb:hover]:bg-[var(--color-text-muted)] max-md:flex-col print:overflow-visible"
        >
          {datesToDisplay.map((date, colIndex) => (
            <div
              key={date.toISOString()}
              className={`relative flex-1 min-w-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] max-md:border-r-0 max-md:border-b max-md:min-h-[400px] ${colIndex === datesToDisplay.length - 1 ? 'border-r-0 max-md:border-b-0' : ''}`}
              role="grid"
              aria-label={`Columna para ${format(date, 'EEEE, d MMMM', {
                locale: es,
              })}`}
            >
              {/* Time slots grid (synchronized with timeline) */}
              <div className="flex flex-col w-full">
                {timeSlots.map((slot, slotIndex) => (
                  <div
                    key={`${slot.hour}-${slot.minute}`}
                    className={`relative border-t transition-colors duration-[var(--transition-fast)] cursor-pointer hover:bg-[var(--hover-overlay)] print:hover:bg-transparent ${
                      slot.isHourStart
                        ? 'border-[var(--grid-line-bold)]'
                        : 'border-[var(--grid-line-color)]'
                    } ${slotIndex === 0 ? 'border-t-0' : ''}`}
                    style={{ height: 'var(--slot-height)' }}
                    data-hour={slot.hour}
                    data-minute={slot.minute}
                  />
                ))}
              </div>

              {/* Appointments will be rendered here in future sprints */}
              <div
                className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-[var(--z-base)] [&>*]:pointer-events-auto"
                aria-live="polite"
              >
                {/* Placeholder for appointments (Sprint 2) */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
