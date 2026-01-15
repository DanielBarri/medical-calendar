import { Settings } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="p-8 h-full bg-[var(--color-background)]">
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-sm border border-[var(--color-border)] p-8 max-w-2xl mx-auto mt-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-[var(--color-surface-hover)] rounded-full">
                        <Settings className="w-6 h-6 text-[var(--color-text-primary)]" />
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Configuración</h1>
                </div>

                <div className="space-y-6">
                    <Section title="General">
                        <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)]">
                            <div>
                                <p className="font-medium text-[var(--color-text-primary)]">Tema Oscuro</p>
                                <p className="text-sm text-[var(--color-text-secondary)]">Usar tema oscuro en la aplicación</p>
                            </div>
                            <input type="checkbox" className="toggle" disabled />
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)]">
                            <div>
                                <p className="font-medium text-[var(--color-text-primary)]">Notificaciones</p>
                                <p className="text-sm text-[var(--color-text-secondary)]">Recibir alertas de citas</p>
                            </div>
                            <input type="checkbox" className="toggle" checked disabled />
                        </div>
                    </Section>

                    <Section title="Calendario">
                        <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)]">
                            <div>
                                <p className="font-medium text-[var(--color-text-primary)]">Duración por defecto</p>
                                <p className="text-sm text-[var(--color-text-secondary)]">Duración de nuevas citas</p>
                            </div>
                            <span className="text-sm font-medium text-[var(--color-text-secondary)]">30 min</span>
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">{title}</h3>
            <div className="bg-[var(--color-surface)]">
                {children}
            </div>
        </div>
    );
}
