/**
 * Appointment Helper Utilities
 *
 * Utility functions for positioning, formatting, and managing appointments
 * in the calendar grid.
 *
 * TIMEZONE HANDLING (MVP):
 * All date operations in this file use the browser's local timezone.
 * Date objects are manipulated using getHours() and getMinutes() which
 * return values in local time. This is appropriate for MVP where the
 * medical office and all users are in the same timezone.
 *
 * IMPORTANT: When backend integration is added, ensure all Date objects
 * received from the API are converted to the office's timezone before
 * being passed to these helper functions.
 *
 * @module utils/appointmentHelpers
 */

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Appointment } from '../types/appointment';
import { MIN_APPOINTMENT_HEIGHT, MINUTES_IN_HOUR } from '../constants/calendar';

/**
 * Calculate the top position of an appointment in pixels
 *
 * @param startTime - The appointment start time
 * @param slotHeightPx - Height of each time slot in pixels
 * @param slotInterval - Time interval per slot in minutes (15, 30, or 60)
 * @returns Top position in pixels from the start of the day (00:00)
 *
 * @example
 * // For a 9:00 AM appointment with 30px slots and 30-minute intervals
 * calculateAppointmentTop(new Date('2026-01-12 09:00'), 30, 30)
 * // Returns: 540 (9 hours * 2 slots/hour * 30px = 540px)
 */
export function calculateAppointmentTop(
  startTime: Date,
  slotHeightPx: number,
  slotInterval: 15 | 30 | 60
): number {
  const hours = startTime.getHours();
  const minutes = startTime.getMinutes();

  // Calculate total minutes from midnight
  const totalMinutes = hours * MINUTES_IN_HOUR + minutes;

  // Calculate how many slots this represents
  const slotsFromMidnight = totalMinutes / slotInterval;

  // Return position in pixels
  return slotsFromMidnight * slotHeightPx;
}

/**
 * Calculate the height of an appointment in pixels
 *
 * @param duration - Duration in minutes
 * @param slotHeightPx - Height of each time slot in pixels
 * @param slotInterval - Time interval per slot in minutes (15, 30, or 60)
 * @returns Height in pixels
 *
 * @example
 * // For a 60-minute appointment with 30px slots and 30-minute intervals
 * calculateAppointmentHeight(60, 30, 30)
 * // Returns: 60 (60 minutes / 30 minutes per slot * 30px = 60px)
 */
export function calculateAppointmentHeight(
  duration: number,
  slotHeightPx: number,
  slotInterval: 15 | 30 | 60
): number {
  // Calculate how many slots this duration spans
  const slots = duration / slotInterval;

  // Return height in pixels (minimum MIN_APPOINTMENT_HEIGHT for readability)
  return Math.max(slots * slotHeightPx, MIN_APPOINTMENT_HEIGHT);
}

/**
 * Check if two appointments overlap in time
 *
 * @param appointment1 - First appointment
 * @param appointment2 - Second appointment
 * @returns True if appointments overlap
 */
export function appointmentsOverlap(appointment1: Appointment, appointment2: Appointment): boolean {
  return (
    appointment1.startTime < appointment2.endTime && appointment1.endTime > appointment2.startTime
  );
}

/**
 * Detect overlapping appointments and group them together
 *
 * @param appointments - Array of appointments to analyze
 * @returns Map of appointment IDs to their overlapping group
 *
 * @example
 * const groups = detectOverlappingAppointments(appointments);
 * // groups.get(appointmentId) returns array of overlapping appointments
 */
export function detectOverlappingAppointments(
  appointments: Appointment[]
): Map<string, Appointment[]> {
  const overlappingGroups = new Map<string, Appointment[]>();

  // Sort appointments by start time for efficient processing
  const sortedAppointments = [...appointments].sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime()
  );

  // For each appointment, find all overlapping appointments
  sortedAppointments.forEach((appointment, index) => {
    const overlapping: Appointment[] = [appointment];

    // Check against all other appointments
    sortedAppointments.forEach((otherAppointment, otherIndex) => {
      if (index !== otherIndex && appointmentsOverlap(appointment, otherAppointment)) {
        overlapping.push(otherAppointment);
      }
    });

    // Store the group for this appointment
    overlappingGroups.set(appointment.id, overlapping);
  });

  return overlappingGroups;
}

