/**
 * Teacher Students Dummy Data
 */

export interface TeacherStudent {
    id: string;
    studentId: string;
    studentName: string;
    class: string;
    subject: string;
    attendanceRate: number;
    averageGrade: string;
    lastActivity: string;
}

export const dummyTeacherStudents: TeacherStudent[] = [
    {
        id: '1',
        studentId: 'STU001',
        studentName: 'John Doe',
        class: 'SS2 Science',
        subject: 'Physics',
        attendanceRate: 92,
        averageGrade: 'A',
        lastActivity: '2025-01-15',
    },
    {
        id: '2',
        studentId: 'STU002',
        studentName: 'Jane Smith',
        class: 'SS2 Science',
        subject: 'Physics',
        attendanceRate: 88,
        averageGrade: 'A',
        lastActivity: '2025-01-15',
    },
    {
        id: '3',
        studentId: 'STU003',
        studentName: 'Michael Johnson',
        class: 'SS2 Science',
        subject: 'Physics',
        attendanceRate: 75,
        averageGrade: 'B',
        lastActivity: '2025-01-14',
    },
    {
        id: '4',
        studentId: 'STU004',
        studentName: 'Emily Brown',
        class: 'SS2 Science',
        subject: 'Physics',
        attendanceRate: 95,
        averageGrade: 'A',
        lastActivity: '2025-01-15',
    },
    {
        id: '5',
        studentId: 'STU005',
        studentName: 'David Wilson',
        class: 'SS2 Science',
        subject: 'Physics',
        attendanceRate: 82,
        averageGrade: 'B',
        lastActivity: '2025-01-14',
    },
];
