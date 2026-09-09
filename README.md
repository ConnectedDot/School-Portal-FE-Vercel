# 🎓 Fortis Nexarion School Portal

A modern, comprehensive school management system built with React 19, TypeScript, and Vite. This platform provides role-based access control for Administrators, Faculty, Students, and Guardians, enabling seamless management of academic operations.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

## 🌟 Key Features

### 🔐 Authentication & Authorization
- **Role-Based Access Control (RBAC)** with 4 user roles
- JWT token-based authentication with automatic refresh
- Session expiry management with graceful logout
- Protected routes with role validation
- Secure password management

### 👨‍💼 Administrator Module
- **Dashboard**: Real-time statistics and analytics
- **Student Management**: Complete CRUD operations, bulk upload via CSV/Excel
- **Faculty Management**: Teacher profiles, certifications, and assignments
- **Course Management**: Create, edit, and manage courses with teacher assignments
- **User Management**: Unified view of all system users with role filtering
- **Notification System**: Broadcast, role-based, and targeted notifications
- **Reports & Analytics**: Comprehensive data export and reporting

### 👨‍🏫 Faculty Module
- **Personal Dashboard**: Course overview and student statistics
- **My Courses**: Manage assigned courses with schedules
- **My Students**: View enrolled students across all courses
- **Profile Management**: Update personal, professional, and banking information
- **Certifications**: Add and manage professional credentials
- **Notifications**: Real-time updates and announcements

### 🎓 Student Module
- **Academic Dashboard**: Course enrollments and academic progress
- **Auto-Enrollment**: Intelligent course registration based on grade level
- **My Enrollments**: View all enrolled courses with instructor details
- **Notifications**: Receive updates from faculty and administration
- **Profile Management**: Update personal information

### 👨‍👩‍👧 Guardian Module
- **Children Overview**: Monitor multiple children's academic progress
- **Academic Performance**: View grades, attendance, and course progress
- **Communication**: Receive notifications from teachers and administration
- **Payment Tracking**: Monitor fee payments and financial obligations

## 🛠️ Tech Stack

### Core Technologies
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 5 for lightning-fast HMR
- **Styling**: Tailwind CSS v4 with custom design system
- **State Management**: TanStack Query (React Query) v5
- **Routing**: React Router v6 with lazy loading
- **HTTP Client**: Axios with interceptors

### UI Components & Libraries
- **Component Library**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React + Ionic Icons
- **Notifications**: Sonner for toast messages
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns
- **Tables**: Custom DataTable with sorting, filtering, and pagination

### Development Tools
- **Package Manager**: Bun (ultra-fast JavaScript runtime)
- **Linting**: ESLint 9 with TypeScript support
- **Type Checking**: TypeScript 5.5 (strict mode)

## � Installation

### Prerequisites
- Node.js 18+ or Bun 1.0+
- Git

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-org/school-portal-fe.git
cd school-portal-fe
```

2. **Install dependencies**
```bash
# Using Bun (recommended)
bun install

# Using npm
npm install

# Using yarn
yarn install
```

3. **Environment Configuration**

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://fn-school-portal-b6691b0f87e0.herokuapp.com/api
VITE_APP_NAME=Fortis Nexarion School Portal
VITE_APP_VERSION=1.0.0
```

4. **Start Development Server**
```bash
# Using Bun
bun start

# Using npm
npm run dev

# Using yarn
yarn dev
```

The application will be available at `http://localhost:5173`

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `bun start` | Start development server with hot reload |
| `bun run build` | Build production-ready bundle |
| `bun run preview` | Preview production build locally |
| `bun run lint` | Run ESLint for code quality checks |
| `bun run type-check` | Run TypeScript type checking |

## 📁 Project Structure

