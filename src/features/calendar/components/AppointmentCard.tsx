/**
 * AppointmentCard Component
 *
 * Visual card representation of an appointment in the calendar grid.
 * Positioned absolutely within the grid column based on start time and duration.
 *
 * Features:
 * - Height reflects appointment duration
 * - Background color based on appointment status
 * - Left border colored by appointment type
 * - Displays patient name, time range, and type
 * - Handles overlapping appointments with horizontal offset
 * - Hover effects and click handling
 * - Responsive design with truncated text
 *
 * @component
 */

import { useMemo, memo } from 'react';
import type { Appointment } from '../types/appointment';
import {
  calculateAppointmentTop,
  calculateAppointmentHeight,
  formatTimeRange,
  getStatusColor,
  getTypeColor,
  getAppointmentTypeLabel,
} from '../utils/appointmentHelpers';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

/**
 * Props for the AppointmentCard component
 */
export interface AppointmentCardProps {
  /**
   * The appointment data to display
   */
  appointment: Appointment;

  /**
   * Height of each time slot in pixels
   * Should match the --slot-height CSS variable value
   * @default 30
   */
  slotHeightPx?: number;

  /**
   * Time interval per slot in minutes
   * @default 30
   */
  slotInterval?: 15 | 30 | 60;

  /**
   * Offset index for handling overlapping appointments
   * 0 = leftmost position, 1 = second position, etc.
   * @default 0
   */
  offsetIndex?: number;

  /**
   * Total number of overlapping appointments in this time slot
   * Used to calculate width reduction
   * @default 1
   */
  totalOverlapping?: number;

  /**
   * Click handler for appointment interaction
   */
  onClick?: (appointment: Appointment) => void;
}

/**
 * AppointmentCard component
 * Renders a single appointment as a positioned card in the calendar grid
 *
 * Wrapped with React.memo for performance optimization to prevent
 * unnecessary re-renders when parent components update but props haven't changed
 */
