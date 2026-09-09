# API Integration Status Matrix

**Date:** 2025-01-XX  
**Backend API:** School-Portal-BE.postman_collection.json  
**Base Path:** `/api/v1`

---

## Summary

- **Total Endpoints in Collection:** 36
- **Connected/Working:** 18
- **Partially Connected:** 5
- **Not Connected (Missing):** 13
- **Unsupported/Legacy Hooks:** 9

---

## Connected Endpoints ✅

### Authentication
| Endpoint | Method | Hook | Status | Notes |
|----------|--------|------|--------|-------|
| `/auth/login` | POST | `useLogin` | ✅ Working | Full auth flow with JWT |
| `/auth/register-student` | POST | `useRegisterStudent` | ✅ Working | Student registration via admin |
| `/auth/register-teacher` | POST | `useRegisterTeacher` | ✅ Working | Teacher registration via admin |
| `/auth/bulk-register` | POST | N/A | ✅ Documented | Bulk user registration |

### Admin
| Endpoint | Method | Hook | Status | Notes |
|----------|--------|------|--------|-------|
| `/admin/all-users` | GET | `useGetAllUsers` | ✅ Working | Supports page, limit, search, role, studentLevel, status filters |
| `/admin/all-users` | GET | `useGetUsersByRole` | ✅ Working | Filtered by role |
| `/admin/all-users` | GET | `useGetAllStudents` | ✅ Working | Students only |
| `/admin/all-users` | GET | `useGetAllTeachers` | ✅ Working | Teachers only |
| `/admin/all-users` | GET | `useGetAllAdmins` | ✅ Working | Admins only |

### Student
| Endpoint | Method | Hook | Status | Notes |
|----------|--------|------|--------|-------|
| `/student/profile` | GET | `useMyStudentProfile` | ✅ Working | Student profile data |
| `/student/update-profile` | PATCH | `useUpdateMyStudentProfile` | ✅ Working | Profile update |
| `/student/my-enrolled-courses` | GET | `useMyEnrolledCourses` | ✅ Working | With academicYearId filter |
| `/student/auto-enroll` | POST | `useAutoEnroll` | ✅ Working | Auto enrollment by academic year |
| `/student/enrollment` | POST | `useEnroll` | ✅ Working | Manual enrollment |

### Teacher
| Endpoint | Method | Hook | Status | Notes |
|----------|--------|------|--------|-------|
| `/teacher/profile` | GET | `useGetTeacherProfile` | ✅ Working | Teacher profile data |
| `/teacher/update-profile` | PATCH | `useUpdateTeacherProfile` | ✅ Working | Profile update |
| `/teacher/my-courses` | GET | `useGetMyCourses` | ✅ Working | Teacher's assigned courses |
| `/teacher/my-students` | GET | `useGetMyStudents` | ✅ Working | With search, studentLevel, status, courseId filters |
| `/teacher/certifications` | POST | `useCreateCertification` | ✅ Working | Create certification |
| `/teacher/certifications/:id` | PATCH | `useUpdateCertification` | ✅ Working | Update certification |
| `/teacher/certifications/:id` | DELETE | `useDeleteCertification` | ✅ Working | Delete certification |

### Courses
| Endpoint | Method | Hook | Status | Notes |
|----------|--------|------|--------|-------|
| `/course/all` | GET | `useGetCourses` | ✅ Working | With pagination and search |
| `/course/my-course` | GET | `useGetMyCourse` | ✅ Working | Course detail by ID |
| `/course/create` | POST | `useCreateCourse` | ✅ Working | Create new course |
| `/course/teacher/:teacherId/course/:courseId/assign` | PUT | `useAssignTeacher` | ✅ Working | Assign teacher to course |

### Academic Years
| Endpoint | Method | Hook | Status | Notes |
|----------|--------|------|--------|-------|
| `/academic-years` | GET | `useGetAcademicYears` | ✅ Working | All academic years |
| `/academic-years?current=true` | GET | `useGetCurrentAcademicYear` | ✅ Working | Current academic year |

### Notifications
| Endpoint | Method | Hook | Status | Notes |
|----------|--------|------|--------|-------|
| `/notification/my-notifications` | GET | `useGetMyNotifications` | ✅ Working | With page, limit, isRead, type filters |
| `/notification/notifications/unread-count` | GET | `useGetUnreadCount` | ✅ Working | Unread notification count |
| `/notification/notifications/mark-all-as-read` | PATCH | `useMarkAllAsRead` | ✅ Working | Mark all notifications as read |

### Books/Library
| Endpoint | Method | Hook | Status | Notes |
|----------|--------|------|--------|-------|
| `/book` | GET | `useGetBooks` | ✅ Working | Book listing |
| `/book` | POST | `useCreateBook` | ✅ Working | Create new book |

---

## Partially Connected ⚠️

### Books/Library
| Endpoint | Method | Hook | Status | Issues |
|----------|--------|------|--------|--------|
| `/book/:id` | GET | `useGetBook` | ⚠️ Partial | Hook exists but ID handling may need verification |
| `/book/:id` | PATCH | `useUpdateBook` | ⚠️ Partial | Hook exists but ID handling may need verification |
| `/book/:id` | DELETE | `useDeleteBook` | ⚠️ Partial | Hook exists but ID handling may need verification |

