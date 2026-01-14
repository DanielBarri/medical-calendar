/**
 * App Component
 *
 * Main application component for the Medical Calendar.
 * Renders the Calendar component with default configuration.
 */

import Calendar from './components/Calendar';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  /**
   * Handle date change events from the Calendar
   */
  const handleDateChange = () => {
    // Handle date change logic here
  };

  /**
   * Handle view change events from the Calendar
   */
  const handleViewChange = () => {
    // Handle view change logic here
  };

  return (
    <div className="app">
      <ErrorBoundary>
        <Calendar
          onDateChange={handleDateChange}
          onViewChange={handleViewChange}
        />
      </ErrorBoundary>
    </div>
  );
}

export default App;
