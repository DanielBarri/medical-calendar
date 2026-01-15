/**
 * Drag and Drop Helpers
 * 
 * Utilities for calculating time slots from pixel coordinates.
 */

import { addMinutes, setHours, setMinutes } from 'date-fns';

interface CalculateTimeParams {
    /**
     * Y-coordinate offset from the top of the grid container (pixels)
     */
    yOffset: number;

    /**
     * Height of a single time slot (pixels)
     */
    slotHeightPx: number;

    /**
     * Step in minutes for each slot (e.g., 15)
     */
    stepMinutes: number;

    /**
     * Starting hour of the calendar (e.g., 6 for 06:00)
     */
    startHour: number;

    /**
     * Base date for the column (to set the correct day)
     */
    baseDate: Date;
}

/**
 * Calculates the new time based on the drag position
 */
export const calculateNewTime = ({
    yOffset,
    slotHeightPx,
    stepMinutes,
    startHour,
    baseDate,
}: CalculateTimeParams): Date => {
    // Ensure positive offset
    const safeOffset = Math.max(0, yOffset);

    // Calculate how many slots down we are
    const slotsFromTop = Math.round(safeOffset / slotHeightPx);

    // Calculate total minutes from start time
    const totalMinutesAdded = slotsFromTop * stepMinutes;

    // Set the base time (startHour:00)
    let newDate = setHours(baseDate, startHour);
    newDate = setMinutes(newDate, 0);

    // Add the calculated minutes
    return addMinutes(newDate, totalMinutesAdded);
};
