import { Outlet, NavLink } from 'react-router-dom';
import { Calendar, Users, Home, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? 'w-64' : 'w-16'
                    } bg-[var(--color-surface)] border-r border-[var(--color-border)] transition-all duration-300 flex flex-col z-20`}
            >
                <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'} p-4 border-b border-[var(--color-border)] h-16`}>
                    {sidebarOpen && <h1 className="font-bold text-lg text-[var(--color-primary)]">MedAid</h1>}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="!p-1 !rounded-md hover:!bg-[var(--color-surface-hover)] !text-[var(--color-text-secondary)] !bg-transparent border-none"
                    >
                        {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>
                </div>

                <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                    <NavItem to="/" icon={<Home size={20} />} label="Inicio" isOpen={sidebarOpen} />
                    <NavItem to="/calendar" icon={<Calendar size={20} />} label="Calendario" isOpen={sidebarOpen} />
                    <NavItem to="/patients" icon={<Users size={20} />} label="Pacientes" isOpen={sidebarOpen} />
                    <NavItem to="/settings" icon={<Settings size={20} />} label="Configuración" isOpen={sidebarOpen} />
                </nav>

                <div className="p-4 border-t border-[var(--color-border)]">
                    {sidebarOpen ? (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold">
                                DR
                            </div>
                            <div className="text-sm">
                                <p className="font-medium">Dr. Barri</p>
                                <p className="text-[var(--color-text-secondary)] text-xs">Admin</p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold mx-auto">
                            DR
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden relative">
                <Outlet />
            </main>
        </div>
    );
}

function NavItem({ to, icon, label, isOpen }: { to: string; icon: React.ReactNode; label: string; isOpen: boolean }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] transition-colors ${isActive
                    ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-medium'
                    : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`
            }
        >
            <div className="shrink-0">{icon}</div>
            {isOpen && <span className="whitespace-nowrap overflow-hidden transition-opacity duration-300">{label}</span>}
        </NavLink>
    );
}
