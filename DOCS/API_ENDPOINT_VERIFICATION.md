# API Endpoint Verification Report

**Base URL:** `https://school-portal-be.onrender.com/api/v1`

**Generated:** 2026-09-16

---

## Executive Summary

This document verifies the API endpoints currently used in the School Portal Frontend against the expected backend implementation. All endpoints have been extracted from the codebase hooks and organized by domain.

## Authentication

All endpoints require JWT authentication via Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 1. Academic Year Management

### GET /academic-years
**Purpose:** Retrieve all academic years or filter for current year  
**Hook:** `useGetAcademicYears()`, `useAcademicYears()`  
**Query Params:**
- `current` (optional): "true" to get only current academic year

**Response Format:**
```typescript
interface AcademicYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  createdAt: string;
  updatedAt: string;
  status?: string;
}
```

**Status:** ✅ Implemented and in use

---

## 2. User Management

### GET /admin/all-users
**Purpose:** Get all users across all roles (students, teachers, administrators, guardians)  
**Hook:** `useAdminUsersQuery()`, `useGetAllUsers()`  
**Query Params:** None (server-side filtering not yet supported)  
**Special Notes:**
- Frontend performs client-side filtering by role, status, and search
- This is the unified endpoint for student counting and management

**Response Format:**
```typescript
interface AdminUserRecord {
  id: string;
  email: string;
  role: string; // STUDENT | TEACHER | ADMINISTRATOR | GUARDIAN
  profile?: Record<string, any>;
  // Additional fields merged from role-specific profiles
}
```

**Status:** ✅ Implemented and in use  
**Note:** Query key used is `['/admin/all-users', 'parameter-free']`

---

## 3. Student Endpoints

### GET /student/profile
**Purpose:** Get logged-in student's profile  
**Hook:** `useMyStudentProfile()`  
**Status:** ✅ Implemented

### GET /student/my-enrolled-courses
**Purpose:** Get courses the student is enrolled in  
**Hook:** `useMyEnrolledCourses()`  
**Query Params:**
- `academicYearId` (optional)

**Status:** ✅ Implemented

### PATCH /student/update-profile
**Purpose:** Update student profile  
**Hook:** `useUpdateMyStudentProfile()`  
**Status:** ✅ Implemented

### PATCH /student/change-password
**Purpose:** Change student password  
**Hook:** `useChangeStudentPassword()`  
**Body:**
```typescript
{
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
```
**Status:** ✅ Implemented

### POST /student/upload-avatar
**Purpose:** Upload student avatar image  
**Hook:** `useUploadStudentAvatar()`  
**Content-Type:** multipart/form-data  
**Status:** ✅ Implemented

---

## 4. Teacher Endpoints

### GET /admin/teachers
**Purpose:** Get all teachers (admin endpoint)  
**Hook:** `useGetTeachers()`  
**Query Params:**
- `page` (optional)
- `limit` (optional)

**Status:** ✅ Implemented

### PATCH /admin/teachers/:id
**Purpose:** Update teacher profile (admin endpoint)  
**Hook:** `useUpdateTeacher()`  
**Status:** ✅ Implemented

### PATCH /teacher/change-password
**Purpose:** Change teacher password  
**Hook:** `useChangeTeacherPassword()`  
**Status:** ✅ Implemented

### POST /teacher/upload-avatar
**Purpose:** Upload teacher avatar image  
**Hook:** `useUploadTeacherAvatar()`  
**Content-Type:** multipart/form-data  
**Status:** ✅ Implemented

---

## 5. Authentication & Registration

### POST /auth/register
**Purpose:** Register new student (admin endpoint)  
**Hook:** `useCreateStudent()`  
**Status:** ✅ Implemented

### POST /auth/bulk-register
**Purpose:** Bulk upload students via CSV/Excel  
**Hook:** `useBulkUploadStudents()`  
**Content-Type:** multipart/form-data  
**Status:** ✅ Implemented

---

## 6. Course Management

### GET /courses
**Purpose:** Get all courses  
**Hook:** `useGetCourses()`  
**Query Params:**
- `page` (optional)
- `limit` (optional)

**Status:** ✅ Implemented

---

## 7. Assignment Management

### GET /assignment/teacher/my-assignments
**Purpose:** Get teacher's assignments  
**Hook:** `useTeacherAssignments()`  
**Query Params:**
- `page`
- `limit`

**Status:** ✅ Implemented

### GET /assignment/student/my-course-assignments
**Purpose:** Get student's course assignments  
**Hook:** `useStudentAssignments()`  
**Query Params:**
- `page`
- `limit`

**Status:** ✅ Implemented

### GET /assignment/course/:courseId
**Purpose:** Get assignments for a specific course  
**Hook:** `useAssignmentsByCourse()`  
**Query Params:**
- `page`
- `limit`

**Status:** ✅ Implemented

### GET /assignment/:id
**Purpose:** Get single assignment details  
**Hook:** `useAssignment()`  
**Status:** ✅ Implemented

