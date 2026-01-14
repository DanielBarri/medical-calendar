/**
 * Calendar Constants
 *
 * Centralized constants for the medical calendar application.
 * All magic numbers are defined here for consistency and maintainability.
 *
 * @module constants/calendar
 */

/**
 * Default working hours configuration
 */
export const DEFAULT_START_HOUR = 8;
export const DEFAULT_END_HOUR = 18;

/**
 * Time slot configuration
 */
export const DEFAULT_SLOT_INTERVAL = 30; // minutes
export const VALID_SLOT_INTERVALS = [15, 30, 60] as const;

/**
 * Day time boundaries
 */
export const HOURS_IN_DAY = 24;
export const MIN_HOUR = 0;
export const MAX_HOUR = 24;
export const MINUTES_IN_HOUR = 60;

/**
 * Appointment positioning and sizing
 */
export const MIN_APPOINTMENT_HEIGHT = 24; // pixels
export const OVERLAP_OFFSET = 8; // pixels for staggered overlapping appointments
export const DEFAULT_SLOT_HEIGHT = 30; // pixels

/**
 * Appointment duration presets (in minutes)
 */
export const DURATION_PRESETS = {
  SHORT: 15,
  STANDARD: 30,
  LONG: 60,
  EXTENDED: 90,
} as const;

/**
 * Working hours validation
 */
export const MIN_WORKING_HOURS_RANGE = 1; // minimum hours between start and end

/**
 * LocalStorage keys
 */
export const STORAGE_KEYS = {
  WORKING_HOURS: 'calendar-working-hours',
} as const;
