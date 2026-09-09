/**
 * Admin Grades Dummy Data
 */

export interface GradeRecord {
    id: string;
    studentId: string;
    studentName: string;
    class: string;
    subject: string;
    term: 'First' | 'Second' | 'Third';
    academicYear: string;
    score: number;
    grade: string;
    teacher: string;
}

export const dummyGradeRecords: GradeRecord[] = [
    {
        id: '1',
        studentId: 'STU001',
        studentName: 'John Doe',
        class: 'JSS1',
        subject: 'Mathematics',
        term: 'First',
        academicYear: '2024-2025',
        score: 85,
        grade: 'A',
        teacher: 'Mr. Okonkwo',
    },
    {
        id: '2',
        studentId: 'STU001',
        studentName: 'John Doe',
        class: 'JSS1',
        subject: 'English',
        term: 'First',
        academicYear: '2024-2025',
        score: 78,
        grade: 'B',
        teacher: 'Mrs. Adebayo',
    },
    {
        id: '3',
        studentId: 'STU002',
        studentName: 'Jane Smith',
        class: 'JSS1',
        subject: 'Mathematics',
        term: 'First',
        academicYear: '2024-2025',
        score: 92,
        grade: 'A',
        teacher: 'Mr. Okonkwo',
    },
    {
        id: '4',
        studentId: 'STU002',
        studentName: 'Jane Smith',
        class: 'JSS1',
        subject: 'English',
        term: 'First',
        academicYear: '2024-2025',
        score: 88,
        grade: 'A',
        teacher: 'Mrs. Adebayo',
    },
    {
        id: '5',
        studentId: 'STU003',
        studentName: 'Michael Johnson',
        class: 'JSS1',
        subject: 'Mathematics',
        term: 'First',
        academicYear: '2024-2025',
        score: 65,
        grade: 'C',
        teacher: 'Mr. Okonkwo',
    },
];

export const dummyGradeSummary = {
    totalRecords: 3741,
    averageScore: 76,
    gradeDistribution: {
        A: 42,
        B: 31,
        C: 18,
        D: 7,
        F: 2,
    },
};
