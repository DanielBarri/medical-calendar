/**
 * Appointment Form Schema
 *
 * Defines the validation rules for the appointment form using Zod.
 * Used by react-hook-form to validate user input.
 */

import { z } from 'zod';

export const appointmentSchema = z.object({
    patientName: z
        .string()
        .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
        .max(100, { message: 'El nombre es demasiado largo' }),

    patientPhone: z
        .string()
        .optional()
        .refine((val) => !val || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(val), {
            message: 'Ingrese un número de teléfono válido',
        }),

    patientEmail: z
        .string()
        .optional()
        .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
            message: 'Ingrese un correo electrónico válido',
        }),

    startTime: z.date(),

    duration: z.number().min(15, 'La duración mínima es 15 minutos'),

    type: z.enum(['first-visit', 'follow-up', 'procedure', 'emergency']),

    notes: z.string().max(500, 'Las notas no pueden exceder 500 caracteres').optional(),

    isNewPatient: z.boolean().default(false),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
