/**
 * Calendar Component
 *
 * Main parent component for the medical calendar application.
 * Manages shared state and coordinates child components.
 *
 * Features:
 * - State management for selected date and calendar view
 * - Coordinates CalendarHeader, Timeline, and Grid components
 * - Responsive layout for all devices
 *
 * @component
 */

import { useState, useRef, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarTimeline from './CalendarTimeline';
import CalendarGrid from './CalendarGrid';
import type { CalendarView } from '../types/calendar';
import { getToday } from '../utils/dateHelpers';

/**
 * Props for the Calendar component
 */
export interface CalendarProps {
  /**
   * Initial date to display (defaults to today)
   */
  initialDate?: Date;

  /**
   * Initial view mode (defaults to 'day')
   */
  initialView?: CalendarView;

  /**
   * Callback fired when the selected date changes
   */
  onDateChange?: (date: Date) => void;

  /**
   * Callback fired when the view mode changes
   */
  onViewChange?: (view: CalendarView) => void;
}

/**
 * Main Calendar component
 */
export default function Calendar({
  initialDate = getToday(),
  initialView = 'day',
  onDateChange,
  onViewChange,
}: CalendarProps) {
  // State management for calendar
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [view, setView] = useState<CalendarView>(initialView);

  // Refs for scroll synchronization
  const timelineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  /**
   * Synchronize scroll between timeline and grid
   */
  useEffect(() => {
    const gridElement = gridRef.current;
    const timelineElement = timelineRef.current;

    if (!gridElement || !timelineElement) return;

    const handleGridScroll = () => {
      if (timelineElement) {
        timelineElement.scrollTop = gridElement.scrollTop;
      }
    };

    gridElement.addEventListener('scroll', handleGridScroll);

    return () => {
      gridElement.removeEventListener('scroll', handleGridScroll);
    };
  }, []);

  /**
   * Handle date change from child components
   */
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateChange?.(date);
  };

  /**
   * Handle view change from child components
   */
  const handleViewChange = (newView: CalendarView) => {
    setView(newView);
    onViewChange?.(newView);
  };

  return (
    <div
      className="flex flex-col h-screen w-full overflow-hidden bg-[var(--color-background)]"
      role="application"
      aria-label="Calendario médico"
    >
      {/* Calendar Header - Navigation and controls */}
      <CalendarHeader
        selectedDate={selectedDate}
        view={view}
        onDateChange={handleDateChange}
        onViewChange={handleViewChange}
      />

      {/* Main Calendar Content - Scroll synchronized container */}
      <div className="flex flex-1 overflow-hidden relative bg-[var(--color-background)]">
        {/* Timeline - Vertical time slots (left side, sticky) */}
        <CalendarTimeline view={view} slotInterval={30} scrollRef={timelineRef} />

        {/* Grid - Appointment columns (right side, scrollable) */}
        <CalendarGrid
          selectedDate={selectedDate}
          view={view}
          slotInterval={30}
          scrollRef={gridRef}
        />
      </div>
    </div>
  );
}