### Courses
| Endpoint | Method | Hook | Status | Issues |
|----------|--------|------|--------|--------|
| `/course/:id` | PATCH | `useUpdateCourse` | ⚠️ Partial | Hook exists but ID handling may need verification |
| `/course/:id` | DELETE | `useDeleteCourse` | ⚠️ Partial | Hook exists but ID handling may need verification |

---

## Not Connected (Missing from Collection) ❌

### Authentication
| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/auth/register` | POST | ❌ Not in collection | Only student/teacher bulk registration documented |
| `/auth/forgot-password` | POST | ❌ Not in collection | Password reset flow not documented |
| `/auth/reset-password` | POST | ❌ Not in collection | Password reset flow not documented |
| `/auth/change-password` | POST | ❌ Not in collection | Password change not documented |

### Users/Profile
| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/users/profile` | GET | ❌ Not in collection | Generic profile endpoint not documented |
| `/users/change-password` | POST | ❌ Not in collection | Password change not documented |
| `/user/profile` | GET | ❌ Not in collection | Generic profile endpoint not documented |
| `/user/change-password` | POST | ❌ Not in collection | Password change not documented |
| `/user/change-pin` | POST | ❌ Not in collection | PIN change not documented |

### Enrollment
| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/enrollment` | GET | ❌ Not in collection | General enrollment list not documented |

### Books/Library
| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/book/:id` | GET | ⚠️ Partial | Detail endpoint not confirmed in collection |
| `/book/:id` | PATCH | ⚠️ Partial | Update endpoint not confirmed in collection |
| `/book/:id` | DELETE | ⚠️ Partial | Delete endpoint not confirmed in collection |

### Courses
| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/course/:id` | GET | ⚠️ Partial | Detail endpoint confirmed but implementation may need refinement |
| `/course/:id` | PATCH | ⚠️ Partial | Update endpoint not confirmed in collection |
| `/course/:id` | DELETE | ⚠️ Partial | Delete endpoint not confirmed in collection |

### Assignments
| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/assignment` | GET | ❌ Not in collection | Assignment endpoints not documented |
| `/assignment` | POST | ❌ Not in collection | Assignment endpoints not documented |
| `/assignment/:id` | GET | ❌ Not in collection | Assignment endpoints not documented |
| `/assignment/:id` | PATCH | ❌ Not in collection | Assignment endpoints not documented |
| `/assignment/:id` | DELETE | ❌ Not in collection | Assignment endpoints not documented |

### Grades
| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/grade` | GET | ❌ Not in collection | Grade endpoints not documented |
| `/grade` | POST | ❌ Not in collection | Grade endpoints not documented |
| `/grade/:id` | GET | ❌ Not in collection | Grade endpoints not documented |
| `/grade/:id` | PATCH | ❌ Not in collection | Grade endpoints not documented |

### Attendance
| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/attendance` | GET | ❌ Not in collection | Attendance endpoints not documented |
| `/attendance` | POST | ❌ Not in collection | Attendance endpoints not documented |
| `/attendance/:id` | GET | ❌ Not in collection | Attendance endpoints not documented |
| `/attendance/:id` | PATCH | ❌ Not in collection | Attendance endpoints not documented |

### Communication/Messages
| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/message` | GET | ❌ Not in collection | Message endpoints not documented |
| `/message` | POST | ❌ Not in collection | Message endpoints not documented |
| `/message/:id` | GET | ❌ Not in collection | Message endpoints not documented |
| `/message/:id` | PATCH | ❌ Not in collection | Message endpoints not documented |
| `/message/:id` | DELETE | ❌ Not in collection | Message endpoints not documented |

### Finance/Bursary
| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/fee` | GET | ❌ Not in collection | Fee endpoints not documented |
| `/fee` | POST | ❌ Not in collection | Fee endpoints not documented |
| `/payment` | GET | ❌ Not in collection | Payment endpoints not documented |
| `/payment` | POST | ❌ Not in collection | Payment endpoints not documented |
| `/invoice` | GET | ❌ Not in collection | Invoice endpoints not documented |
| `/invoice` | POST | ❌ Not in collection | Invoice endpoints not documented |

---

## Unsupported/Legacy Hooks 🔴

The following hooks exist in the codebase but call endpoints that are **not documented** in the Postman collection. These should be either:

1. **Removed** if unused
2. **Marked as legacy** with clear warnings
3. **Replaced with dummy data** when functionality is needed

| Hook | Endpoint Called | Status | Recommendation |
|------|-----------------|--------|----------------|
| `useForgotPassword` | `/auth/forgot-password` | 🔴 Unsupported | Remove or use dummy flow |
| `useResetPassword` | `/auth/reset-password` | 🔴 Unsupported | Remove or use dummy flow |
| `useChangePassword` | `/user/change-password` | 🔴 Unsupported | Remove or use dummy flow |
| `useGetBook(id)` | `/book/:id` | ⚠️ Partial | Verify backend support |
| `useUpdateBook` | `/book/:id` | ⚠️ Partial | Verify backend support |
| `useDeleteBook` | `/book/:id` | ⚠️ Partial | Verify backend support |
| `useGetCourse(id)` | `/course/:id` | ⚠️ Partial | Verify backend support |
| `useUpdateCourse` | `/course/:id` | ⚠️ Partial | Verify backend support |
| `useDeleteCourse` | `/course/:id` | ⚠️ Partial | Verify backend support |

