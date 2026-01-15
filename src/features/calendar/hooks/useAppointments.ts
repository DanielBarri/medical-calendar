import { useState, useCallback } from 'react';
import type { Appointment } from '../types/appointment';
import type { AppointmentFormData } from '../../../schemas/appointmentSchema';
import { addMinutes } from 'date-fns';

interface UseAppointmentsProps {
    initialAppointments?: Appointment[];
}

export function useAppointments({ initialAppointments = [] }: UseAppointmentsProps = {}) {
    const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

    /**
     * Add a new appointment
     */
    const addAppointment = useCallback((data: AppointmentFormData) => {
        const endTime = addMinutes(data.startTime, data.duration);

        const newAppointment: Appointment = {
            id: `apt-${crypto.randomUUID()}`,
            patientName: data.patientName,
            patientPhone: data.patientPhone,
            patientEmail: data.patientEmail,
            startTime: data.startTime,
            endTime,
            duration: data.duration,
            type: data.type,
            status: 'booked',
            isNewPatient: data.isNewPatient,
            notes: data.notes,
        };

        setAppointments((prev) => [...prev, newAppointment]);
        return newAppointment;
    }, []);

    /**
     * Update an existing appointment
     */
    const updateAppointment = useCallback((id: string, data: Partial<Appointment>) => {
        setAppointments((prev) =>
            prev.map((apt) => (apt.id === id ? { ...apt, ...data } : apt))
        );
    }, []);

    /**
     * Update an existing appointment from form data
     */
    const updateAppointmentFromForm = useCallback((id: string, data: AppointmentFormData) => {
        setAppointments((prev) =>
            prev.map((apt) =>
                apt.id === id
                    ? {
                        ...apt,
                        ...data,
                        endTime: addMinutes(data.startTime, data.duration),
                    }
                    : apt
            )
        );
    }, []);

    /**
     * Delete an appointment
     */
    const deleteAppointment = useCallback((id: string) => {
        setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    }, []);

    return {
        appointments,
        setAppointments,
        addAppointment,
        updateAppointment,
        updateAppointmentFromForm,
        deleteAppointment,
    };
}
