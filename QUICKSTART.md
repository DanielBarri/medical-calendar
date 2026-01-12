# Medical Calendar - Quick Start Guide

## What Was Built

A complete Calendar component architecture for Sprint 1 with:
- ✅ **CalendarHeader** (US-002) - Fully functional with navigation, date picker, view selector
- ✅ **Calendar** - Parent component with state management
- 🚧 **CalendarTimeline** - Placeholder for US-004
- 🚧 **CalendarGrid** - Placeholder for US-005

## Run the Application

### Development Mode
```bash
npm run dev
```
Visit: http://localhost:5173

### Production Build
```bash
npm run build
npm run preview
```

### Run Linter
```bash
npm run lint
```

## Test the Calendar

### Features to Test (CalendarHeader)
1. **Previous/Next Navigation**: Click arrow buttons to navigate
2. **Date Picker**: Click calendar icon to select a specific date
3. **Today Button**: Click "Hoy" to return to current date
4. **Quick Jumps**: Click "+1 sem", "+2 sem", "+4 sem" to jump forward
5. **View Selector**: Switch between "Día", "3 Días", "Semana"

### Expected Behavior
- Date display updates when navigating
- "Today" button disables when already on today
- Active view is highlighted
- All navigation is smooth and responsive
- Works on mobile, tablet, and desktop

## Component Architecture

```
App
└── Calendar (State: selectedDate, view)
    ├── CalendarHeader (Navigation & Controls) ✅ DONE
    ├── CalendarTimeline (Time Slots) 🚧 Placeholder
    └── CalendarGrid (Appointment Columns) 🚧 Placeholder
```

## Key Files

### Components
- `/src/components/Calendar.tsx` - Parent component
- `/src/components/CalendarHeader.tsx` - Navigation (COMPLETE)
- `/src/components/CalendarTimeline.tsx` - Timeline (placeholder)
- `/src/components/CalendarGrid.tsx` - Grid (placeholder)

### Utilities
- `/src/utils/dateHelpers.ts` - Date manipulation functions
- `/src/types/calendar.ts` - TypeScript type definitions

### Styling
- `/src/index.css` - CSS theme variables (colors, spacing, etc.)
- Component-specific CSS files (e.g., `CalendarHeader.css`)

## CSS Theme Variables

All components use CSS variables from `/src/index.css`:

**Colors**:
- `--color-primary` - Primary brand color (#4F46E5)
- `--color-surface` - Component backgrounds
- `--color-border` - Borders and dividers
- `--color-text-primary` - Main text

**Spacing**:
- `--spacing-xs` to `--spacing-2xl` - Consistent spacing scale

**Layout**:
- `--header-height` - 64px
- `--time-column-width` - 80px
- `--slot-height` - 60px (default, medium zoom)

## Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

Test at different screen sizes to see responsive behavior.

## Next Steps (Sprint 1 Continuation)

1. Implement **CalendarTimeline** (US-004):
   - Configurable time slots (15, 30, 60 min)
   - Current time indicator (red line)
   - Auto-scroll to current time

2. Implement **CalendarGrid** (US-005):
   - Multi-column layout synchronized with timeline
   - Smooth horizontal scrolling
   - Click handlers for empty slots

3. Add **Zoom Control** (US-006):
   - Small/Medium/Large zoom levels
   - Adjust slot heights dynamically

## Documentation

- **CALENDAR_ARCHITECTURE.md** - Complete architecture documentation
- **SPRINT1_COMPLETION_SUMMARY.md** - Detailed completion summary
- **PRODUCT_BACKLOG.md** - Full project backlog and user stories

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run linter with auto-fix
npm run lint -- --fix
```

## Accessibility

All components are built with accessibility in mind:
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus management

Test with keyboard navigation (Tab, Enter, Arrow keys).

## Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Need Help?

1. Check **CALENDAR_ARCHITECTURE.md** for detailed component documentation
2. Review **SPRINT1_COMPLETION_SUMMARY.md** for what's been completed
3. See **PRODUCT_BACKLOG.md** for user stories and requirements
4. Check inline JSDoc comments in component files

---

**Last Updated**: January 11, 2026
**Sprint**: 1 (MVP - Core Calendar Functionality)
