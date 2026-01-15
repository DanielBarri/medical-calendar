/**
 * useWorkingHoursContext Hook
 *
 * Hook to access working hours context.
 * Must be used within a WorkingHoursProvider.
 *
 * @module hooks/useWorkingHoursContext
 */

import { useContext } from 'react';
import { WorkingHoursContext, type WorkingHoursContextValue } from '../contexts/WorkingHoursContext.context';

/**
 * Hook to access working hours context
 *
 * @returns WorkingHoursContextValue
 * @throws Error if used outside WorkingHoursProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { workingHours, setWorkingHours } = useWorkingHoursContext();
 *
 *   return (
 *     <div>
 *       Working hours: {workingHours.startHour}:00 - {workingHours.endHour}:00
 *     </div>
 *   );
 * }
 * ```
 */
export function useWorkingHoursContext(): WorkingHoursContextValue {
  const context = useContext(WorkingHoursContext);

  if (context === undefined) {
    throw new Error('useWorkingHoursContext must be used within a WorkingHoursProvider');
  }

  return context;
}