```
school-portal-fe/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images and media files
│   ├── axios-Instance/       # Axios configuration and interceptors
│   ├── components/
│   │   ├── common/          # Reusable components (Form, DataTable, etc.)
│   │   ├── forms/           # Form components
│   │   ├── layout/          # Layout components (Header, Sidebar)
│   │   └── ui/              # shadcn/ui components
│   ├── contexts/            # React Context providers (Auth, Theme)
│   ├── hooks/               # Custom React hooks for API calls
│   │   ├── students.ts      # Student CRUD operations
│   │   ├── teachers.ts      # Faculty management hooks
│   │   ├── courses.ts       # Course management hooks
│   │   ├── notifications.ts # Notification system hooks
│   │   ├── enrollments.ts   # Enrollment management
│   │   └── ...
│   ├── layouts/             # Page layouts (MainLayout, AuthLayout)
│   ├── lib/                 # Utility functions
│   ├── pages/               # Route components
│   │   ├── admin/          # Administrator pages
│   │   ├── faculty/        # Faculty pages
│   │   ├── student/        # Student pages
│   │   ├── guardian/       # Guardian pages
│   │   ├── auth/           # Authentication pages
│   │   └── errors/         # Error pages (404, Session Expired)
│   ├── router/              # Routing configuration
│   │   ├── paths.ts        # Centralized route paths
│   │   ├── AdminRouter.tsx # Admin routes with lazy loading
│   │   └── ...
│   ├── storage/             # LocalStorage helpers
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Helper functions and utilities
│   ├── App.tsx              # Root component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and Tailwind directives
├── DOCS/                    # Comprehensive project documentation
├── .env                     # Environment variables (create this)
├── components.json          # shadcn/ui configuration
├── eslint.config.js        # ESLint configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
└── package.json            # Project dependencies and scripts
```

## 🔌 API Integration

The application integrates with a RESTful API backend. All API calls are centralized in custom hooks located in `src/hooks/`.

**Base URL**: `http://fn-school-portal-b6691b0f87e0.herokuapp.com/api`

### Key Endpoints

#### Authentication
- `POST /v1/auth/login` - User authentication
- `POST /v1/auth/register` - Student registration
- `POST /v1/auth/register-teacher` - Faculty registration
- `POST /v1/auth/bulk-register` - Bulk student upload

#### Students
- `GET /v1/auth/students` - Get all students (paginated)
- `GET /v1/auth/students/{id}` - Get student details
- `PUT /v1/auth/students/{id}` - Update student
- `DELETE /v1/auth/students/{id}` - Delete student

#### Teachers
- `GET /v1/auth/teachers` - Get all teachers
- `GET /v1/auth/teachers/{id}` - Get teacher details
- `PUT /v1/auth/teachers/{id}` - Update teacher
- `DELETE /v1/auth/teachers/{id}` - Delete teacher

#### Courses
- `GET /v1/course/all` - Get all courses
- `GET /v1/course/my-course` - Get teacher's courses
- `POST /v1/course/create` - Create new course
- `PUT /v1/course/{id}` - Update course
- `DELETE /v1/course/{id}` - Delete course

#### Notifications
- `GET /v1/notification/my-notifications` - Get user notifications
- `POST /v1/notification/create-notification` - Send notification (Admin)
- `PUT /v1/notification/notifications/{id}/mark-as-read` - Mark as read
- `DELETE /v1/notification/notifications/{id}` - Delete notification

#### Enrollments
- `POST /v1/enrollment/auto-enroll` - Auto-enroll student
- `GET /v1/enrollment/my-enrollment` - Get student enrollments

## 🎨 Design System

The application uses a custom design system built on Tailwind CSS v4 with the following principles:

