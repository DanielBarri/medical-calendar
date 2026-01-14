/**
 * QuickAppointmentModal Component
 *
 * A lightweight modal for quickly creating appointments by clicking empty calendar slots.
 * Pre-fills the date and time based on the clicked slot.
 *
 * Features:
 * - Patient name input
 * - Pre-filled date/time display
 * - Duration selector (15, 30, 60, 90 minutes)
 * - Appointment type selector
 * - Quick create action
 *
 * @component
 */

import { useState, useCallback, useActionState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { AppointmentType } from '../types/appointment';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

/**
 * Props for QuickAppointmentModal
 */
interface QuickAppointmentModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;

  /**
   * Callback to close the modal
   */
  onClose: () => void;

  /**
   * Pre-filled date and time from clicked slot
   */
  selectedDateTime: Date;

  /**
   * Callback fired when appointment is created
   */
  onCreate: (data: {
    patientName: string;
    startTime: Date;
    duration: number;
    type: AppointmentType;
    isNewPatient: boolean;
  }) => void;
}

/**
 * Form state for useActionState
 */
interface FormState {
  errors?: { patientName?: string };
  success?: boolean;
}

/**
 * QuickAppointmentModal component
 */
export default function QuickAppointmentModal({
  isOpen,
  onClose,
  selectedDateTime,
  onCreate,
}: QuickAppointmentModalProps) {
  // Form field state
  const [patientName, setPatientName] = useState('');
  const [duration, setDuration] = useState<number>(30);
  const [appointmentType, setAppointmentType] = useState<AppointmentType>('follow-up');
  const [isNewPatient, setIsNewPatient] = useState(false);

  /**
   * Form action handler using React 19 useActionState pattern
   * Validates and processes the form submission
   */
  const submitAction = useCallback(
    async (): Promise<FormState> => {
      // Validate patient name
      if (!patientName.trim()) {
        return {
          errors: { patientName: 'El nombre del paciente es requerido' },
          success: false,
        };
      }

      // Create appointment
      onCreate({
        patientName: patientName.trim(),
        startTime: selectedDateTime,
        duration,
        type: appointmentType,
        isNewPatient,
      });

      // Reset form
      setPatientName('');
      setDuration(30);
      setAppointmentType('follow-up');
      setIsNewPatient(false);

      // Close modal after successful creation
      onClose();

      return { success: true };
    },
    [patientName, selectedDateTime, duration, appointmentType, isNewPatient, onCreate, onClose]
  );

  /**
   * React 19 useActionState hook for form state management
   * Provides form state and pending status tracking
   */
  const [formState, formAction, isPending] = useActionState<FormState, void>(submitAction, {});

  /**
   * Reset form state when modal closes manually
   */
  const handleClose = useCallback(() => {
    setPatientName('');
    setDuration(30);
    setAppointmentType('follow-up');
    setIsNewPatient(false);
    onClose();
  }, [onClose]);

  /**
   * Handle form submission
   * Triggers the useActionState action which validates and creates appointment
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Trigger the form action - React 19 will handle async state updates
      formAction();
    },
    [formAction]
  );

  /**
   * Format display time
   */
  const displayDateTime = format(selectedDateTime, "EEEE, d 'de' MMMM 'a las' HH:mm", {
    locale: es,
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Cita Rápida</DialogTitle>
          <DialogDescription>
            Completa los datos básicos para crear una nueva cita.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Date and Time Display */}
          <div>
            <label className="text-sm font-medium text-[var(--color-text-primary)] block mb-2">
              Fecha y Hora
            </label>
            <div className="px-4 py-3 bg-[var(--color-primary-light)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] capitalize">
              {displayDateTime}
            </div>
          </div>

          {/* Patient Name Input */}
          <div>
            <label
              htmlFor="patient-name"
              className="text-sm font-medium text-[var(--color-text-primary)] block mb-2"
            >
              Nombre del Paciente <span className="text-[var(--color-error)]">*</span>
            </label>
            <input
              id="patient-name"
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Ej: Juan Pérez"
              className={`w-full px-4 py-2 rounded-[var(--radius-md)] border ${
                formState.errors?.patientName
                  ? 'border-[var(--color-error)]'
                  : 'border-[var(--color-border)]'
              } bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all`}
              autoFocus
              disabled={isPending}
            />
            {formState.errors?.patientName && (
              <p className="text-xs text-[var(--color-error)] mt-1">{formState.errors.patientName}</p>
            )}
          </div>

          {/* New Patient Checkbox */}
          <div className="flex items-center gap-2">
            <input
              id="new-patient"
              type="checkbox"
              checked={isNewPatient}
              onChange={(e) => setIsNewPatient(e.target.checked)}
              className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <label
              htmlFor="new-patient"
              className="text-sm text-[var(--color-text-primary)] cursor-pointer"
            >
              Paciente nuevo
            </label>
          </div>

          {/* Duration Selector */}
          <div>
            <label className="text-sm font-medium text-[var(--color-text-primary)] block mb-2">
              Duración
            </label>
            <Select
              value={duration.toString()}
              onValueChange={(value) => setDuration(parseInt(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutos</SelectItem>
                <SelectItem value="30">30 minutos</SelectItem>
                <SelectItem value="60">1 hora</SelectItem>
                <SelectItem value="90">1 hora 30 minutos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Appointment Type Selector */}
          <div>
            <label className="text-sm font-medium text-[var(--color-text-primary)] block mb-2">
              Tipo de Cita
            </label>
            <Select
              value={appointmentType}
              onValueChange={(value) => setAppointmentType(value as AppointmentType)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first-visit">Primera Visita</SelectItem>
                <SelectItem value="follow-up">Seguimiento</SelectItem>
                <SelectItem value="procedure">Procedimiento</SelectItem>
                <SelectItem value="emergency">Urgencia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-border)]">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creando...' : 'Crear Cita'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
