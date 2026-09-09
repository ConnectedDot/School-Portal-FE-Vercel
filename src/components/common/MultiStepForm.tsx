import { useState, useRef, useCallback } from 'react';
import { Form, type FormProps, type FormSection, type FormRef } from './Form';
import { Button } from './Button';
import { Card } from './Card';

export interface MultiStepFormStep {
    title: string;
    description?: string;
    sections: FormSection[];
}

export interface MultiStepFormProps extends Omit<FormProps, 'sections' | 'showSubmitButton' | 'showCancelButton' | 'submitText' | 'cardWrapper' | 'onChange'> {
    steps: MultiStepFormStep[];
    onStepChange?: (step: number) => void;
    showProgressBar?: boolean;
    showStepNumbers?: boolean;
    allowStepNavigation?: boolean;
    finalSubmitText?: string;
    showCancelButton?: boolean;
    cancelText?: string;
    onCancel?: () => void;
    onChange?: (values: Record<string, unknown>) => void;
}

export function MultiStepForm({
    steps,
    onSubmit,
    onStepChange,
    showProgressBar = true,
    showStepNumbers = true,
    allowStepNavigation = false,
    finalSubmitText = 'Submit',
    showCancelButton = false,
    cancelText = 'Cancel',
    onCancel,
    onChange,
    ...formProps
}: MultiStepFormProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, unknown>>(formProps.initialValues || {});
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const formRef = useRef<FormRef>(null);

    const totalSteps = steps.length;
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === totalSteps - 1;
    const progress = ((currentStep + 1) / totalSteps) * 100;

    // Debounced change handler to prevent excessive re-renders
    const handleFormChange = useCallback((values: Record<string, unknown>) => {
        setFormData(values);
        if (onChange) {
            onChange(values);
        }
    }, [onChange]);

    // Validate current step using Form ref
    const validateCurrentStep = (): boolean => {
        if (formRef.current) {
            const isValid = formRef.current.validateForm();
            // console.log('Step validation result:', isValid, 'Current values:', formData);
            return isValid;
        }
        console.warn('Form ref not available');
        return false; // Don't allow progression if ref not available
    };

    const handleNext = () => {
        // Validate current step before proceeding
        const isValid = validateCurrentStep();
        // console.log('Attempting to go to next step, validation result:', isValid);

        if (!isValid) {
            // Scroll to top to show errors
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // console.log('Validation failed, staying on current step');
            return;
        }

        if (currentStep < totalSteps - 1) {
            setCompletedSteps(prev => new Set([...prev, currentStep]));
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            if (onStepChange) {
                onStepChange(nextStep);
            }
            // Scroll to top of next step
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            const prevStep = currentStep - 1;
            setCurrentStep(prevStep);
            if (onStepChange) {
                onStepChange(prevStep);
            }
        }
    };

    const handleStepClick = (stepIndex: number) => {
        if (allowStepNavigation || completedSteps.has(stepIndex) || stepIndex < currentStep) {
            setCurrentStep(stepIndex);
            if (onStepChange) {
                onStepChange(stepIndex);
            }
        }
    };

    const handleSubmit = async (values: Record<string, unknown>) => {
        // Validate current step before final submit
        if (isLastStep) {
            if (!validateCurrentStep()) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            return onSubmit(values);
        }
        handleNext();
    };

    const currentStepData = steps[currentStep];

    return (
        <div className="space-y-6">
            {/* Progress Bar */}
            {showProgressBar && (
                <Card>
                    <div className="p-3">
                        {/* Step indicators */}
                        <div className="flex items-center justify-between mb-4">
                            {steps.map((step, index) => {
                                const isActive = index === currentStep;
                                const isCompleted = completedSteps.has(index) || index < currentStep;
                                const isClickable = allowStepNavigation || isCompleted || index < currentStep;

                                return (
                                    <div key={index} className="flex items-center flex-1">
                                        <div className="flex flex-col items-center flex-1">
                                            <button
                                                type="button"
                                                onClick={() => handleStepClick(index)}
                                                disabled={!isClickable}
                                                className={`
                                                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                                                    transition-all duration-200 mb-2
                                                    ${isActive
                                                        ? 'bg-primary text-white ring-4 ring-primary/20 scale-110'
                                                        : isCompleted
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-gray-200 text-gray-600'
                                                    }
                                                    ${isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}
                                                `.trim().replace(/\s+/g, ' ')}
                                            >
                                                {isCompleted && !isActive ? (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : showStepNumbers ? (
                                                    index + 1
                                                ) : (
                                                    <div className="w-2 h-2 rounded-full bg-current" />
                                                )}
                                            </button>
                                            <span className={`text-xs font-medium text-center ${isActive ? 'text-primary' : 'text-gray-600'}`}>
                                                {step.title}
                                            </span>
                                        </div>
                                        {index < totalSteps - 1 && (
                                            <div
                                                className={`
                                                    h-1 flex-1 mx-2 rounded-full transition-all duration-300
                                                    ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                                                `.trim().replace(/\s+/g, ' ')}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Progress bar */}
                        <div className="relative">
                            <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                                <div
                                    style={{ width: `${progress}%` }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
                                />
                            </div>
                            <div className="text-right mt-2">
                                <span className="text-sm font-medium text-gray-600">
                                    Step {currentStep + 1} of {totalSteps}
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {/* Current Step Content */}
            <Card>
                <div className="p-3 bg-white">
                    <div className="mb-3">
                        <h2 className="text-lg font-semibold text-gray-800">{currentStepData.title}</h2>
                        {currentStepData.description && (
                            <p className="text-gray-500 text-sm">{currentStepData.description}</p>
                        )}
                    </div>

                    <Form
                        ref={formRef}
                        {...formProps}
                        sections={currentStepData.sections}
                        initialValues={formData}
                        onChange={handleFormChange}
                        onSubmit={handleSubmit}
                        showSubmitButton={false}
                        cardWrapper={false}
                    />
                </div>

                {/* Navigation Buttons */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <div>
                        {showCancelButton && (
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={onCancel}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                {cancelText}
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {!isFirstStep && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handlePrevious}
                                className="px-6 py-2.5"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Previous
                            </Button>
                        )}

                        {!isLastStep ? (
                            <Button
                                type="button"
                                variant="primary"
                                onClick={handleNext}
                                className="px-6 py-2.5"
                            >
                                Next
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                variant="primary"
                                onClick={() => handleSubmit(formData)}
                                className="px-6 py-2.5"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {finalSubmitText}
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default MultiStepForm;
