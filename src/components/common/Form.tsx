import { useState, useEffect, useRef, forwardRef, useImperativeHandle, type FormEvent, type ReactNode } from 'react';
import { FormField, type FieldConfig } from './FormField';
import { Button } from './Button';
import { Card } from './Card';

// Form ref methods exposed to parent
export interface FormRef {
    validateForm: () => boolean;
    getValues: () => Record<string, unknown>;
    setValues: (values: Record<string, unknown>) => void;
    reset: () => void;
}

// Form section for organizing fields
export interface FormSection {
    title?: string;
    description?: string;
    fields: FieldConfig[];
    columns?: 1 | 2 | 3 | 4; // Number of columns in this section
    collapsible?: boolean;
    defaultCollapsed?: boolean;
}

// Form props
export interface FormProps {
    // Form configuration
    fields?: FieldConfig[]; // Simple flat list of fields
    sections?: FormSection[]; // Organized into sections
    columns?: 1 | 2 | 3 | 4; // Default columns for fields

    // Form behavior
    initialValues?: Record<string, unknown>;
    onSubmit: (values: Record<string, unknown>) => void | Promise<void>;
    onChange?: (values: Record<string, unknown>) => void;
    onValidate?: (values: Record<string, unknown>) => Record<string, string>; // Return errors

    // Form state
    readonly?: boolean;
    disabled?: boolean;
    loading?: boolean;

    // Submit button configuration
    submitText?: string;
    submitButtonVariant?: 'primary' | 'secondary' | 'outline' | 'danger';
    showSubmitButton?: boolean;
    submitButtonPosition?: 'left' | 'center' | 'right';

    // Cancel/Reset buttons
    showCancelButton?: boolean;
    cancelText?: string;
    onCancel?: () => void;
    showResetButton?: boolean;
    resetText?: string;

    // Styling
    className?: string;
    cardWrapper?: boolean; // Wrap form in Card component
    title?: string;
    description?: string;

    // Additional content
    header?: ReactNode;
    footer?: ReactNode;
}