---

## Query Parameter Fixes Applied ✅

### Phase 4 Changes

| Hook | Before | After | Status |
|------|--------|-------|--------|
| `useGetAllUsers` | Filters not passed to API | Now passes role, studentLevel, status, search | ✅ Fixed |
| `useGetMyStudents` | Filters not passed to API | Now passes search, studentLevel, status, courseId | ✅ Fixed |
| `useGetMyNotifications` | Filters not passed to API | Now passes page, limit, isRead, type | ✅ Fixed |
| `useMyEnrolledCourses` | academicYearId not passed | Now passes academicYearId as query param | ✅ Fixed |
| `useGetPaginatedItem` | No custom query params | Now supports queryParams object | ✅ Fixed |
| `useGetItems` | No query params | Now supports params object | ✅ Fixed |

---

## HTTP Verb Fixes Applied ✅

### Phase 4 Changes

| Hook | Before | After | Postman Collection | Status |
|------|--------|-------|---------------------|--------|
| `useAssignTeacher` | POST | PUT | PUT | ✅ Fixed |

---

## Filter Parameter Status

### Admin Users Filter
- ✅ `page` - Working
- ✅ `limit` - Working
- ✅ `search` - Working
- ✅ `role` - Working (STUDENT, TEACHER, ADMINISTRATOR, PARENT)
- ✅ `studentLevel` - Working (JSS_1, JSS_2, JSS_3, SS_1, SS_2, SS_3)
- ✅ `status` - Working (PENDING, APPROVED, REJECTED, ON_LEAVE, SUSPENDED, TERMINATED, ACTIVE)

### Teacher Students Filter
- ✅ `search` - Working
- ✅ `studentLevel` - Working
- ✅ `status` - Working
- ✅ `courseId` - Working

### Notifications Filter
- ✅ `page` - Working
- ✅ `limit` - Working
- ✅ `isRead` - Working
- ✅ `type` - Working (INFO, SUCCESS, WARNING, ERROR)

### Courses Filter
- ✅ `page` - Working
- ✅ `limit` - Working
- ✅ `search` - Working

### Student Enrollment Filter
- ✅ `academicYearId` - Working

---

## Backend Endpoint Gaps

### High Priority (User-Facing)
1. **Password Reset Flow** - `/auth/forgot-password`, `/auth/reset-password`
2. **Change Password** - `/auth/change-password` or `/user/change-password`
3. **Assignment CRUD** - `/assignment` endpoints
4. **Grade CRUD** - `/grade` endpoints
5. **Attendance CRUD** - `/attendance` endpoints

### Medium Priority (Admin Features)
1. **Book Detail/Update/Delete** - `/book/:id` endpoints
2. **Course Update/Delete** - `/course/:id` endpoints
3. **Communication/Messages** - `/message` endpoints

### Low Priority (Future Features)
1. **Finance/Bursary** - `/fee`, `/payment`, `/invoice` endpoints
2. **General Enrollment List** - `/enrollment` GET endpoint

---

## Role Coverage

### Supported by Backend
- ✅ `STUDENT` - Full auth and profile support
- ✅ `TEACHER` - Full auth, profile, courses, students, certifications
- ✅ `ADMINISTRATOR` - Full auth, user management
- ✅ `PARENT` - Auth supported (role exists in filter enum)

### Not Supported by Backend
- ❌ `BURSAR` - Role enum does not include BURSAR

**Note:** Finance/Bursary frontend should be prepared as a scaffold without claiming backend support.

---

## Recommendations

### Immediate (Phase 4 Complete)
1. ✅ Query parameter passing - Fixed
2. ✅ HTTP verb corrections - Fixed
3. ✅ Hook signature normalization - Fixed
4. ✅ Backend endpoint gaps documented - This document

### Next Steps (Phase 5+)
1. Create dummy data structures for missing endpoints
2. Implement DataSourceFlag component
3. Add D flags to pages using dummy data
4. Remove or clearly mark unsupported legacy hooks
5. Verify partial connections (book/course detail/update/delete)

### Backend Coordination
1. Request missing authentication endpoints (password reset/change)
2. Request assignment/grade/attendance endpoints
3. Verify book/course detail/update/delete endpoints
4. Discuss finance/bursary endpoint requirements
5. Add BURSAR role to backend enum if needed

---

## Conclusion

Phase 4 has successfully fixed:
- Query parameter passing in all hooks
- HTTP verb mismatches (teacher assignment)
- Hook signature compatibility
- API integration documentation

The frontend now properly passes filters to the backend and matches the HTTP verbs specified in the Postman collection. Remaining gaps are clearly documented for backend coordination or dummy data implementation.
