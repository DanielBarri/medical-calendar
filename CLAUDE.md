# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Medical Calendar Component - A professional calendar component for medical offices, inspired by Fresha. This is a React 19 application built with TypeScript, Tailwind CSS, and date-fns for date handling.

**Current Status**: Early development, Sprint 1 (MVP - Core Calendar Functionality)
**Methodology**: Scrum with 1-week sprints
**Project Start**: January 10, 2026

## Development Commands

### Core Commands
```bash
# Start development server
npm run dev

# Build for production (runs TypeScript compiler then Vite build)
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### TypeScript
The project uses TypeScript with strict mode enabled. TypeScript config is split:
- `tsconfig.json` - Root configuration with project references
- `tsconfig.app.json` - Application code configuration (src/)
- `tsconfig.node.json` - Node/build tool configuration

## Tech Stack

- **React 19** - Uses new hooks (useActionState, useOptimistic)
- **TypeScript** - Strict mode enabled, bundler module resolution
- **Tailwind CSS 4.x** - Utility-first styling via Vite plugin
- **date-fns** - Date manipulation and formatting
- **Vite 7** - Build tool and dev server with SWC for fast compilation
- **ESLint** - Flat config format with TypeScript and React plugins

## Project Structure

The project follows a standard React application structure:
- `src/` - Application source code
  - `main.tsx` - Application entry point
  - `App.tsx` - Root component
  - `index.css` - Global styles
- `dist/` - Build output (ignored by git)
- `node_modules/` - Dependencies

**Note**: The project is in early stages. As development progresses, expect to see:
- `src/components/` - Reusable components (CalendarHeader, AppointmentCard, etc.)
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions (especially date helpers)
- `src/types/` - TypeScript type definitions

## Architecture & Design Decisions

### State Management
- Initially using local state (React 19 hooks)
- Future integration with API planned
- Uses React 19's `useActionState` for form handling
- Uses React 19's `useOptimistic` for optimistic updates (e.g., drag & drop)

### Date Handling
- **Library**: date-fns (chosen over moment.js for smaller bundle size)
- Default time range: 6am - 10pm
- Configurable time slots: 15, 30, or 60 minutes
- Supports Day/3-Day/Week views

### Styling Approach
- Tailwind CSS with utility-first methodology
- CSS variables for theming (light/dark mode planned)
- Responsive design: mobile-first approach
- Breakpoints: <768px (mobile), tablet, desktop

### Performance Considerations
- React.memo for expensive components
- Virtualization may be needed for lists with many appointments
- Lazy loading for modals
- Target: <100ms render time, 60fps scrolling

## Key Features to Implement

Per PRODUCT_BACKLOG.md, the calendar will support:

1. **Core Calendar** (Sprint 1):
   - Timeline vertical with time slots
   - Multi-column grid (Day/3-Day/Week views)
   - Navigation and date picker
   - Zoom controls

2. **Appointment Management** (Sprint 2):
   - CRUD operations for appointments
   - Drag & drop rescheduling
   - Visual appointment cards with color coding
   - Overlapping appointment handling

3. **Advanced Features** (Sprints 3-7):
   - Appointment states (Booked, Confirmed, Arrived, etc.)
   - Filters by status, type, channel
   - Time blocks and recurring blocks
   - Working hours configuration
   - Waitlist management
   - Multi-doctor support
   - Reminders and notifications

4. **Polish** (Sprints 6-8):
   - Responsive design
   - Accessibility (A11y)
   - Dark mode
   - Keyboard shortcuts
   - Performance optimization

## Coding Standards

### React 19 Patterns
- Use new React 19 hooks where applicable:
  - `useActionState` for form submissions
  - `useOptimistic` for optimistic UI updates
- Functional components only
- StrictMode enabled

### TypeScript
- Strict mode required
- All props must be typed
- Use interfaces for component props
- Use type definitions for data models

### File Organization
- One component per file
- Component files use `.tsx` extension
- Utility files use `.ts` extension
- Co-locate related components when appropriate

## Important Context

### Definition of Done
For any user story to be considered complete:
- Code implemented and functional
- Responsive (mobile, tablet, desktop)
- Meets basic accessibility standards
- No console errors
- Components documented with TypeScript types
- Usage examples included

### Medical Context
This calendar is designed for medical offices, so:
- Patient privacy is critical (handle sensitive data carefully)
- Appointment states reflect medical workflow
- "No-show" tracking is important for medical practices
- First-time vs returning patients need differentiation
- Appointment notes should support medical context (reason for visit)

### Scrum Process
- Work is organized in 1-week sprints
- Refer to PRODUCT_BACKLOG.md for current sprint goals and user stories
- Story points use Fibonacci scale (1, 2, 3, 5, 8, 13, 21)
- Update PRODUCT_BACKLOG.md when completing tasks

## Testing Strategy

When implementing tests (Sprint 8):
- Unit tests: Jest/Vitest for utilities and hooks
- Integration tests: React Testing Library for component flows
- Target: 70% code coverage minimum
- Critical flows: create appointment, edit, delete, drag & drop

## Bundle Optimization

- Target: <200kb gzipped
- Code splitting for routes and modals
- Tree shaking enabled
- Lazy imports for heavy components
