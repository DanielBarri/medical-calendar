/**
 * App Component
 *
 * Main application component for the Medical Calendar.
 * Renders the Calendar component with default configuration.
 */

import Calendar from './components/Calendar';
import './App.css';

function App() {
  /**
   * Handle date change events from the Calendar
   */
  const handleDateChange = (date: Date) => {
    console.log('Date changed:', date);
  };

  /**
   * Handle view change events from the Calendar
   */
  const handleViewChange = (view: 'day' | '3-day' | 'week') => {
    console.log('View changed:', view);
  };

  return (
    <div className="app">
      <Calendar
        onDateChange={handleDateChange}
        onViewChange={handleViewChange}
      />
    </div>
  );
}

export default App;
