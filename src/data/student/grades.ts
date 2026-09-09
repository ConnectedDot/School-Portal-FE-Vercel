/**
 * Student Grades Dummy Data
 */

export interface StudentGrade {
    id: string;
    subject: string;
    term: 'First' | 'Second' | 'Third';
    academicYear: string;
    score: number;
    grade: string;
    classAverage: number;
    teacher: string;
}

export const dummyStudentGrades: StudentGrade[] = [
    {
        id: '1',
        subject: 'Mathematics',
        term: 'First',
        academicYear: '2024-2025',
        score: 85,
        grade: 'A',
        classAverage: 78,
        teacher: 'Mr. Okonkwo',
    },
    {
        id: '2',
        subject: 'English',
        term: 'First',
        academicYear: '2024-2025',
        score: 78,
        grade: 'B',
        classAverage: 75,
        teacher: 'Mrs. Adebayo',
    },
    {
        id: '3',
        subject: 'Physics',
        term: 'First',
        academicYear: '2024-2025',
        score: 82,
        grade: 'A',
        classAverage: 72,
        teacher: 'Dr. Ibrahim',
    },
    {
        id: '4',
        subject: 'Chemistry',
        term: 'First',
        academicYear: '2024-2025',
        score: 75,
        grade: 'B',
        classAverage: 70,
        teacher: 'Mrs. Okafor',
    },
    {
        id: '5',
        subject: 'Biology',
        term: 'First',
        academicYear: '2024-2025',
        score: 88,
        grade: 'A',
        classAverage: 76,
        teacher: 'Mr. Eze',
    },
];

export const dummyGradeSummary = {
    averageScore: 81.6,
    averageGrade: 'A-',
    subjects: 9,
    highestScore: 92,
    lowestScore: 68,
};
