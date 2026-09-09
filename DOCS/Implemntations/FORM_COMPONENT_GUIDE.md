# Form Component Documentation

## Overview

The Form component system provides a powerful, flexible, and type-safe way to build forms in the application. It consists of:

- **FormField**: Individual field component that handles different input types
- **Form**: Main form component with validation, sections, and state management

## Features

### Field Types

- Text inputs: `text`, `email`, `password`, `number`, `tel`, `url`, `date`, `time`, `datetime-local`
- Textarea: Multi-line text input
- Select: Dropdown with single/multiple selection
- File: File upload with preview support
- Checkbox: Single or grouped checkboxes
- Radio: Radio button groups
- Switch: Toggle switches

### Form Features

- ✅ Built-in validation (required, min/max length, pattern, custom)
- ✅ Readonly mode for view pages
- ✅ Field dependencies and conditional rendering
- ✅ Multi-column grid layout (1-4 columns)
- ✅ Section organization with collapsible sections
- ✅ Error handling and display
- ✅ Loading states
- ✅ File upload with preview
- ✅ Prefix/suffix icons for inputs
- ✅ Customizable submit/cancel/reset buttons
- ✅ Card wrapper option
- ✅ Consistent UI with design system colors

## Basic Usage

### Simple Form with Flat Fields

```tsx
import { Form } from "@/components/common/Form";

function MyForm() {
  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("Form submitted:", values);
  };

  return (
    <Form
      fields={[
        {
          name: "firstName",
          label: "First Name",
          type: "text",
          required: true,
          placeholder: "Enter first name",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
          validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          },
        },
        {
          name: "age",
          label: "Age",
          type: "number",
          validation: {
            min: 18,
            max: 100,
          },
        },
      ]}
      columns={2}
      onSubmit={handleSubmit}
      submitText="Save"
    />
  );
}
```

### Form with Sections

```tsx
import { Form } from "@/components/common/Form";

function StudentForm() {
  return (
    <Form
      sections={[
        {
          title: "Personal Information",
          description: "Basic student details",
          columns: 2,
          fields: [
            {
              name: "firstName",
              label: "First Name",
              type: "text",
              required: true,
            },
            {
              name: "lastName",
              label: "Last Name",
              type: "text",
              required: true,
            },
            {
              name: "dateOfBirth",
              label: "Date of Birth",
              type: "date",
              required: true,
            },
            {
              name: "gender",
              label: "Gender",
              type: "radio",
              required: true,
              options: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ],
              inline: true,
            },
          ],
        },
        {
          title: "Academic Details",
          columns: 2,
          fields: [
            {
              name: "grade",
              label: "Grade",
              type: "select",
              required: true,
              options: [
                { value: "9", label: "Grade 9" },
                { value: "10", label: "Grade 10" },
                { value: "11", label: "Grade 11" },
                { value: "12", label: "Grade 12" },
              ],
            },
            {
              name: "class",
              label: "Class",
              type: "select",
              required: true,
              options: [
                { value: "A", label: "Class A" },
                { value: "B", label: "Class B" },
              ],
            },
          ],
        },
        {
          title: "Contact Information",
          columns: 1,
          fields: [
            {
              name: "address",
              label: "Address",
              type: "textarea",
              rows: 3,
              placeholder: "Enter full address",
            },
          ],
        },
      ]}
      onSubmit={(values) => console.log(values)}
      submitText="Create Student"
      showCancelButton
      onCancel={() => window.history.back()}
    />
  );
}
```

### Readonly Form for View Page

```tsx
import { Form } from "@/components/common/Form";

function StudentView({ student }: { student: Student }) {
  return (
    <Form
      readonly
      initialValues={{
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        grade: student.grade,
        class: student.class,
      }}
      fields={[
        {
          name: "firstName",
          label: "First Name",
          type: "text",
        },
        {
          name: "lastName",
          label: "Last Name",
          type: "text",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
        },
        {
          name: "grade",
          label: "Grade",
          type: "text",
        },
      ]}
      columns={2}
      showSubmitButton={false}
      cardWrapper
      title="Student Details"
    />
  );
}
```

## Advanced Features

### Validation

```tsx
{
    name: 'password',
    label: 'Password',
    type: 'password',
    validation: {
        required: 'Password is required',
        minLength: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        custom: (value) => {
            if (typeof value === 'string' && value.includes('password')) {
                return 'Password cannot contain the word "password"';
            }
            return true;
        },
    },
}
```

### Conditional Fields

```tsx
{
    name: 'hasGuardian',
    label: 'Has Guardian?',
    type: 'checkbox',
},
{
    name: 'guardianName',
    label: 'Guardian Name',
    type: 'text',
    showWhen: (values) => values.hasGuardian === true,
}
```

