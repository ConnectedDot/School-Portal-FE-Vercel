import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import HomePage from '@/pages/Public/Home';
import AboutPage from '@/pages/Public/About';
import ProgramsPage from '@/pages/Public/Programs';
import AdmissionsPage from '@/pages/Public/Admissions';
import ContactPage from '@/pages/Public/Contact';
import CompactPage from '@/pages/Public/Compact';
import ShadcnTestPage from '@/pages/ShadcnTestPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import SessionExpired from '@/pages/errors/SessionExpired';
import { Unauthorized } from '@/pages/errors/Unauthorized';
import {
    AcademicsPageComponent as AcademicsPage,
    AlumniPage,
    ClubsPage,
    CookiesPolicyPage,
    EventsPage,
    FacultyPage,
    GuidancePage,
    LibraryPage,
    PrivacyPolicyPage,
    StudentHandbookPage,
    TermsOfServicePage,
} from '@/pages/Public/InfoPages';
// Lazy load public pages
// const HomePage = lazy(() => import('../pages/Public/Home'));
// const ShadcnTestPage = lazy(() => import('../pages/ShadcnTestPage'));

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/compact" element={<CompactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/academics" element={<AcademicsPage />} />
                <Route path="/admissions" element={<AdmissionsPage />} />
                <Route path="/faculty" element={<FacultyPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/clubs" element={<ClubsPage />} />
                <Route path="/guidance" element={<GuidancePage />} />
                <Route path="/alumni" element={<AlumniPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                <Route path="/cookies-policy" element={<CookiesPolicyPage />} />
                <Route path="/student-handbook" element={<StudentHandbookPage />} />
            </Route>
            <Route path="/shadcn" element={<ShadcnTestPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/session-expired" element={<SessionExpired />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
    );
};


