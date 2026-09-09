// Example usage of the Form component system
// This file demonstrates various form configurations

import { Form, type FormSection } from "../components/common/Form";

// import { Form } from '../../components/common/Form';
// import type { FormSection } from '../../components/common/Form';

// Example 1: Simple Contact Form
export function ContactFormExample() {
    return (
        <Form
            title="Contact Us"
            description="Fill out the form below and we'll get back to you soon"
            fields={[
                {
                    name: 'name',
                    label: 'Full Name',
                    type: 'text',
                    required: true,
                    placeholder: 'John Doe',
                },
                {
                    name: 'email',
                    label: 'Email Address',
                    type: 'email',
                    required: true,
                    placeholder: 'john@example.com',
                    validation: {
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    },
                },
                {
                    name: 'phone',
                    label: 'Phone Number',
                    type: 'tel',
                    placeholder: '+1 (555) 000-0000',
                },
                {
                    name: 'message',
                    label: 'Message',
                    type: 'textarea',
                    required: true,
                    rows: 5,
                    placeholder: 'Tell us about your inquiry...',
                    colSpan: 2,
                },
            ]}
            columns={2}
            onSubmit={(values: unknown) => {
                // console.log('Contact form submitted:', values);
                alert('Thank you for your message!');
            }}
            submitText="Send Message"
            showResetButton
        />
    );
}

// Example 2: Student Registration Form with Sections
export function StudentRegistrationExample() {
    const sections: FormSection[] = [
        {
            title: 'Personal Information',
            description: 'Basic student details',
            columns: 2,
            fields: [
                {
                    name: 'firstName',
                    label: 'First Name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'lastName',
                    label: 'Last Name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'dateOfBirth',
                    label: 'Date of Birth',
                    type: 'date',
                    required: true,
                },
                {
                    name: 'gender',
                    label: 'Gender',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' },
                    ],
                    inline: true,
                },
                {
                    name: 'email',
                    label: 'Email',
                    type: 'email',
                    required: true,
                },
                {
                    name: 'phone',
                    label: 'Phone',
                    type: 'tel',
                },
                {
                    name: 'profilePhoto',
                    label: 'Profile Photo',
                    type: 'file',
                    accept: 'image/*',
                    preview: true,
                    helpText: 'Upload a profile picture (max 5MB)',
                    colSpan: 2,
                },
            ],
        },
        {
            title: 'Academic Information',
            columns: 2,
            fields: [
                {
                    name: 'grade',
                    label: 'Grade',
                    type: 'select',
                    required: true,
                    placeholder: 'Select grade',
                    options: [
                        { value: '9', label: 'Grade 9' },
                        { value: '10', label: 'Grade 10' },
                        { value: '11', label: 'Grade 11' },
                        { value: '12', label: 'Grade 12' },
                    ],
                },
                {
                    name: 'class',
                    label: 'Class',
                    type: 'select',
                    required: true,
                    placeholder: 'Select class',
                    options: [
                        { value: 'A', label: 'Class A' },
                        { value: 'B', label: 'Class B' },
                        { value: 'C', label: 'Class C' },
                    ],
                },
                {
                    name: 'previousSchool',
                    label: 'Previous School',
                    type: 'text',
                },
                {
                    name: 'admissionDate',
                    label: 'Admission Date',
                    type: 'date',
                    required: true,
                },
            ],
        },
        {
            title: 'Guardian Information',
            collapsible: true,
            columns: 2,
            fields: [
                {
                    name: 'guardianName',
                    label: 'Guardian Name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'guardianRelation',
                    label: 'Relation',
                    type: 'select',
                    required: true,
                    options: [
                        { value: 'father', label: 'Father' },
                        { value: 'mother', label: 'Mother' },
                        { value: 'guardian', label: 'Legal Guardian' },
                        { value: 'other', label: 'Other' },
                    ],
                },
                {
                    name: 'guardianEmail',
                    label: 'Guardian Email',
                    type: 'email',
                    required: true,
                },
                {
                    name: 'guardianPhone',
                    label: 'Guardian Phone',
                    type: 'tel',
                    required: true,
                },
            ],
        },
        {
            title: 'Address',
            columns: 1,
            fields: [
                {
                    name: 'address',
                    label: 'Street Address',
                    type: 'textarea',
                    required: true,
                    rows: 3,
                    placeholder: 'Enter full address',
                },
            ],
        },
        {
            title: 'Additional Information',
            collapsible: true,
            defaultCollapsed: true,
            columns: 2,
            fields: [
                {
                    name: 'hasAllergies',
                    label: 'Has Medical Allergies',
                    type: 'checkbox',
                },
                {
                    name: 'allergies',
                    label: 'List Allergies',
                    type: 'textarea',
                    rows: 2,
                    showWhen: (values: Record<string, unknown>) => values.hasAllergies === true,
                    colSpan: 2,
                },
                {
                    name: 'specialNeeds',
                    label: 'Special Educational Needs',
                    type: 'textarea',
                    rows: 3,
                    colSpan: 2,
                },
            ],
        },
    ];

    return (
        <Form
            sections={sections}
            onSubmit={(values: unknown) => {
                // console.log('Student registration submitted:', values);
                // Handle form submission
            }}
            submitText="Register Student"
            submitButtonVariant="primary"
            showCancelButton
            onCancel={() => window.history.back()}
            cardWrapper
        />
    );
}

