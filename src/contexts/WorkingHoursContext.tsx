/**
 * WorkingHoursProvider Component
 *
 * React context provider for managing and sharing working hours configuration across components.
 * Eliminates prop drilling by providing working hours to any component in the tree.
 *
 * @module contexts/WorkingHoursContext
 */

import type { ReactNode } from 'react';
import { useWorkingHours } from '../hooks/useWorkingHours';
import {
  WorkingHoursContext,
  type WorkingHoursContextValue,
} from './WorkingHoursContext.context';

// Re-export context and types for convenience
export { WorkingHoursContext, type WorkingHoursContextValue };

/**
 * Props for WorkingHoursProvider
 */
interface WorkingHoursProviderProps {
  children: ReactNode;
}

/**
 * WorkingHoursProvider component
 *
 * Wraps the calendar components to provide working hours context.
 *
 * @example
 * ```tsx
 * <WorkingHoursProvider>
 *   <Calendar />
 * </WorkingHoursProvider>
 * ```
 */
export function WorkingHoursProvider({ children }: WorkingHoursProviderProps) {
  const [workingHours, setWorkingHours] = useWorkingHours();

  /**
   * Convenience method to update start hour while preserving end hour
   */
  const setStartHour = (hour: number) => {
    setWorkingHours({ ...workingHours, startHour: hour });
  };

  /**
   * Convenience method to update end hour while preserving start hour
   */
  const setEndHour = (hour: number) => {
    setWorkingHours({ ...workingHours, endHour: hour });
  };

  const value: WorkingHoursContextValue = {
    workingHours,
    setWorkingHours,
    setStartHour,
    setEndHour,
  };

  return <WorkingHoursContext.Provider value={value}>{children}</WorkingHoursContext.Provider>;
}
