import { Users } from 'lucide-react';

export default function PatientsPage() {
    return (
        <div className="p-8 h-full bg-[var(--color-background)]">
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-sm border border-[var(--color-border)] p-8 text-center max-w-2xl mx-auto mt-10">
                <div className="w-16 h-16 bg-[var(--color-surface-hover)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[var(--color-text-secondary)]" />
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Gestión de Pacientes</h2>
                <p className="text-[var(--color-text-secondary)]">
                    Esta funcionalidad estará disponible pronto. Aquí podrá ver el historial clínico,
                    datos de contacto y citas previas de todos sus pacientes.
                </p>
            </div>
        </div>
    );
}
