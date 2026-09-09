# Fortis School Portal — Enterprise Frontend Implementation Guide
## IDE AI Master Implementation Prompt
**Version:** 1.0  
**Scope:** Updated `School-Portal-FE(1)` frontend + `School-Portal-BE.postman_collection(1).json` API contract  
**Primary objective:** Turn the current portal into a complete, coherent, responsive, theme-consistent school platform where every visible navigation route has a real page, every available API endpoint is deliberately integrated, and every still-missing backend domain is represented with typed dummy data in a predictable `src/data/<role>/...` structure until its API exists.

---

# 1. Operating instruction for the IDE AI

You are working inside the existing Fortis School Portal codebase.

Do **not** rebuild the application from scratch.  
Do **not** replace working authentication, session handling, route redirection, React Query, Axios, form patterns, Shadcn primitives, or the current design direction without a concrete reason.  
Do **not** add explanatory/developer placeholder copy to user-facing pages.

Work incrementally, preserve working behavior, and align every implementation with the repository's existing architecture and the project engineering standard:

```text
Presentation / Page
        ↓
Feature hook / screen orchestration
        ↓
Service / business use case where needed
        ↓
Repository / API client boundary
        ↓
Backend API or temporary typed dummy data
```

The finished frontend must feel like one application, not a collection of independently styled pages.

---

# 2. Critical product rules

## 2.1 User-facing content must be real school content

Never expose developer notes such as:

```text
Use your seeded API credentials where available.
The form keeps your current login hook and route redirection logic intact.
This page is using the current API.
Replace this when the API is ready.
Demo data for developers.
```

The current login form contains this unwanted content and it must be removed from the visible UI.

Developer-only implementation notes belong in:

```text
README.md
DOCS/
code comments
development-only logs
```

They do not belong in public or protected user interfaces.

---

# 3. Preserve existing working authentication behavior

The current login flow is already connected through the existing login hook and role-based redirection.

Keep the authentication flow and route redirection logic intact unless a genuine bug is discovered.

The backend currently supports these authenticated roles:

```text
STUDENT
TEACHER
ADMINISTRATOR
PARENT
```

The frontend currently maps these to application concepts similar to:

```text
STUDENT       → Student portal
TEACHER       → Faculty/Teacher portal
ADMINISTRATOR → Admin portal
PARENT        → Guardian portal
```

Normalize wording in the UI:

- Use **Teacher** in human-facing UI unless a wider "Faculty" grouping is intentionally meant.
- Use **Parent / Guardian** consistently.
- Keep existing technical enum mappings if changing them would break authentication.
- Avoid silently renaming backend role values.

---

# 4. Design system and theme — NON-NEGOTIABLE

The **Login page is the visual source of truth** for the current Fortis theme direction.

The entire application — public and protected — must reuse the same design language.

## 4.1 Existing theme identity

The current project already defines:

- Lexend Deca typography.
- Warm orange primary / brand tone.
- Dark near-black/navy surfaces.
- Subtle blue secondary accents.
- Glass-like surfaces.
- Rounded premium cards.
- Soft orange glow.
- Semantic CSS variables for:
  - background
  - foreground
  - card
  - popover
  - primary
  - secondary
  - muted
  - accent
  - destructive
  - border
  - input
  - ring
  - sidebar
  - chart colors

The current primary token is based around:

```text
HSL primary: 28 97% 48%
brand-600: #d87108
brand-500: #f18805
dark application surface: #050505
```

These are the application tokens unless intentionally changed centrally.

## 4.2 Do not scatter arbitrary colors

Remove/rework page-level styling such as:

```tsx
text-gray-800
text-gray-600
bg-white
bg-gray-50
border-gray-200
text-green-600
bg-[#random]
```

when those classes make dark mode fail or bypass semantic tokens.

Prefer:

```tsx
bg-background
text-foreground
bg-card
text-card-foreground
text-muted-foreground
border-border
bg-primary
text-primary-foreground
bg-secondary
text-secondary-foreground
bg-accent
text-accent-foreground
```

or approved reusable Fortis classes:

```text
fortis-page-shell
fortis-dashboard-shell
premium-card
glass
glass-strong
fortis-primary-button
fortis-secondary-button
section-eyebrow
heading-display
heading-section
text-muted-premium
```

If a new visual token is truly required, add it centrally in `src/index.css` and/or `tailwind.config.ts`.

Never solve a theme problem by adding a different hardcoded color to every page.

---

# 5. Dark mode / light mode completion

The theme toggle must affect **the complete application**, not only the public header or selected components.

Audit every page and reusable component.

Required coverage:

```text
Page backgrounds
Cards
Tables
Table headers
Table rows
Forms
Inputs
Textareas
Selects
Dropdowns
Dialogs
Drawers / Sheets
Tooltips
Tabs
Badges
Progress indicators
Charts
Empty states
Error states
Skeletons
Pagination
Filters
Search
Sidebars
Headers
Profile panels
Stat cards
Calendars
Notifications
Mobile menus
Footer
Public hero sections
Protected dashboards
```

## Acceptance criteria

For every route:

1. Toggle light → dark.
2. All visible text remains readable.
3. No white card remains accidentally white with light text.
4. No dark text remains hardcoded in dark mode.
5. Borders remain visible but subtle.
6. Forms inherit theme correctly.
7. Tables inherit theme correctly.
8. Hover/focus/selected states work in both themes.
9. Charts use theme-aware tokens.
10. The preference survives reload through the existing theme provider.

---

# 6. Public website revamp

Revamp all public-facing routes into credible school website pages.

Priority routes explicitly required:

```text
/
 /compact
 /academics
 /admissions
 /contact
```

Also curate all other existing public pages:

```text
/about
/programs
/faculty
/library
/events
/clubs
/guidance
/alumni
/privacy-policy
/terms-of-service
/cookies-policy
/student-handbook
/login
```

## 6.1 `/compact`

There is currently no `/compact` route in the inspected router.

Create it.

Interpret it as a concise school overview / prospectus-style page unless an existing product meaning is discovered elsewhere in the repo.

