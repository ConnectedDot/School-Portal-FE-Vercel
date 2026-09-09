import type { User, Student, Course, Assignment, Grade, Attendance, Event, Announcement, Faculty } from '../types';
import { UserRole } from '../types';

// Mock Users with tokens
export const mockUsers: Record<string, { user: User; token: string; password: string }> = {
    'admin@school.com': {
        user: {
            id: 'usr_admin_001',
            email: 'admin@school.com',
            firstName: 'Sarah',
            lastName: 'Anderson',
            role: UserRole.ADMIN,
            avatar: 'https://i.pravatar.cc/150?img=1',
            phone: '+1-555-0101',
            createdAt: '2024-01-15T08:00:00Z',
            updatedAt: '2025-11-07T10:30:00Z',
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin.token',
        password: 'password',
    },
    'faculty@school.com': {
        user: {
            id: 'usr_faculty_001',
            email: 'faculty@school.com',
            firstName: 'Michael',
            lastName: 'Johnson',
            role: UserRole.FACULTY,
            avatar: 'https://i.pravatar.cc/150?img=12',
            phone: '+1-555-0102',
            createdAt: '2024-02-10T08:00:00Z',
            updatedAt: '2025-11-07T10:30:00Z',
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.faculty.token',
        password: 'password',
    },
    'student@school.com': {
        user: {
            id: 'usr_student_001',
            email: 'student@school.com',
            firstName: 'Emma',
            lastName: 'Wilson',
            role: UserRole.STUDENT,
            avatar: 'https://i.pravatar.cc/150?img=5',
            phone: '+1-555-0103',
            createdAt: '2024-09-01T08:00:00Z',
            updatedAt: '2025-11-07T10:30:00Z',
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.student.token',
        password: 'password',
    },
    'guardian@school.com': {
        user: {
            id: 'usr_guardian_001',
            email: 'guardian@school.com',
            firstName: 'David',
            lastName: 'Wilson',
            role: UserRole.GUARDIAN,
            avatar: 'https://i.pravatar.cc/150?img=8',
            phone: '+1-555-0104',
            createdAt: '2024-09-01T08:00:00Z',
            updatedAt: '2025-11-07T10:30:00Z',
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.guardian.token',
        password: 'password',
    },
};

// Mock Students
export const mockStudents: Student[] = [
    {
        id: 'std_001',
        email: 'emma.wilson@student.school.com',
        firstName: 'Emma',
        lastName: 'Wilson',
        role: UserRole.STUDENT,
        studentId: 'STD2024001',
        grade: '10',
        class: 'A',
        dateOfBirth: '2009-03-15',
        guardianId: 'usr_guardian_001',
        avatar: 'https://i.pravatar.cc/150?img=5',
        phone: '+1-555-0201',
        address: '123 Main St, Springfield',
        createdAt: '2024-09-01T08:00:00Z',
        updatedAt: '2025-11-07T10:30:00Z',
        gender: ''
    },
    {
        id: 'std_002',
        email: 'james.brown@student.school.com',
        firstName: 'James',
        lastName: 'Brown',
        role: UserRole.STUDENT,
        studentId: 'STD2024002',
        grade: '10',
        class: 'A',
        dateOfBirth: '2009-05-20',
        avatar: 'https://i.pravatar.cc/150?img=11',
        phone: '+1-555-0202',
        address: '456 Oak Ave, Springfield',
        createdAt: '2024-09-01T08:00:00Z',
        updatedAt: '2025-11-07T10:30:00Z',
        gender: ''
    },
    {
        id: 'std_003',
        email: 'sophia.davis@student.school.com',
        firstName: 'Sophia',
        lastName: 'Davis',
        role: UserRole.STUDENT,
        studentId: 'STD2024003',
        grade: '10',
        class: 'B',
        dateOfBirth: '2009-07-10',
        avatar: 'https://i.pravatar.cc/150?img=9',
        phone: '+1-555-0203',
        address: '789 Pine Rd, Springfield',
        createdAt: '2024-09-01T08:00:00Z',
        updatedAt: '2025-11-07T10:30:00Z',
        gender: ''
    },
];

// Mock Faculty
export const mockFaculty: Faculty[] = [
    {
        id: 'tch_001',
        email: 'michael.johnson@school.com',
        firstName: 'Michael',
        lastName: 'Johnson',
        role: UserRole.FACULTY,
        facultyId: 'TCH2024001',
        subjects: ['Mathematics', 'Physics'],
        classes: ['10-A', '11-B', '12-A'],
        department: 'Science',
        avatar: 'https://i.pravatar.cc/150?img=12',
        phone: '+1-555-0301',
        createdAt: '2024-02-10T08:00:00Z',
        updatedAt: '2025-11-07T10:30:00Z',
    },
    {
        id: 'tch_002',
        email: 'jennifer.smith@school.com',
        firstName: 'Jennifer',
        lastName: 'Smith',
        role: UserRole.FACULTY,
        facultyId: 'TCH2024002',
        subjects: ['English', 'Literature'],
        classes: ['10-A', '10-B'],
        department: 'Languages',
        avatar: 'https://i.pravatar.cc/150?img=10',
        phone: '+1-555-0302',
        createdAt: '2024-02-15T08:00:00Z',
        updatedAt: '2025-11-07T10:30:00Z',
    },
];

// Mock Courses
// export const mockCourses: Course[] = [
//     {
//         id: 'crs_001',
//         name: 'Advanced Mathematics',
//         code: 'MATH-301',
//         description: 'Advanced topics in calculus and algebra',
//         facultyId: 'tch_001',
//         credits: 4,
//         schedule: [
//             { day: 'Monday', startTime: '09:00', endTime: '10:30', room: 'Room 201' },
//             { day: 'Wednesday', startTime: '09:00', endTime: '10:30', room: 'Room 201' },
//         ],
//     },
//     {
//         id: 'crs_002',
//         name: 'English Literature',
//         code: 'ENG-201',
//         description: 'Study of classic and modern literature',
//         facultyId: 'tch_002',
//         credits: 3,
//         schedule: [
//             { day: 'Tuesday', startTime: '11:00', endTime: '12:30', room: 'Room 105' },
//             { day: 'Thursday', startTime: '11:00', endTime: '12:30', room: 'Room 105' },
//         ],
//     },
// ];

// Mock Assignments
export const mockAssignments: Assignment[] = [
    {
        id: 'asn_001',
        title: 'Calculus Problem Set 5',
        description: 'Complete problems 1-20 from chapter 5',
        courseId: 'crs_001',
        dueDate: '2025-11-15T23:59:59Z',
        totalPoints: 100,
        createdAt: '2025-11-01T08:00:00Z',
    },
    {
        id: 'asn_002',
        title: 'Shakespeare Essay',
        description: 'Write a 1000-word essay on Hamlet',
        courseId: 'crs_002',
        dueDate: '2025-11-20T23:59:59Z',
        totalPoints: 100,
        createdAt: '2025-11-03T08:00:00Z',
    },
];

// Mock Grades
export const mockGrades: Grade[] = [
    {
        id: 'grd_001',
        studentId: 'std_001',
        courseId: 'crs_001',
        term: 'Fall 2025',
        score: 92,
        grade: 'A',
        remarks: 'Excellent performance',
    },
    {
        id: 'grd_002',
        studentId: 'std_001',
        courseId: 'crs_002',
        term: 'Fall 2025',
        score: 88,
        grade: 'B+',
        remarks: 'Good work',
    },
];

// Mock Attendance
export const mockAttendance: Attendance[] = [
    {
        id: 'att_001',
        studentId: 'std_001',
        courseId: 'crs_001',
        date: '2025-11-07',
        status: 'present',
    },
    {
        id: 'att_002',
        studentId: 'std_002',
        courseId: 'crs_001',
        date: '2025-11-07',
        status: 'present',
    },
];

// Mock Events
export const mockEvents: Event[] = [
    {
        id: 'evt_001',
        title: 'Parent-Teacher Meeting',
        description: 'Quarterly parent-teacher conference',
        startDate: '2025-12-15T14:00:00Z',
        endDate: '2025-12-15T17:00:00Z',
        location: 'Main Hall',
        type: 'academic',
        participants: [UserRole.GUARDIAN, UserRole.FACULTY, UserRole.ADMIN],
    },
    {
        id: 'evt_002',
        title: 'Science Fair',
        description: 'Annual school science fair exhibition',
        startDate: '2025-12-18T10:00:00Z',
        endDate: '2025-12-18T16:00:00Z',
        location: 'Gymnasium',
        type: 'academic',
        participants: [UserRole.STUDENT, UserRole.FACULTY, UserRole.GUARDIAN],
    },
    {
        id: 'evt_003',
        title: 'Winter Break',
        description: 'School holiday break',
        startDate: '2025-12-22T00:00:00Z',
        endDate: '2026-01-05T23:59:59Z',
        type: 'holiday',
    },
];

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
    {
        id: 'ann_001',
        title: 'New Library Hours',
        content: 'The library will now be open until 8 PM on weekdays.',
        authorId: 'usr_admin_001',
        targetRoles: [UserRole.STUDENT, UserRole.FACULTY],
        priority: 'medium',
        createdAt: '2025-11-05T09:00:00Z',
    },
    {
        id: 'ann_002',
        title: 'Exam Schedule Released',
        content: 'The final exam schedule for Fall 2025 has been posted on the portal.',
        authorId: 'usr_admin_001',
        targetRoles: [UserRole.STUDENT, UserRole.FACULTY, UserRole.GUARDIAN],
        priority: 'high',
        createdAt: '2025-11-06T10:00:00Z',
    },
];

// Helper function to get user data by email
export const getUserByEmail = (email: string) => {
    return mockUsers[email.toLowerCase()] || null;
};

// Helper function to validate token
export const validateToken = (token: string): User | null => {
    const userEntry = Object.values(mockUsers).find(u => u.token === token);
    return userEntry ? userEntry.user : null;
};
