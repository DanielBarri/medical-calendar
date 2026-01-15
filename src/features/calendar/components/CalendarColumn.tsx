/**
 * CalendarColumn Component
 *
 * Represents a single day column in the calendar grid.
 * Acts as a Droppable zone for Drag & Drop functionality.
 */

import { useDroppable } from '@dnd-kit/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Appointment } from '../types/appointment';
import type { CalendarView } from '../types/calendar';
import { calculateAppointmentOffset } from '../utils/appointmentHelpers';
import AppointmentCard from './AppointmentCard';

interface TimeSlot {
    hour: number;
    minute: number;
    isHourStart: boolean;
}

interface CalendarColumnProps {
    date: Date;
    view: CalendarView;
    isLastCol: boolean;
    timeSlots: TimeSlot[];
    dayAppointments: Appointment[];
    overlappingGroups: Map<string, Appointment[]>;
    slotHeightPx: number;
    slotInterval: 15 | 30 | 60;
    workingHours: { startHour: number; endHour: number };
    focusedCell: { col: number; row: number };
    colIndex: number;
    onSlotClick?: (date: Date, hour: number, minute: number) => void;
    onAppointmentClick?: (appointment: Appointment) => void;
    setFocusedCell: (cell: { col: number; row: number }) => void;
    handleKeyDown: (e: React.KeyboardEvent, colIndex: number, slotIndex: number, date: Date, hour: number, minute: number) => void;
}

export default function CalendarColumn({
    date,
    view,
    isLastCol,
    timeSlots,
    dayAppointments,
    overlappingGroups,
    slotHeightPx,
    slotInterval,
    workingHours,
    focusedCell,
    colIndex,
    onSlotClick,
    onAppointmentClick,
    setFocusedCell,
    handleKeyDown,
}: CalendarColumnProps) {
    // Make the column droppable
    const { setNodeRef, isOver } = useDroppable({
        id: date.toISOString(), // Unique ID for the column (the date)
        data: { date }, // Pass date data for the dragEnd handler
    });

    const isWithinWorkingHours = (hour: number): boolean => {
        return hour >= workingHours.startHour && hour < workingHours.endHour;
    };

    return (
        <div
            ref={setNodeRef}
            className={`relative flex-1 h-fit border-r border-[var(--color-border)] bg-[var(--color-surface)] snap-start ${view === 'day' ? 'min-w-[85vw]' : 'min-w-0'
                } ${isLastCol ? 'border-r-0' : ''} ${isOver ? 'bg-[var(--color-surface-hover)]' : ''}`}
            role="grid"
            aria-label={`Columna para ${format(date, 'EEEE, d MMMM', { locale: es })}`}
        >
            {/* Time slots grid (synchronized with timeline) */}
            <div className="flex flex-col w-full flex-shrink-0">
                {timeSlots.map((slot, slotIndex) => {
                    const isWorking = isWithinWorkingHours(slot.hour);
                    const isFocused = focusedCell.col === colIndex && focusedCell.row === slotIndex;

                    return (
                        <div
                            key={`${slot.hour}-${slot.minute}`}
                            className={`relative border-t transition-colors duration-[var(--transition-fast)] cursor-pointer outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-inset focus:z-10 ${slot.isHourStart
                                ? 'border-[var(--grid-line-bold)]'
                                : 'border-[var(--grid-line-color)]'
                                } ${slotIndex === 0 ? 'border-t-0' : ''} ${isWorking ? 'hover:bg-[var(--hover-overlay)]' : 'opacity-50'
                                }`}
                            style={{
                                height: 'var(--slot-height)',
                                ...(!isWorking && {
                                    backgroundImage:
                                        'repeating-linear-gradient(45deg, transparent, transparent 10px, var(--color-border) 10px, var(--color-border) 11px)',
                                }),
                            }}
                            data-hour={slot.hour}
                            data-minute={slot.minute}
                            data-is-working={isWorking}
                            data-col={colIndex}
                            data-row={slotIndex}
                            onClick={() => {
                                setFocusedCell({ col: colIndex, row: slotIndex });
                                onSlotClick?.(date, slot.hour, slot.minute);
                            }}
                            role="button"
                            tabIndex={isFocused ? 0 : -1}
                            aria-label={`Crear cita para ${format(date, 'EEEE d MMMM', { locale: es })} a las ${slot.hour
                                .toString()
                                .padStart(2, '0')}:${slot.minute.toString().padStart(2, '0')}${!isWorking ? ' (Fuera de horario)' : ''
                                }`}
                            onKeyDown={(e) =>
                                handleKeyDown(e, colIndex, slotIndex, date, slot.hour, slot.minute)
                            }
                        />
                    );
                })}
            </div>

            {/* Appointments Container */}
            <div
                className="absolute inset-0 pointer-events-none z-[var(--z-base)] [&>*]:pointer-events-auto"
                style={{ right: '1px' }}
                aria-live="polite"
            >
                {dayAppointments.map((appointment) => {
                    const { offsetIndex, totalOverlapping } = calculateAppointmentOffset(
                        appointment.id,
                        overlappingGroups
                    );

                    return (
                        <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                            slotHeightPx={slotHeightPx}
                            slotInterval={slotInterval}
                            offsetIndex={offsetIndex}
                            totalOverlapping={totalOverlapping}
                            onClick={onAppointmentClick}
                        />
                    );
                })}
            </div>
        </div>
    );
}
