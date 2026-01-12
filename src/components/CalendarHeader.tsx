/**
 * CalendarHeader Component
 *
 * Main navigation header for the medical calendar.
 * Provides date navigation and view selection.
 *
 * Features:
 * - Previous/Next navigation buttons
 * - Date picker with calendar popover
 * - Display currently selected date
 * - "Today" button to quickly return to current date
 * - View selector dropdown (Day, 3 Days, Week)
 * - Responsive design for mobile, tablet, and desktop
 *
 * Performance optimized with React 19 hooks (useCallback, useMemo)
 *
 * @component
 */

import { useCallback, useMemo, useState, useEffect } from 'react';
import type { CalendarHeaderProps } from '../types/calendar';
import {
  formatHeaderDate,
  navigatePrevious,
  navigateNext,
  getToday,
  checkIsToday,
} from '../utils/dateHelpers';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { cn } from '@/lib/utils';

/**
 * Screen reader only utility class
 */
const srOnly = 'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]';

export default function CalendarHeader({
  selectedDate,
  view,
  onDateChange,
  onViewChange,
}: CalendarHeaderProps) {
  /**
   * State for controlling the calendar popover
   */
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  /**
   * State for controlling the config dialog
   */
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  /**
   * State for slot height selection
   */
  const [slotHeight, setSlotHeight] = useState<'small' | 'medium' | 'large'>('medium');

  /**
   * Update CSS variable when slot height changes
   */
  useEffect(() => {
    const heightMap = {
      small: 'var(--slot-height-small)',
      medium: 'var(--slot-height-medium)',
      large: 'var(--slot-height-large)',
    };
    document.documentElement.style.setProperty('--slot-height', heightMap[slotHeight]);
  }, [slotHeight]);

  /**
   * Memoized expensive computations
   */
  const isCurrentDateToday = useMemo(() => checkIsToday(selectedDate), [selectedDate]);

  const formattedDate = useMemo(() => formatHeaderDate(selectedDate), [selectedDate]);

  /**
   * Memoized event handlers to prevent unnecessary re-renders
   */
  const handlePrevious = useCallback(() => {
    const newDate = navigatePrevious(selectedDate, view);
    onDateChange(newDate);
  }, [selectedDate, view, onDateChange]);

  const handleNext = useCallback(() => {
    const newDate = navigateNext(selectedDate, view);
    onDateChange(newDate);
  }, [selectedDate, view, onDateChange]);

  const handleToday = useCallback(() => {
    onDateChange(getToday());
  }, [onDateChange]);

  const handleCalendarSelect = useCallback(
    (date: Date | undefined) => {
      if (date) {
        onDateChange(date);
        setIsCalendarOpen(false);
      }
    },
    [onDateChange]
  );

  // Memoized view change handler for Select component
  const handleViewChange = useCallback(
    (newView: string) => {
      onViewChange(newView as 'day' | '3-day' | 'week');
    },
    [onViewChange]
  );

  return (
    <header
      className="bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-md sticky top-0 z-[var(--z-sticky)] h-[var(--header-height)] flex items-center backdrop-blur-sm max-md:h-auto max-md:min-h-[var(--header-height)]"
      role="banner"
      aria-label="Calendar navigation"
    >
      <div className="flex items-center justify-between w-full px-[var(--spacing-xl)] gap-[var(--spacing-lg)] max-w-full max-lg:px-[var(--spacing-lg)] max-lg:gap-[var(--spacing-md)] max-md:flex-col max-md:items-stretch max-md:p-[var(--spacing-md)] max-md:gap-[var(--spacing-md)]">
        {/* Left Section: Navigation and Date Display */}
        <div className="flex items-center gap-[var(--spacing-md)] flex-1 min-w-0 max-md:grid max-md:grid-cols-[auto_1fr_auto] max-md:grid-rows-[auto_auto] max-md:gap-[var(--spacing-sm)] max-md:items-center">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-[var(--spacing-sm)] max-md:col-start-1 max-md:row-start-1 max-md:justify-start">
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="icon"
              aria-label="Período anterior"
              title="Anterior"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>

            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              aria-label="Período siguiente"
              title="Siguiente"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>

          {/* Date Display - Enhanced with better visual hierarchy */}
          <div className="flex items-center min-w-0 px-[var(--spacing-sm)] max-md:col-start-1 max-md:col-end-4 max-md:row-start-2 max-md:justify-center max-md:px-0">
            <h1 className="text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)] m-0 whitespace-nowrap overflow-hidden text-ellipsis leading-[var(--line-height-tight)] capitalize tracking-[-0.01em] max-lg:text-[var(--font-size-lg)] max-md:text-center max-[480px]:text-[var(--font-size-base)]">
              {formattedDate}
            </h1>
          </div>

          {/* Today Button */}
          <Button
            onClick={handleToday}
            variant={isCurrentDateToday ? "default" : "outline"}
            className={cn(
              "max-md:col-start-2 max-md:row-start-1 max-md:flex-1",
              isCurrentDateToday && "opacity-60 cursor-default"
            )}
            disabled={isCurrentDateToday}
            aria-label="Ir a hoy"
            title="Hoy"
          >
            Hoy
          </Button>

          {/* Date Picker with Calendar Popover */}
          <div className="max-md:col-start-3 max-md:row-start-1">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Seleccionar fecha"
                  title="Seleccionar fecha"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 2V4M14 2V4M3 8H17M5 4H15C16.1046 4 17 4.89543 17 6V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V6C3 4.89543 3.89543 4 5 4Z"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 overflow-hidden" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleCalendarSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Right Section: Config and View Selector */}
        <div className="flex items-center gap-[var(--spacing-md)] flex-shrink-0 max-md:w-full">
          {/* Config Button */}
          <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Configuración"
                title="Configuración"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.1667 10C16.1667 10.4583 16.125 10.9083 16.05 11.35L17.9167 12.7917C18.0667 12.9083 18.1083 13.125 18.0167 13.3L16.2333 16.3667C16.1417 16.5417 15.9333 16.6083 15.75 16.5417L13.55 15.6917C13.1167 16.0167 12.6417 16.2917 12.1333 16.5L11.8 18.8333C11.7667 19.025 11.6 19.1667 11.4 19.1667H7.83333C7.63333 19.1667 7.46667 19.025 7.43333 18.8333L7.1 16.5C6.59167 16.2917 6.11667 16.0167 5.68333 15.6917L3.48333 16.5417C3.3 16.6083 3.09167 16.5417 3 16.3667L1.21667 13.3C1.125 13.125 1.16667 12.9083 1.31667 12.7917L3.18333 11.35C3.10833 10.9083 3.06667 10.4583 3.06667 10C3.06667 9.54167 3.10833 9.09167 3.18333 8.65L1.31667 7.20833C1.16667 7.09167 1.125 6.875 1.21667 6.7L3 3.63333C3.09167 3.45833 3.3 3.39167 3.48333 3.45833L5.68333 4.30833C6.11667 3.98333 6.59167 3.70833 7.1 3.5L7.43333 1.16667C7.46667 0.975 7.63333 0.833333 7.83333 0.833333H11.4C11.6 0.833333 11.7667 0.975 11.8 1.16667L12.1333 3.5C12.6417 3.70833 13.1167 3.98333 13.55 4.30833L15.75 3.45833C15.9333 3.39167 16.1417 3.45833 16.2333 3.63333L18.0167 6.7C18.1083 6.875 18.0667 7.09167 17.9167 7.20833L16.05 8.65C16.125 9.09167 16.1667 9.54167 16.1667 10Z"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Configuración del Calendario</DialogTitle>
                <DialogDescription>
                  Ajusta la altura de las celdas del calendario para personalizar tu vista.
                </DialogDescription>
              </DialogHeader>
              <div className="py-6">
                <label className="text-sm font-medium text-[var(--color-text-primary)] mb-4 block">
                  Altura de las celdas
                </label>
                <Select value={slotHeight} onValueChange={(value: string) => setSlotHeight(value as 'small' | 'medium' | 'large')}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeña (20px)</SelectItem>
                    <SelectItem value="medium">Mediana (30px)</SelectItem>
                    <SelectItem value="large">Grande (40px)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-[var(--color-text-muted)] mt-2">
                  La altura se aplica a cada intervalo de tiempo en el calendario.
                </p>
              </div>
            </DialogContent>
          </Dialog>

          {/* View Selector Dropdown */}
          <Select value={view} onValueChange={handleViewChange}>
            <SelectTrigger className="w-[180px] max-md:w-full" aria-label="Selector de vista">
              <SelectValue placeholder="Seleccionar vista" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Vista de Día</SelectItem>
              <SelectItem value="3-day">Vista de 3 Días</SelectItem>
              <SelectItem value="week">Vista de Semana</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Screen Reader Only Content */}
      <div className={srOnly} role="status" aria-live="polite" aria-atomic="true">
        Fecha seleccionada: {formattedDate}. Vista: {view}.
      </div>
    </header>
  );
}
