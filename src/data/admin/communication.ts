/**
 * Admin Communication Dummy Data
 */

export interface Announcement {
    id: string;
    title: string;
    content: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    targetAudience: 'all' | 'students' | 'teachers' | 'parents' | 'admins';
    createdBy: string;
    createdAt: string;
    expiresAt?: string;
}

export const dummyAnnouncements: Announcement[] = [
    {
        id: '1',
        title: 'Mid-Term Examination Schedule',
        content: 'Mid-term examinations will commence on February 15th. Students are advised to prepare adequately.',
        priority: 'high',
        targetAudience: 'all',
        createdBy: 'Academic Director',
        createdAt: '2025-01-15T08:00:00Z',
        expiresAt: '2025-02-20T23:59:59Z',
    },
    {
        id: '2',
        title: 'Parent-Teacher Meeting',
        content: 'Parent-teacher meeting scheduled for January 25th at 10:00 AM in the school auditorium.',
        priority: 'medium',
        targetAudience: 'parents',
        createdBy: 'Principal',
        createdAt: '2025-01-14T10:00:00Z',
        expiresAt: '2025-01-26T23:59:59Z',
    },
    {
        id: '3',
        title: 'School Closure for Public Holiday',
        content: 'School will be closed on January 26th for the public holiday. Classes resume on January 27th.',
        priority: 'high',
        targetAudience: 'all',
        createdBy: 'Principal',
        createdAt: '2025-01-13T14:00:00Z',
        expiresAt: '2025-01-27T23:59:59Z',
    },
];