Recommended content:

- School identity and proposition.
- Core academic stages.
- Why families choose the school.
- Admissions summary.
- Academic pathways.
- Student life.
- Facilities.
- Key statistics.
- Quick contact details.
- CTAs:
  - Apply for admission
  - Explore academics
  - Contact school
  - Portal login

The page should be useful as a compact marketing landing page and not be a duplicate of Home.

## 6.2 `/academics`

Current academics content is too generic.

Create a richer standard school academic page containing:

```text
Hero
Academic philosophy
Junior Secondary pathway
Senior Secondary pathways
  - Science
  - Arts
  - Commercial
Curriculum approach
Subject groups
Teaching & learning model
Assessment approach
Learning support
Digital learning
Academic calendar / session structure
Student progression
Co-curricular enrichment
Academic FAQs
CTA to admissions
CTA to portal
```

Use real school-language copy, not software-product copy.

Do not describe React hooks, APIs, enterprise architecture, seeded accounts, or implementation status.

## 6.3 `/admissions`

Revamp as a credible admissions journey.

Recommended structure:

```text
Admissions hero
Who can apply
Entry levels
Admissions timeline
Application process

1. Enquiry
2. Application
3. Document submission
4. Screening / entrance assessment
5. Interview where applicable
6. Admission decision
7. Offer / acceptance
8. Enrollment

Required documents
Admission considerations
Fee / payment note
Transfer applicants
Frequently asked questions
Contact admissions team
Apply CTA
```

Do **not** invent regulatory claims or accreditation details that are not in the repository.

Where actual school-specific facts are unavailable, use neutral, professional school copy that can be replaced later.

## 6.4 `/contact`

Current Contact page should become a complete contact experience:

```text
Hero
School contact cards
Admissions contact
General enquiries
Portal/support contact
Office hours
Contact form
Location placeholder/map panel if no real map data exists
Emergency note only if supported by actual school content
FAQ / response expectation
Social/contact links when available
```

The form should have:

- Full name
- Email
- Phone
- Enquiry category
- Subject
- Message
- Consent checkbox if needed
- validation
- loading
- success
- failure
- accessible labels

If there is no contact API, keep the interaction local/dummy or use the existing mechanism only if one already exists. Do not fake a successful network request.

## 6.5 Public page content tone

The public website should sound like a school, not like the engineering company building it.

Preferred tone:

- confident
- warm
- academic
- family-friendly
- concise
- credible
- modern
- student-centered

Avoid phrases such as:

```text
enterprise-grade architecture
current API
backend
hook
developer
seeded credentials
route redirect
implementation
dummy data
```

except in internal developer documentation.

---

# 7. Public navigation cleanup

Current `PublicRoutes.tsx` contains duplicate route declarations for:

```text
/programs
/admissions
/contact
```

Remove duplicate declarations.

Centralize public route paths into `paths.ts` instead of scattering raw strings.

Recommended addition:

```ts
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
  PRIVACY: '/privacy-policy',
  TERMS: '/terms-of-service',
  COOKIES: '/cookies-policy',
  STUDENT_HANDBOOK: '/student-handbook',
  SESSION_EXPIRED: '/session-expired',
  UNAUTHORIZED: '/unauthorized',
} as const;
```

Use path constants in navigation and routing wherever practical.

---

# 8. Route completeness — no blank navigation targets

This is a mandatory fix.

There are currently navigation items whose route constants exist but whose routers do not render corresponding pages.

This produces either:

- blank screens,
- internal 404s,
- incorrect fallback pages,
- links to routes that do not exist.

Every visible navigation item must resolve to a valid, curated page.

---

# 9. Student portal route completion

Current Student router only implements:

```text
/sdt/dashboard
/sdt/enroll
/sdt/enrollments
```

but navigation/path constants expect more.

Create/complete pages for:

```text
/sdt/dashboard
/sdt/courses
/sdt/courses/:id
/sdt/assignments
/sdt/assignments/:id
/sdt/grades
/sdt/attendance
/sdt/communication
/sdt/calendar
/sdt/profile
/sdt/enroll
/sdt/enrollments
```

Recommended student dashboard content:

```text
Greeting / current session
Today's timetable
Upcoming classes
Upcoming assignments
Upcoming tests/exams
Attendance summary
Academic average
Subject performance
Learning progress
Recent grades
Announcements
Outstanding fees summary
Calendar events
Quick actions
Recent activity
```

Where a real API exists, use it.

Where an API does not exist, use typed dummy data and display the `D` flag described later.

---

# 10. Teacher / Faculty portal route completion

Current Faculty router only implements:

```text
/fcy/dashboard
/fcy/profile
/fcy/students
/fcy/certifications
```

but the navigation/path constants expect more.

Create/complete:

```text
/fcy/dashboard
/fcy/profile
/fcy/certifications
/fcy/courses
/fcy/courses/:id
/fcy/students
/fcy/students/:id
/fcy/assignments
/fcy/assignments/create
/fcy/assignments/:id
/fcy/assignments/:id/edit
/fcy/grades
/fcy/attendance
/fcy/communication
/fcy/calendar
/fcy/reports
```

Recommended teacher dashboard:

```text
Today's schedule
Assigned courses
Assigned students
Attendance action
Assignments awaiting review
Assessment / grading queue
Recent student activity
Upcoming events
Announcements
Class performance summary
Curriculum progress
Quick actions
```

Use current teacher APIs for actual profile, courses, students, and certifications.

Use dummy data for assignments, grades, attendance, reports, timetable/calendar details, and communication until endpoints exist.

---

# 11. Parent / Guardian portal route completion

Current Guardian router only implements:

```text
/gdn/dashboard
```

but navigation/path constants expect:

```text
/gdn/dashboard
/gdn/children
/gdn/children/:id
/gdn/grades
/gdn/attendance
/gdn/communication
/gdn/calendar
/gdn/payments
```

Create all of them.

Recommended guardian dashboard:

```text
Child selector
Selected child summary
Attendance
Academic average
Recent grades
Assignments / upcoming assessments
Outstanding fee balance
Recent payment
School announcements
Teacher messages
Upcoming events
Quick actions
```

