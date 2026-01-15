/**
 * Calendar Component
 *
 * Main parent component for the medical calendar application.
 * Manages shared state and coordinates child components.
 *
 * Features:
 * - State management for selected date and calendar view
 * - Coordinates CalendarHeader, Timeline, and Grid components
 * - Responsive layout for all devices
 *
 * @component
 */

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarTimeline from './CalendarTimeline';
import CalendarGrid from './CalendarGrid';
import AppointmentModal from './AppointmentModal';
import { WorkingHoursProvider } from '../contexts/WorkingHoursContext';
import type { CalendarView } from '../types/calendar';
import type { Appointment } from '../types/appointment';
import type { AppointmentFormData } from '../../../schemas/appointmentSchema';
import { getToday } from '../../../utils/dateHelpers';
import { MIN_HOUR, MAX_HOUR } from '../../../constants/calendar';
import { DndContext } from '@dnd-kit/core';
import { useCalendarState } from '../hooks/useCalendarState';
import { useAppointments } from '../hooks/useAppointments';
import { useCalendarDrag } from '../hooks/useCalendarDrag';

/**
 * Generate mock appointments for testing
 * CURRENTLY DISABLED - Uncomment to use mock data during development
 */
/*
function generateMockAppointments(baseDate: Date): Appointment[] {
  const appointments: Appointment[] = [];

  // Day 1 - Today
  // 9:00 AM - 10:00 AM - First visit, booked
  appointments.push({
    id: 'apt-1',
    patientName: 'María García López',
    patientPhone: '+34 612 345 678',
    patientEmail: 'maria.garcia@example.com',
    startTime: addHours(new Date(baseDate.setHours(9, 0, 0, 0)), 0),
    endTime: addHours(new Date(baseDate.setHours(9, 0, 0, 0)), 1),
    duration: 60,
    type: 'first-visit',
    status: 'confirmed',
    notes: 'Primera consulta - dolor de espalda',
    isNewPatient: true,
  });

  // 9:30 AM - 10:00 AM - Overlapping appointment (confirmed)
  appointments.push({
    id: 'apt-2',
    patientName: 'Juan Martínez',
    startTime: addMinutes(new Date(baseDate.setHours(9, 0, 0, 0)), 30),
    endTime: addHours(new Date(baseDate.setHours(9, 0, 0, 0)), 1),
    duration: 30,
    type: 'follow-up',
    status: 'confirmed',
    isNewPatient: false,
  });

  // 10:30 AM - 11:30 AM - Procedure (arrived)
  appointments.push({
    id: 'apt-3',
    patientName: 'Ana Rodríguez',
    patientPhone: '+34 623 456 789',
    startTime: addMinutes(new Date(baseDate.setHours(10, 0, 0, 0)), 30),
    endTime: addMinutes(new Date(baseDate.setHours(11, 0, 0, 0)), 30),
    duration: 60,
    type: 'procedure',
    status: 'arrived',
    notes: 'Análisis de sangre',
    isNewPatient: false,
  });

  // 11:00 AM - 11:30 AM - Emergency (started) - Overlaps with previous
  appointments.push({
    id: 'apt-4',
    patientName: 'Carlos Fernández',
    patientPhone: '+34 634 567 890',
    startTime: addHours(new Date(baseDate.setHours(11, 0, 0, 0)), 0),
    endTime: addMinutes(new Date(baseDate.setHours(11, 0, 0, 0)), 30),
    duration: 30,
    type: 'emergency',
    status: 'started',
    notes: 'Urgencia - dolor agudo',
    isNewPatient: false,
  });

  // 1:00 PM - 2:00 PM - Follow-up (completed)
  appointments.push({
    id: 'apt-5',
    patientName: 'Laura Sánchez',
    startTime: addHours(new Date(baseDate.setHours(13, 0, 0, 0)), 0),
    endTime: addHours(new Date(baseDate.setHours(14, 0, 0, 0)), 0),
    duration: 60,
    type: 'follow-up',
    status: 'completed',
    isNewPatient: false,
  });

  // 3:00 PM - 3:30 PM - Follow-up (no-show)
  appointments.push({
    id: 'apt-6',
    patientName: 'Pedro Gómez',
    startTime: addHours(new Date(baseDate.setHours(15, 0, 0, 0)), 0),
    endTime: addMinutes(new Date(baseDate.setHours(15, 0, 0, 0)), 30),
    duration: 30,
    type: 'follow-up',
    status: 'no-show',
    notes: 'No se presentó',
    isNewPatient: false,
  });

  // 4:00 PM - 5:00 PM - First visit (booked)
  appointments.push({
    id: 'apt-7',
    patientName: 'Isabel Torres',
    patientPhone: '+34 645 678 901',
    startTime: addHours(new Date(baseDate.setHours(16, 0, 0, 0)), 0),
    endTime: addHours(new Date(baseDate.setHours(17, 0, 0, 0)), 0),
    duration: 60,
    type: 'first-visit',
    status: 'booked',
    isNewPatient: true,
  });

  // 5:00 PM - 5:30 PM - Procedure (cancelled)
  appointments.push({
    id: 'apt-8',
    patientName: 'Miguel Ruiz',
    startTime: addHours(new Date(baseDate.setHours(17, 0, 0, 0)), 0),
    endTime: addMinutes(new Date(baseDate.setHours(17, 0, 0, 0)), 30),
    duration: 30,
    type: 'procedure',
    status: 'cancelled',
    notes: 'Cancelada por el paciente',
    isNewPatient: false,
  });

  // Day 2 - Tomorrow
  const tomorrow = addDays(baseDate, 1);

  // 9:00 AM - 10:30 AM - First visit (confirmed)
  appointments.push({
    id: 'apt-9',
    patientName: 'Carmen Jiménez',
    patientPhone: '+34 656 789 012',
    startTime: new Date(tomorrow.setHours(9, 0, 0, 0)),
    endTime: addMinutes(new Date(tomorrow.setHours(9, 0, 0, 0)), 90),
    duration: 90,
    type: 'first-visit',
    status: 'confirmed',
    isNewPatient: true,
  });

  // 10:00 AM - 11:00 AM - Overlapping with previous (confirmed)
  appointments.push({
    id: 'apt-10',
    patientName: 'Roberto Díaz',
    startTime: new Date(tomorrow.setHours(10, 0, 0, 0)),
    endTime: new Date(tomorrow.setHours(11, 0, 0, 0)),
    duration: 60,
    type: 'follow-up',
    status: 'confirmed',
    isNewPatient: false,
  });

  // 2:00 PM - 3:00 PM - Procedure (booked)
  appointments.push({
    id: 'apt-11',
    patientName: 'Elena Moreno',
    patientPhone: '+34 667 890 123',
    startTime: new Date(tomorrow.setHours(14, 0, 0, 0)),
    endTime: new Date(tomorrow.setHours(15, 0, 0, 0)),
    duration: 60,
    type: 'procedure',
    status: 'booked',
    isNewPatient: false,
  });

  // Day 3 - Day after tomorrow
  const dayAfter = addDays(baseDate, 2);

  // 11:00 AM - 12:00 PM - Emergency (booked)
  appointments.push({
    id: 'apt-12',
    patientName: 'Francisco Castro',
    patientPhone: '+34 678 901 234',
    startTime: new Date(dayAfter.setHours(11, 0, 0, 0)),
    endTime: new Date(dayAfter.setHours(12, 0, 0, 0)),
    duration: 60,
    type: 'emergency',
    status: 'booked',
    notes: 'Revisión urgente',
    isNewPatient: false,
  });

  return appointments;
}
*/

