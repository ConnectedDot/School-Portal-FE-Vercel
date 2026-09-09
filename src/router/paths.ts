// Route paths organized by user role
export const PublicPaths = {
    HOME: '/',
    COMPACT: '/compact',
    ABOUT: '/about',
    ACADEMICS: '/academics',
    PROGRAMS: '/programs',
    ADMISSIONS: '/admissions',
    FACULTY: '/faculty',
    LIBRARY: '/library',
    EVENTS: '/events',
    CLUBS: '/clubs',
    GUIDANCE: '/guidance',
    ALUMNI: '/alumni',
    CONTACT: '/contact',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    PRIVACY: '/privacy-policy',
    TERMS: '/terms-of-service',
    COOKIES: '/cookies-policy',
    STUDENT_HANDBOOK: '/student-handbook',
    SESSION_EXPIRED: '/session-expired',
    UNAUTHORIZED: '/unauthorized',
} as const;

export const AdnPaths = {
    ROOT: '/adn',
    DASH: '/adn/dashboard',
    USERS: '/adn/users',
    USERS_CREATE: '/adn/users/create',
    USERS_EDIT: '/adn/users/:id/edit',
    STUDENTS: '/adn/students',
    STUDENTS_ONBOARD: '/adn/students/onboard',
    STUDENTS_BULK_UPLOAD: '/adn/students/bulk-upload',
    STUDENTS_EDIT: '/adn/students/:id/edit',
    STUDENTS_VIEW: '/adn/students/:id',
    FACULTY: '/adn/faculty',
    FACULTY_CREATE: '/adn/faculty/create',
    FACULTY_EDIT: '/adn/faculty/:id/edit',
    COURSES: '/adn/courses',
    LIBRARY: '/adn/library',
    COURSES_CREATE: '/adn/courses/create',
    COURSES_EDIT: '/adn/courses/:id/edit',
    COURSES_VIEW: '/adn/courses/:id',
    ATTENDANCE: '/adn/attendance',
    GRADES: '/adn/grades',
    NOTIFICATIONS: '/adn/notifications',
    REPORTS: '/adn/reports',
    SETTINGS: '/adn/settings',
    COMMUNICATION: '/adn/communication',
    CALENDAR: '/adn/calendar',
} as const;

export const FcyPaths = {
    ROOT: '/fcy',
    DASH: '/fcy/dashboard',
    PROFILE: '/fcy/profile',
    CERTIFICATIONS: '/fcy/certifications',

    COURSES: '/fcy/courses',
    COURSES_VIEW: '/fcy/courses/:id',
    STUDENTS: '/fcy/students',
    STUDENTS_VIEW: '/fcy/students/:id',
    ASSIGNMENTS: '/fcy/assignments',
    ASSIGNMENTS_CREATE: '/fcy/assignments/create',
    ASSIGNMENTS_EDIT: '/fcy/assignments/:id/edit',
    ASSIGNMENTS_VIEW: '/fcy/assignments/:id',
    GRADES: '/fcy/grades',
    ATTENDANCE: '/fcy/attendance',
    COMMUNICATION: '/fcy/communication',
    CALENDAR: '/fcy/calendar',
    REPORTS: '/fcy/reports',
} as const;

export const SdtPaths = {
    ROOT: '/sdt',
    DASH: '/sdt/dashboard',
    COURSES: '/sdt/courses',
    COURSES_VIEW: '/sdt/courses/:id',
    ASSIGNMENTS: '/sdt/assignments',
    ASSIGNMENTS_VIEW: '/sdt/assignments/:id',
    GRADES: '/sdt/grades',
    ATTENDANCE: '/sdt/attendance',
    COMMUNICATION: '/sdt/communication',
    CALENDAR: '/sdt/calendar',
    PROFILE: '/sdt/profile',
    ENROLL: '/sdt/enroll',
    ENROLLMENTS: '/sdt/enrollments',
} as const;

export const GdnPaths = {
    ROOT: '/gdn',
    DASH: '/gdn/dashboard',
    CHILDREN: '/gdn/children',
    CHILD_VIEW: '/gdn/children/:id',
    GRADES: '/gdn/grades',
    ATTENDANCE: '/gdn/attendance',
    COMMUNICATION: '/gdn/communication',
    CALENDAR: '/gdn/calendar',
    PAYMENTS: '/gdn/payments',
} as const;

// Helper functions to generate dynamic paths
export const generatePath = (path: string, params: Record<string, string>): string => {
    let result = path;
    Object.entries(params).forEach(([key, value]) => {
        result = result.replace(`:${key}`, value);
    });
    return result;
};
