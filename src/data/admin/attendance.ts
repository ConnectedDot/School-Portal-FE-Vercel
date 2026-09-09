/**
 * Admin Attendance Dummy Data
 */

export interface AttendanceRecord {
    id: string;
    studentId: string;
    studentName: string;
    class: string;
    date: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    markedBy: string;
}

export const dummyAttendanceRecords: AttendanceRecord[] = [
    {
        id: '1',
        studentId: 'STU001',
        studentName: 'John Doe',
        class: 'JSS1',
        date: '2025-01-15',
        status: 'present',
        markedBy: 'Mrs. Adeyemi',
    },
    {
        id: '2',
        studentId: 'STU002',
        studentName: 'Jane Smith',
        class: 'JSS1',
        date: '2025-01-15',
        status: 'present',
        markedBy: 'Mrs. Adeyemi',
    },
    {
        id: '3',
        studentId: 'STU003',
        studentName: 'Michael Johnson',
        class: 'JSS1',
        date: '2025-01-15',
        status: 'late',
        markedBy: 'Mrs. Adeyemi',
    },
    {
        id: '4',
        studentId: 'STU004',
        studentName: 'Emily Brown',
        class: 'JSS1',
        date: '2025-01-15',
        status: 'absent',
        markedBy: 'Mrs. Adeyemi',
    },
    {
        id: '5',
        studentId: 'STU005',
        studentName: 'David Wilson',
        class: 'JSS1',
        date: '2025-01-15',
        status: 'present',
        markedBy: 'Mrs. Adeyemi',
    },
];

export const dummyAttendanceSummary = {
    totalStudents: 1247,
    present: 1085,
    absent: 89,
    late: 73,
    excused: 0,
    rate: 87,
};