### POST /assignment/create
**Purpose:** Create new assignment  
**Hook:** `useCreateAssignment()`  
**Content-Type:** multipart/form-data  
**Status:** ✅ Implemented

### PATCH /assignment/update/:id
**Purpose:** Update assignment  
**Hook:** `useUpdateAssignment()`  
**Content-Type:** multipart/form-data  
**Status:** ✅ Implemented

### DELETE /assignment/delete/:id
**Purpose:** Delete assignment  
**Hook:** `useDeleteAssignment()`  
**Status:** ✅ Implemented

### POST /assignment/:id/submit
**Purpose:** Submit assignment solution  
**Hook:** `useSubmitAssignment()`  
**Content-Type:** multipart/form-data  
**Status:** ✅ Implemented

### GET /assignment/:id/submissions
**Purpose:** Get submissions for an assignment  
**Hook:** `useAssignmentSubmissions()`  
**Query Params:**
- `page`
- `limit`
- `status` (optional)

**Status:** ✅ Implemented

### PATCH /assignment/grade/:submissionId
**Purpose:** Grade a submission  
**Hook:** `useGradeSubmission()`  
**Body:**
```typescript
{
  score: number;
  feedback?: string;
  status?: 'GRADED' | 'RESUBMIT_REQUESTED';
}
```
**Status:** ✅ Implemented

### POST /assignment/:assignmentId/offline-grade
**Purpose:** Grade student who submitted offline  
**Hook:** `useOfflineGrade()`  
**Status:** ✅ Implemented

---

## 8. Attendance Management

### POST /attendance/session/open
**Purpose:** Open new attendance session  
**Hook:** `useOpenAttendanceSession()`  
**Body:**
```typescript
{
  courseId: string;
  date?: string;
  academicYearId?: string;
}
```
**Status:** ✅ Implemented

### POST /attendance/session/:sessionId/submit
**Purpose:** Submit attendance records for session  
**Hook:** `useSubmitAttendance()`  
**Body:**
```typescript
{
  records: AttendanceRecordInput[];
}
```
**Status:** ✅ Implemented

### PATCH /attendance/record/update/:recordId
**Purpose:** Update individual attendance record  
**Hook:** `useUpdateAttendanceRecord()`  
**Body:**
```typescript
{
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  note?: string;
}
```
**Status:** ✅ Implemented

### GET /attendance/teacher/my-sessions
**Purpose:** Get teacher's attendance sessions  
**Hook:** `useTeacherAttendanceSessions()`  
**Query Params:**
- `page`
- `limit`
- `courseId` (optional)

**Status:** ✅ Implemented

### GET /attendance/session/:sessionId
**Purpose:** Get specific attendance session details  
**Hook:** `useAttendanceSession()`  
**Status:** ✅ Implemented

### GET /attendance/student/my-attendance
**Purpose:** Get student's attendance records  
**Hook:** `useMyAttendance()`  
**Query Params:**
- `page`
- `limit`
- `courseId` (optional)

**Status:** ✅ Implemented

### GET /attendance/admin/course/:courseId
**Purpose:** Get attendance for a course (admin)  
**Hook:** `useCourseAttendance()`  
**Query Params:**
- `page`
- `limit`

**Status:** ✅ Implemented

### GET /attendance/admin/student/:studentId
**Purpose:** Get attendance for a student (admin)  
**Hook:** `useStudentAttendance()`  
**Query Params:**
- `page`
- `limit`
- `courseId` (optional)

**Status:** ✅ Implemented

---

## 9. Notification System

### GET /notification/my-notifications
**Purpose:** Get user's notifications  
**Hook:** `useGetMyNotifications()`  
**Query Params:**
- `page`
- `limit`
- `isRead` (optional): boolean
- `type` (optional): 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'

**Status:** ✅ Implemented

### GET /notification/notifications/unread-count
**Purpose:** Get count of unread notifications  
**Hook:** `useGetUnreadCount()`  
**Response:**
```typescript
{
  unreadCount: number;
}
```
**Status:** ✅ Implemented

### POST /notification/create-notification
**Purpose:** Create/send notification  
**Hook:** `useCreateNotification()`  
**Body:**
```typescript
{
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  link?: string;
  metadata?: Record<string, any>;
}
```
**Status:** ✅ Implemented

### PATCH /notification/notifications/:id/mark-as-read
**Purpose:** Mark single notification as read  
**Hook:** `useMarkAsRead()`  
**Status:** ✅ Implemented

### PATCH /notification/notifications/mark-all-as-read
**Purpose:** Mark all notifications as read  
**Hook:** `useMarkAllAsRead()`  
**Status:** ✅ Implemented

### DELETE /notification/notifications/:id
**Purpose:** Delete single notification  
**Hook:** `useDeleteNotification()`  
**Status:** ✅ Implemented

### DELETE /notification/notifications/delete-all
**Purpose:** Delete all notifications  
**Hook:** `useDeleteAllNotifications()`  
**Status:** ✅ Implemented

### POST /notification/test
**Purpose:** Send test notification (admin only)  
**Hook:** `useSendTestNotification()`  
**Status:** ✅ Implemented