Recommended child detail:

```text
Overview
Academic
Attendance
Results
Finance
Teachers
Timetable
Documents
Behaviour summary
Recent activity
```

The current API collection has `PARENT` as a role but does not expose parent/guardian-specific domain endpoints.

Therefore these pages should currently use typed dummy data and the `D` flag.

Do not pretend parent data comes from the API.

---

# 12. Admin portal expansion

Existing admin pages already cover a useful base.

Retain and improve:

```text
/adn/dashboard
/adn/users
/adn/students
/adn/students/onboard
/adn/students/bulk-upload
/adn/students/:id
/adn/students/:id/edit
/adn/faculty
/adn/faculty/create
/adn/faculty/:id
/adn/faculty/:id/edit
/adn/courses
/adn/courses/create
/adn/courses/:id
/adn/courses/:id/edit
/adn/library
/adn/attendance
/adn/grades
/adn/communication
/adn/calendar
/adn/reports
/adn/settings
/adn/notifications
```

Enhance the Admin dashboard to feel complete:

```text
Total students
Total teachers
Total courses
Current academic year
Active users
Attendance overview
Enrollment by level
Department distribution
Recent registrations
Recent activity
Notifications
Academic snapshot
Upcoming events
Quick actions
System / operational alerts
```

Only metrics based on an existing endpoint may be presented as live API data.

If a metric cannot be calculated reliably from available API responses, source it from typed dummy data and mark the relevant page/section according to the dummy-data rule.

---

# 13. Bursary / Finance future-ready role

The current backend role enum does **not** expose `BURSAR`.

Do not misrepresent this as a supported authenticated backend role.

However, prepare the frontend domain architecture and dummy data so backend implementation can follow it later.

Recommended future module:

```text
src/pages/bursary/
src/data/bursary/
src/modules/finance/
```

Future pages:

```text
Dashboard
Fees
Fee Structures
Invoices
Payments
Payment Verification
Receipts
Discounts / Scholarships
Outstanding Balances
Reconciliation
Expenses
Reports
Settings
```

Suggested dashboard:

```text
Expected revenue
Collected revenue
Outstanding balance
Collection rate
Pending payment verifications
Recent transactions
Collections trend
Outstanding by class
Payment methods
Overdue accounts
```

Do not expose a normal production protected route for Bursary until authentication/authorization supports it, unless there is a deliberate development-only preview mechanism.

---

# 14. Future enterprise domains to scaffold progressively

The application should be prepared for these domains from the earlier product analysis, but they do not all need to be completed in one uncontrolled change.

Priority enterprise domains:

```text
Admissions
Student 360
Guardians
Academic structure
Academic years / terms
Classes / arms
Subjects
Course offerings
Timetable
Attendance
Curriculum
Assignments
Assessments
Examinations
Gradebook
Results
Report cards
Finance / Bursary
Payments
Communication
Documents
Library
Reports / Analytics
Audit
```

Extended domains:

```text
HR / Staff
Payroll
Behaviour / Discipline
Counselling
Health / Clinic
Transport
Hostel
Inventory / Assets
Clubs / Activities
Alumni
Workflow / Approvals
```

Implement missing frontend pages with dummy data only where they fit the currently visible product scope. Do not flood the navigation with every future domain at once.

---

# 15. Dummy data architecture — mandatory convention

The app must remain useful even before all APIs exist.

Create a proper `src/data` structure.

Do **not** use one global `mockData.ts` dumping ground.

Required convention:

```text
src/
└── data/
    ├── admin/
    │   ├── dashboard.ts
    │   ├── attendance.ts
    │   ├── grades.ts
    │   ├── reports.ts
    │   ├── communication.ts
    │   └── calendar.ts
    │
    ├── student/
    │   ├── dashboard.ts
    │   ├── assignments.ts
    │   ├── grades.ts
    │   ├── attendance.ts
    │   ├── communication.ts
    │   ├── calendar.ts
    │   └── profile.ts
    │
    ├── teacher/
    │   ├── dashboard.ts
    │   ├── assignments.ts
    │   ├── grades.ts
    │   ├── attendance.ts
    │   ├── communication.ts
    │   ├── calendar.ts
    │   └── reports.ts
    │
    ├── guardian/
    │   ├── dashboard.ts
    │   ├── children.ts
    │   ├── grades.ts
    │   ├── attendance.ts
    │   ├── communication.ts
    │   ├── calendar.ts
    │   └── payments.ts
    │
    ├── bursary/
    │   ├── dashboard.ts
    │   ├── fees.ts
    │   ├── invoices.ts
    │   ├── payments.ts
    │   └── reports.ts
    │
    └── public/
        ├── academics.ts
        ├── admissions.ts
        ├── contact.ts
        └── compact.ts
```

## 15.1 One file owns its interface and seed data

Example:

```ts
// src/data/student/dashboard.ts

export interface StudentDashboardData {
  student: {
    id: string;
    name: string;
    level: string;
    department: string;
  };
  stats: {
    attendanceRate: number;
    academicAverage: number;
    completedAssignments: number;
    outstandingFees: number;
  };
  schedule: Array<{
    id: string;
    subject: string;
    teacher: string;
    startTime: string;
    endTime: string;
    room: string;
    status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
  }>;
  upcomingAssignments: Array<{
    id: string;
    title: string;
    subject: string;
    dueDate: string;
    status: 'PENDING' | 'SUBMITTED' | 'GRADED';
  }>;
}

export const studentDashboardData: StudentDashboardData = {
  ...
};
```

For dummy-only areas, this file becomes a provisional frontend contract for later backend API design.

## 15.2 Dummy data quality

Dummy data should:

- look realistic,
- be internally consistent,
- use stable IDs,
- use plausible school dates,
- reuse the same student/class/subject names where records are related,
- be rich enough to exercise tables, cards, charts, filters, empty states, and details,
- never contain developer jokes or lorem ipsum,
- avoid real private information.

---

# 16. Dummy-data `D` flag