export const Form = forwardRef<FormRef, FormProps>(function Form({
    fields,
    sections,
    columns = 2,
    initialValues = {},
    onSubmit,
    onChange,
    onValidate,
    readonly = false,
    disabled = false,
    loading = false,
    submitText = 'Submit',
    submitButtonVariant = 'primary',
    showSubmitButton = true,
    submitButtonPosition = 'right',
    showCancelButton = false,
    cancelText = 'Cancel',
    onCancel,
    showResetButton = false,
    resetText = 'Reset',
    className = '',
    cardWrapper = true,
    title,
    description,
    header,
    footer,
}: FormProps, ref) {
    const [values, setValues] = useState<Record<string, unknown>>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [collapsedSections, setCollapsedSections] = useState<Record<number, boolean>>({});

    // Track previous initialValues to detect actual changes
    const prevInitialValuesRef = useRef<string>('');

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
        validateForm: () => {
            const isValid = validateForm();
            // Mark all fields as touched to show errors
            const allFields = sections ? sections.flatMap(s => s.fields) : (fields || []);
            const allTouched: Record<string, boolean> = {};
            allFields.forEach(field => {
                allTouched[field.name] = true;
            });
            setTouched(allTouched);
            return isValid;
        },
        getValues: () => values,
        setValues: (newValues: Record<string, unknown>) => setValues(newValues),
        reset: () => {
            setValues(initialValues);
            setErrors({});
            setTouched({});
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [values, initialValues]);

    // Update values when initialValues change (for edit forms)
    useEffect(() => {
        const currentInitialValues = JSON.stringify(initialValues);
        if (prevInitialValuesRef.current !== currentInitialValues) {
            prevInitialValuesRef.current = currentInitialValues;
            setValues(initialValues);
        }
    }, [initialValues]);

    // Debounce onChange to prevent excessive re-renders
    useEffect(() => {
        if (onChange) {
            const timeoutId = setTimeout(() => {
                onChange(values);
            }, 100); // 100ms debounce
            return () => clearTimeout(timeoutId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);

    // Validate a single field
    const validateField = (fieldConfig: FieldConfig, value: unknown): string | null => {
        if (!fieldConfig.validation) return null;

        // Skip validation for hidden conditional fields
        if (fieldConfig.showWhen && !fieldConfig.showWhen(values)) {
            return null;
        }

        const validation = fieldConfig.validation;

        // Required validation
        if (validation.required) {
            const isEmpty =
                value === undefined ||
                value === null ||
                value === '' ||
                (Array.isArray(value) && value.length === 0) ||
                (value instanceof FileList && value.length === 0);

            if (isEmpty) {
                return typeof validation.required === 'string'
                    ? validation.required
                    : `${fieldConfig.label} is required`;
            }
        }

        // Skip other validations if value is empty and not required
        if (!value || value === '') return null;

        const stringValue = String(value);

        // Min length
        if (validation.minLength && stringValue.length < validation.minLength) {
            return `${fieldConfig.label} must be at least ${validation.minLength} characters`;
        }

        // Max length
        if (validation.maxLength && stringValue.length > validation.maxLength) {
            return `${fieldConfig.label} must be no more than ${validation.maxLength} characters`;
        }

        // Min value (for numbers)
        if (validation.min !== undefined && typeof value === 'number' && value < validation.min) {
            return `${fieldConfig.label} must be at least ${validation.min}`;
        }

        // Max value (for numbers)
        if (validation.max !== undefined && typeof value === 'number' && value > validation.max) {
            return `${fieldConfig.label} must be no more than ${validation.max}`;
        }

        // Pattern validation
        if (validation.pattern) {
            const pattern = typeof validation.pattern === 'string'
                ? new RegExp(validation.pattern)
                : validation.pattern;
            if (!pattern.test(stringValue)) {
                return `${fieldConfig.label} format is invalid`;
            }
        }

        // Custom validation
        if (validation.custom) {
            const result = validation.custom(value);
            if (result !== true) {
                return result;
            }
        }

        return null;
    };

    // Validate all fields
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        const allFields = sections ? sections.flatMap(s => s.fields) : (fields || []);

        // console.log('Validating form with fields:', allFields.map(f => f.name), 'Current values:', values);

        allFields.forEach(fieldConfig => {
            const error = validateField(fieldConfig, values[fieldConfig.name]);
            if (error) {
                // console.log(`Validation error for ${fieldConfig.name}:`, error);
                newErrors[fieldConfig.name] = error;
            }
        });

        // Custom form-level validation
        if (onValidate) {
            const customErrors = onValidate(values);
            Object.assign(newErrors, customErrors);
        }

        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        // console.log('Validation complete. Errors:', newErrors, 'Is valid:', isValid);
        return isValid;
    };

    // Handle field change
    const handleFieldChange = (name: string, value: unknown) => {
        setValues(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    // Handle field blur
    const handleFieldBlur = (name: string) => {
        setTouched(prev => ({ ...prev, [name]: true }));

        // Validate field on blur
        const allFields = sections ? sections.flatMap(s => s.fields) : (fields || []);
        const fieldConfig = allFields.find(f => f.name === name);
        if (fieldConfig) {
            const error = validateField(fieldConfig, values[name]);
            if (error) {
                setErrors(prev => ({ ...prev, [name]: error }));
            }
        }
    };

    // Handle form submit
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (readonly || disabled || isSubmitting) return;

        // Mark all fields as touched
        const allFields = sections ? sections.flatMap(s => s.fields) : (fields || []);
        const allTouched: Record<string, boolean> = {};
        allFields.forEach(field => {
            allTouched[field.name] = true;
        });
        setTouched(allTouched);

        // Validate form
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(values);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle reset
    const handleReset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };

    // Toggle section collapse
    const toggleSection = (index: number) => {
        setCollapsedSections(prev => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    // Calculate grid column classes
    const getGridColumns = (cols: number) => {
        switch (cols) {
            case 1: return 'grid-cols-1';
            case 2: return 'grid-cols-1 md:grid-cols-2';
            case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
            case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
            default: return 'grid-cols-1 md:grid-cols-2';
        }
    };

    // Render a single field
    const renderField = (fieldConfig: FieldConfig, sectionColumns: number) => {
        // Calculate column span
        const colSpan = fieldConfig.colSpan || 1;
        let spanClass = '';

        if (sectionColumns === 2) {
            spanClass = colSpan >= 2 ? 'md:col-span-2' : '';
        } else if (sectionColumns === 3) {
            spanClass = colSpan >= 3 ? 'lg:col-span-3' : colSpan === 2 ? 'md:col-span-2' : '';
        } else if (sectionColumns === 4) {
            spanClass = colSpan >= 4 ? 'lg:col-span-4' : colSpan >= 2 ? 'md:col-span-2' : '';
        }

        return (
            <div key={fieldConfig.name} className={spanClass}>
                <FormField
                    config={{
                        ...fieldConfig,
                        disabled: fieldConfig.disabled || disabled,
                        readonly: fieldConfig.readonly || readonly,
                    }}
                    value={values[fieldConfig.name]}
                    error={errors[fieldConfig.name]}
                    touched={touched[fieldConfig.name]}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    formValues={values}
                />
            </div>
        );
    };

    // Render form sections
    const renderSections = () => {
        if (!sections) return null;

        return sections.map((section, index) => {
            const isCollapsed = collapsedSections[index] || (section.defaultCollapsed && collapsedSections[index] === undefined);
            const sectionColumns = section.columns || columns;

            return (
                <div key={index} className="mb-4 pb-3 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
                    {section.title && (
                        <div
                            className={`flex items-center justify-between mb-4 ${section.collapsible ? 'cursor-pointer' : ''
                                }`}
                            onClick={() => section.collapsible && toggleSection(index)}
                        >
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">{section.title}</h3>
                                {section.description && (
                                    <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                                )}
                            </div>
                            {section.collapsible && (
                                <svg
                                    className={`w-5 h-5 text-gray-400 transition-transform ${isCollapsed ? '' : 'rotate-180'
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                        </div>
                    )}
                    {!isCollapsed && (
                        <div className={`grid ${getGridColumns(sectionColumns)} gap-3 mt-2`}>
                            {section.fields.map(field => renderField(field, sectionColumns))}
                        </div>
                    )}
                </div>
            );
        });
    };

    // Render flat fields
    const renderFields = () => {
        if (!fields || fields.length === 0) return null;

        return (
            <div className={`grid ${getGridColumns(columns)} gap-4`}>
                {fields.map(field => renderField(field, columns))}
            </div>
        );
    };

    // Render action buttons
    const renderActions = () => {
        if (!showSubmitButton && !showCancelButton && !showResetButton) return null;

        const positionClass =
            submitButtonPosition === 'center' ? 'justify-center' :
                submitButtonPosition === 'left' ? 'justify-start' :
                    'justify-end';

        return (
            <div className={`mt-6 flex items-center gap-3 ${positionClass}`}>
                {showResetButton && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        disabled={disabled || isSubmitting}
                    >
                        {resetText}
                    </Button>
                )}
                {showCancelButton && onCancel && (
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        {cancelText}
                    </Button>
                )}
                {showSubmitButton && (
                    <Button
                        type="submit"
                        variant={submitButtonVariant}
                        disabled={disabled || readonly || isSubmitting}
                        isLoading={isSubmitting || loading}
                    >
                        {submitText}
                    </Button>
                )}
            </div>
        );
    };

    // Render form content
    const formContent = (
        <form onSubmit={handleSubmit} className={`${className} bg-gray-50 p-4 rounded-lg border border-gray-200`}>
            {header}

            {title && (
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    {description && (
                        <p className="text-gray-600 mt-1">{description}</p>
                    )}
                </div>
            )}

            {sections ? renderSections() : renderFields()}
            {renderActions()}

            {footer}
        </form>
    );

    // Wrap in card if requested
    if (cardWrapper) {
        return <Card>{formContent}</Card>;
    }

    return formContent;
});

export default Form;