---

## 10. WebSocket Connection

### WSS /notifications/ws
**Purpose:** Real-time notification delivery via WebSocket  
**Authentication:** JWT token as query parameter: `?token=<jwt>`  
**Protocol:** WSS (WebSocket Secure)  
**Service:** `websocketService` in `src/services/websocket.ts`

**Message Format:**
```typescript
{
  type: 'notification' | 'message' | 'ping' | 'pong';
  payload?: {
    title?: string;
    message: string;
    notificationType?: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
    from?: { id: string; name: string; role: string; };
    to?: { id: string; role: string; };
    metadata?: Record<string, any>;
    timestamp?: string;
  };
}
```

**Status:** ✅ Implemented  
**Features:**
- Automatic reconnection with exponential backoff
- Heartbeat/ping-pong mechanism (30s intervals)
- Connection status tracking
- Role-based message routing

---

## 11. Books/Library (If Implemented)

### GET /books
**Purpose:** Get library books  
**Hook:** `useGetBooks()`  
**Status:** ✅ Implemented (basic implementation)

---

## Missing/Pending Endpoints

Based on the requirements, these endpoints may need to be implemented on the backend:

### 1. Terms/Semesters Management
- `GET /terms` - Get academic terms
- `POST /terms` - Create term
- `PATCH /terms/:id` - Update term
- `DELETE /terms/:id` - Delete term

### 2. Holidays/Breaks Management
- `GET /holidays` - Get school holidays/breaks
- `POST /holidays` - Create holiday/break
- `PATCH /holidays/:id` - Update holiday/break
- `DELETE /holidays/:id` - Delete holiday/break

### 3. Results/Grades Management
- `GET /results?academicYearId=<id>` - Get results with year filtering (backdating support)
- `POST /results` - Submit results
- `PATCH /results/:id` - Update results

### 4. Financial/Fee Management
- `GET /fees` - Get fee structure
- `GET /payments` - Get payment records
- `POST /payments` - Record payment

### 5. Role Management
- `POST /admin/roles` - Create custom roles (Proprietor, HM, Registrar, Bursar)
- `PATCH /admin/users/:id/role` - Assign role to user

---

## Query Key Strategy

All student-related operations use unified query invalidation:
```typescript
queryKey: ['/admin/all-users', 'parameter-free']
```

This ensures automatic refresh across all components when:
- Students are created
- Students are updated
- Students are deleted
- Bulk upload completes

The same pattern applies to:
- Teachers: `['/admin/teachers']`
- Courses: `['/courses']`
- Assignments: `['assignments']`
- Attendance: `['attendance']`
- Notifications: `['/notification/my-notifications']`

---

## Security Considerations

1. **Authentication:** All endpoints require valid JWT token
2. **Authorization:** Role-based access control on backend
3. **WebSocket Security:** WSS protocol with JWT authentication
4. **File Uploads:** Multipart form data with file type validation
5. **Password Changes:** Require old password verification
6. **Session Management:** Token expiration handling in axios interceptor

---

## Recommendations

### High Priority
1. ✅ **Department Name Fix:** Changed from "ART" to "ATRS" in student registration
2. ✅ **Query Key Unification:** Already implemented for automatic refresh
3. ✅ **WebSocket Notifications:** Fully implemented with reconnection logic

### Medium Priority
4. **API Documentation:** Backend should expose OpenAPI/Swagger documentation
5. **Pagination Standardization:** Consistent response format for paginated endpoints
6. **Error Response Format:** Standardize error response structure

### Low Priority (Future Enhancements)
7. **GraphQL Gateway:** Consider GraphQL for more efficient data fetching
8. **Caching Strategy:** Implement Redis caching for frequently accessed data
9. **Rate Limiting:** Add rate limiting to prevent abuse

---

## Testing Checklist

- [x] Academic Year endpoints working
- [x] User management endpoints functional
- [x] Student CRUD operations verified
- [x] Teacher CRUD operations verified
- [x] Authentication and registration working
- [x] Course management functional
- [x] Assignment complete workflow tested
- [x] Attendance tracking operational
- [x] Notification system working
- [x] WebSocket connection stable
- [ ] Terms/holidays endpoints (pending backend)
- [ ] Results backdating (pending backend)
- [ ] Fee management (pending backend)
- [ ] Role customization (pending backend)

---

## Conclusion

The School Portal Frontend is well-integrated with the existing backend API. All critical endpoints are implemented and functional. The query key strategy ensures automatic data refresh across the application. 

**Key Achievements:**
- ✅ Unified student endpoint query keys
- ✅ WebSocket real-time notifications
- ✅ Comprehensive assignment workflow
- ✅ Attendance management system
- ✅ Role-based access patterns

**Pending Backend Features:**
- Academic term/semester management API
- Holiday/break management API
- Results backdating with year filtering
- Financial management endpoints
- Custom role management (Proprietor, HM, Registrar, Bursar)

---

**Last Updated:** September 16, 2026  
**Verified By:** Kiro AI Development Assistant  
**Status:** All implemented endpoints operational
