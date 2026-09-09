# Unified Create/Edit Form Pattern

## Overview
This document outlines the best practice for creating reusable form components that handle both CREATE and EDIT modes in a single component, minimizing code duplication and maximizing maintainability.

## Why Use Unified Forms?

### ❌ **Anti-Pattern (Separate Components)**
```
CourseCreate.tsx   (150 lines)
CourseEdit.tsx     (200 lines)
Total: 350 lines of mostly duplicated code
```

### ✅ **Best Practice (Unified Component)**
```
CourseForm.tsx     (220 lines)
Total: 220 lines, handles both modes
Savings: 130 lines (37% reduction)
```

## Implementation Pattern

### 1. **Component Structure**

```tsx
import { useNavigate, useParams } from 'react-router-dom';
import { useGetItem, useCreateItem, useUpdateItem } from '@/hooks/...';
import { useState, useEffect } from 'react';

const EntityForm = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id; // Key: Detect mode from route param

    // Conditional hooks
    const { data: entity, isLoading } = useGetItem(id!, isEditMode);
    const { mutate: create, isPending: isCreating } = useCreateItem(...);
    const { mutate: update, isPending: isUpdating } = useUpdateItem(id!, ...);

    const [formData, setFormData] = useState({...});

    // Populate form in edit mode
    useEffect(() => {
        if (isEditMode && entity) {
            setFormData({...entity});
        }
    }, [isEditMode, entity]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            update(formData);
        } else {
            create(formData);
        }
    };

    const isPending = isCreating || isUpdating;

    // Loading state for edit mode
    if (isEditMode && isLoading) {
        return <Loader />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>{isEditMode ? 'Edit' : 'Create'} Entity</h1>
            {/* Form fields */}
            <Button type="submit" disabled={isPending}>
                {isEditMode ? 'Save Changes' : 'Create'}
            </Button>
        </form>
    );
};
```

### 2. **Route Configuration**

```tsx
// Both routes use the same component
<Route path="courses/create" element={<CourseForm />} />
<Route path="courses/:id/edit" element={<CourseForm />} />
```

### 3. **Navigation Patterns**

```tsx
// Navigate to create
navigate('/courses/create');

// Navigate to edit
navigate(`/courses/${courseId}/edit`);

// Or with state (alternative)
navigate('/courses/form', { state: { courseId } });
```

## Key Features

### Mode Detection
```tsx
const { id } = useParams<{ id: string }>();
const isEditMode = !!id;
```

### Conditional Data Fetching
```tsx
// Only fetch when editing
const { data, isLoading } = useGetEntity(id!, isEditMode);
```

### Unified Submit Handler
```tsx
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
        updateEntity(formData);
    } else {
        createEntity(formData);
    });
};
```

### Dynamic UI Elements
```tsx
<h1>{isEditMode ? 'Edit Course' : 'Create New Course'}</h1>
<Button>
    {isEditMode ? <Save /> : <Plus />}
    {isEditMode ? 'Save Changes' : 'Create'}
</Button>
```

## Refactoring Checklist

When consolidating Create/Edit pages:

- [ ] Identify duplicate form fields and logic
- [ ] Create unified `EntityForm.tsx` component
- [ ] Add `useParams()` to detect edit mode
- [ ] Conditionally call `useGetEntity()` hook
- [ ] Use `useEffect` to populate form in edit mode
- [ ] Create unified `handleSubmit()` function
- [ ] Update route configuration
- [ ] Update navigation calls throughout app
- [ ] Delete old Create/Edit components
- [ ] Test both create and edit flows
- [ ] Update any TypeScript types/interfaces

## Completed Consolidations

### ✅ CourseForm
- **Before**: `CourseCreate.tsx` + `CourseEdit.tsx`
- **After**: `CourseForm.tsx`
- **Routes**: 
  - `/admin/courses/create` → CourseForm (create mode)
  - `/admin/courses/:id/edit` → CourseForm (edit mode)

## Pending Consolidations

### 🔄 FacultyForm
- **Consolidate**: `FacultyCreate.tsx` + `FacultyEdit.tsx`
- **Target**: `FacultyForm.tsx`

### 🔄 StudentForm  
- **Consolidate**: `StudentOnboard.tsx` (create) + `StudentEdit.tsx`
- **Target**: `StudentForm.tsx`

## Benefits

1. **Reduced Code Duplication** - Single source of truth for form logic
2. **Easier Maintenance** - Fix bugs once, benefits both modes
3. **Consistent UX** - Same validation, UI, behavior
4. **Type Safety** - Shared interfaces ensure consistency
5. **Testing** - Test one component instead of two
6. **Performance** - Single component to load and bundle

## Common Pitfalls

### ❌ Don't:
```tsx
// Calling hooks unconditionally with undefined
const { data } = useGetEntity(id); // id might be undefined!
```

### ✅ Do:
```tsx
// Conditionally enable the hook
const { data } = useGetEntity(id!, isEditMode);
```

### ❌ Don't:
```tsx
// Forgetting to update routes
<Route path="create" element={<OldCreateComponent />} />
```

### ✅ Do:
```tsx
// Update both create and edit routes
<Route path="create" element={<UnifiedForm />} />
<Route path=":id/edit" element={<UnifiedForm />} />
```

## Alternative: State-Based Mode

If you prefer passing mode via navigation state:

```tsx
// Navigation
navigate('/courses/form', { state: { mode: 'edit', courseId } });

// Component
const location = useLocation();
const { mode, courseId } = location.state || { mode: 'create' };
const isEditMode = mode === 'edit';
```

**Recommendation**: Use route params (`:id`) - it's more RESTful and supports direct URL access.

## Future Development

When creating new CRUD features:

1. **Start with unified form** - Don't create separate Create/Edit components
2. **Follow this pattern** - Use the structure outlined above
3. **Reuse validation** - Create shared validation schemas (Zod/Yup)
4. **Document differences** - If create/edit have significant differences, document why unified approach wasn't used

## Related Files

- [CourseForm.tsx](../src/pages/admin/courses/CourseForm.tsx) - Reference implementation
- [AdminRouter.tsx](../src/router/AdminRouter.tsx) - Route configuration example
- [useCreateCourse](../src/hooks/courses.ts) - Hook patterns

---

**Last Updated**: December 18, 2025  
**Pattern Status**: ✅ Established & Documented
