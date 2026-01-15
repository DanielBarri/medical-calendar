import {
    useSensor,
    useSensors,
    PointerSensor,
    type DragEndEvent,
} from '@dnd-kit/core';
import type { Appointment } from '../types/appointment';
import { calculateNewTime } from '../utils/dndHelpers';
import { calculateAppointmentTop } from '../utils/appointmentHelpers';
import { addMinutes } from 'date-fns';
import { MIN_HOUR } from '../../../constants/calendar';

interface UseCalendarDragProps {
    setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
    slotHeightPx: number;
}

export function useCalendarDrag({
    setAppointments,
    slotHeightPx,
}: UseCalendarDragProps) {
    // Dnd Sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // 5px movement required to start drag
            },
        })
    );

    /**
     * Handle drag end
     */
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over, delta } = event;

        if (!active) return;

        const isResize = active.data.current?.type === 'resize';

        // For moving appointments, we need a valid drop target (over)
        // For resizing, we only need the delta, so 'over' is optional
        if (!isResize && !over) return;

        const activeId = active.id;
        const overDate = over?.data.current?.date as Date | undefined;

        // Additional check for Move: must have overDate
        if (!isResize && !overDate) return;

        setAppointments((prev) => {
            const isResize = active.data.current?.type === 'resize';
            const actualId = isResize ? String(activeId).replace('resize-', '') : activeId;

            const appointment = prev.find((apt) => apt.id === actualId);
            if (!appointment) return prev;

            // Handle Resize
            if (isResize) {
                const pixelsPerMinute = slotHeightPx / 30; // Assuming 30m base
                const minutesChanged = delta.y / pixelsPerMinute;
                const snappedMinutes = Math.round(minutesChanged / 15) * 15;

                let newDuration = appointment.duration + snappedMinutes;
                newDuration = Math.max(15, newDuration);

                const newEndTime = addMinutes(appointment.startTime, newDuration);

                if (newDuration === appointment.duration) return prev;

                return prev.map((apt) =>
                    apt.id === actualId
                        ? { ...apt, duration: newDuration, endTime: newEndTime }
                        : apt
                );
            }

            // Handle Move
            if (!overDate) return prev;

            const originalTop = calculateAppointmentTop(
                appointment.startTime,
                slotHeightPx,
                30
            );

            const newTop = originalTop + delta.y;

            const newStartTime = calculateNewTime({
                yOffset: newTop,
                slotHeightPx,
                stepMinutes: 30,
                startHour: MIN_HOUR,
                baseDate: overDate,
            });

            const newEndTime = addMinutes(newStartTime, appointment.duration);

            return prev.map((apt) =>
                apt.id === activeId
                    ? {
                        ...apt,
                        startTime: newStartTime,
                        endTime: newEndTime,
                    }
                    : apt
            );
        });
    };

    return { sensors, handleDragEnd };
}
