import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/**
 * Bursary/Finance Router
 * 
 * NOTE: This router is a scaffold for future finance functionality.
 * The backend role enum does not currently include BURSAR.
 * Do not integrate this router into the main application until:
 * 1. Backend adds BURSAR role to the role enum
 * 2. Finance endpoints are documented in the API collection
 * 3. Backend confirms finance endpoints are production-ready
 */

const BursaryDashboard = lazy(() => import('../pages/bursary/BursaryDashboard'));
const NotFound = lazy(() => import('../pages/errors/NotFound'));

export const BursaryRouter = () => {
    return (
        <Routes>
            <Route index element={<Navigate to="/bursary/dashboard" replace />} />
            <Route path="dashboard" element={<BursaryDashboard />} />
            {/* Future routes when backend supports:
            <Route path="fees" element={<Fees />} />
            <Route path="fees/create" element={<FeeForm />} />
            <Route path="fees/:id/edit" element={<FeeForm />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="invoices/create" element={<InvoiceForm />} />
            <Route path="invoices/:id" element={<InvoiceDetail />} />
            <Route path="payments" element={<Payments />} />
            <Route path="reports" element={<FinanceReports />} />
            */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