// Example 3: Readonly Form for Viewing Data
export function StudentViewExample() {
    const studentData = {
        firstName: 'Emma',
        lastName: 'Wilson',
        email: 'emma.wilson@student.school.com',
        phone: '+1-555-0201',
        dateOfBirth: '2009-03-15',
        gender: 'female',
        grade: '10',
        class: 'A',
        address: '123 Main St, Springfield',
        guardianName: 'David Wilson',
        guardianEmail: 'david.wilson@example.com',
        guardianPhone: '+1-555-0104',
    };

    return (
        <Form
            title="Student Profile"
            description="View student information"
            readonly
            initialValues={studentData}
            sections={[
                {
                    title: 'Personal Information',
                    columns: 2,
                    fields: [
                        { name: 'firstName', label: 'First Name', type: 'text' },
                        { name: 'lastName', label: 'Last Name', type: 'text' },
                        { name: 'email', label: 'Email', type: 'email' },
                        { name: 'phone', label: 'Phone', type: 'tel' },
                        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
                        { name: 'gender', label: 'Gender', type: 'text' },
                    ],
                },
                {
                    title: 'Academic Information',
                    columns: 2,
                    fields: [
                        { name: 'grade', label: 'Grade', type: 'text' },
                        { name: 'class', label: 'Class', type: 'text' },
                    ],
                },
                {
                    title: 'Guardian Information',
                    columns: 2,
                    fields: [
                        { name: 'guardianName', label: 'Guardian Name', type: 'text' },
                        { name: 'guardianEmail', label: 'Guardian Email', type: 'email' },
                        { name: 'guardianPhone', label: 'Guardian Phone', type: 'tel' },
                    ],
                },
                {
                    title: 'Address',
                    columns: 1,
                    fields: [
                        { name: 'address', label: 'Address', type: 'textarea', rows: 2 },
                    ],
                },
            ]}
            showSubmitButton={false}
            cardWrapper
            onSubmit={function (): void | Promise<void> {
                throw new Error("Function not implemented.");
            }} />
    );
}

// Example 4: Form with Custom Validation
export function PasswordChangeExample() {
    return (
        <Form
            title="Change Password"
            fields={[
                {
                    name: 'currentPassword',
                    label: 'Current Password',
                    type: 'password',
                    required: true,
                },
                {
                    name: 'newPassword',
                    label: 'New Password',
                    type: 'password',
                    required: true,
                    validation: {
                        minLength: 8,
                        custom: (value: unknown) => {
                            const password = String(value);
                            if (!/[A-Z]/.test(password)) {
                                return 'Password must contain at least one uppercase letter';
                            }
                            if (!/[a-z]/.test(password)) {
                                return 'Password must contain at least one lowercase letter';
                            }
                            if (!/[0-9]/.test(password)) {
                                return 'Password must contain at least one number';
                            }
                            return true;
                        },
                    },
                    helpText: 'Must be at least 8 characters with uppercase, lowercase, and numbers',
                },
                {
                    name: 'confirmPassword',
                    label: 'Confirm New Password',
                    type: 'password',
                    required: true,
                },
            ]}
            columns={1}
            onValidate={(values: Record<string, unknown>) => {
                const errors: Record<string, string> = {};
                if (values.newPassword !== values.confirmPassword) {
                    errors.confirmPassword = 'Passwords do not match';
                }
                if (values.currentPassword === values.newPassword) {
                    errors.newPassword = 'New password must be different from current password';
                }
                return errors;
            }}
            onSubmit={(values: unknown) => {
                // console.log('Password change submitted:', values);
            }}
            submitText="Change Password"
            showCancelButton
            onCancel={() => window.history.back()}
        />
    );
}
