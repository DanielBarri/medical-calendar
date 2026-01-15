/**
 * Appointment Modal Component
 *
 * A unified modal for creating and editing appointments.
 * Wraps the AppointmentForm in a Dialog.
 */

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import AppointmentForm from '../../../components/forms/AppointmentForm';
import type { AppointmentFormData } from '../../../schemas/appointmentSchema';

interface AppointmentModalProps {
    /**
     * Whether the modal is open
     */
    isOpen: boolean;

    /**
     * Callback to close the modal
     */
    onClose: () => void;

    /**
     * Date selected for new appointment (Create Mode)
     */
    selectedDate?: Date;

    /**
     * Existing appointment data (Edit Mode)
     * If provided, the modal operates in Edit Mode.
     */
    initialData?: Partial<AppointmentFormData>;

    /**
     * Callback fired when submitting the form
     */
    onSubmit: (data: AppointmentFormData) => Promise<void>;

    /**
     * Callback fired when deleting the appointment (Edit Mode)
     */
    onDelete?: () => Promise<void>;
}

export default function AppointmentModal({
    isOpen,
    onClose,
    selectedDate,
    initialData,
    onSubmit,
    onDelete,
}: AppointmentModalProps) {
    const isEditMode = !!initialData;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? 'Editar Cita' : 'Nueva Cita'}</DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? 'Modifica los detalles de la cita existente.'
                            : 'Completa el formulario para reservar una nueva cita.'}
                    </DialogDescription>
                </DialogHeader>

                <AppointmentForm
                    selectedDate={selectedDate}
                    defaultValues={initialData}
                    onSubmit={async (data) => {
                        await onSubmit(data);
                        onClose();
                    }}
                    onCancel={onClose}
                    onDelete={
                        onDelete
                            ? async () => {
                                await onDelete();
                                onClose();
                            }
                            : undefined
                    }
                />
            </DialogContent>
        </Dialog>
    );
}
