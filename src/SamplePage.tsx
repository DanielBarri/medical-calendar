import "./App.css";

function SamplePage() {
    return (
        <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', padding: 'var(--spacing-xl)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <header style={{ marginBottom: 'var(--spacing-2xl)' }}>
                    <h1 style={{
                        fontSize: 'var(--font-size-2xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        🏥 Medical Calendar - Theme Showcase
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-base)' }}>
                        Comprehensive CSS variables for the medical calendar component
                    </p>
                </header>

                {/* Color Palette Section */}
                <section className="calendar-surface" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)', color: 'var(--color-text-primary)' }}>
                        Base Colors
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
                        <ColorSwatch color="var(--color-primary)" label="Primary" />
                        <ColorSwatch color="var(--color-secondary)" label="Secondary" />
                        <ColorSwatch color="var(--color-accent)" label="Accent" />
                    </div>
                </section>

                {/* Appointment Status Colors */}
                <section className="calendar-surface" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)', color: 'var(--color-text-primary)' }}>
                        Appointment Status Colors
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--spacing-md)' }}>
                        <StatusCard status="booked" label="Booked" />
                        <StatusCard status="confirmed" label="Confirmed" />
                        <StatusCard status="arrived" label="Arrived" />
                        <StatusCard status="started" label="Started" />
                        <StatusCard status="completed" label="Completed" />
                        <StatusCard status="no-show" label="No-show" />
                        <StatusCard status="cancelled" label="Cancelled" />
                    </div>
                </section>

                {/* Appointment Type Colors */}
                <section className="calendar-surface" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)', color: 'var(--color-text-primary)' }}>
                        Appointment Type Colors
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--spacing-md)' }}>
                        <TypeCard type="first-visit" label="First Visit" />
                        <TypeCard type="follow-up" label="Follow-up" />
                        <TypeCard type="procedure" label="Procedure" />
                        <TypeCard type="emergency" label="Emergency" />
                    </div>
                </section>

                {/* Typography Scale */}
                <section className="calendar-surface" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)', color: 'var(--color-text-primary)' }}>
                        Typography Scale
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        <p style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-text-primary)' }}>2XL - Heading Large</p>
                        <p style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-primary)' }}>XL - Heading Medium</p>
                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-primary)' }}>LG - Heading Small</p>
                        <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>Base - Body Text</p>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>SM - Secondary Text</p>
                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>XS - Caption Text</p>
                    </div>
                </section>

                {/* Buttons */}
                <section className="calendar-surface" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)', color: 'var(--color-text-primary)' }}>
                        Buttons
                    </h2>
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                        <button>Primary Button</button>
                        <button disabled>Disabled Button</button>
                        <button style={{
                            backgroundColor: 'var(--color-secondary)',
                        }}>
                            Secondary Button
                        </button>
                    </div>
                </section>

                {/* Shadows & Elevations */}
                <section className="calendar-surface" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)', color: 'var(--color-text-primary)' }}>
                        Shadows & Elevations
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--spacing-lg)' }}>
                        <ShadowBox shadow="var(--shadow-sm)" label="Small" />
                        <ShadowBox shadow="var(--shadow-md)" label="Medium" />
                        <ShadowBox shadow="var(--shadow-lg)" label="Large" />
                        <ShadowBox shadow="var(--shadow-xl)" label="Extra Large" />
                    </div>
                </section>

                {/* Semantic Colors */}
                <section className="calendar-surface" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)', color: 'var(--color-text-primary)' }}>
                        Semantic Colors
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
                        <SemanticCard type="success" message="Operation successful!" />
                        <SemanticCard type="warning" message="Warning: Check this!" />
                        <SemanticCard type="error" message="Error occurred!" />
                        <SemanticCard type="info" message="Information notice" />
                    </div>
                </section>

                {/* Spacing Scale */}
                <section className="calendar-surface" style={{ padding: 'var(--spacing-lg)' }}>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)', color: 'var(--color-text-primary)' }}>
                        Spacing Scale
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        <SpacingBar size="var(--spacing-xs)" label="XS - 4px" />
                        <SpacingBar size="var(--spacing-sm)" label="SM - 8px" />
                        <SpacingBar size="var(--spacing-md)" label="MD - 16px" />
                        <SpacingBar size="var(--spacing-lg)" label="LG - 24px" />
                        <SpacingBar size="var(--spacing-xl)" label="XL - 32px" />
                        <SpacingBar size="var(--spacing-2xl)" label="2XL - 48px" />
                    </div>
                </section>
            </div>
        </div>
    );
}

// Helper Components
function ColorSwatch({ color, label }: { color: string; label: string }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{
                backgroundColor: color,
                height: '80px',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--spacing-sm)',
                boxShadow: 'var(--shadow-sm)'
            }} />
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{label}</p>
        </div>
    );
}

function StatusCard({ status, label }: { status: string; label: string }) {
    return (
        <div style={{
            backgroundColor: `var(--status-${status}-light)`,
            borderLeft: `var(--appointment-border-width) solid var(--status-${status})`,
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center'
        }}>
            <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>
                {label}
            </p>
        </div>
    );
}

function TypeCard({ type, label }: { type: string; label: string }) {
    return (
        <div style={{
            backgroundColor: `var(--type-${type}-light)`,
            borderLeft: `var(--appointment-border-width) solid var(--type-${type})`,
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center'
        }}>
            <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>
                {label}
            </p>
        </div>
    );
}

function ShadowBox({ shadow, label }: { shadow: string; label: string }) {
    return (
        <div style={{
            backgroundColor: 'var(--color-surface)',
            padding: 'var(--spacing-lg)',
            borderRadius: 'var(--radius-md)',
            boxShadow: shadow,
            textAlign: 'center'
        }}>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{label}</p>
        </div>
    );
}

function SemanticCard({ type, message }: { type: string; message: string }) {
    return (
        <div style={{
            backgroundColor: `var(--color-${type}-light)`,
            border: `2px solid var(--color-${type})`,
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--radius-md)'
        }}>
            <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>
                {message}
            </p>
        </div>
    );
}

function SpacingBar({ size, label }: { size: string; label: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <div style={{
                width: size,
                height: '20px',
                backgroundColor: 'var(--color-primary)',
                borderRadius: 'var(--radius-sm)'
            }} />
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{label}</span>
        </div>
    );
}

export default SamplePage;