### File Upload with Preview

```tsx
{
    name: 'profilePhoto',
    label: 'Profile Photo',
    type: 'file',
    accept: 'image/*',
    preview: true,
    maxSize: 5 * 1024 * 1024, // 5MB
}
```

### Field with Icons

```tsx
{
    name: 'email',
    label: 'Email',
    type: 'email',
    prefix: <MailIcon />,
    placeholder: 'you@example.com',
}
```

### Column Spanning

```tsx
{
    name: 'address',
    label: 'Full Address',
    type: 'textarea',
    colSpan: 2, // Span 2 columns in a 2-column layout
}
```

### Collapsible Sections

```tsx
{
    title: 'Optional Information',
    collapsible: true,
    defaultCollapsed: true,
    fields: [
        // fields here
    ],
}
```

### Custom Form-Level Validation

```tsx
<Form
  onValidate={(values) => {
    const errors: Record<string, string> = {};

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  }}
  // ... other props
/>
```

## Props Reference

### Form Props

| Prop                   | Type                                                | Default      | Description                   |
| ---------------------- | --------------------------------------------------- | ------------ | ----------------------------- |
| `fields`               | `FieldConfig[]`                                     | -            | Flat list of fields           |
| `sections`             | `FormSection[]`                                     | -            | Organized sections            |
| `columns`              | `1 \| 2 \| 3 \| 4`                                  | `2`          | Default grid columns          |
| `initialValues`        | `Record<string, unknown>`                           | `{}`         | Initial form values           |
| `onSubmit`             | `(values) => void \| Promise<void>`                 | **required** | Submit handler                |
| `onChange`             | `(values) => void`                                  | -            | Called when any field changes |
| `onValidate`           | `(values) => Record<string, string>`                | -            | Custom validation             |
| `readonly`             | `boolean`                                           | `false`      | Make all fields readonly      |
| `disabled`             | `boolean`                                           | `false`      | Disable all fields            |
| `loading`              | `boolean`                                           | `false`      | Show loading state            |
| `submitText`           | `string`                                            | `'Submit'`   | Submit button text            |
| `submitButtonVariant`  | `'primary' \| 'secondary' \| 'outline' \| 'danger'` | `'primary'`  | Submit button style           |
| `showSubmitButton`     | `boolean`                                           | `true`       | Show submit button            |
| `submitButtonPosition` | `'left' \| 'center' \| 'right'`                     | `'right'`    | Button alignment              |
| `showCancelButton`     | `boolean`                                           | `false`      | Show cancel button            |
| `cancelText`           | `string`                                            | `'Cancel'`   | Cancel button text            |
| `onCancel`             | `() => void`                                        | -            | Cancel handler                |
| `showResetButton`      | `boolean`                                           | `false`      | Show reset button             |
| `resetText`            | `string`                                            | `'Reset'`    | Reset button text             |
| `cardWrapper`          | `boolean`                                           | `true`       | Wrap in Card                  |
| `title`                | `string`                                            | -            | Form title                    |
| `description`          | `string`                                            | -            | Form description              |

### Field Config Props

| Prop           | Type                  | Description                     |
| -------------- | --------------------- | ------------------------------- |
| `name`         | `string`              | **Required** - Field identifier |
| `label`        | `string`              | **Required** - Field label      |
| `type`         | `FieldType`           | Field type (default: `'text'`)  |
| `placeholder`  | `string`              | Placeholder text                |
| `defaultValue` | `any`                 | Default value                   |
| `required`     | `boolean`             | Mark as required                |
| `disabled`     | `boolean`             | Disable field                   |
| `readonly`     | `boolean`             | Make readonly                   |
| `hidden`       | `boolean`             | Hide field                      |
| `colSpan`      | `1-12`                | Grid column span                |
| `validation`   | `ValidationConfig`    | Validation rules                |
| `helpText`     | `string`              | Help text below field           |
| `showWhen`     | `(values) => boolean` | Conditional rendering           |

## Best Practices

1. **Use sections** for complex forms with multiple categories
2. **Set colSpan** for fields that need more space (textarea, etc.)
3. **Use readonly mode** for view/detail pages instead of disabled
4. **Provide helpText** for complex fields
5. **Use custom validation** for business logic
6. **Keep columns responsive** - use 2-3 columns for desktop
7. **Group related fields** in the same section
8. **Use appropriate input types** for better UX (tel, email, date, etc.)

## Examples in the Codebase

- Student Create Form: `src/pages/admin/students/StudentCreate.tsx`
- Student Edit Form: `src/pages/admin/students/StudentEdit.tsx`
- Student View: `src/pages/admin/students/StudentView.tsx`
