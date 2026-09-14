import { useNavigate } from 'react-router-dom';
import { AdnPaths } from '../../../router/paths';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, Download, Users, FileSpreadsheet, AlertCircle, CheckCircle2, Loader2, Edit2, Trash2, AlertTriangle, User, Mail, Calendar, BookOpen, UserCircle, UsersIcon } from 'lucide-react';
import { useBulkUploadStudents } from '@/hooks/students';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ShadcnDataTable } from '@/components/common/ShadcnDataTable';
import type { ShadcnDataTableColumn, ShadcnDataTableAction } from '@/components/common/ShadcnDataTable';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { IonIcon } from '@ionic/react';
import { person } from 'ionicons/icons';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';

interface StudentData {
    _rowId?: string; // Unique identifier for tracking rows
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    grade: string;
    section: string;
    guardianName: string;
    guardianEmail: string;
    guardianPhone: string;
    [key: string]: string | undefined; // Allow dynamic access
}

interface ValidationError {
    row: number;
    field: string;
    message: string;
}

const StudentBulkUpload = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [parsedData, setParsedData] = useState<StudentData[]>([]);
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingRow, setEditingRow] = useState<{ index: number; data: StudentData } | null>(null);
    const [editFormData, setEditFormData] = useState<StudentData>({} as StudentData);
    const [rowToDelete, setRowToDelete] = useState<StudentData | null>(null);

    const { mutate: bulkUploadStudents, isPending } = useBulkUploadStudents(
        async () => {
            setSelectedFile(null);
            setParsedData([]);
            setValidationErrors([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            navigate(AdnPaths.STUDENTS);
        }
    );

    const requiredFields = [
        'firstName', 'lastName', 'email', 'password', 'dateOfBirth',
        'gender', 'grade', 'section', 'guardianName', 'guardianEmail'
    ];

    const validateRow = (row: StudentData, index: number): ValidationError[] => {
        const errors: ValidationError[] = [];

        requiredFields.forEach(field => {
            if (!row[field] || row[field].trim() === '') {
                errors.push({
                    row: index,
                    field,
                    message: `${field} is required`
                });
            }
        });

        // Email validation
        if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
            errors.push({
                row: index,
                field: 'email',
                message: 'Invalid email format'
            });
        }

        if (row.guardianEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.guardianEmail)) {
            errors.push({
                row: index,
                field: 'guardianEmail',
                message: 'Invalid guardian email format'
            });
        }

        // Date validation
        if (row.dateOfBirth && !/^\d{4}-\d{2}-\d{2}$/.test(row.dateOfBirth)) {
            errors.push({
                row: index,
                field: 'dateOfBirth',
                message: 'Date must be in YYYY-MM-DD format'
            });
        }

        return errors;
    };

    const parseFile = async (file: File) => {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        if (fileExtension === 'csv') {
            // Parse CSV
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const data = (results.data as StudentData[]).map((row, idx) => ({
                        ...row,
                        _rowId: `row-${Date.now()}-${idx}` // Add unique ID
                    }));
                    setParsedData(data);

                    // Validate all rows
                    const allErrors: ValidationError[] = [];
                    data.forEach((row, index) => {
                        const rowErrors = validateRow(row, index);
                        allErrors.push(...rowErrors);
                    });
                    setValidationErrors(allErrors);

                    if (allErrors.length > 0) {
                        toast.warning(`Found ${allErrors.length} validation error(s). Please review and fix them.`);
                    } else {
                        toast.success(`Successfully parsed ${data.length} student records`);
                    }
                },
                error: (error) => {
                    toast.error(`Failed to parse CSV: ${error.message}`);
                }
            });
        } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
            // Parse Excel
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = e.target?.result;
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = (XLSX.utils.sheet_to_json(worksheet) as StudentData[]).map((row, idx) => ({
                        ...row,
                        _rowId: `row-${Date.now()}-${idx}` // Add unique ID
                    }));

                    setParsedData(jsonData);

                    // Validate all rows
                    const allErrors: ValidationError[] = [];
                    jsonData.forEach((row, index) => {
                        const rowErrors = validateRow(row, index);
                        allErrors.push(...rowErrors);
                    });
                    setValidationErrors(allErrors);

                    if (allErrors.length > 0) {
                        toast.warning(`Found ${allErrors.length} validation error(s). Please review and fix them.`);
                    } else {
                        toast.success(`Successfully parsed ${jsonData.length} student records`);
                    }
                } catch (error) {
                    toast.error('Failed to parse Excel file');
                }
            };
            reader.readAsBinaryString(file);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            validateAndSetFile(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            validateAndSetFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const validateAndSetFile = (file: File) => {
        const validTypes = [
            'text/csv',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        if (!validTypes.includes(file.type) && !file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
            toast.error('Invalid file type. Please upload a CSV or Excel file.');
            return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            toast.error('File size too large. Maximum size is 10MB.');
            return;
        }

        setSelectedFile(file);
        parseFile(file);
        toast.success('File selected successfully');
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setParsedData([]);
        setValidationErrors([]);
        // Reset file input to allow selecting the same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        toast.info('File removed');
    };

    const handleEditRow = (index: number) => {
        setEditingRow({ index, data: parsedData[index] });
        setEditFormData({ ...parsedData[index] });
        setIsEditModalOpen(true);
    };

    const handleDeleteRow = (index: number) => {
        const newData = parsedData.filter((_, i) => i !== index);
        setParsedData(newData);

        // Re-validate after deletion
        const allErrors: ValidationError[] = [];
        newData.forEach((row, idx) => {
            const rowErrors = validateRow(row, idx);
            allErrors.push(...rowErrors);
        });
        setValidationErrors(allErrors);

        toast.success('Row deleted');
    };

    const handleSaveEdit = () => {
        if (editingRow === null) return;

        const newData = [...parsedData];
        newData[editingRow.index] = editFormData;
        setParsedData(newData);

        // Re-validate after edit
        const allErrors: ValidationError[] = [];
        newData.forEach((row, index) => {
            const rowErrors = validateRow(row, index);
            allErrors.push(...rowErrors);
        });
        setValidationErrors(allErrors);

        setIsEditModalOpen(false);
        setEditingRow(null);
        toast.success('Row updated successfully');
    };

    const getRowErrors = (rowIndex: number): ValidationError[] => {
        return validationErrors.filter(error => error.row === rowIndex);
    };

    const hasFieldError = (rowIndex: number, field: string): boolean => {
        return validationErrors.some(error => error.row === rowIndex && error.field === field);
    };

    const getFieldError = (rowIndex: number, field: string): string | undefined => {
        const error = validationErrors.find(error => error.row === rowIndex && error.field === field);
        return error?.message;
    };

    const handleUpload = () => {
        if (!selectedFile) {
            toast.error('Please select a file first');
            return;
        }

        if (parsedData.length === 0) {
            toast.error('No data to upload');
            return;
        }

        if (validationErrors.length > 0) {
            toast.error('Please fix all validation errors before uploading');
            return;
        }

        // Remove _rowId before uploading (internal tracking only)
        const cleanData = parsedData.map(({ _rowId, ...rest }) => rest);

        // Create a new CSV from cleaned data
        const csv = Papa.unparse(cleanData);
        const blob = new Blob([csv], { type: 'text/csv' });
        const file = new File([blob], selectedFile.name, { type: 'text/csv' });

        const formData = new FormData();
        formData.append('file', file);
        bulkUploadStudents(formData);
    };

    // Define columns for ShadcnDataTable
    const columns: ShadcnDataTableColumn<StudentData>[] = [
        {
            key: 'firstName',
            label: 'Student Name',
            sortable: true,
            render: (student, index) => {
                const firstNameError = hasFieldError(index, 'firstName');
                const lastNameError = hasFieldError(index, 'lastName');
                const emailError = hasFieldError(index, 'email');
                const firstNameMsg = getFieldError(index, 'firstName');
                const lastNameMsg = getFieldError(index, 'lastName');
                const emailMsg = getFieldError(index, 'email');

                return (
                    <TooltipProvider>
                        <div className="space-y-1">
                            <div className="font-medium flex items-center gap-2">
                                <User className="h-4 w-4" />
                                {firstNameError ? (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="text-red-600 font-semibold underline decoration-wavy cursor-help">
                                                {student.firstName || '(missing)'}
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="text-xs">{firstNameMsg}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ) : (
                                    <span>{student.firstName}</span>
                                )}
                                {lastNameError ? (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="text-red-600 font-semibold underline decoration-wavy cursor-help">
                                                {student.lastName || '(missing)'}
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="text-xs">{lastNameMsg}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ) : (
                                    <span>{student.lastName}</span>
                                )}
                            </div>
                            {emailError ? (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="text-sm text-red-600 font-semibold underline decoration-wavy cursor-help">
                                            {student.email || '(missing)'}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs">{emailMsg}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ) : (
                                student.email && (
                                    <div className="text-sm text-muted-foreground">
                                        {student.email}
                                    </div>
                                )
                            )}
                        </div>
                    </TooltipProvider>
                );
            },
        },
        {
            key: 'phoneNumber',
            label: 'Contact',
            sortable: true,
            width: '150px',
            render: (student, index) => {
                const error = hasFieldError(index, 'phoneNumber');
                const errorMsg = getFieldError(index, 'phoneNumber');

                return error ? (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="text-sm text-red-600 font-semibold underline decoration-wavy cursor-help">
                                    {student.phoneNumber || '(missing)'}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">{errorMsg}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    <div className="text-sm">
                        {student.phoneNumber || '-'}
                    </div>
                );
            },
        },
        {
            key: 'dateOfBirth',
            label: 'Date of Birth',
            sortable: true,
            width: '130px',
            render: (student, index) => {
                const error = hasFieldError(index, 'dateOfBirth');
                const errorMsg = getFieldError(index, 'dateOfBirth');

                return error ? (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="text-sm text-red-600 font-semibold underline decoration-wavy cursor-help flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {student.dateOfBirth || '(missing)'}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">{errorMsg}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    <div className="text-sm flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {student.dateOfBirth || '-'}
                    </div>
                );
            },
        },
        {
            key: 'gender',
            label: 'Gender',
            sortable: true,
            width: '100px',
            render: (student, index) => {
                const error = hasFieldError(index, 'gender');
                const errorMsg = getFieldError(index, 'gender');

                return error ? (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Badge variant="destructive" className="cursor-help">
                                    {student.gender || 'Missing'}
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">{errorMsg}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    <Badge variant="outline">
                        {student.gender || 'N/A'}
                    </Badge>
                );
            },
        },
        {
            key: 'grade',
            label: 'Class',
            sortable: true,
            width: '140px',
            render: (student, index) => {
                const gradeError = hasFieldError(index, 'grade');
                const sectionError = hasFieldError(index, 'section');
                const gradeMsg = getFieldError(index, 'grade');
                const sectionMsg = getFieldError(index, 'section');

                return (
                    <TooltipProvider>
                        <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {gradeError ? (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="text-sm text-red-600 font-semibold underline decoration-wavy cursor-help">
                                            {student.grade || '(missing)'}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs">{gradeMsg}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ) : (
                                <span className="text-sm">{student.grade}</span>
                            )}
                            <span className="text-sm">-</span>
                            {sectionError ? (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="text-sm text-red-600 font-semibold underline decoration-wavy cursor-help">
                                            {student.section || '(missing)'}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs">{sectionMsg}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ) : (
                                <span className="text-sm">{student.section}</span>
                            )}
                        </div>
                    </TooltipProvider>
                );
            },
        },
        {
            key: 'guardianName',
            label: 'Guardian',
            sortable: true,
            render: (student, index) => {
                const nameError = hasFieldError(index, 'guardianName');
                const emailError = hasFieldError(index, 'guardianEmail');
                const nameMsg = getFieldError(index, 'guardianName');
                const emailMsg = getFieldError(index, 'guardianEmail');

                return (
                    <TooltipProvider>
                        <div className="space-y-1">
                            {nameError ? (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="font-medium flex items-center gap-1 text-red-600 underline decoration-wavy cursor-help">
                                            <UserCircle className="h-4 w-4" />
                                            {student.guardianName || '(missing)'}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs">{nameMsg}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ) : (
                                <div className="font-medium flex items-center gap-1">
                                    <UserCircle className="h-4 w-4" />
                                    {student.guardianName || '-'}
                                </div>
                            )}
                            {emailError ? (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="text-sm text-red-600 font-semibold flex items-center gap-1 underline decoration-wavy cursor-help">
                                            <Mail className="h-3 w-3" />
                                            {student.guardianEmail || '(missing)'}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs">{emailMsg}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ) : (
                                student.guardianEmail && (
                                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Mail className="h-3 w-3" />
                                        {student.guardianEmail}
                                    </div>
                                )
                            )}
                        </div>
                    </TooltipProvider>
                );
            },
        },
    ];

    // Define row actions
    const actions: ShadcnDataTableAction<StudentData>[] = [
        {
            label: 'Edit',
            icon: Edit2,
            onClick: (student: StudentData) => {
                const index = parsedData.findIndex(s => s._rowId === student._rowId);
                if (index !== -1) handleEditRow(index);
            },
        },
        {
            label: 'Delete',
            icon: Trash2,
            variant: 'destructive',
            onClick: setRowToDelete,
        },
    ];

    const handleDownloadTemplate = () => {
        // Create CSV template
        const headers = [
            'firstName',
            'lastName',
            'email',
            'password',
            'phoneNumber',
            'dateOfBirth',
            'gender',
            'address',
            'grade',
            'section',
            'guardianName',
            'guardianEmail',
            'guardianPhone'
        ];

        const sampleRow = [
            'John',
            'Doe',
            'john.doe@example.com',
            'password123',
            '+234 XXX XXX XXXX',
            '2010-01-15',
            'Male',
            '123 Main Street, Lagos',
            'Grade 10',
            'A',
            'Jane Doe',
            'jane.doe@example.com',
            '+234 XXX XXX XXXX'
        ];

        const csvContent = [
            headers.join(','),
            sampleRow.join(',')
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'student_bulk_upload_template.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success('Template downloaded successfully');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            <IonIcon icon={person} className="mr-2" style={{ fontSize: '20px' }} />
                            Bulk Upload Students
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Upload multiple students at once using CSV or Excel file
                        </p>
                    </div>
                </div>
            </div>

            {/* Instructions Alert */}
            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Upload Instructions</AlertTitle>
                <AlertDescription>
                    <ol className="list-decimal list-inside space-y-1 mt-2">
                        <li>Download the CSV template below</li>
                        <li>Fill in student information following the format</li>
                        <li>Save the file and upload it here</li>
                        <li>Review any errors and re-upload if necessary</li>
                    </ol>
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upload Section */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload File</CardTitle>
                            <CardDescription>
                                Drag and drop your CSV/Excel file here, or click to browse
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Drag and Drop Area */}
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                className={`
                                    border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer
                                    ${isDragging
                                        ? 'border-primary bg-primary/5 scale-105'
                                        : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
                                    }
                                `}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    id="file-upload"
                                    type="file"
                                    accept=".csv,.xlsx,.xls"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                                <div className="space-y-4">
                                    <div className="flex justify-center">
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Upload className="w-8 h-8 text-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-lg font-medium">
                                            {selectedFile ? selectedFile.name : 'Drop your file here'}
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            or click to browse from your computer
                                        </p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Supported formats: CSV, XLSX (Max 10MB)
                                    </p>
                                </div>
                            </div>

                            {/* Selected File Info */}
                            {selectedFile && (
                                <Alert className="border-green-200 bg-green-50">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <AlertTitle className="text-green-800">File Selected</AlertTitle>
                                    <AlertDescription className="text-green-700">
                                        <div className="flex items-center justify-between mt-2">
                                            <div>
                                                <p className="font-medium">{selectedFile.name}</p>
                                                <p className="text-sm">
                                                    {(selectedFile.size / 1024).toFixed(2)} KB • {parsedData.length} records
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveFile();
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Validation Summary */}
                            {parsedData.length > 0 && validationErrors.length > 0 && (
                                <Alert variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Validation Errors Found</AlertTitle>
                                    <AlertDescription>
                                        {validationErrors.length} error(s) in {new Set(validationErrors.map(e => e.row)).size} row(s).
                                        Please fix all errors before uploading.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {parsedData.length > 0 && validationErrors.length === 0 && (
                                <Alert className="border-green-200 bg-green-50">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <AlertTitle className="text-green-800">Data Valid</AlertTitle>
                                    <AlertDescription className="text-green-700">
                                        All {parsedData.length} records are valid and ready to upload.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 justify-end pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => navigate(AdnPaths.STUDENTS)}
                                    disabled={isPending}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className='text-foreground'
                                    onClick={handleUpload}
                                    disabled={!selectedFile || isPending || parsedData.length === 0 || validationErrors.length > 0}
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload {parsedData.length} Students
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data Preview Table */}
                    {parsedData.length > 0 && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Data Preview</CardTitle>
                                <CardDescription>
                                    Review and edit student records before uploading. Rows with errors are highlighted.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ShadcnDataTable<StudentData>
                                    data={parsedData}
                                    columns={[
                                        ...columns,
                                        {
                                            key: 'status',
                                            label: 'Validation Status',
                                            width: '180px',
                                            render: (_student: StudentData, index: number) => {
                                                const rowErrors = getRowErrors(index);
                                                const hasErrors = rowErrors.length > 0;
                                                return (
                                                    <TooltipProvider>
                                                        {hasErrors ? (
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Badge variant="destructive" className="gap-1 cursor-help">
                                                                        <AlertTriangle className="h-3 w-3" />
                                                                        {rowErrors.length} Error{rowErrors.length > 1 ? 's' : ''}
                                                                    </Badge>
                                                                </TooltipTrigger>
                                                                <TooltipContent className="max-w-xs">
                                                                    <div className="space-y-1">
                                                                        <p className="font-semibold text-xs">Validation Errors:</p>
                                                                        {rowErrors.map((error, idx) => (
                                                                            <div key={idx} className="text-xs">
                                                                                • <span className="font-medium">{error.field}:</span> {error.message}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        ) : (
                                                            <Badge variant="outline" className="gap-1 border-green-600 text-green-600">
                                                                <CheckCircle2 className="h-3 w-3" />
                                                                Valid
                                                            </Badge>
                                                        )}
                                                    </TooltipProvider>
                                                );
                                            },
                                        },
                                    ]}
                                    keyExtractor={(student: StudentData) => student._rowId || `student-${student.email}`}
                                    searchable
                                    searchKeys={['firstName', 'lastName', 'email', 'grade', 'section']}
                                    searchPlaceholder="Search students by name, email, grade..."
                                    actions={actions}
                                    pagination
                                    pageSize={5}
                                    emptyMessage="No student records to preview."
                                />
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Template & Guidelines */}
                <div className="space-y-6">
                    {/* Download Template */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Template</CardTitle>
                            <CardDescription>
                                Download the CSV template to get started
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={handleDownloadTemplate}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download Template
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Required Fields */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Required Fields</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <FileSpreadsheet className="h-4 w-4 text-primary mt-0.5" />
                                    <span>First Name & Last Name</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FileSpreadsheet className="h-4 w-4 text-primary mt-0.5" />
                                    <span>Email Address (unique)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FileSpreadsheet className="h-4 w-4 text-primary mt-0.5" />
                                    <span>Password</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FileSpreadsheet className="h-4 w-4 text-primary mt-0.5" />
                                    <span>Date of Birth (YYYY-MM-DD)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FileSpreadsheet className="h-4 w-4 text-primary mt-0.5" />
                                    <span>Gender (Male/Female/Other)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FileSpreadsheet className="h-4 w-4 text-primary mt-0.5" />
                                    <span>Grade & Section</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FileSpreadsheet className="h-4 w-4 text-primary mt-0.5" />
                                    <span>Guardian Information</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Tips */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Tips</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>• Ensure all email addresses are unique</li>
                                <li>• Use consistent date format (YYYY-MM-DD)</li>
                                <li>• Double-check phone numbers</li>
                                <li>• Remove any special characters from names</li>
                                <li>• Keep file size under 10MB</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Student Record</DialogTitle>
                        <DialogDescription>
                            Update the student information. Row {editingRow ? editingRow.index + 1 : ''}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                                id="firstName"
                                value={editFormData.firstName || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, firstName: e.target.value })}
                                placeholder="John"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                                id="lastName"
                                value={editFormData.lastName || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, lastName: e.target.value })}
                                placeholder="Doe"
                            />
                        </div>

                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={editFormData.email || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                placeholder="john.doe@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password *</Label>
                            <Input
                                id="password"
                                type="text"
                                value={editFormData.password || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                                placeholder="password123"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                value={editFormData.phoneNumber || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, phoneNumber: e.target.value })}
                                placeholder="+234 XXX XXX XXXX"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth * (YYYY-MM-DD)</Label>
                            <Input
                                id="dateOfBirth"
                                type="text"
                                value={editFormData.dateOfBirth || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, dateOfBirth: e.target.value })}
                                placeholder="2010-01-15"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender *</Label>
                            <Input
                                id="gender"
                                value={editFormData.gender || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
                                placeholder="Male/Female/Other"
                            />
                        </div>

                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                value={editFormData.address || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                                placeholder="123 Main Street, Lagos"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="grade">Grade *</Label>
                            <Input
                                id="grade"
                                value={editFormData.grade || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, grade: e.target.value })}
                                placeholder="Grade 10"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="section">Section *</Label>
                            <Input
                                id="section"
                                value={editFormData.section || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, section: e.target.value })}
                                placeholder="A"
                            />
                        </div>

                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="guardianName">Guardian Name *</Label>
                            <Input
                                id="guardianName"
                                value={editFormData.guardianName || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, guardianName: e.target.value })}
                                placeholder="Jane Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="guardianEmail">Guardian Email *</Label>
                            <Input
                                id="guardianEmail"
                                type="email"
                                value={editFormData.guardianEmail || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, guardianEmail: e.target.value })}
                                placeholder="jane.doe@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="guardianPhone">Guardian Phone</Label>
                            <Input
                                id="guardianPhone"
                                value={editFormData.guardianPhone || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, guardianPhone: e.target.value })}
                                placeholder="+234 XXX XXX XXXX"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            className="text-foreground" onClick={handleSaveEdit}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <ConfirmDialog
                isOpen={!!rowToDelete}
                onClose={() => setRowToDelete(null)}
                onConfirm={() => {
                    if (!rowToDelete) return;
                    const index = parsedData.findIndex(student => student._rowId === rowToDelete._rowId);
                    if (index !== -1) handleDeleteRow(index);
                    setRowToDelete(null);
                }}
                title="Remove imported row?"
                description={`Remove ${rowToDelete?.firstName || 'this student'} ${rowToDelete?.lastName || ''} from the pending upload? This only changes the local preview and does not delete an existing portal account.`}
                confirmText="Remove row"
                cancelText="Keep row"
                variant="destructive"
            />
        </div>
    );
};

export default StudentBulkUpload;