Every page whose main domain data is currently dummy data must visibly show a small **`D`** flag.

Purpose: allow maintainers to immediately identify data-backed pages that still need backend implementation.

## 16.1 UI behavior

Create one reusable component:

```text
src/components/shared/DataSourceFlag.tsx
```

Suggested API:

```tsx
<DataSourceFlag source="dummy" />
<DataSourceFlag source="api" />
```

Rendering rule:

- `source="dummy"` → visible compact `D`
- `source="api"` → render nothing

Suggested dummy appearance:

```text
D
```

- small
- unobtrusive
- accessible tooltip:
  `"Dummy data — backend integration pending"`
- use theme tokens
- do not dominate the page

Place it near the page title or page header.

## 16.2 Mixed-source page

If a page uses API data for the main content but one secondary widget uses dummy data:

- do not necessarily mark the whole page as dummy;
- place `D` on the dummy widget/section.

This gives us accurate integration visibility.

## 16.3 Production consideration

Keep the flag controlled centrally so it can later be hidden in production if desired:

```ts
export const SHOW_DATA_SOURCE_FLAGS = true;
```

For now it must remain visible as requested.

---

# 17. API contract — source of truth

The supplied Postman collection contains **36 requests**.

The frontend must be audited against each one.

Current backend base path in the collection:

```text
/api/v1
```

The collection documents:

- global JWT authentication,
- global role guard,
- login as the public endpoint,
- strict DTO validation using whitelist + forbidNonWhitelisted,
- pagination/filter query parameters,
- notification WebSocket namespace.

Do not invent backend endpoints and call them as though they exist.

---

# 18. API endpoint inventory and frontend expectation

## Auth

### Available

```http
POST /auth/login
POST /auth/register-student
POST /auth/register-teacher
POST /auth/bulk-register
```

Expected frontend usage:

```text
Login                          → API
Admin student onboarding       → API
Admin teacher creation         → API
Admin student bulk upload      → API
```

### Not in the supplied API

The current frontend contains hooks resembling:

```text
/auth/register
/v1/auth/forgot-password
/v1/auth/reset-password
/v1/users/change-password
/v1/users/profile
/user/profile
/user/change-password
/user/change-pin
```

These are **not confirmed by the supplied Postman collection**.

Do not expose them as working backend capabilities unless the real backend proves otherwise.

Either:

1. remove dead/legacy hook usage,
2. isolate them as unsupported legacy code,
3. or build a non-network placeholder flow if a page is needed.

Do not silently send requests to undocumented endpoints.

---

# 19. Admin API

### Available

```http
GET /admin/all-users
```

Supported query parameters:

```text
page
limit
search
role
studentLevel
status
```

Current frontend issue:

`useGetAllUsers(page, limit, filters)` receives page/filter arguments but currently does not clearly pass all of them into the request.

Fix the hook so filters genuinely affect the server request.

Use it for:

```text
All users
Student lists
Teacher lists
Admin lists
Role filtering
Status filtering
Search
Pagination
```

### Not available

No confirmed API exists for:

```text
GET /admin/all-users/:id
PATCH /admin/all-users/:id
DELETE /admin/all-users/:id
```

Therefore do not call delete/update/detail operations on that route unless the backend actually supports them outside the supplied collection.

The current frontend contains delete assumptions for students/teachers through `/admin/all-users`; treat those as unsupported until verified.

---

# 20. Academic year API

### Available

```http
GET /academic-years
GET /academic-years?current=true
```

Use this wherever the UI displays the current academic year/session.

Do not hardcode the current academic year in pages where this endpoint can provide it.

---

# 21. Course API

### Available

```http
POST   /course/create
GET    /course/all
GET    /course/my-course
GET    /course/:courseId
PUT    /course/:courseId
DELETE /course/:courseId
PUT    /course/teacher/:teacherId/course/:courseId/assign
```

Access according to supplied API:

```text
Create course             → Teacher
List courses              → Teacher, Student, Administrator, Parent
Teacher-created courses   → Teacher
Course detail             → Teacher, Administrator
Update course             → Teacher creator or Administrator
Delete course             → Administrator
Assign course to teacher  → current API collection documents Teacher/Admin/Student
```

Frontend issues to fix:

- `useGetCourses(page, limit, search)` should pass page/limit/search.
- `useUpdateCourse(id)` must definitely send the ID.
- `useDeleteCourse()` must definitely send the selected course ID.
- Teacher assignment must use the HTTP verb expected by the API (`PUT`), not a generic create helper that issues `POST`.
- Avoid exposing course detail to a role if the backend will reject it.

---

# 22. Enrollment API

### Available

```http
POST /enrollment/auto-enroll
GET  /enrollment/my-enrollment
```

Student enrollment pages should use these endpoints.

The frontend currently has a speculative:

```text
GET /enrollment
```

This is **not confirmed** in the supplied collection.

Remove or clearly isolate it until backend support exists.

---

# 23. Student API

### Available

```http
GET   /student/profile
GET   /student/my-enrolled-courses
PATCH /student/update-profile
```

Optional query:

```text
academicYearId
```

Frontend fixes:

- `useMyEnrolledCourses(academicYearId)` should actually send `academicYearId` when provided.
- Student Profile should use the real profile API.
- Profile update should use the real PATCH endpoint.
- Dashboard may combine:
  - student profile
  - current academic year
  - enrolled courses
  - enrollment
  - notifications
  - dummy schedule/grades/attendance widgets until APIs exist.

Do not use student profile endpoints to fetch arbitrary students by ID.

---

# 24. Teacher API

### Available

```http
GET   /teacher/my-students
GET   /teacher/my-courses
GET   /teacher/profile
PATCH /teacher/update-profile

POST   /teacher/certifications
PATCH  /teacher/certifications/:certificationId
DELETE /teacher/certifications/:certificationId
```

Teacher students query parameters:

```text
page
limit
search
studentLevel
status
courseId
```

Frontend fixes:

