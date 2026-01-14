/**
 * Date Helper Utilities
 * Uses date-fns for date manipulation and formatting
 *
 * TIMEZONE HANDLING (MVP):
 * For the MVP, all dates are handled in the browser's local timezone.
 * This is appropriate for single-location medical offices where the server
 * and clients are in the same timezone.
 *
 * IMPORTANT: When integrating with a backend API, proper timezone handling
 * should be implemented using date-fns-tz to ensure:
 * - Dates are stored in UTC on the server
 * - Dates are converted to the office's timezone for display
 * - Appointment times remain consistent regardless of client timezone
 *
 * Future implementation should:
 * 1. Store all dates as ISO 8601 strings in UTC
 * 2. Use zonedTimeToUtc() when sending dates to the server
 * 3. Use utcToZonedTime() when receiving dates from the server
 * 4. Add office timezone configuration to user settings
 */

import {
  format,
  addDays,
  addWeeks,
  subDays,
  subWeeks,
  startOfDay,
  startOfWeek,
  endOfWeek,
  isToday,
  isSameDay,
  isSameMonth,
  getYear,
} from 'date-fns';
import { es } from 'date-fns/locale';
import type { CalendarView } from '../types/calendar';

/**
 * Format a date for display in the calendar header
 * @param date - The date to format
 * @returns Formatted date string (e.g., "Lunes, 13 de Enero")
 */
export function formatHeaderDate(date: Date): string {
  return format(date, "EEEE, d 'de' MMMM", { locale: es });
}

/**
 * Format a date range for display in the calendar header based on view
 * @param date - The selected date
 * @param view - Current calendar view ('day' | '3-day' | 'week')
 * @returns Formatted date range string
 *
 * Examples:
 * - Day view: "Lunes, 13 de Enero"
 * - 3-day view: "12 - 14 Ene, 2026"
 * - Week view (same month): "12 - 18 Ene, 2026"
 * - Week view (cross-month): "23 Feb - 1 Mar, 2026"
 */
export function formatHeaderDateRange(date: Date, view: CalendarView): string {
  switch (view) {
    case 'day':
      // Keep the existing format for day view
      return format(date, "EEEE, d 'de' MMMM", { locale: es });

    case '3-day': {
      const startDate = date;
      const endDate = addDays(date, 2);
      const year = getYear(date);

      if (isSameMonth(startDate, endDate)) {
        // Same month: "12 - 14 Ene, 2026"
        return `${format(startDate, 'd', { locale: es })} - ${format(endDate, 'd', { locale: es })} ${format(endDate, 'MMM', { locale: es })}, ${year}`;
      } else {
        // Cross-month: "30 Ene - 1 Feb, 2026"
        return `${format(startDate, 'd', { locale: es })} ${format(startDate, 'MMM', { locale: es })} - ${format(endDate, 'd', { locale: es })} ${format(endDate, 'MMM', { locale: es })}, ${year}`;
      }
    }

    case 'week': {
      const weekStart = startOfWeek(date, { locale: es });
      const weekEnd = endOfWeek(date, { locale: es });
      const year = getYear(date);

      if (isSameMonth(weekStart, weekEnd)) {
        // Same month: "12 - 18 Ene, 2026"
        return `${format(weekStart, 'd', { locale: es })} - ${format(weekEnd, 'd', { locale: es })} ${format(weekEnd, 'MMM', { locale: es })}, ${year}`;
      } else {
        // Cross-month: "23 Feb - 1 Mar, 2026"
        return `${format(weekStart, 'd', { locale: es })} ${format(weekStart, 'MMM', { locale: es })} - ${format(weekEnd, 'd', { locale: es })} ${format(weekEnd, 'MMM', { locale: es })}, ${year}`;
      }
    }

    default:
      return format(date, "EEEE, d 'de' MMMM", { locale: es });
  }
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
