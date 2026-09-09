import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdnPaths } from './paths';

// Lazy load admin pages
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const StudentList = lazy(() => import('../pages/admin/students/StudentList'));
const StudentOnboard = lazy(() => import('../pages/admin/students/StudentOnboard'));
const StudentBulkUpload = lazy(() => import('../pages/admin/students/StudentBulkUpload'));
const StudentEdit = lazy(() => import('../pages/admin/students/StudentEdit'));
const StudentView = lazy(() => import('../pages/admin/students/StudentView'));
const FacultyList = lazy(() => import('../pages/admin/faculty/FacultyList'));
const FacultyCreate = lazy(() => import('../pages/admin/faculty/FacultyCreate'));
const FacultyView = lazy(() => import('../pages/admin/faculty/FacultyView'));
const FacultyEdit = lazy(() => import('../pages/admin/faculty/FacultyEdit'));
const CourseList = lazy(() => import('../pages/admin/courses/CourseList'));
const CourseForm = lazy(() => import('../pages/admin/courses/CourseForm'));
const CourseView = lazy(() => import('../pages/admin/courses/CourseView'));
const AdminUsersList = lazy(() => import('../pages/admin/users/AdminUsersList'));
const AdminNotifications = lazy(() => import('../pages/admin/Notifications'));
const Library = lazy(() => import('../pages/admin/Library'));
const Attendance = lazy(() => import('../pages/admin/Attendance'));
const Grades = lazy(() => import('../pages/admin/Grades'));
const Communication = lazy(() => import('../pages/admin/Communication'));
const Calendar = lazy(() => import('../pages/admin/Calendar'));
const Reports = lazy(() => import('../pages/admin/Reports'));
const Settings = lazy(() => import('../pages/admin/Settings'));
const NotFound = lazy(() => import('../pages/errors/NotFound'));

export const AdminRouter = () => {
    return (
        <Routes>
            {/* <Route index element={<Navigate to={AdnPaths.DASH} replace />} /> */}
            <Route path="dashboard" element={<AdminDashboard />} />

            {/* Student Management */}
            <Route path="students" element={<StudentList />} />
            <Route path="students/onboard" element={<StudentOnboard />} />
            <Route path="students/bulk-upload" element={<StudentBulkUpload />} />
            <Route path="students/:id" element={<StudentView />} />
            <Route path="students/:id/edit" element={<StudentEdit />} />

            {/* Faculty Management */}
            <Route path="faculty" element={<FacultyList />} />
            <Route path="faculty/create" element={<FacultyCreate />} />
            <Route path="faculty/:id" element={<FacultyView />} />
            <Route path="faculty/:id/edit" element={<FacultyEdit />} />

            {/* Course Management */}
            <Route path="courses" element={<CourseList />} />
            <Route path="courses/create" element={<CourseForm />} />
            <Route path="courses/:id" element={<CourseView />} />
            <Route path="courses/:id/edit" element={<CourseForm />} />

            {/* User Management */}
            <Route path="users" element={<AdminUsersList />} />

            {/* Notifications */}
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="library" element={<Library />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="grades" element={<Grades />} />
            <Route path="communication" element={<Communication />} />
            <Route path="calendar" element={<Calendar />} />

            {/* Reports & Settings */}
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />

            {/* Fallback - 404 Not Found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
