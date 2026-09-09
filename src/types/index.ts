// User types
export enum UserRole {
    ADMIN = "ADMINISTRATOR",
    FACULTY = "TEACHER",
    STUDENT = "STUDENT",
    GUARDIAN = "GUARDIAN",
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    avatar?: string;
    phone?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

// Student types
export interface Student extends User {
    gender: string;
    studentId: string;
    grade: string;
    class: string;
    dateOfBirth: string;
    guardianId?: string;
    address?: string;
}

// Faculty types
export interface Faculty extends User {
    facultyId: string;
    subjects: string[];
    classes: string[];
    department: string;
}

// Course types
export interface Course {
    department: string;
    id: string;
    name: string;
    code: string;
    description: string;
    facultyId: string;
    faculty?: Faculty;
    credits: number;
    schedule: CourseSchedule[];
}

export interface CourseSchedule {
    day: string;
    startTime: string;
    endTime: string;
    room: string;
}

// Assignment types
export interface Assignment {
    id: string;
    title: string;
    description: string;
    courseId: string;
    course?: Course;
    dueDate: string;
    totalPoints: number;
    attachments?: string[];
    createdAt: string;
}

export interface Submission {
    id: string;
    assignmentId: string;
    studentId: string;
    submittedAt: string;
    score?: number;
    feedback?: string;
    attachments: string[];
    status: 'pending' | 'graded' | 'late';
}

// Attendance types
export interface Attendance {
    id: string;
    studentId: string;
    courseId: string;
    date: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    remarks?: string;
}

// Grade types
export interface Grade {
    id: string;
    studentId: string;
    courseId: string;
    term: string;
    score: number;
    grade: string;
    remarks?: string;
}

// Communication types
export interface Message {
    id: string;
    senderId: string;
    sender?: User;
    recipientId: string;
    recipient?: User;
    subject: string;
    body: string;
    read: boolean;
    createdAt: string;
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    authorId: string;
    author?: User;
    targetRoles: UserRole[];
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
}

// Event types
export interface Event {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location?: string;
    type: 'academic' | 'sports' | 'cultural' | 'holiday' | 'exam';
    participants?: UserRole[];
}

// Dashboard types
export interface DashboardStats {
    totalStudents?: number;
    totalFaculty?: number;
    totalCourses?: number;
    attendanceRate?: number;
    upcomingEvents?: Event[];
    recentAnnouncements?: Announcement[];
}
