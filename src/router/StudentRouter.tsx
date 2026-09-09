import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SdtPaths } from './paths';

const StudentDashboard = lazy(() => import('../pages/student/StudentDashboard'));
const StudentEnrollment = lazy(() => import('../pages/student/StudentEnrollment'));
const MyEnrollments = lazy(() => import('../pages/student/MyEnrollments'));
const StudentCourses = lazy(() => import('../pages/student/StudentCourses'));
const StudentAssignments = lazy(() => import('../pages/student/StudentAssignments'));
const StudentGrades = lazy(() => import('../pages/student/StudentGrades'));
const StudentAttendance = lazy(() => import('../pages/student/StudentAttendance'));
const StudentCommunication = lazy(() => import('../pages/student/StudentCommunication'));
const StudentCalendar = lazy(() => import('../pages/student/StudentCalendar'));
const StudentProfile = lazy(() => import('../pages/student/StudentProfile'));
const NotFound = lazy(() => import('../pages/errors/NotFound'));

export const StudentRouter = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={SdtPaths.DASH} replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="courses/:id" element={<StudentCourses />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="assignments/:id" element={<StudentAssignments />} />
            <Route path="grades" element={<StudentGrades />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="communication" element={<StudentCommunication />} />
            <Route path="calendar" element={<StudentCalendar />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="enroll" element={<StudentEnrollment />} />
            <Route path="enrollments" element={<MyEnrollments />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
