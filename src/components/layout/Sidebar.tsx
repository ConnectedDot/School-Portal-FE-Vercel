import { NavLink } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
// import { AdminPaths, StudentPaths, FacultyPaths, GuardianPaths } from '../../router/paths';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';
import { AdnPaths, FcyPaths, GdnPaths, SdtPaths } from '@/router/paths';

interface NavItem {
    label: string;
    path: string;
    icon: string;
}

// Navigation items per role
const getNavigationForRole = (role: UserRole): NavItem[] => {
    switch (role) {
        case UserRole.ADMIN:
            return [
                { label: 'Dashboard', path: AdnPaths.DASH, icon: '📊' },
                { label: 'Students', path: AdnPaths.STUDENTS, icon: '🎓' },
                { label: 'Faculty', path: AdnPaths.FACULTY, icon: '👨‍🏫' },
                { label: 'Courses', path: AdnPaths.COURSES, icon: '�' },
                { label: 'Attendance', path: AdnPaths.ATTENDANCE, icon: '📋' },
                { label: 'Grades', path: AdnPaths.GRADES, icon: '📝' },
                { label: 'Communication', path: AdnPaths.COMMUNICATION, icon: '💬' },
                { label: 'Calendar', path: AdnPaths.CALENDAR, icon: '�' },
                { label: 'Reports', path: AdnPaths.REPORTS, icon: '📈' },
                { label: 'Settings', path: AdnPaths.SETTINGS, icon: '⚙️' },
            ];
        case UserRole.FACULTY:
            return [
                { label: 'Dashboard', path: FcyPaths.DASH, icon: '📊' },
                { label: 'My Courses', path: FcyPaths.COURSES, icon: '📚' },
                { label: 'Students', path: FcyPaths.STUDENTS, icon: '🎓' },
                { label: 'Assignments', path: FcyPaths.ASSIGNMENTS, icon: '📝' },
                { label: 'Grades', path: FcyPaths.GRADES, icon: '📋' },
                { label: 'Attendance', path: FcyPaths.ATTENDANCE, icon: '✓' },
                { label: 'Communication', path: FcyPaths.COMMUNICATION, icon: '💬' },
                { label: 'Calendar', path: FcyPaths.CALENDAR, icon: '📅' },
                { label: 'Reports', path: FcyPaths.REPORTS, icon: '📈' },
            ];
        case UserRole.STUDENT:
            return [
                { label: 'Dashboard', path: SdtPaths.DASH, icon: '📊' },
                { label: 'My Courses', path: SdtPaths.COURSES, icon: '📚' },
                { label: 'Assignments', path: SdtPaths.ASSIGNMENTS, icon: '📝' },
                { label: 'Grades', path: SdtPaths.GRADES, icon: '📋' },
                { label: 'Attendance', path: SdtPaths.ATTENDANCE, icon: '✓' },
                { label: 'Communication', path: SdtPaths.COMMUNICATION, icon: '💬' },
                { label: 'Calendar', path: SdtPaths.CALENDAR, icon: '📅' },
                { label: 'Profile', path: SdtPaths.PROFILE, icon: '👤' },
            ];
        case UserRole.GUARDIAN:
            return [
                { label: 'Dashboard', path: GdnPaths.DASH, icon: '�' },
                { label: 'My Children', path: GdnPaths.CHILDREN, icon: '👨‍👩‍👧‍👦' },
                { label: 'Grades', path: GdnPaths.GRADES, icon: '📋' },
                { label: 'Attendance', path: GdnPaths.ATTENDANCE, icon: '✓' },
                { label: 'Communication', path: GdnPaths.COMMUNICATION, icon: '💬' },
                { label: 'Calendar', path: GdnPaths.CALENDAR, icon: '📅' },
                { label: 'Payments', path: GdnPaths.PAYMENTS, icon: '💳' },
            ];
        default:
            return [];
    }
};

export const Sidebar = () => {
    const { user } = useContext(AuthContext);

    const navigationItems = user ? getNavigationForRole(user.role) : [];

    return (
        <aside className="w-64 bg-primary-dark min-h-screen text-white flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-primary">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🎓</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">Cradle High</h1>
                        <p className="text-xs text-gray-400">School Portal</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1">
                {navigationItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive
                                ? 'bg-primary text-white shadow-lg'
                                : 'text-gray-300 hover:bg-primary/50 hover:text-white'
                            }`
                        }
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* User Info */}
            {user && (
                <div className="p-4 border-t border-primary">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-semibold">
                            {user.firstName[0]}{user.lastName[0]}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
};