- `useGetMyStudents(...)` currently accepts filters but must truly pass them.
- `useGetTeacher(id)` must not append arbitrary teacher IDs to `/teacher/profile` unless the backend supports it.
- Teacher detail pages used by Admin should not misuse "my profile" endpoints.
- Teacher Profile and Certifications should remain API-backed.
- Teacher dashboard can use:
  - `/teacher/profile`
  - `/teacher/my-courses`
  - `/teacher/my-students`
  - notifications
  - dummy data for academic scheduling/assessment metrics that lack endpoints.

---

# 25. Notification API

### Available

```http
POST   /notification/create-notification
GET    /notification/my-notifications
GET    /notification/notifications/unread-count
PATCH  /notification/notifications/:notificationId/mark-as-read
PATCH  /notification/notifications/mark-all-as-read
DELETE /notification/notifications/:notificationId
DELETE /notification/notifications/delete-all
POST   /notification/test
```

Query params on notification list:

```text
page
limit
isRead
type
```

Frontend fixes:

- `useGetMyNotifications(page, limit, isRead, type)` must actually pass these query values.
- Preserve unread count polling if appropriate.
- Keep API-driven notification UI in Header.
- Treat `POST /notification/test` as admin/development utility, not an ordinary end-user feature.
- WebSocket support documented by backend:
  - namespace: `/notifications`
  - auth payload includes token
  - events include `notification` and `unreadCount`

If WebSocket integration is not already stable, keep REST notifications working first.

---

# 26. Book / Library API

### Confirmed

```http
GET  /book
POST /book
```

The supplied collection calls this a scaffold/demo module.

Frontend currently assumes more:

```text
GET /book/:id
PUT/PATCH /book/:id
DELETE /book/:id
```

These are **not confirmed**.

Therefore:

- List books → API.
- Create book → API.
- Book detail/update/delete → dummy/local UI or disabled action until API support exists.
- Do not mislabel the current two-endpoint Book module as a complete library management backend.

Longer-term library frontend can model:

```text
Book
Book Copy
Category
Author
Publisher
Shelf
Borrowing
Reservation
Return
Fine
Lost / Damaged
```

but use dummy data until backend endpoints exist.

---

# 27. API integration status map

After the audit, create/maintain an internal developer matrix, for example:

```text
Feature                     Source        Status
------------------------------------------------------------
Login                       API           Connected
Register student            API           Connected
Bulk register student       API           Connected
Register teacher            API           Connected
All users                   API           Connected / filters fix
Academic year               API           Connected
Course list                 API           Connected / filters fix
Course detail               API           Connected
Course create               API           Connected
Course update               API           Verify ID + PUT
Course delete               API           Verify ID
Assign teacher              API           Fix verb to PUT
Student profile             API           Connected
Student courses             API           Query param fix
Student profile update      API           Connected
Teacher profile             API           Connected
Teacher students            API           Query param fix
Teacher courses             API           Connected
Teacher certifications      API           Connected
Notifications               API           Query param fix
Book list                   API           Connected
Book create                 API           Connected
Assignments                 Dummy         D
Grades / gradebook          Dummy         D
Attendance                  Dummy         D
Parent children             Dummy         D
Parent payments             Dummy         D
Finance                     Dummy         D
Timetable                   Dummy         D
Reports                     Mixed/Dummy   D where applicable
```

This matrix should be documented in `DOCS/API_INTEGRATION_STATUS.md`.

---

# 28. Do not duplicate API helper logic

Current frontend has several generic request helpers.

Before adding more hooks:

1. audit `src/hooks/general.ts`,
2. understand its supported HTTP methods,
3. understand pagination behavior,
4. understand query param support,
5. understand mutation ID behavior,
6. reuse it only when its semantics match the endpoint.

If it does not support a required case cleanly, improve the abstraction once rather than working around it on every page.

Examples of cases that need explicit correctness:

```text
PUT vs POST
PATCH vs PUT
query parameters
multipart/form-data
path IDs
pagination metadata
response envelope normalization
```

---

# 29. React Query requirements

For all API-backed data:

- query keys must include every filter that changes the result;
- page and limit must be part of paginated keys;
- mutations must invalidate the exact related queries;
- do not fetch all users/courses merely to filter them in the browser;
- use loading, error, empty, and success states;
- prevent duplicate submissions;
- keep staleTime appropriate for stable reference data such as academic years.

Example:

```ts
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: UserFilters) => [...userKeys.lists(), params] as const,
};
```

---

# 30. Page-level UX standard

Every substantial page should contain, where relevant:

```text
Page title
Short description
Data source flag when dummy
Primary action
Secondary actions
Search
Filters
Summary cards
Main data region
Pagination
Loading state
Empty state
Error state
Responsive layout
```

Do not create pages that are only:

```tsx
<h1>Assignments</h1>
<p>Coming soon</p>
```

Every route must be meaningfully curated.

---

# 31. Dashboard visual direction

Use the supplied Upskila-style references as layout inspiration, not as a literal clone.

Desired characteristics:

- left navigation shell;
- compact top header;
- calendar/date strip where useful;
- clear role-focused primary workspace;
- right contextual panel on screens that benefit from it;
- stacked interactive schedule cards;
- progress indicators;
- performance cards;
- recent activity;
- consistent rounded cards;
- subtle borders;
- restrained use of orange;
- clean hierarchy;
- information-dense but breathable layout.

Do not make every dashboard structurally identical.

Each role should answer a different question:

```text
Admin    → What needs operational attention?
Teacher  → What am I teaching / grading / managing today?
Student  → What do I need to learn / submit / attend next?
Guardian → How is my child doing and what requires my attention?
Bursar   → What is the school's financial position and what needs verification?
```

---

# 32. Responsive requirements

Every page must work intentionally at:

```text
mobile
tablet
desktop
wide desktop
```

Test approximately:

```text
375px
430px
768px
1024px
1280px
1440px+
```

Rules:

- no accidental horizontal page scroll;
- tables should adapt through responsive wrappers or mobile row/card patterns;
- forms should become single-column when needed;
- filter bars should stack;
- sidebars must collapse using the current Shadcn sidebar system;
- right contextual dashboard rails should collapse below main content on smaller screens;
- stat card grids should adapt predictably;
- modals must fit viewport height;
- touch targets must remain usable;
- charts must not overflow;
- long names/emails must not break layouts.

