import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GdnPaths } from './paths';

const GuardianDashboard = lazy(() => import('../pages/guardian/GuardianDashboard'));
const GuardianChildren = lazy(() => import('../pages/guardian/GuardianChildren'));
const GuardianGrades = lazy(() => import('../pages/guardian/GuardianGrades'));
const GuardianAttendance = lazy(() => import('../pages/guardian/GuardianAttendance'));
const GuardianCommunication = lazy(() => import('../pages/guardian/GuardianCommunication'));
const GuardianCalendar = lazy(() => import('../pages/guardian/GuardianCalendar'));
const GuardianPayments = lazy(() => import('../pages/guardian/GuardianPayments'));
const NotFound = lazy(() => import('../pages/errors/NotFound'));
const AccountProfile = lazy(() => import('../pages/account/AccountProfile'));

export const GuardianRouter = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={GdnPaths.DASH} replace />} />
            <Route path="dashboard" element={<GuardianDashboard />} />
            <Route path="children" element={<GuardianChildren />} />
            <Route path="children/:id" element={<GuardianChildren />} />
            <Route path="grades" element={<GuardianGrades />} />
            <Route path="attendance" element={<GuardianAttendance />} />
            <Route path="communication" element={<GuardianCommunication />} />
            <Route path="calendar" element={<GuardianCalendar />} />
            <Route path="payments" element={<GuardianPayments />} />
            <Route path="profile" element={<AccountProfile />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
