import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FcyPaths } from './paths';

const FacultyDashboard = lazy(() => import('../pages/faculty/FacultyDashboard'));
const TeacherProfile = lazy(() => import('../pages/faculty/TeacherProfile'));
const TeacherStudents = lazy(() => import('../pages/faculty/TeacherStudents'));
const TeacherCourses = lazy(() => import('../pages/faculty/TeacherCourses'));
const TeacherAssignments = lazy(() => import('../pages/faculty/TeacherAssignments'));
const TeacherGrades = lazy(() => import('../pages/faculty/TeacherGrades'));
const TeacherAttendance = lazy(() => import('../pages/faculty/TeacherAttendance'));
const TeacherCommunication = lazy(() => import('../pages/faculty/TeacherCommunication'));
const TeacherCalendar = lazy(() => import('../pages/faculty/TeacherCalendar'));
const TeacherReports = lazy(() => import('../pages/faculty/TeacherReports'));
const Certifications = lazy(() => import('../pages/faculty/Certifications'));
const NotFound = lazy(() => import('../pages/errors/NotFound'));

export const FacultyRouter = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={FcyPaths.DASH} replace />} />
            <Route path="dashboard" element={<FacultyDashboard />} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="courses" element={<TeacherCourses />} />
            <Route path="courses/:id" element={<TeacherCourses />} />
            <Route path="students" element={<TeacherStudents />} />
            <Route path="students/:id" element={<TeacherStudents />} />
            <Route path="assignments" element={<TeacherAssignments />} />
            <Route path="assignments/create" element={<TeacherAssignments />} />
            <Route path="assignments/:id" element={<TeacherAssignments />} />
            <Route path="assignments/:id/edit" element={<TeacherAssignments />} />
            <Route path="grades" element={<TeacherGrades />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="communication" element={<TeacherCommunication />} />
            <Route path="calendar" element={<TeacherCalendar />} />
            <Route path="reports" element={<TeacherReports />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