---

# 33. Navigation architecture

Use one source of truth per role.

Avoid a situation where:

```text
paths.ts says route exists
Sidebar links to route
Router does not define route
Page does not exist
```

Recommended pattern:

```ts
interface RoleNavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  permission?: string;
  children?: RoleNavItem[];
}
```

Keep role navigation configuration centralized.

Use Lucide icons instead of broken emoji glyphs.

The current legacy `Sidebar.tsx` contains malformed emoji characters for some items. Remove/rework it if it is still used, or ensure only the newer AppSidebar is canonical.

---

# 34. Error behavior

Do not send users to 404 for a known navigation destination.

Use 404 only when the route genuinely does not exist.

Known but unauthorized:

```text
Unauthorized page
```

Known, authenticated, but backend data unavailable:

```text
Page still renders
Dummy data if designed for it
D flag
```

Known API-backed page with request failure:

```text
Clear recoverable error state
Retry action where appropriate
```

---

# 35. Semantic application data model for dummy domains

Use domain language that can guide backend implementation later.

## Student

```text
Student
Enrollment
AcademicYear
Term
Level
Department
Course
Assignment
Assessment
Grade
AttendanceRecord
TimetableEntry
Notification
FeeBalance
Payment
```

## Teacher

```text
Teacher
TeacherCourse
TeacherStudent
Assignment
GradeQueue
AttendanceClass
ScheduleEntry
Certification
TeacherReportMetric
```

## Guardian

```text
Guardian
GuardianChild
ChildAcademicSummary
ChildAttendanceSummary
ChildGrade
ChildFeeAccount
ChildPayment
GuardianMessage
GuardianEvent
```

## Finance

```text
FeeType
FeeStructure
Invoice
InvoiceItem
Payment
Receipt
Discount
Scholarship
ReconciliationEntry
FinanceMetric
```

Do not use `any` for new dummy contracts.

---

# 36. Student 360 page direction

The existing Admin Student View should evolve toward:

```text
Student header
- Name
- Student ID
- Level
- Department
- Status

Tabs:
Overview
Academic
Attendance
Results
Finance
Guardians
Documents
Activity
```

API-backed fields may remain live.

Missing tabs may be fed by typed dummy data and individually show `D`.

---

# 37. Assessment / gradebook future frontend

Even before APIs exist, curate realistic pages for currently visible grades/assignments routes.

Teacher flow:

```text
Assignments
Create assignment
Assignment detail
Submission list
Review submission
Score
Feedback

Gradebook
Course selector
Class selector
Assessment columns
Student rows
Score entry
Save draft
Submit / publish placeholder state
```

Student flow:

```text
Assignments
Assignment detail
Submission status
Due date
Attachments placeholder
Grade / feedback

Grades
Summary
Subject breakdown
Recent assessments
Trend
Term selector
```

Guardian flow:

```text
Grades
Child selector
Academic average
Subject performance
Recent assessments
Teacher remarks
```

Mark dummy-backed pages/sections with `D`.

---

# 38. Attendance future frontend

Admin:

```text
Attendance overview
Daily attendance
Class filters
Student status
Trends
Absence list
Late arrivals
Reports
```

Teacher:

```text
Today's classes
Select class
Mark:
Present
Absent
Late
Excused
Save
Recent attendance
```

Student:

```text
Overall attendance %
Monthly trend
Subject/class attendance
Absence history
Late history
```

Guardian:

```text
Selected child
Attendance rate
Recent absences
Recent lateness
Trend
```

Until backend endpoints exist, use dummy data + `D`.

---

# 39. Communication future frontend

Differentiate:

```text
Notification  = system-generated event
Message       = human communication
Announcement  = broadcast content
```

Create interfaces/dummy data accordingly.

Admin communication:

```text
Announcements
Compose broadcast
Audience
Recent messages
Delivery summary
```

Teacher:

```text
Class messages
Guardian communication
Announcements
```

Student:

```text
School announcements
Teacher messages
```

Guardian:

```text
School announcements
Teacher messages
```

Existing notification API stays API-backed.

---

# 40. Reports

Reports pages should feel useful now.

Dummy report categories can include:

```text
Enrollment
Attendance
Academic performance
Course distribution
Teacher workload
Fee collection
Outstanding balances
Library activity
```

Use realistic charts/tables, not empty cards.

Use `D` for dummy report datasets.

Prepare export buttons as UI only unless a real export implementation exists.

Do not fake downloaded files.

---

# 41. Forms

All forms must:

- use programmatic labels;
- show required indicators consistently;
- use Zod/React Hook Form where already established;
- validate before submit;
- preserve server validation messages;
- disable submit while pending;
- prevent duplicate submission;
- display theme-aware errors;
- focus the first invalid field where practical;
- preserve dirty-form protection on substantial forms;
- work on mobile.

Do not create bespoke form styling per page.

---

# 42. Tables

Create/reuse a single preferred DataTable pattern.

Capabilities where relevant:

```text
Search
Filter
Sort
Pagination
Empty state
Loading skeleton
Row action menu
Responsive behavior
```

Do not load large server datasets only to paginate them in memory when API pagination exists.

---

# 43. Shared components to introduce or standardize

Recommended:

```text
src/components/shared/
├── PageHeader.tsx
├── DataSourceFlag.tsx
├── StatCard.tsx
├── MetricCard.tsx
├── EmptyState.tsx
├── ErrorState.tsx
├── LoadingState.tsx
├── FilterBar.tsx
├── SearchField.tsx
├── ActivityTimeline.tsx
├── StatusBadge.tsx
├── ProgressRing.tsx
├── SectionCard.tsx
├── DetailList.tsx
└── ResponsiveDataTable.tsx
```

Avoid duplicating components that already exist in Shadcn or the repo.

Before adding a new component, search:

```text
src/components/ui/
src/components/common/
src/components/shared/
```

