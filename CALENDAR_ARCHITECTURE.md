# Medical Calendar - Component Architecture

## Overview

This document describes the complete Calendar component architecture implemented for Sprint 1 of the Medical Calendar project. The architecture follows best practices for React 19 with TypeScript, using a parent-child component structure with proper state management.

## Component Hierarchy

```
App
└── Calendar (Parent - State Management)
    ├── CalendarHeader (Navigation & Controls)
    ├── CalendarTimeline (Time Slots - Left Side)
    └── CalendarGrid (Appointment Columns - Right Side)
```

## Component Details

### 1. App Component (`/src/App.tsx`)

**Purpose**: Main application container that renders the Calendar component.

**Key Features**:
- Renders the Calendar component
- Provides optional callbacks for date and view changes
- Simple, clean container for the entire application

**Props**: None (root component)

**Usage Example**:
```tsx
import Calendar from './components/Calendar';

function App() {
  const handleDateChange = (date: Date) => {
    console.log('Date changed:', date);
  };

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
```

---

### 2. Calendar Component (`/src/components/Calendar.tsx`)

**Purpose**: Main parent component that manages shared state and coordinates all child components.

**Responsibilities**:
- State management for selected date and calendar view
- Coordinate communication between child components
- Pass state down to CalendarHeader, CalendarTimeline, and CalendarGrid
- Handle callbacks from child components

**Props**:
```typescript
interface CalendarProps {
  initialDate?: Date;           // Default: today
  initialView?: CalendarView;   // Default: 'day'
  onDateChange?: (date: Date) => void;
  onViewChange?: (view: CalendarView) => void;
}
```

**State**:
- `selectedDate: Date` - Currently selected date
- `view: CalendarView` - Current view mode ('day' | '3-day' | 'week')

**Key Features**:
- Centralized state management
- Prop drilling to child components
- Callback handlers for state updates
- Accessible with ARIA labels

**Usage Example**:
```tsx
<Calendar
  initialDate={new Date()}
  initialView="day"
  onDateChange={(date) => console.log('New date:', date)}
  onViewChange={(view) => console.log('New view:', view)}
/>
```

---

### 3. CalendarHeader Component (`/src/components/CalendarHeader.tsx`)

**Purpose**: Navigation header providing date selection and view controls.

**Responsibilities**:
- Display current selected date
- Provide Previous/Next navigation buttons
- Date picker for direct date selection
- "Today" button to return to current date
- Quick jump buttons (+1 week, +2 weeks, +4 weeks)
- View selector (Day / 3 Days / Week)
- Fully responsive layout

**Props**:
```typescript
interface CalendarHeaderProps {
  selectedDate: Date;
  view: CalendarView;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
}
```

**Key Features** (US-002):
- ✅ Previous/Next navigation buttons
- ✅ Date picker selector
- ✅ Display currently selected date
- ✅ "Today" button (disabled when already on today)
- ✅ Quick jump buttons (+1 sem, +2 sem, +4 sem)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessibility (keyboard navigation, screen readers)
- ✅ Uses CSS theme variables exclusively

**Responsive Behavior**:
- **Desktop**: Horizontal layout with all controls visible
- **Tablet**: Compressed spacing, smaller buttons
- **Mobile**: Stacked layout with grid arrangement

---

### 4. CalendarTimeline Component (`/src/components/CalendarTimeline.tsx`)

**Purpose**: Vertical timeline displaying time slots (6am - 10pm).

**Status**: Placeholder for Sprint 1 - Full implementation in US-004

**Props**:
```typescript
interface CalendarTimelineProps {
  view: CalendarView;
  slotInterval?: 15 | 30 | 60;  // Default: 30
  startHour?: number;            // Default: 6
  endHour?: number;              // Default: 22
}
```

**Planned Features** (US-004 - Sprint 1):
- [ ] Timeline vertical with hours (6am - 10pm)
- [ ] Configurable time slots (15, 30, 60 minutes)
- [ ] Grid visual dividing each hour
- [ ] Red line indicating current time
- [ ] Real-time updates every minute
- [ ] Auto-scroll to current time on mount

