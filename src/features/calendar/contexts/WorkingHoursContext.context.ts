/**
 * Working Hours Context Definition
 *
 * Creates the React context for working hours state management.
 * Separated from the provider component to avoid Fast Refresh warnings.
 *
 * @module contexts/WorkingHoursContext.context
 */

import { createContext } from 'react';
import type { WorkingHours } from '../hooks/useWorkingHours';

/**
 * Context value interface
 */
export interface WorkingHoursContextValue {
  /**
   * Current working hours configuration
   */
  workingHours: WorkingHours;

  /**
   * Update working hours configuration
   * Automatically persists to localStorage
   */
  setWorkingHours: (hours: WorkingHours) => void;

  /**
   * Convenience method to update just the start hour
   */
  setStartHour: (hour: number) => void;

  /**
   * Convenience method to update just the end hour
   */
  setEndHour: (hour: number) => void;
}

/**
 * Create the context with undefined default (must use provider)
 */
export const WorkingHoursContext = createContext<WorkingHoursContextValue | undefined>(undefined);
