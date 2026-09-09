/**
 * Student Attendance Dummy Data
 */

export interface StudentAttendanceRecord {
    id: string;
    date: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    subject?: string;
    markedBy: string;
}

export const dummyStudentAttendance: StudentAttendanceRecord[] = [
    {
        id: '1',
        date: '2025-01-15',
        status: 'present',
        subject: 'Mathematics',
        markedBy: 'Mr. Okonkwo',
    },
    {
        id: '2',
        date: '2025-01-15',
        status: 'present',
        subject: 'English',
        markedBy: 'Mrs. Adebayo',
    },
    {
        id: '3',
        date: '2025-01-14',
        status: 'present',
        subject: 'Physics',
        markedBy: 'Dr. Ibrahim',
    },
    {
        id: '4',
        date: '2025-01-14',
        status: 'late',
        subject: 'Chemistry',
        markedBy: 'Mrs. Okafor',
    },
    {
        id: '5',
        date: '2025-01-13',
        status: 'absent',
        subject: 'Biology',
        markedBy: 'Mr. Eze',
    },
];

export const dummyAttendanceSummary = {
    totalDays: 85,
    present: 78,
    absent: 3,
    late: 4,
    excused: 0,
    rate: 92,
};