**Current Implementation**:
- Basic time slot rendering
- Placeholder message indicating Sprint 1 development status
- Uses CSS theme variables for styling
- Responsive design prepared

---

### 5. CalendarGrid Component (`/src/components/CalendarGrid.tsx`)

**Purpose**: Multi-column grid displaying calendar days and appointments.

**Status**: Placeholder for Sprint 1 - Full implementation in US-005

**Props**:
```typescript
interface CalendarGridProps {
  selectedDate: Date;
  view: CalendarView;
  slotInterval?: 15 | 30 | 60;  // Default: 30
  startHour?: number;            // Default: 6
  endHour?: number;              // Default: 22
}
```

**Planned Features** (US-005 - Sprint 1):
- [ ] Column per each day in the view
- [ ] Column headers with day and date
- [ ] Grid synchronized with timeline
- [ ] Smooth horizontal scroll for multi-day views
- [ ] Responsive design (collapse to single column on mobile)

**Current Implementation**:
- Dynamic column generation based on view
- Column headers with formatted dates
- Time slot grid (synchronized height with timeline)
- Placeholder message indicating Sprint 1 development status
- Uses CSS theme variables for styling
- Responsive design prepared

**View Behavior**:
- **Day**: 1 column (selected date)
- **3-Day**: 3 columns (selected date + 2 days)
- **Week**: 7 columns (full week starting from Monday)

---

## State Management Flow

```
User Action (e.g., click "Next")
    ↓
CalendarHeader calls onDateChange(newDate)
    ↓
Calendar updates selectedDate state
    ↓
Calendar passes new selectedDate to all children
    ↓
CalendarHeader, CalendarTimeline, CalendarGrid re-render
```

## TypeScript Types

All types are defined in `/src/types/calendar.ts`:

```typescript
export type CalendarView = 'day' | '3-day' | 'week';

export interface CalendarHeaderProps {
  selectedDate: Date;
  view: CalendarView;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
}

export interface QuickJumpOption {
  label: string;
  weeks: number;
}
```

## Utility Functions

Date helpers are defined in `/src/utils/dateHelpers.ts`:

- `formatHeaderDate(date)` - Format date for header display
- `formatDateForInput(date)` - Format date for input (YYYY-MM-DD)
- `navigatePrevious(date, view)` - Get previous period date
- `navigateNext(date, view)` - Get next period date
- `jumpWeeksForward(date, weeks)` - Jump forward by weeks
- `getToday()` - Get today's date
- `checkIsToday(date)` - Check if date is today
- `checkIsSameDay(date1, date2)` - Check if two dates are same day

## Styling Architecture

All components use **CSS theme variables** defined in `/src/index.css`. No hardcoded colors or values.

### Key Theme Variables Used:

**Colors**:
- `--color-primary` - Primary brand color
- `--color-primary-hover` - Hover state
- `--color-surface` - Component backgrounds
- `--color-border` - Borders and dividers
- `--color-text-primary` - Main text
- `--color-text-secondary` - Secondary text

**Spacing**:
- `--spacing-xs` to `--spacing-2xl` - Consistent spacing scale
- `--header-height` - Header height (64px)
- `--time-column-width` - Timeline width (80px)

**Layout**:
- `--slot-height` - Time slot height (default: 60px)
- `--radius-md` - Border radius
- `--shadow-sm` to `--shadow-xl` - Elevation shadows

**Transitions**:
- `--transition-fast` - 150ms
- `--transition-normal` - 250ms

### Dark Mode Support

All components automatically support dark mode via:
- `[data-theme="dark"]` attribute styling
- `@media (prefers-color-scheme: dark)` fallback

## Responsive Breakpoints

Defined in CSS theme:
- **Desktop**: > 1280px
- **Tablet**: 1024px - 1280px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## Accessibility Features

