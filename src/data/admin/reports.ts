/**
 * Admin Reports Dummy Data
 */

export interface Report {
    id: string;
    name: string;
    category: 'enrollment' | 'attendance' | 'academic' | 'financial' | 'library';
    description: string;
    lastGenerated: string;
    generatedBy: string;
}

export const dummyReports: Report[] = [
    {
        id: '1',
        name: 'Monthly Enrollment Report',
        category: 'enrollment',
        description: 'Student enrollment statistics by class and gender',
        lastGenerated: '2025-01-15',
        generatedBy: 'Admin User',
    },
    {
        id: '2',
        name: 'Attendance Summary Report',
        category: 'attendance',
        description: 'Daily and monthly attendance rates by class',
        lastGenerated: '2025-01-15',
        generatedBy: 'Admin User',
    },
    {
        id: '3',
        name: 'Academic Performance Report',
        category: 'academic',
        description: 'Grade distribution and subject performance analysis',
        lastGenerated: '2025-01-10',
        generatedBy: 'Academic Director',
    },
    {
        id: '4',
        name: 'Fee Collection Report',
        category: 'financial',
        description: 'Outstanding balances and payment history',
        lastGenerated: '2025-01-08',
        generatedBy: 'Bursar',
    },
    {
        id: '5',
        name: 'Library Activity Report',
        category: 'library',
        description: 'Book borrowing and return statistics',
        lastGenerated: '2025-01-05',
        generatedBy: 'Librarian',
    },
];
