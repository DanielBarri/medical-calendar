/**
 * useWorkingHours Hook
 *
 * Custom hook for managing working hours configuration with localStorage persistence.
 * Provides validation and type-safe working hours state management.
 *
 * @module hooks/useWorkingHours
 */

import { useState, useEffect } from 'react';
import {
  DEFAULT_START_HOUR,
  DEFAULT_END_HOUR,
  MIN_HOUR,
  MAX_HOUR,
  MIN_WORKING_HOURS_RANGE,
  STORAGE_KEYS,
} from '../constants/calendar';

/**
 * Working hours configuration interface
 */
export interface WorkingHours {
  startHour: number;
  endHour: number;
}

/**
 * Validate working hours configuration
 *
 * @param startHour - Start hour (0-23)
 * @param endHour - End hour (1-24)
 * @returns True if valid, false otherwise
 */
function validateWorkingHours(startHour: number, endHour: number): boolean {
  return (
    typeof startHour === 'number' &&
    typeof endHour === 'number' &&
    startHour >= MIN_HOUR &&
    startHour < MAX_HOUR &&
    endHour > MIN_HOUR &&
    endHour <= MAX_HOUR &&
    endHour - startHour >= MIN_WORKING_HOURS_RANGE
  );
}

/**
 * Load working hours from localStorage with validation
 *
 * @returns Validated working hours or default values
 */
function loadWorkingHours(): WorkingHours {
  const stored = localStorage.getItem(STORAGE_KEYS.WORKING_HOURS);

  if (stored) {
    try {
      const parsed = JSON.parse(stored);

      // Validate parsed object structure and data types
      if (
        parsed &&
        typeof parsed === 'object' &&
        validateWorkingHours(parsed.startHour, parsed.endHour)
      ) {
        return { startHour: parsed.startHour, endHour: parsed.endHour };
      }
      // Invalid data, fall through to default
    } catch {
      // JSON parse error, fall through to default
    }
  }

  return { startHour: DEFAULT_START_HOUR, endHour: DEFAULT_END_HOUR };
}

/**
 * Save working hours to localStorage
 *
 * @param workingHours - Working hours configuration to save
 */
function saveWorkingHours(workingHours: WorkingHours): void {
  localStorage.setItem(STORAGE_KEYS.WORKING_HOURS, JSON.stringify(workingHours));
}

/**
 * Custom hook for managing working hours with localStorage persistence
 *
 * @returns Tuple of [workingHours, setWorkingHours]
 *
 * @example
 * ```tsx
 * const [workingHours, setWorkingHours] = useWorkingHours();
 *
 * // Update working hours (will auto-persist to localStorage)
 * setWorkingHours({ startHour: 9, endHour: 17 });
 * ```
 */
export function useWorkingHours(): [WorkingHours, (hours: WorkingHours) => void] {
  const [workingHours, setWorkingHoursState] = useState<WorkingHours>(loadWorkingHours);

  /**
   * Persist working hours to localStorage whenever they change
   */
  useEffect(() => {
    saveWorkingHours(workingHours);
  }, [workingHours]);

  /**
   * Setter with validation
   */
  const setWorkingHours = (hours: WorkingHours) => {
    if (validateWorkingHours(hours.startHour, hours.endHour)) {
      setWorkingHoursState(hours);
    } else {
      console.error('Invalid working hours:', hours);
    }
  };

  return [workingHours, setWorkingHours];
}