Long-term, consolidate overlapping `common` and `ui` components instead of expanding two parallel primitive libraries.

---

# 44. Public and protected shell consistency

Public and protected pages may have different navigation layouts, but they must share:

```text
font
primary color
semantic color system
border treatment
radius language
button language
focus behavior
form language
theme behavior
motion language
brand/logo usage
```

The public shell should feel like the same product family as the portal.

---

# 45. Accessibility

Minimum:

- semantic headings;
- unique page H1;
- labels on every form control;
- keyboard operability;
- focus-visible states;
- accessible menu buttons;
- aria-labels for icon-only actions;
- sufficient contrast;
- errors not shown by color alone;
- meaningful alt text for content images;
- decorative images should use empty alt;
- tooltips for ambiguous icons;
- `D` flag must have accessible explanatory text.

---

# 46. Implementation phases

Do the work in controlled phases.

## Phase 0 — Baseline

1. Run current build.
2. Run lint.
3. Document existing compile/lint failures separately.
4. Do not confuse pre-existing issues with new ones.
5. Preserve working auth.

## Phase 1 — Routing integrity

1. Deduplicate PublicRoutes.
2. Add `/compact`.
3. Compare every nav item to route constants.
4. Compare every route constant to router entries.
5. Compare every router entry to page files.
6. Create all missing pages.
7. Ensure role index redirects work.
8. Ensure only genuinely unknown routes hit 404.

## Phase 2 — Theme normalization

1. Treat Login styling/tokens as source of truth.
2. Replace hardcoded light-only styles.
3. Fix protected pages.
4. Fix public pages.
5. Fix shared components.
6. Test every route in both modes.

## Phase 3 — Public website

Revamp:

```text
/
/compact
/academics
/admissions
/contact
```

Then harmonize remaining public pages.

Remove developer-facing login copy.

## Phase 4 — API audit and repair

Implement every documented Postman endpoint where appropriate.

Fix:

```text
ignored query params
wrong HTTP verbs
wrong IDs
undocumented endpoint assumptions
legacy hooks
notification filters
course filters
teacher filters
student academicYearId
admin role/status/search filters
```

Create:

```text
DOCS/API_INTEGRATION_STATUS.md
```

## Phase 5 — Dummy data foundation

Create:

```text
src/data/admin/
src/data/student/
src/data/teacher/
src/data/guardian/
src/data/bursary/
src/data/public/
```

Move new dummy datasets there.

Gradually migrate useful existing hardcoded page arrays out of components.

Create `DataSourceFlag`.

## Phase 6 — Student portal completion

Curate all Student routes and dashboard.

## Phase 7 — Teacher portal completion

Curate all Teacher routes and dashboard.

## Phase 8 — Guardian portal completion

Curate all Guardian routes and dashboard.

## Phase 9 — Admin enhancement

Improve existing screens and dashboard, especially mixed API/dummy data transparency.

## Phase 10 — Finance scaffold

Prepare finance/bursary frontend domain and data contracts without pretending the backend already supports authenticated bursary operations.

## Phase 11 — QA

Run:

```bash
bun run build
bun run lint
```

or the repository-equivalent package manager scripts.

Fix errors caused by this work.

Perform route/theme/responsive QA.

---

# 47. Route QA checklist

Create a temporary developer checklist and test every route manually.

## Public

```text
/
 /compact
/about
/programs
/academics
/admissions
/faculty
/library
/events
/clubs
/guidance
/alumni
/contact
/privacy-policy
/terms-of-service
/cookies-policy
/student-handbook
/login
/session-expired
/unauthorized
```

## Admin

```text
/adn/dashboard
/adn/users
/adn/students
/adn/students/onboard
/adn/students/bulk-upload
/adn/students/:id
/adn/students/:id/edit
/adn/faculty
/adn/faculty/create
/adn/faculty/:id
/adn/faculty/:id/edit
/adn/courses
/adn/courses/create
/adn/courses/:id
/adn/courses/:id/edit
/adn/library
/adn/attendance
/adn/grades
/adn/notifications
/adn/reports
/adn/settings
/adn/communication
/adn/calendar
```

## Teacher

```text
/fcy/dashboard
/fcy/profile
/fcy/certifications
/fcy/courses
/fcy/courses/:id
/fcy/students
/fcy/students/:id
/fcy/assignments
/fcy/assignments/create
/fcy/assignments/:id
/fcy/assignments/:id/edit
/fcy/grades
/fcy/attendance
/fcy/communication
/fcy/calendar
/fcy/reports
```

## Student

```text
/sdt/dashboard
/sdt/enroll
/sdt/enrollments
/sdt/courses
/sdt/courses/:id
/sdt/assignments
/sdt/assignments/:id
/sdt/grades
/sdt/attendance
/sdt/communication
/sdt/calendar
/sdt/profile
```

## Guardian

```text
/gdn/dashboard
/gdn/children
/gdn/children/:id
/gdn/grades
/gdn/attendance
/gdn/communication
/gdn/calendar
/gdn/payments
```

---

# 48. Definition of done for a page

A page is **not done** because it compiles.

A route is done when:

```text
[ ] It resolves correctly.
[ ] It does not fall through to 404.
[ ] It has complete school-appropriate content.
[ ] It uses the central theme tokens.
[ ] It works in light mode.
[ ] It works in dark mode.
[ ] It is responsive.
[ ] It has loading behavior if API-backed.
[ ] It has error behavior if API-backed.
[ ] It has an empty state where applicable.
[ ] It uses API data where a supported endpoint exists.
[ ] It uses typed dummy data when an endpoint does not exist.
[ ] It shows D when dummy-backed.
[ ] It does not expose developer notes.
[ ] It has no obvious TypeScript errors.
[ ] It does not use unnecessary any types in new contracts.
[ ] It reuses shared UI primitives.
[ ] It has accessible headings/labels/actions.
```

---

# 49. Definition of done for an API integration

