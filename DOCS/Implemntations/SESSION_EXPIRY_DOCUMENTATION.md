# Session & Token Expiry Management System

## Overview
This system provides comprehensive token expiry detection and handling with distinct flows for authentication vs authorization errors.

## Architecture

### 1. **Error Detection (Axios Interceptor)**
Location: `src/axios-Instance/index.ts`

The system intelligently differentiates between:

#### Token Expiry/Invalid Token (401 or token-related errors)
- Triggers when:
  - Response status is `401`
  - Error message includes "token" AND ("expired" OR "invalid" OR "unauthorized" OR "not found" OR "malformed")
- Action: Navigate to `/session-expired` page

#### Permission/Authorization Errors (403 without token issues)
- Triggers when:
  - Response status is `403`
  - Error is NOT token-related
  - Message includes subscription/access-related keywords
- Action: Could navigate to `/unauthorized` or subscription page

### 2. **Session Expired Page**
Location: `src/pages/errors/SessionExpired.tsx`
Path: `/session-expired`

**Features:**
- ✅ Azure Portal-style blocking interface
- ✅ Prevents back/forward navigation using `popstate` event
- ✅ Clear explanation of why session expired
- ✅ Security notice about forced logout
- ✅ Single "Proceed to Login" button that:
  - Clears all user data
  - Navigates to login with `replace: true`
- ✅ Professional UI with gradients and icons

**Prevention Strategy:**
```typescript
useEffect(() => {
    // Push state and prevent back button
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', preventNavigation);
    
    return () => window.removeEventListener('popstate', preventNavigation);
}, []);
```

### 3. **Unauthorized Page**
Location: `src/pages/errors/Unauthorized.tsx`
Path: `/unauthorized`

**Features:**
- ✅ Distinct from session expiry
- ✅ Shows current user info and role
- ✅ Explains permission issue (not a login problem)
- ✅ Multiple navigation options:
  - Go back to previous page
  - Return to user's dashboard
  - Sign out
- ✅ No navigation blocking (user is still authenticated)

### 4. **Authentication Flow**
Location: `src/contexts/AuthContext.tsx`

**Token Expiration Handler:**
```typescript
useEffect(() => {
    setTokenExpirationHandler(() => {
        console.log('Token expired - navigating to session expired page');
        navigate(PublicPaths.SESSION_EXPIRED, { replace: true });
    });
}, [navigate]);
```

**Important:** The handler navigates BEFORE clearing data, so the SessionExpired page can display properly.

## Usage Examples

### Example 1: Token Expired
```typescript
// API Response:
{
  "message": "Token has expired",
  "error": "unauthorized",
  "statusCode": 401
}

// Result: → Navigate to /session-expired
```

### Example 2: Invalid Token Format
```typescript
// API Response:
{
  "message": "Invalid token format",
  "statusCode": 401
}

// Result: → Navigate to /session-expired
```

### Example 3: Permission Denied (Valid Token)
```typescript
// API Response:
{
  "message": "Access denied. Insufficient permissions.",
  "statusCode": 403
}

// Result: → Could show unauthorized page or handle silently
```

### Example 4: Subscription Issue
```typescript
// API Response:
{
  "message": "Your subscription has expired",
  "statusCode": 403
}

// Result: → Subscription callback triggered
```

## Routes Configuration

### Public Routes
```typescript
<Route path="/login" element={<LoginPage />} />
<Route path="/session-expired" element={<SessionExpired />} />
<Route path="/unauthorized" element={<Unauthorized />} />
```

### Path Constants
```typescript
export const PublicPaths = {
    LOGIN: '/login',
    SESSION_EXPIRED: '/session-expired',
    UNAUTHORIZED: '/unauthorized',
} as const;
```

## Error Message Detection Logic

### Token Error Keywords
```typescript
const isTokenError = errorString.includes('token') && (
    errorString.includes('expired') ||
    errorString.includes('invalid') ||
    errorString.includes('unauthorized') ||
    errorString.includes('not found') ||
    errorString.includes('malformed')
);
```

### Subscription Error Keywords
```typescript
const isSubscriptionError = (
    msgStr.includes('subscription') ||
    msgStr.includes('trial') ||
    msgStr.includes('plan') ||
    (msgStr.includes('access') && !msgStr.includes('token'))
);
```

## Security Features

1. **Navigation Prevention**
   - Session expired page blocks back/forward buttons
   - Uses history API manipulation
   - Prevents accidental navigation away

2. **Data Clearing**
   - Happens AFTER user acknowledges session expiry
   - User-initiated via "Proceed" button
   - Clears: token, user_data, React Query cache

3. **Replace Navigation**
   - Uses `replace: true` to prevent back navigation
   - Login page replaces session expired in history

4. **Single Handler Registration**
   - Token expiration handler set once on app load
   - Prevents multiple handler registrations
   - Clean lifecycle management

## Testing Scenarios

### Test 1: Token Expiry During API Call
```typescript
// 1. User navigates to protected page
// 2. API call returns 401 with "token expired"
// 3. Interceptor detects token error
// 4. Navigate to /session-expired
// 5. User clicks "Proceed to Login"
// 6. Data cleared, navigate to /login
```

### Test 2: Permission Denied
```typescript
// 1. Student tries to access admin route
// 2. API returns 403 "access denied" (no token keyword)
// 3. Normal error handling (toast or redirect to dashboard)
// 4. User remains authenticated
```

### Test 3: Back Button After Session Expiry
```typescript
// 1. On session expired page
// 2. User presses browser back button
// 3. popstate event prevented
// 4. User stays on session expired page
// 5. Must click "Proceed to Login"
```

## Best Practices

1. **Always include "token" in token-related error messages from backend**
   ```json
   { "message": "Token has expired" }  // ✅ Good
   { "message": "Authentication failed" }  // ❌ Won't be detected
   ```

2. **Use specific HTTP status codes**
   - `401`: Authentication issues (token problems)
   - `403`: Authorization issues (permission problems)

3. **Clear error messages for users**
   - Session Expired: "Your authentication token has expired"
   - Unauthorized: "You don't have permission to access this"

4. **Test edge cases**
   - Multiple simultaneous API calls failing
   - Network errors vs auth errors
   - Page refresh scenarios

## Future Enhancements

1. **Token Refresh Strategy**
   - Implement refresh tokens
   - Auto-refresh before expiry
   - Silent authentication

2. **Activity Tracking**
   - Track user activity
   - Extend session on activity
   - Show countdown before expiry

3. **Session Persistence**
   - Remember user preference
   - Offer "Remember Me" option
   - Configurable session duration

4. **Analytics**
   - Track session expiry events
   - Monitor unauthorized access attempts
   - User behavior patterns