/**
 * Props for the Calendar component
 */
export interface CalendarProps {
  /**
   * Initial date to display (defaults to today)
   */
  initialDate?: Date;

  /**
   * Initial view mode (defaults to 'week')
   */
  initialView?: CalendarView;

  /**
   * Callback fired when the selected date changes
   */
  onDateChange?: (date: Date) => void;

  /**
   * Callback fired when the view mode changes
   */
  onViewChange?: (view: CalendarView) => void;
}

/**
 * Main Calendar component
 */
export default function Calendar({
  initialDate = getToday(),
  initialView = 'week',
  onDateChange,
  onViewChange,
}: CalendarProps) {
  // State management for calendar view and date
  const {
    selectedDate,
    view,
    slotHeight,
    slotHeightPx,
    setSlotHeight,
    handleDateChange,
    handleViewChange,
  } = useCalendarState({
    initialDate,
    initialView,
    onDateChange,
    onViewChange,
  });

  // State management for appointments
  const {
    appointments,
    setAppointments, // Exposed for Drag&Drop
    addAppointment,
    updateAppointmentFromForm,
    deleteAppointment,
  } = useAppointments();



  /**
   * State for appointment modal (create/edit)
   */
  const [modalState, setModalState] = useState<{
    mode: 'create';
    date: Date;
  } | {
    mode: 'edit';
    appointment: Appointment;
  } | null>(null);

  // Refs for scroll synchronization
  const timelineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  /**
   * Synchronize scroll between timeline and grid
   * Uses useLayoutEffect to ensure DOM elements are ready
   */
  useLayoutEffect(() => {
    const gridElement = gridRef.current;
    const timelineElement = timelineRef.current;

    if (!gridElement || !timelineElement) return;

    const handleGridScroll = () => {
      if (timelineElement) {
        timelineElement.scrollTop = gridElement.scrollTop;
      }
    };

    gridElement.addEventListener('scroll', handleGridScroll);

    return () => {
      gridElement.removeEventListener('scroll', handleGridScroll);
    };
  }, []);

  /**
   * Auto-scroll to current time on mount
   * Centralized here to ensure both grid and timeline are synced
   */
  useEffect(() => {
    // Small delay to ensure layout is stable
    const timer = setTimeout(() => {
      if (gridRef.current && timelineRef.current) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // Calculate minutes from start of day (relative to MIN_HOUR)
        const minutesFromStart = (currentHour - MIN_HOUR) * 60 + currentMinute;

        if (minutesFromStart > 0) {
          const slotInterval = 30; // Hardcoded matching the props passed below
          const pixelsPerMinute = slotHeightPx / slotInterval;
          const scrollPosition = minutesFromStart * pixelsPerMinute;

          // Center in viewport
          const viewportHeight = gridRef.current.clientHeight;
          const centeredPosition = Math.max(0, scrollPosition - (viewportHeight / 2));

          // Scroll BOTH to ensure sync
          gridRef.current.scrollTop = centeredPosition;
          timelineRef.current.scrollTop = centeredPosition;
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Handle appointment click
   * TODO: Open appointment detail modal in future sprint
   */
  const handleAppointmentClick = (appointment: Appointment) => {
    setModalState({ mode: 'edit', appointment });
  };

  /**
   * Handle empty slot click to create new appointment
   *
   * TIMEZONE NOTE: Creates Date object in local timezone.
   * For backend integration, convert to UTC before sending to API.
   */
  const handleSlotClick = (date: Date, hour: number, minute: number) => {
    const slotDateTime = new Date(date);
    slotDateTime.setHours(hour, minute, 0, 0);
    // Atomically set state to open "create" modal
    setModalState({ mode: 'create', date: slotDateTime });
  };

  /**
   * Handle appointment save (create or update)
   */
  const handleSaveAppointment = (data: AppointmentFormData) => {
    if (modalState?.mode === 'edit') {
      updateAppointmentFromForm(modalState.appointment.id, data);
    } else {
      addAppointment(data);
    }
  };

  /**
   * Handle appointment deletion
   */
  const handleDeleteAppointment = () => {
    if (modalState?.mode === 'edit') {
      deleteAppointment(modalState.appointment.id);
    }
  };

  // Drag & Drop logic
  const { sensors, handleDragEnd } = useCalendarDrag({
    setAppointments,
    slotHeightPx,
  });

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <WorkingHoursProvider>
        <div
          className="flex flex-col h-screen w-full overflow-hidden bg-[var(--color-background)]"
          role="application"
          aria-label="Calendario médico"
        >
          {/* Calendar Header - Navigation and controls */}
          <CalendarHeader
            selectedDate={selectedDate}
            view={view}
            onDateChange={handleDateChange}
            onViewChange={handleViewChange}
            slotHeight={slotHeight}
            onSlotHeightChange={setSlotHeight}
          />

          {/* Main Calendar Content - Scroll synchronized container */}
          <div className="flex flex-1 overflow-hidden relative bg-[var(--color-background)]">
            {/* Timeline - Vertical time slots (left side, sticky) */}
            <CalendarTimeline
              slotInterval={30}
              scrollRef={timelineRef}
              startHour={MIN_HOUR}
              endHour={MAX_HOUR}
            />

            {/* Grid - Appointment columns (right side, scrollable) */}
            <CalendarGrid
              selectedDate={selectedDate}
              view={view}
              slotInterval={30}
              scrollRef={gridRef}
              appointments={appointments}
              onAppointmentClick={handleAppointmentClick}
              onSlotClick={handleSlotClick}
              startHour={MIN_HOUR}
              endHour={MAX_HOUR}
              slotHeightPx={slotHeightPx}
            />
          </div>

          {/* Appointment Modal (Create & Edit) */}
          <AppointmentModal
            isOpen={!!modalState}
            onClose={() => setModalState(null)}
            selectedDate={modalState?.mode === 'create' ? modalState.date : undefined}
            initialData={modalState?.mode === 'edit' ? modalState.appointment : undefined}
            onSubmit={async (data) => handleSaveAppointment(data)}
            onDelete={
              modalState?.mode === 'edit'
                ? async () => handleDeleteAppointment()
                : undefined
            }
          />
        </div>
      </WorkingHoursProvider>
    </DndContext>
  );
}
