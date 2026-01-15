import { useState, useEffect } from 'react';
import type { CalendarView } from '../types/calendar';
import { getToday } from '../../../utils/dateHelpers';

interface UseCalendarStateProps {
    initialDate?: Date;
    initialView?: CalendarView;
    onDateChange?: (date: Date) => void;
    onViewChange?: (view: CalendarView) => void;
}

export function useCalendarState({
    initialDate = getToday(),
    initialView = 'week',
    onDateChange,
    onViewChange,
}: UseCalendarStateProps = {}) {
    const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
    const [view, setView] = useState<CalendarView>(initialView);
    const [slotHeight, setSlotHeight] = useState<'small' | 'medium' | 'large'>('medium');

    // Calculate pixel height
    const slotHeightPx = slotHeight === 'small' ? 20 : slotHeight === 'medium' ? 30 : 40;

    /**
     * Update CSS variable when slot height changes
     */
    useEffect(() => {
        const heightMap = {
            small: '20px',
            medium: '30px',
            large: '40px',
        };
        document.documentElement.style.setProperty('--slot-height', heightMap[slotHeight]);
    }, [slotHeight]);

    /**
     * Handle date change
     */
    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        onDateChange?.(date);
    };

    /**
     * Handle view change
     */
    const handleViewChange = (newView: CalendarView) => {
        setView(newView);
        onViewChange?.(newView);
    };

    return {
        selectedDate,
        view,
        slotHeight,
        slotHeightPx,
        setSlotHeight,
        handleDateChange,
        handleViewChange,
    };
}
