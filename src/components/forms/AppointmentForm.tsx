/**
 * Appointment Form Component
 *
 * A reusable form for creating and editing appointments.
 * Uses react-hook-form for state management and validation.
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { appointmentSchema, type AppointmentFormData } from '../../schemas/appointmentSchema';

interface AppointmentFormProps {
    /**
     * Default values for the form (optional, for edit mode)
     */
    defaultValues?: Partial<AppointmentFormData>;

    /**
     * Date selected from the grid (for create mode)
     */
    selectedDate?: Date;

    /**
     * Callback fired on successful submission
     */
    onSubmit: (data: AppointmentFormData) => Promise<void>;

    /**
     * Callback fired on cancellation
     */
    onCancel: () => void;

    /**
   * Callback fired on delete (optional, only for edit mode)
   */
    onDelete?: () => Promise<void>;

    /**
     * Whether the form is currently submitting
     */
    isSubmitting?: boolean;
}

export default function AppointmentForm({
    defaultValues,
    selectedDate,
    onSubmit,
    onCancel,
    onDelete,
    isSubmitting = false,
}: AppointmentFormProps) {
    // Initialize form with validation schema
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<AppointmentFormData>({
        resolver: zodResolver(appointmentSchema) as any,
        defaultValues: {
            duration: 30,
            type: 'follow-up',
            isNewPatient: false,
            startTime: selectedDate || new Date(),
            ...defaultValues,
        },
    });

    const startTime = watch('startTime');
    const appointmentType = watch('type');
    const duration = watch('duration');

    // Format date for display (readonly for MVP simplicity, can be made editable later)
    const displayDate = startTime
        ? format(startTime, "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es })
        : '';

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Date Display (Read-only for now to simplify time-handling) */}
            <div>
                <label className="text-sm font-medium text-[var(--color-text-primary)] block mb-1">
                    Fecha y Hora
                </label>
                <div className="px-3 py-2 bg-[var(--color-surface-hover)] rounded-[var(--radius-md)] text-[var(--color-text-primary)] text-sm capitalize border border-[var(--color-border)]">
                    {displayDate}
                </div>
                <input type="hidden" {...register('startTime')} />
            </div>

            {/* Patient Name */}
            <div>
                <label htmlFor="patientName" className="text-sm font-medium text-[var(--color-text-primary)] block mb-1">
                    Nombre del Paciente <span className="text-[var(--color-error)]">*</span>
                </label>
                <input
                    id="patientName"
                    type="text"
                    className={`w-full px-3 py-2 rounded-[var(--radius-md)] border ${errors.patientName ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
                        } bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm`}
                    placeholder="Ej: Juan Pérez"
                    {...register('patientName')}
                />
                {errors.patientName && (
                    <p className="text-xs text-[var(--color-error)] mt-1">{errors.patientName.message}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                    <label htmlFor="patientPhone" className="text-sm font-medium text-[var(--color-text-primary)] block mb-1">
                        Teléfono
                    </label>
                    <input
                        id="patientPhone"
                        type="tel"
                        className={`w-full px-3 py-2 rounded-[var(--radius-md)] border ${errors.patientPhone ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
                            } bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm`}
                        placeholder="+34 600..."
                        {...register('patientPhone')}
                    />
                    {errors.patientPhone && (
                        <p className="text-xs text-[var(--color-error)] mt-1">{errors.patientPhone.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="patientEmail" className="text-sm font-medium text-[var(--color-text-primary)] block mb-1">
                        Email
                    </label>
                    <input
                        id="patientEmail"
                        type="email"
                        className={`w-full px-3 py-2 rounded-[var(--radius-md)] border ${errors.patientEmail ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
                            } bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm`}
                        placeholder="correo@ejemplo.com"
                        {...register('patientEmail')}
                    />
                    {errors.patientEmail && (
                        <p className="text-xs text-[var(--color-error)] mt-1">{errors.patientEmail.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Appointment Type */}
                <div>
                    <label className="text-sm font-medium text-[var(--color-text-primary)] block mb-1">
                        Tipo de Cita
                    </label>
                    <Select
                        value={appointmentType}
                        onValueChange={(val) => setValue('type', val as any)}
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

                {/* Duration */}
                <div>
                    <label className="text-sm font-medium text-[var(--color-text-primary)] block mb-1">
                        Duración
                    </label>
                    <Select
                        value={duration.toString()}
                        onValueChange={(val) => setValue('duration', parseInt(val))}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[15, 30, 45, 60, 90, 120, 150, 180, 240]
                                .concat(duration && ![15, 30, 45, 60, 90, 120, 150, 180, 240].includes(duration) ? [duration] : [])
                                .sort((a, b) => a - b)
                                .map((mins) => (
                                    <SelectItem key={mins} value={mins.toString()}>
                                        {mins < 60 ? `${mins} min` : `${mins / 60} ${mins === 60 ? 'hora' : 'horas'} ${mins % 60 > 0 ? ` ${mins % 60} min` : ''}`}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Notes */}
            <div>
                <label htmlFor="notes" className="text-sm font-medium text-[var(--color-text-primary)] block mb-1">
                    Notas / Motivo
                </label>
                <textarea
                    id="notes"
                    className="w-full px-3 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm min-h-[80px]"
                    placeholder="Añadir notas..."
                    {...register('notes')}
                />
                {errors.notes && (
                    <p className="text-xs text-[var(--color-error)] mt-1">{errors.notes.message}</p>
                )}
            </div>

            {/* New Patient Checkbox */}
            <div className="flex items-center gap-2">
                <input
                    id="isNewPatient"
                    type="checkbox"
                    className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
                    {...register('isNewPatient')}
                />
                <label htmlFor="isNewPatient" className="text-sm text-[var(--color-text-primary)] cursor-pointer">
                    Es paciente nuevo
                </label>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4 border-t border-[var(--color-border)]">
                {onDelete ? (
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={async () => {
                            if (confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
                                await onDelete();
                            }
                        }}
                        disabled={isSubmitting}
                    >
                        Eliminar
                    </Button>
                ) : (
                    <div></div>
                )}
                <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Guardando...' : 'Guardar Cita'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
