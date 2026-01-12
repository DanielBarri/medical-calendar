/**
 * Date Helper Utilities
 * Uses date-fns for date manipulation and formatting
 */

import {
  format,
  addDays,
  addWeeks,
  subDays,
  subWeeks,
  startOfDay,
  isToday,
  isSameDay,
} from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Format a date for display in the calendar header
 * @param date - The date to format
 * @returns Formatted date string (e.g., "Lunes, 13 de Enero")
 */
export function formatHeaderDate(date: Date): string {
  return format(date, "EEEE, d 'de' MMMM", { locale: es });
}

/**
 * Format a date for the date picker input
 * @param date - The date to format
 * @returns Formatted date string (YYYY-MM-DD)
 */
export function formatDateForInput(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Navigate to the previous period based on current view
 * @param date - Current date
 * @param view - Current calendar view ('day' | '3-day' | 'week')
 * @returns New date
 */
export function navigatePrevious(date: Date, view: 'day' | '3-day' | 'week'): Date {
  switch (view) {
    case 'day':
      return subDays(date, 1);
    case '3-day':
      return subDays(date, 3);
    case 'week':
      return subWeeks(date, 1);
    default:
      return subDays(date, 1);
  }
}

/**
 * Navigate to the next period based on current view
 * @param date - Current date
 * @param view - Current calendar view ('day' | '3-day' | 'week')
 * @returns New date
 */
export function navigateNext(date: Date, view: 'day' | '3-day' | 'week'): Date {
  switch (view) {
    case 'day':
      return addDays(date, 1);
    case '3-day':
      return addDays(date, 3);
    case 'week':
      return addWeeks(date, 1);
    default:
      return addDays(date, 1);
  }
}

/**
 * Jump forward by a specific number of weeks
 * @param date - Current date
 * @param weeks - Number of weeks to jump
 * @returns New date
 */
export function jumpWeeksForward(date: Date, weeks: number): Date {
  return addWeeks(date, weeks);
}

/**
 * Get today's date at start of day (midnight)
 * @returns Today's date
 */
export function getToday(): Date {
  return startOfDay(new Date());
}

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns True if the date is today
 */
export function checkIsToday(date: Date): boolean {
  return isToday(date);
}

/**
 * Check if two dates are the same day
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if the dates are the same day
 */
export function checkIsSameDay(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2);
}
