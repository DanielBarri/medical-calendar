import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Activity, Clock } from 'lucide-react';

export default function DashboardPage() {
    const navigate = useNavigate();

    return (
        <div className="p-8 h-full bg-[var(--color-background)] overflow-y-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Hola, Dr. Barri</h1>
                <p className="text-[var(--color-text-secondary)]">Aquí tiene el resumen de su día.</p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={<Calendar className="text-blue-500" />}
                    label="Citas Hoy"
                    value="8"
                    subtext="2 pendientes"
                />
                <StatCard
                    icon={<Users className="text-green-500" />}
                    label="Pacientes Activos"
                    value="142"
                    subtext="+5 esta semana"
                />
                <StatCard
                    icon={<Clock className="text-orange-500" />}
                    label="Tiempo Promedio"
                    value="45m"
                    subtext="Por consulta"
                />
                <StatCard
                    icon={<Activity className="text-purple-500" />}
                    label="Eficiencia"
                    value="94%"
                    subtext="Semana actual"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="bg-[var(--color-surface)] p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">Acciones Rápidas</h2>
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/calendar')}
                            className="w-full flex items-center justify-between p-4 !bg-[var(--color-primary-light)] border border-transparent rounded-[var(--radius-md)] hover:brightness-95 group text-left shadow-sm transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <span className="font-medium block !text-[var(--color-primary)]">Ir al Calendario</span>
                                    <span className="text-xs !text-[var(--color-primary)]/80">Ver agenda completa</span>
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => navigate('/patients')}
                            className="w-full flex items-center justify-between p-4 !bg-[var(--color-primary-light)] border border-transparent rounded-[var(--radius-md)] hover:brightness-95 group text-left shadow-sm transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg">
                                    <Users className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <span className="font-medium block !text-[var(--color-primary)]">Registrar Paciente</span>
                                    <span className="text-xs !text-[var(--color-primary)]/80">Crear nueva ficha</span>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, subtext }: { icon: React.ReactNode; label: string; value: string; subtext: string }) {
    return (
        <div className="bg-[var(--color-surface)] p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-sm">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[var(--color-surface-hover)] rounded-full">
                    {icon}
                </div>
                <div>
                    <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>
                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">{value}</h3>
                </div>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] pl-2 border-l-2 border-[var(--color-primary)]">
                {subtext}
            </p>
        </div>
    );
}