```text
[ ] Endpoint exists in the supplied Postman collection.
[ ] Correct HTTP verb is used.
[ ] Correct path is used.
[ ] Required path ID is supplied.
[ ] Query params are actually passed.
[ ] Request DTO matches API validation.
[ ] Response envelope is handled correctly.
[ ] Auth is inherited from Axios/session handling.
[ ] Query key contains filters.
[ ] Loading state exists.
[ ] Error state exists.
[ ] Mutation pending state prevents duplicate action.
[ ] Related queries are invalidated/refreshed.
[ ] Unsupported endpoint assumptions are removed.
```

---

# 50. Do not do these things

Do not:

- rewrite authentication because of unrelated UI work;
- change the backend contract to fit a frontend assumption;
- invent endpoints;
- label dummy content as live;
- hide route failures with broad redirects;
- create blank placeholder pages;
- put all dummy data in `mockData.ts`;
- put large dummy arrays directly inside page components;
- scatter colors across JSX;
- style only light mode;
- style only desktop;
- create separate design languages by role;
- use raw emoji as the primary icon system;
- duplicate existing Shadcn primitives;
- add technical implementation copy to public pages;
- use API "my profile" endpoints to fetch arbitrary users;
- call `POST` just because a generic create hook is convenient when the API expects `PUT`;
- silently swallow API errors;
- use `any` for every new data model.

---

# 51. Important current-code issues discovered during review

Address these explicitly.

## Routing

- `PublicRoutes.tsx` duplicates `/programs`, `/admissions`, and `/contact`.
- `/compact` is missing.
- Faculty path constants/navigation include routes not implemented by `FacultyRouter`.
- Student path constants/navigation include routes not implemented by `StudentRouter`.
- Guardian path constants/navigation include routes not implemented by `GuardianRouter`.
- Known nav routes currently fall into role-level NotFound.

## Login

Remove visible developer copy:

```text
Use your seeded API credentials where available.
The form keeps your current login hook and route redirection logic intact.
```

Keep the real login hook/redirection behavior.

## Theme

- Current token system is good enough to standardize around.
- Several older pages still use light-only classes.
- Guardian dashboard is an obvious example with hardcoded gray text.
- Audit all legacy/common components.

## API

- Several hooks accept filters but do not visibly send them.
- Some hooks assume undocumented endpoints.
- Some course operations risk incorrect ID/method handling.
- Course teacher assignment API expects `PUT`.
- Notification list filters need to be passed.
- Book detail/update/delete are not documented by the collection.
- Dashboard hook references `/auth/students` and `/auth/teachers`, which are not in the supplied collection.
- Generic `/user/...` and `/v1/users/...` hooks are not supported by this collection.
- `/enrollment` list endpoint is not supported by this collection.

## Data architecture

- There is currently no proper role-based `src/data/...` domain structure.
- Existing `src/utils/mockData.ts` should not remain the long-term home for application dummy data.
- Move new dummy datasets to role/domain files.

---

# 52. Recommended end-state frontend structure

Do not perform a destructive mass move immediately, but evolve toward:

```text
src/
├── app/
│   ├── providers/
│   ├── router/
│   └── config/
│
├── components/
│   ├── ui/
│   └── shared/
│
├── data/
│   ├── admin/
│   ├── student/
│   ├── teacher/
│   ├── guardian/
│   ├── bursary/
│   └── public/
│
├── modules/
│   ├── admissions/
│   ├── students/
│   ├── guardians/
│   ├── academics/
│   ├── attendance/
│   ├── timetable/
│   ├── assessments/
│   ├── gradebook/
│   ├── finance/
│   ├── library/
│   ├── communication/
│   └── reports/
│
├── data-access/
│   ├── clients/
│   └── repositories/
│
├── hooks/
├── services/
├── schemas/
├── models/
├── router/
├── layouts/
├── utils/
├── styles/
└── tests/
```

Do not create parallel folders with duplicated responsibility merely to match this tree. Adapt the existing project carefully.

---

# 53. Final implementation outcome

When this implementation pass is complete, the application should demonstrate:

1. A professional Fortis school website.
2. A coherent Login experience with no developer-facing copy.
3. One design token system across public and protected pages.
4. Complete dark/light mode coverage.
5. Responsive behavior throughout.
6. No visible navigation route landing on blank/404 pages.
7. Fully curated Student portal.
8. Fully curated Teacher portal.
9. Fully curated Guardian portal.
10. Enhanced Admin portal.
11. All supported backend endpoints correctly integrated where applicable.
12. No frontend pretending unsupported endpoints exist.
13. Typed dummy data for backend gaps.
14. `D` flags identifying dummy-backed pages/sections.
15. A domain/data structure that can directly guide future backend implementation.
16. Full, information-rich dashboards inspired by the supplied UI references without copying them literally.
17. A codebase that remains maintainable rather than becoming a set of route-specific hacks.

---

# 54. Required implementation report after coding

After making changes, produce:

```text
1. Files added
2. Files modified
3. Routes added/fixed
4. API endpoints connected/fixed
5. Unsupported endpoint assumptions removed
6. Dummy-data files added
7. Pages carrying D flags
8. Theme fixes completed
9. Public pages revamped
10. Remaining backend endpoint gaps
11. Build result
12. Lint result
13. Known remaining issues
14. Recommended next implementation phase
```

Do not simply say "done".

---

# 55. Immediate execution priority

Start in this exact order:

```text
1. Audit current build.
2. Fix route/nav integrity.
3. Remove developer content from Login.
4. Normalize theme usage.
5. Revamp /compact, /academics, /admissions, /contact.
6. Audit all 36 Postman requests against frontend hooks.
7. Fix confirmed API integration defects.
8. Introduce src/data role structure + DataSourceFlag.
9. Complete Student pages.
10. Complete Teacher pages.
11. Complete Guardian pages.
12. Enhance Admin pages/dashboard.
13. Scaffold Bursary/Finance data/domain for later backend work.
14. Responsive + dark/light QA.
15. Build/lint and issue implementation report.
```

This is the working implementation guide. Preserve existing functionality while closing the routing, design-system, content, API-integration, dummy-data, responsiveness, and role-portal gaps systematically.
