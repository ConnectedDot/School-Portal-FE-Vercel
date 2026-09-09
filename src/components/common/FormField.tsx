import type { ReactNode, ChangeEvent } from 'react';

// Base field configuration
export interface BaseFieldConfig {
    name: string;
    label: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local' | 'textarea' | 'select' | 'file' | 'checkbox' | 'radio' | 'switch';
    placeholder?: string;
    defaultValue?: string | number | boolean | string[];
    value?: string | number | boolean | string[];
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    hidden?: boolean;

    // Layout
    colSpan?: 1 | 2 | 3 | 4 | 6 | 12; // Grid column span (out of 12)
    className?: string;

    // Validation
    validation?: {
        required?: boolean | string; // true or custom message
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
        pattern?: RegExp | string;
        custom?: (value: unknown) => string | true; // Return error message or true
    };

    // Help text and error
    helpText?: string;
    error?: string;

    // Conditional rendering
    dependsOn?: string; // Field name it depends on
    showWhen?: (values: Record<string, unknown>) => boolean;
}

// Text-based fields (input, textarea)
export interface TextFieldConfig extends BaseFieldConfig {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local' | 'textarea';
    rows?: number; // For textarea
    maxLength?: number;
    minLength?: number;
    autoComplete?: string;
    prefix?: ReactNode; // Icon or text before input
    suffix?: ReactNode; // Icon or text after input
}

// Select field
export interface SelectFieldConfig extends BaseFieldConfig {
    type: 'select';
    options: { value: string | number; label: string; disabled?: boolean }[];
    multiple?: boolean;
    searchable?: boolean;
    placeholder?: string;
}

// File upload field
export interface FileFieldConfig extends BaseFieldConfig {
    type: 'file';
    accept?: string; // e.g., 'image/*', '.pdf,.doc'
    multiple?: boolean;
    maxSize?: number; // in bytes
    preview?: boolean; // Show image preview
    existingFile?: string; // URL to existing file
}

// Checkbox/Radio field
export interface CheckboxFieldConfig extends BaseFieldConfig {
    type: 'checkbox' | 'radio' | 'switch';
    options?: { value: string; label: string; disabled?: boolean }[]; // For checkbox group or radio
    inline?: boolean; // Display options inline
}

// Union type for all field configs
export type FieldConfig = TextFieldConfig | SelectFieldConfig | FileFieldConfig | CheckboxFieldConfig;

// Props for FormField component
export interface FormFieldProps {
    config: FieldConfig;
    value?: unknown;
    error?: string;
    touched?: boolean;
    onChange: (name: string, value: unknown) => void;
    onBlur?: (name: string) => void;
    formValues?: Record<string, unknown>; // For conditional fields
}