All components follow WCAG 2.1 AA standards:

- ✅ Semantic HTML elements (`<header>`, `<main>`, `<aside>`)
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Screen reader announcements (`aria-live`)
- ✅ Focus management (`focus-visible`)
- ✅ Sufficient color contrast
- ✅ Screen reader only content (`.sr-only`)

## Sprint 1 Status

### Completed (US-002)
- ✅ CalendarHeader fully implemented with all features
- ✅ Navigation (Previous/Next)
- ✅ Date picker
- ✅ Today button
- ✅ Quick jumps (+1/2/4 weeks)
- ✅ View selector (Day/3-Day/Week)
- ✅ Responsive design
- ✅ Accessibility

### In Progress (US-004, US-005)
- 🚧 CalendarTimeline (placeholder created)
- 🚧 CalendarGrid (placeholder created)

### Architecture Complete
- ✅ Component hierarchy established
- ✅ State management pattern implemented
- ✅ Props interfaces defined
- ✅ Type safety enforced
- ✅ CSS theme variables used exclusively
- ✅ Responsive design prepared
- ✅ Accessibility foundation established

## Testing the Architecture

### Development Server
```bash
npm run dev
```
Visit: http://localhost:5173

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Next Steps (Future Sprints)

### Sprint 1 Remaining
1. Complete CalendarTimeline implementation (US-004)
2. Complete CalendarGrid implementation (US-005)
3. Implement Zoom control (US-006)

### Sprint 2
4. Add appointment visualization (US-007)
5. Implement appointment CRUD (US-008, US-009, US-010)
6. Add drag & drop functionality (US-011)

## File Structure

```
src/
├── components/
│   ├── Calendar.tsx              # Parent component (state management)
│   ├── Calendar.css              # Calendar styles
│   ├── CalendarHeader.tsx        # Navigation header
│   ├── CalendarHeader.css        # Header styles
│   ├── CalendarTimeline.tsx      # Time slots (placeholder)
│   ├── CalendarTimeline.css      # Timeline styles
│   ├── CalendarGrid.tsx          # Appointment grid (placeholder)
│   └── CalendarGrid.css          # Grid styles
├── types/
│   └── calendar.ts               # TypeScript type definitions
├── utils/
│   └── dateHelpers.ts            # Date utility functions
├── App.tsx                       # Root component
├── App.css                       # App styles
└── index.css                     # Global theme variables
```

## Component Communication Pattern

```
┌─────────────────────────────────────────────────────────┐
│                        Calendar                          │
│  State: selectedDate, view                              │
│  Methods: handleDateChange, handleViewChange            │
└───────────────┬─────────────────────────────────────────┘
                │
    ┌───────────┼───────────────────────────┐
    │           │                           │
    ▼           ▼                           ▼
┌─────────┐ ┌─────────────┐  ┌──────────────────┐
│ Header  │ │  Timeline   │  │      Grid        │
│         │ │             │  │                  │
│ Props:  │ │  Props:     │  │   Props:         │
│ - date  │ │  - view     │  │   - date         │
│ - view  │ │  - slot     │  │   - view         │
│ - onXX  │ │            │  │   - slot         │
└─────────┘ └─────────────┘  └──────────────────┘
     │
     │ Callbacks
     ▼
(onDateChange)
(onViewChange)
```

## Definition of Done - Sprint 1 Components

For each component to be considered "Done":

- ✅ Code implemented and functional
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Meets basic accessibility standards
- ✅ No console errors
- ✅ Components documented with TypeScript types
- ✅ Uses CSS theme variables exclusively
- ✅ Professional design inspired by Fresha

**Status**: CalendarHeader is **DONE**. CalendarTimeline and CalendarGrid are placeholders awaiting US-004 and US-005 implementation.

---

**Last Updated**: January 11, 2026
**Sprint**: 1 (MVP - Core Calendar Functionality)
**Architecture Version**: 1.0
