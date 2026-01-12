/**
 * Calendar Type Definitions
 * Defines TypeScript interfaces for the Medical Calendar Component
 */

/**
 * Available calendar view modes
 */
export type CalendarView = 'day' | '3-day' | 'week';

/**
 * Props for the CalendarHeader component
 */
export interface CalendarHeaderProps {
  /**
   * Currently selected date
   */
  selectedDate: Date;

  /**
   * Current calendar view mode
   */
  view: CalendarView;

  /**
   * Callback fired when the selected date changes
   */
  onDateChange: (date: Date) => void;

  /**
   * Callback fired when the view mode changes
   */
  onViewChange: (view: CalendarView) => void;
}

/**
 * Quick jump options for date navigation
 */
export interface QuickJumpOption {
  label: string;
  weeks: number;
}