/**
 * Calculate the offset index for an appointment within its overlapping group
 *
 * Used to position overlapping appointments horizontally side-by-side
 *
 * @param appointmentId - ID of the appointment
 * @param overlappingGroups - Map of appointment IDs to their overlapping groups
 * @returns Object with offsetIndex and totalOverlapping count
 */
export function calculateAppointmentOffset(
  appointmentId: string,
  overlappingGroups: Map<string, Appointment[]>
): { offsetIndex: number; totalOverlapping: number } {
  const group = overlappingGroups.get(appointmentId) || [];

  // Sort by start time, then by ID for consistent ordering
  const sortedGroup = [...group].sort((a, b) => {
    const timeDiff = a.startTime.getTime() - b.startTime.getTime();
    if (timeDiff !== 0) return timeDiff;
    return a.id.localeCompare(b.id);
  });

  const offsetIndex = sortedGroup.findIndex((apt) => apt.id === appointmentId);

  return {
    offsetIndex: offsetIndex >= 0 ? offsetIndex : 0,
    totalOverlapping: sortedGroup.length,
  };
}

/**
 * Format time range for display
 *
 * @param startTime - Start time
 * @param endTime - End time
 * @returns Formatted time range string (e.g., "9:00 - 10:30")
 *
 * @example
 * formatTimeRange(new Date('2026-01-12 09:00'), new Date('2026-01-12 10:30'))
 * // Returns: "9:00 - 10:30"
 */
export function formatTimeRange(startTime: Date, endTime: Date): string {
  const startFormatted = format(startTime, 'H:mm', { locale: es });
  const endFormatted = format(endTime, 'H:mm', { locale: es });

  return `${startFormatted} - ${endFormatted}`;
}

/**
 * Get CSS variable for appointment status color
 *
 * @param status - Appointment status
 * @param variant - Color variant ('main' or 'light')
 * @returns CSS variable name
 *
 * @example
 * getStatusColor('confirmed', 'light')
 * // Returns: 'var(--status-confirmed-light)'
 */
export function getStatusColor(status: string, variant: 'main' | 'light' = 'main'): string {
  const suffix = variant === 'light' ? '-light' : '';
  return `var(--status-${status}${suffix})`;
}

/**
 * Get CSS variable for appointment type color
 *
 * @param type - Appointment type
 * @param variant - Color variant ('main' or 'light')
 * @returns CSS variable name
 *
 * @example
 * getTypeColor('first-visit', 'main')
 * // Returns: 'var(--type-first-visit)'
 */
export function getTypeColor(type: string, variant: 'main' | 'light' = 'main'): string {
  const suffix = variant === 'light' ? '-light' : '';
  return `var(--type-${type}${suffix})`;
}

/**
 * Filter appointments for a specific date
 *
 * Includes appointments that:
 * - Start on the target date
 * - Span across midnight from the previous day into the target date
 * - Span across midnight from the target date into the next day
 *
 * @param appointments - All appointments
 * @param date - Target date
 * @returns Appointments that fall on or span into the specified date
 */
export function filterAppointmentsByDate(appointments: Appointment[], date: Date): Appointment[] {
  const targetDay = date.toDateString();

  // Get start and end of target day for comparison
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return appointments.filter((appointment) => {
    // Include if appointment starts on target date
    if (appointment.startTime.toDateString() === targetDay) {
      return true;
    }

    // Include if appointment spans into target date from previous day
    // (starts before target date and ends during target date)
    if (appointment.startTime < dayStart && appointment.endTime > dayStart) {
      return true;
    }

    // Include if appointment ends on target date
    // (covers case where it started on previous day)
    if (appointment.endTime.toDateString() === targetDay) {
      return true;
    }

    return false;
  });
}

/**
 * Get a human-readable label for appointment type
 *
 * @param type - Appointment type
 * @returns Localized type label
 */
export function getAppointmentTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'first-visit': 'Primera visita',
    'follow-up': 'Seguimiento',
    procedure: 'Procedimiento',
    emergency: 'Emergencia',
  };

  return labels[type] || type;
}

/**
 * Get a human-readable label for appointment status
 *
 * @param status - Appointment status
 * @returns Localized status label
 */
export function getAppointmentStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    booked: 'Reservada',
    confirmed: 'Confirmada',
    arrived: 'Llegó',
    started: 'En curso',
    completed: 'Completada',
    'no-show': 'No asistió',
    cancelled: 'Cancelada',
  };

  return labels[status] || status;
}