### Color Palette
- **Primary**: Blue (#3b82f6) - Main brand color
- **Secondary**: Gray (#64748b) - Supporting elements
- **Success**: Green (#22c55e) - Positive actions
- **Warning**: Orange (#f59e0b) - Caution states
- **Error**: Red (#ef4444) - Error states

### Typography
- **Font Family**: Inter (system font stack)
- **Headings**: Bold weights (600-700)
- **Body**: Regular weight (400)

### Components
All UI components follow the shadcn/ui design principles with custom styling to match the school portal aesthetic.

## 👥 User Roles & Permissions

| Role | Access Level | Key Permissions |
|------|-------------|-----------------|
| **Administrator** | Full System Access | Manage users, courses, view all data, send notifications |
| **Faculty** | Department Level | Manage courses, view students, update grades, certifications |
| **Student** | Personal Access | View courses, enroll, view grades, notifications |
| **Guardian** | Ward Access | View children's progress, receive notifications, payments |

## 🔒 Security Features

- **JWT Authentication** with secure token storage
- **HTTP-Only Cookies** for sensitive data (backend)
- **HTTPS Enforcement** in production
- **CSRF Protection** via token validation
- **XSS Prevention** via React's built-in escaping
- **Input Validation** using Zod schemas
- **Role-Based Route Guards** preventing unauthorized access
- **Session Expiry Handling** with automatic logout

## 📊 Key Features Deep Dive

### Multi-Step Forms
Complex forms (e.g., student onboarding) are broken into logical steps:
- Visual progress tracking
- Form state persistence across steps
- Step-by-step validation
- Cancel/Save functionality

### Data Tables
Advanced data table component with:
- Server-side and client-side pagination
- Multi-column sorting
- Advanced filtering (text, select, date ranges)
- Bulk selection and actions
- Export to CSV/Excel
- Responsive mobile view

### Notification System
Real-time notification system featuring:
- Auto-refresh every 30 seconds
- Unread badge counter
- Type-based icons and colors
- Mark as read/unread
- Delete individual or all
- Broadcast to all or role-specific users

### Session Management
Robust session handling with:
- Token expiry detection
- Graceful logout with navigation blocking
- Session expired page (prevents back navigation)
- Auto-redirect to login
- Token refresh (when backend supports it)

## 📚 Documentation

Detailed documentation is available in the `DOCS/` directory:

- [Component Reference](./DOCS/COMPONENT_REFERENCE.md) - UI component usage guide
- [Development Summary](./DOCS/DEVELOPMENT_SUMMARY.md) - Development progress
- [Phase Documentation](./DOCS/PHASE_DOCUMENTATION.md) - Implementation phases
- [Form Pattern Guide](./DOCS/FORM_PATTERN.md) - Form implementation patterns
- [Multi-Step Forms](./DOCS/MULTISTEP_FORM_DOCUMENTATION.md) - Multi-step form guide
- [Session Management](./DOCS/SESSION_EXPIRY_DOCUMENTATION.md) - Session handling
- [Naming Conventions](./DOCS/NAMING_REFACTOR_SUMMARY.md) - Code naming standards

## 🚢 Deployment

### Build for Production
```bash
bun run build
```

The optimized bundle will be in the `dist/` directory.

### Deployment Platforms

**Vercel** (Recommended)
```bash
vercel deploy
```

**Netlify**
```bash
netlify deploy --prod
```

**Manual Deployment**
Upload the `dist/` folder to any static hosting service.

### Environment Variables for Production
Ensure these are set in your hosting platform:
- `VITE_API_BASE_URL` - Production API URL
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Version number

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** with clear commit messages
4. **Run linting and tests**
   ```bash
   bun run lint
   bun test
   ```
5. **Submit a Pull Request** with a detailed description

### Commit Message Convention
Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Test additions or changes
- `chore:` Build process or auxiliary tool changes

## 🗺️ Roadmap

### Q1 2026
- [ ] Complete Student View/Edit pages
- [ ] Implement grade management system
- [ ] Add attendance tracking
- [ ] Real-time chat between faculty and students

### Q2 2026
- [ ] Mobile application (React Native)
- [ ] Advanced reporting and analytics
- [ ] Payment gateway integration
- [ ] Video conferencing integration

### Q3 2026
- [ ] AI-powered student performance predictions
- [ ] Automated attendance using facial recognition
- [ ] Parent-teacher conference scheduling
- [ ] Digital library integration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [TanStack Query](https://tanstack.com/query) for powerful data fetching

## 📞 Support

For support, email support@fortis-nexarion.com or join our Slack channel.

## 🔗 Links

- **Live Demo**: [https://school-portal-demo.vercel.app](https://school-portal-demo.vercel.app)
- **API Documentation**: [http://fn-school-portal-b6691b0f87e0.herokuapp.com/api](http://fn-school-portal-b6691b0f87e0.herokuapp.com/api)
- **Issue Tracker**: [GitHub Issues](https://github.com/your-org/school-portal-fe/issues)

---

**Built with ❤️ by the Fortis Nexarion Team**

*Last Updated: January 7, 2026*


- User management (CRUD)
- Course management
- Assignment system
- Grade tracking
- Attendance
- Calendar & events
- Messaging
- Reports

## 🏗️ Build

```bash
bun run build
````

Output: `dist/`

---

Built with ❤️ by Fortis Nexarion Team
