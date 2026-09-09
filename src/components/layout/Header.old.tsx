// import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../../contexts/AuthContext';
// import { Avatar } from '../common/Avatar';
// import { Button } from '../common/Button';

// export const Header = () => {
//     // const { user, logout } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         // logout();
//         navigate('/login', { replace: true });
//     };

//     return (
//         <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 mb-4">
//             <div className="flex items-center justify-between">
//                 {/* Search Bar */}
//                 <div className="flex-1 max-w-xl">
//                     <div className="relative">
//                         <input
//                             type="search"
//                             placeholder="Search..."
//                             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                         />
//                         <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                             🔍
//                         </span>
//                     </div>
//                 </div>

//                 {/* Right Section */}
//                 <div className="flex items-center space-x-4 ml-6">
//                     {/* Notifications */}
//                     <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
//                         <span className="text-xl">🔔</span>
//                         <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
//                     </button>

//                     {/* Messages */}
//                     <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
//                         <span className="text-xl">💬</span>
//                         <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
//                     </button>

//                     {/* User Menu */}
//                     {user && (
//                         <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
//                             <div className="text-right">
//                                 <p className="text-sm font-medium text-gray-800">
//                                     {user.firstName} {user.lastName}
//                                 </p>
//                                 <p className="text-xs text-gray-500 capitalize">{user.role}</p>
//                             </div>
//                             <Avatar
//                                 name={`${user.firstName} ${user.lastName}`}
//                                 src={user.avatar}
//                                 size="md"
//                             />
//                             <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 onClick={handleLogout}
//                                 className="text-gray-600 hover:text-accent"
//                             >
//                                 Logout
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </header>
//     );
// };
