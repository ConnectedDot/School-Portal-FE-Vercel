/**
 * Admin Calendar Dummy Data
 */

export interface CalendarEvent {
    id: string;
    title: string;
    description: string;
    type: 'academic' | 'administrative' | 'extracurricular' | 'holiday' | 'exam';
    startDate: string;
    endDate: string;
    location?: string;
    organizer: string;
    targetAudience: 'all' | 'students' | 'teachers' | 'parents' | 'admins';
}

export const dummyCalendarEvents: CalendarEvent[] = [
    {
        id: '1',
        title: 'Mid-Term Examinations',
        description: 'Mid-term examinations for all classes',
        type: 'exam',
        startDate: '2025-02-15',
        endDate: '2025-02-22',
        location: 'Various Classrooms',
        organizer: 'Academic Director',
        targetAudience: 'students',
    },
    {
        id: '2',
        title: 'Staff Meeting',
        description: 'Monthly staff meeting to discuss academic progress and administrative matters',
        type: 'administrative',
        startDate: '2025-01-25',
        endDate: '2025-01-25',
        location: 'Conference Room',
        organizer: 'Principal',
        targetAudience: 'teachers',
    },
    {
        id: '3',
        title: 'Sports Day',
        description: 'Annual inter-house sports competition',
        type: 'extracurricular',
        startDate: '2025-03-15',
        endDate: '2025-03-15',
        location: 'School Sports Field',
        organizer: 'Sports Director',
        targetAudience: 'all',
    },
    {
        id: '4',
        title: 'Public Holiday',
        description: 'School closed for public holiday',
        type: 'holiday',
        startDate: '2025-01-26',
        endDate: '2025-01-26',
        organizer: 'Principal',
        targetAudience: 'all',
    },
];