export function FormField({
    config,
    value,
    error,
    touched,
    onChange,
    onBlur,
    formValues = {},
}: FormFieldProps) {
    // Check if field should be shown
    if (config.hidden) return null;
    if (config.showWhen && !config.showWhen(formValues)) return null;

    const hasError = touched && error;
    const isDisabled = config.disabled || config.readonly;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target;
        let newValue: unknown;

        if (target instanceof HTMLInputElement) {
            if (target.type === 'checkbox') {
                newValue = target.checked;
            } else if (target.type === 'file') {
                newValue = target.files;
            } else if (target.type === 'number') {
                newValue = target.value === '' ? '' : Number(target.value);
            } else {
                newValue = target.value;
            }
        } else {
            newValue = target.value;
        }

        onChange(config.name, newValue);
    };

    const handleBlur = () => {
        if (onBlur) {
            onBlur(config.name);
        }
    };

    // Ultra compact input classes matching sleek design
    const inputClasses = `
        w-full px-2.5 py-1.5 border rounded text-sm bg-white
        focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
        disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400
        readonly:bg-gray-50 readonly:cursor-default
        transition-all duration-150 hover:border-gray-400
        ${hasError ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-50' : 'border-gray-200'}
        ${config.className || ''}
    `.trim().replace(/\s+/g, ' ');

    // Render label with ultra compact styling
    const renderLabel = () => {
        if (!config.label && config.type !== 'checkbox' && config.type !== 'switch') return null;

        return (
            <label
                htmlFor={config.name}
                className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide"
            >
                {config.label}
                {config.required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
        );
    };

    // Render help text with compact styling
    const renderHelpText = () => {
        if (!config.helpText && !hasError) return null;

        return (
            <p className={`text-xs mt-0.5 ${hasError ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                {hasError ? error : config.helpText}
            </p>
        );
    };

    // Render different field types
    const renderField = () => {
        switch (config.type) {
            case 'textarea': {
                const textConfig = config as TextFieldConfig;
                return (
                    <textarea
                        id={config.name}
                        name={config.name}
                        value={(value as string) || ''}
                        placeholder={config.placeholder}
                        disabled={isDisabled}
                        readOnly={config.readonly}
                        required={config.required}
                        rows={textConfig.rows || 4}
                        maxLength={textConfig.maxLength}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClasses}
                    />
                );
            }

            case 'select': {
                const selectConfig = config as SelectFieldConfig;
                return (
                    <select
                        id={config.name}
                        name={config.name}
                        value={(value as string) || ''}
                        disabled={isDisabled}
                        required={config.required}
                        multiple={selectConfig.multiple}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClasses}
                    >
                        {config.placeholder && (
                            <option value="" disabled>
                                {config.placeholder}
                            </option>
                        )}
                        {selectConfig.options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            }

            case 'file': {
                const fileConfig = config as FileFieldConfig;
                const fileList = value as FileList | null;
                const hasFiles = fileList && fileList.length > 0;

                const handleRemoveFile = () => {
                    onChange(config.name, null);
                };

                const handleRemoveFileAtIndex = (index: number) => {
                    if (!fileList) return;
                    const dt = new DataTransfer();
                    Array.from(fileList).forEach((file, i) => {
                        if (i !== index) dt.items.add(file);
                    });
                    onChange(config.name, dt.files);
                };

                return (
                    <div>
                        <input
                            id={config.name}
                            name={config.name}
                            type="file"
                            accept={fileConfig.accept}
                            multiple={fileConfig.multiple}
                            disabled={isDisabled}
                            required={config.required}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`
                                w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-medium
                                file:bg-primary file:text-white
                                hover:file:bg-primary-dark
                                file:cursor-pointer
                                cursor-pointer
                                ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}
                            `.trim().replace(/\s+/g, ' ')}
                        />
                        {fileConfig.existingFile && (
                            <div className="mt-2 text-sm text-gray-600">
                                Current file: <a href={fileConfig.existingFile} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View</a>
                            </div>
                        )}

                        {/* Preview for multiple files */}
                        {fileConfig.preview && hasFiles && fileConfig.multiple && (
                            <div className="mt-3 space-y-2">
                                <p className="text-sm text-gray-600 mb-2">Previews ({fileList!.length} file{fileList!.length > 1 ? 's' : ''}):</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {Array.from(fileList!).map((file, index) => (
                                        <div key={index} className="relative group">
                                            {file.type.startsWith('image/') ? (
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                                                />
                                            ) : (
                                                <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300">
                                                    <div className="text-center p-2">
                                                        <svg className="w-8 h-8 mx-auto text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                        <p className="text-xs text-gray-600 truncate max-w-full">{file.name}</p>
                                                    </div>
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFileAtIndex(index)}
                                                disabled={isDisabled}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
                                                title="Remove file"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                            <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Preview for single file */}
                        {fileConfig.preview && hasFiles && !fileConfig.multiple && (
                            <div className="mt-3">
                                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                <div className="relative inline-block">
                                    {fileList![0].type.startsWith('image/') ? (
                                        <img
                                            src={URL.createObjectURL(fileList![0])}
                                            alt="Preview"
                                            className="max-w-xs max-h-48 rounded-lg border-2 border-gray-300 shadow-sm"
                                        />
                                    ) : (
                                        <div className="max-w-xs p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
                                            <div className="flex items-center space-x-3">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{fileList![0].name}</p>
                                                    <p className="text-xs text-gray-500">{(fileList![0].size / 1024).toFixed(2)} KB</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={handleRemoveFile}
                                        disabled={isDisabled}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 disabled:opacity-50 shadow-md"
                                        title="Remove file"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            } case 'checkbox':
            case 'switch': {
                const checkConfig = config as CheckboxFieldConfig;

                // Single checkbox/switch
                if (!checkConfig.options) {
                    return (
                        <div className="flex items-center">
                            <input
                                id={config.name}
                                name={config.name}
                                type="checkbox"
                                checked={(value as boolean) || false}
                                disabled={isDisabled}
                                required={config.required}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`
                                    h-4 w-4 text-primary border-gray-300 rounded
                                    focus:ring-2 focus:ring-primary
                                    ${config.type === 'switch' ? 'rounded-full' : ''}
                                    ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                                `.trim().replace(/\s+/g, ' ')}
                            />
                            <label htmlFor={config.name} className="ml-2 text-sm text-gray-700">
                                {config.label}
                                {config.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                        </div>
                    );
                }

                // Checkbox group
                return (
                    <div className={checkConfig.inline ? 'flex flex-wrap gap-4' : 'space-y-2'}>
                        {checkConfig.options.map((option) => (
                            <div key={option.value} className="flex items-center">
                                <input
                                    id={`${config.name}-${option.value}`}
                                    name={config.name}
                                    type="checkbox"
                                    value={option.value}
                                    checked={(value as string[] || []).includes(option.value)}
                                    disabled={isDisabled || option.disabled}
                                    onChange={(e) => {
                                        const currentValues = (value as string[]) || [];
                                        const newValues = e.target.checked
                                            ? [...currentValues, option.value]
                                            : currentValues.filter(v => v !== option.value);
                                        onChange(config.name, newValues);
                                    }}
                                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
                                />
                                <label
                                    htmlFor={`${config.name}-${option.value}`}
                                    className="ml-2 text-sm text-gray-700 cursor-pointer"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                );
            }

            case 'radio': {
                const radioConfig = config as CheckboxFieldConfig;
                return (
                    <div className={radioConfig.inline ? 'flex flex-wrap gap-4' : 'space-y-2'}>
                        {radioConfig.options?.map((option) => (
                            <div key={option.value} className="flex items-center">
                                <input
                                    id={`${config.name}-${option.value}`}
                                    name={config.name}
                                    type="radio"
                                    value={option.value}
                                    checked={value === option.value}
                                    disabled={isDisabled || option.disabled}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="h-4 w-4 text-primary border-gray-300 focus:ring-2 focus:ring-primary cursor-pointer"
                                />
                                <label
                                    htmlFor={`${config.name}-${option.value}`}
                                    className="ml-2 text-sm text-gray-700 cursor-pointer"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                );
            }

            default: {
                // Text-based inputs
                const textConfig = config as TextFieldConfig;
                return (
                    <div className="relative">
                        {textConfig.prefix && (
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                {textConfig.prefix}
                            </div>
                        )}
                        <input
                            id={config.name}
                            name={config.name}
                            type={config.type || 'text'}
                            value={(value as string | number) || ''}
                            placeholder={config.placeholder}
                            disabled={isDisabled}
                            readOnly={config.readonly}
                            required={config.required}
                            maxLength={textConfig.maxLength}
                            minLength={textConfig.minLength}
                            autoComplete={textConfig.autoComplete}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${inputClasses} ${textConfig.prefix ? 'pl-10' : ''} ${textConfig.suffix ? 'pr-10' : ''}`}
                        />
                        {textConfig.suffix && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                {textConfig.suffix}
                            </div>
                        )}
                    </div>
                );
            }
        }
    };

    // For checkbox/switch without options, label comes after the field
    if ((config.type === 'checkbox' || config.type === 'switch') && !(config as CheckboxFieldConfig).options) {
        return (
            <div className={`form-field ${config.className || ''}`}>
                {renderField()}
                {renderHelpText()}
            </div>
        );
    }

    // Standard layout for all other fields
    return (
        <div className={`form-field ${config.className || ''}`}>
            {renderLabel()}
            {renderField()}
            {renderHelpText()}
        </div>
    );
}
