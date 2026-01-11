import { useState } from "react";
import "./App.css";
import SamplePage from "./SamplePage";

function App() {
    const [showSample, setShowSample] = useState(false);

    if (showSample) {
        return <SamplePage />;
    }

    return (
        <div className="calendar-container" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-lg)'
        }}>
            <h1 style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-primary)'
            }}>
                Hello World!!
            </h1>
            <button onClick={() => setShowSample(true)}>
                View Sample Page
            </button>
        </div>
    );
}

export default App;