const AppointmentCard = memo(function AppointmentCard({
  appointment,
  slotHeightPx = 30,
  slotInterval = 30,
  offsetIndex = 0,
  totalOverlapping = 1,
  onClick,
}: AppointmentCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: appointment.id,
    data: { appointment, type: 'appointment' },
  });

  const {
    attributes: resizeAttributes,
    listeners: resizeListeners,
    setNodeRef: setResizeRef,
    transform: resizeTransform,
    isDragging: isResizing,
  } = useDraggable({
    id: `resize-${appointment.id}`,
    data: { appointment, type: 'resize' },
  });

  const draggingStyle = transform ? {
    transform: CSS.Translate.toString(transform),
    opacity: 0.8,
    zIndex: 1000,
  } : undefined;

  /**
   * Memoized position calculations for performance
   */
  const { top, height, left, width } = useMemo(() => {
    const top = calculateAppointmentTop(appointment.startTime, slotHeightPx, slotInterval);
    const height = calculateAppointmentHeight(appointment.duration, slotHeightPx, slotInterval);

    // Calculate horizontal position for overlapping appointments
    const widthPercentage = totalOverlapping > 1 ? 100 / totalOverlapping : 100;
    const leftPercentage = totalOverlapping > 1 ? (offsetIndex * 100) / totalOverlapping : 0;

    return {
      top: `${top}px`,
      height: `${height}px`,
      left: `${leftPercentage}%`,
      width: `${widthPercentage}%`,
    };
  }, [appointment, slotHeightPx, slotInterval, offsetIndex, totalOverlapping]);

  // Calculate dynamic styles for resizing
  const resizeStyle = isResizing && resizeTransform ? {
    height: `calc(${height} + ${resizeTransform.y}px)`,
    zIndex: 1000, // Keep above other things while resizing
  } : {};

  /**
   * Memoized time range string
   */
  const timeRange = useMemo(
    () => formatTimeRange(appointment.startTime, appointment.endTime),
    [appointment.startTime, appointment.endTime]
  );

  // Update displayed time range during resize?
  // Ideally yes, but complex. Let's start with visual height.

  /**
   * Handle click event
   */
  const handleClick = () => {
    onClick?.(appointment);
  };

  /**
   * Handle keyboard interaction
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(appointment);
    }
  };

  // Calculate final width string for CSS variable
  const finalWidth = totalOverlapping > 1 ? `calc(${width} - var(--overlap-offset))` : width;

  return (
    <div
      className={`absolute px-[var(--spacing-sm)] py-[var(--spacing-xs)] rounded-[var(--radius-sm)] shadow-[var(--shadow-sm)] cursor-pointer transition-all duration-[var(--transition-fast)] hover:shadow-[var(--shadow-md)] hover:z-[calc(var(--z-base)+1)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:z-[calc(var(--z-base)+1)] overflow-hidden border-l-[var(--appointment-border-width)] border-solid max-md:px-[var(--spacing-xs)] max-md:py-[4px] ${isDragging ? 'z-[9999] shadow-xl ring-2 ring-[var(--color-primary)]' : ''} w-[var(--card-width)] hover:w-[calc(var(--card-width)-15px)] delay-500 hover:delay-0`}
      ref={setNodeRef}
      style={{
        ...draggingStyle,
        ...resizeStyle,
        top,
        height: resizeStyle.height || height, // Override height if resizing
        left,
        '--card-width': finalWidth,
        backgroundColor: getStatusColor(appointment.status, 'light'),
        borderLeftColor: getTypeColor(appointment.type, 'main'),
      } as any}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Cita con ${appointment.patientName}, ${timeRange}, ${getAppointmentTypeLabel(appointment.type)}`}
    >
      {/* Resize Handle */}
      {/* We stop propagation on pointer down so the card drag doesn't start if we catch the handle */}
      <div
        ref={setResizeRef}
        {...resizeListeners}
        {...resizeAttributes}
        className={`absolute bottom-0 left-0 right-0 h-3 cursor-ns-resize z-50 hover:bg-[var(--color-primary)] hover:opacity-50 transition-opacity ${isResizing ? 'bg-[var(--color-primary)] opacity-50' : 'opacity-0'}`}
        onPointerDown={(e) => {
          resizeListeners?.onPointerDown?.(e);
          e.stopPropagation();
        }}
        title="Arrastrar para cambiar duración"
      />

      {/* Patient Name */}
      <div
        className="text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] leading-[var(--line-height-tight)] mb-[2px] truncate max-lg:text-[var(--font-size-xs)] max-md:text-[11px]"
        style={{ color: getStatusColor(appointment.status, 'main') }}
        title={appointment.patientName}
      >
        {appointment.patientName}
      </div>

      {/* Time Range */}
      <div
        className="text-[var(--font-size-xs)] font-[var(--font-weight-medium)] text-[var(--color-text-secondary)] leading-[var(--line-height-tight)] mb-[2px] max-lg:text-[10px] max-md:text-[9px]"
        title={timeRange}
      >
        {timeRange}
      </div>

      {/* Appointment Type */}
      <div
        className="text-[var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-tight)] truncate max-lg:text-[10px] max-md:text-[9px]"
        style={{ color: getTypeColor(appointment.type, 'main') }}
        title={getAppointmentTypeLabel(appointment.type)}
      >
        {getAppointmentTypeLabel(appointment.type)}
      </div>

      {/* New Patient Badge (optional) */}
      {appointment.isNewPatient && (
        <div
          className="absolute top-[var(--spacing-xs)] right-[var(--spacing-xs)] bg-[var(--color-primary)] text-white text-[10px] font-[var(--font-weight-semibold)] px-[4px] py-[2px] rounded-[var(--radius-sm)] uppercase leading-none max-md:text-[8px] max-md:px-[3px] max-md:py-[1px]"
          aria-label="Nuevo paciente"
        >
          Nuevo
        </div>
      )}
    </div>
  );
});

export default AppointmentCard;
