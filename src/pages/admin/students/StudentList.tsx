import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShadcnDataTable, type ShadcnDataTableColumn, type ShadcnDataTableFilter, type ShadcnDataTableAction, type ShadcnDataTableBulkAction } from '../../../components/common/ShadcnDataTable';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AdnPaths } from '../../../router/paths';
import { Eye, Edit, Trash2, Mail, Download, Loader2, Upload, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetStudents, useDeleteStudent, type Student } from '@/hooks/students';
import { toast } from 'sonner';
import { useGetAllUsers } from '@/hooks/admin';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { formatEnumLabel, parseStudentLevel, formatFullName } from '@/lib/data-parser';

function StudentList() {
    const navigate = useNavigate();
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; student: Student | null }>({ isOpen: false, student: null });
    const [bulkDeleteDialog, setBulkDeleteDialog] = useState<{ isOpen: boolean; count: number }>({ isOpen: false, count: 0 });

    // Fetch students from API
    const { data: students, isLoading, error, refetch } = useGetAllUsers(1, 50);
    const { mutate: deleteStudent, isPending: isDeleting } = useDeleteStudent();
    // Filter Students from the fetched users

    const studentsData = Array.isArray(students)
        ? students.filter((u: any) => u.role?.toLowerCase() === 'student')
        : (students && Array.isArray((students as any).data))
            ? (students as any).data.filter((u: any) => u.role?.toLowerCase() === 'student')
            : [];

    // Handle loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading student data...</span>
            </div>
        );
    }

    // Handle error state
    // if (error) {
    //     return (
    //         <div className="flex flex-col items-center justify-center h-96 space-y-4">
    //             <p className="text-destructive">Failed to load students</p>
    //             <button 
    //                 onClick={() => refetch()} 
    //                 className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
    //             >
    //                 Retry
    //             </button>
    //         </div>
    //     );
    // }

    // const studentsList = Array.isArray(students)
    //     ? students
    //     : (students && Array.isArray((students as any).data))
    //         ? (students as any).data
    //         : [];

// Would revert if student now have its own standalone api endpoint
    // const studentsList = Array.isArray(students)
    //     ? students
    //     : (students && Array.isArray((students as any).data))
    //         ? (students as any).data
    //         : [];


    // Define columns for ShadcnDataTable
    const columns: ShadcnDataTableColumn<Student>[] = [
        {
            key: 'name',
            label: 'Student',
            sortable: true,
            render: (student) => {
                // Support both flat and nested profile structure
                const firstName = student.firstName || student.profile?.firstName || '';
                const lastName = student.lastName || student.profile?.lastName || '';
                const avatar = student.avatar || student.profile?.avatar || '';
                const email = student.email || '';
                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage
                                src={avatar}
                                alt={`${firstName} ${lastName}`}
                            />
                            <AvatarFallback>
                                {firstName[0] || ''}{lastName[0] || ''}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium">
                                {firstName} {lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">{email}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'studentLevel',
            label: 'Grade',
            sortable: true,
            width: '150px',
            render: (student) => (
                <Badge variant="outline">{parseStudentLevel(student.studentLevel || student.profile?.studentLevel)}</Badge>
            ),
        },
        {
            key: 'department',
            label: 'Department',
            sortable: true,
            width: '120px',
            render: (student) => (
                <Badge variant="outline">{formatEnumLabel(student.department || student.profile?.department)}</Badge>
            ),
        },
        {
            key: 'isVerified',
            label: 'Verification',
            sortable: true,
            width: '120px',
            render: (student) => (
                <Badge variant={student.isVerified ? "default" : "outline"}>
                    {student.isVerified ? "Verified" : "Not Verified"}
                </Badge>
            ),
        },
        {
            key: 'createdAt',
            label: 'Enrolled',
            sortable: true,
            width: '120px',
            render: (student) => (
                <div className="text-sm">
                    {student?.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A'}
                </div>
            ),
        },
        {
            key: 'guardianName',
            label: 'Guardian',
            render: (student) => (
                <div className="text-sm">
                    {student.guardianName || (
                        <span className="text-muted-foreground italic">No guardian assigned</span>
                    )}
                </div>
            ),
        },
    ];

    // Define filters for ShadcnDataTable
    const filters: ShadcnDataTableFilter[] = [
        {
            key: 'studentLevel',
            label: 'Grade',
            options: [...new Set(studentsData?.map((s: any) => s.profile?.studentLevel).filter(Boolean))]
                .sort()
                .map(g => ({
                    value: String(g!),
                    label: parseStudentLevel(String(g)),
                })),
        },
        {
            key: 'department',
            label: 'Department',
            options: [...new Set(studentsData.map((s: any) => s.department || s.profile?.department).filter(Boolean))]
                .sort()
                .map(c => ({
                    value: String(c!),
                    label: formatEnumLabel(String(c)),
                })),
        },
        {
            key: 'status',
            label: 'Status',
            options: [...new Set(studentsData.map((s: any) => s.status || s.profile?.status).filter(Boolean))]
                .sort()
                .map(status => ({ value: String(status), label: formatEnumLabel(String(status)) })),
        },
    ];

    // Define bulk actions
    const bulkActions: ShadcnDataTableBulkAction[] = [
        {
            label: 'Export Selected',
            icon: Download,
            onClick: (selected: string[]) => {
                // console.log('Exporting students:', selected);
                alert(`Exporting ${selected.length} students...`);
            },
        },
        {
            label: 'Send Email',
            icon: Mail,
            onClick: (selected: string[]) => {
                // console.log('Sending email to:', selected);
                alert(`Sending email to ${selected.length} students...`);
            },
        },
        {
            label: 'Delete Selected',
            icon: Trash2,
            variant: 'destructive',
            onClick: (selected: string[]) => {
                setBulkDeleteDialog({ isOpen: true, count: selected.length });
            },
        },
    ];

    // Define row actions
    const actions: ShadcnDataTableAction<Student>[] = [
        {
            label: 'View',
            icon: Eye,
            onClick: (student) => navigate(`${AdnPaths.ROOT}/students/${student.id}`, { state: { student } }),
        },
        {
            label: 'Edit',
            icon: Edit,
            onClick: (student) => navigate(`${AdnPaths.ROOT}/students/${student.id}/edit`, { state: { student } }),
        },
        {
            label: 'Delete',
            icon: Trash2,
            variant: 'destructive',
            onClick: (student) => {
                setDeleteDialog({ isOpen: true, student });
            },
        },
    ];

    return (
        <div className="space-y-6">
            {/* Custom Header with Multiple Actions */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Student Management</h2>
                    <p className="text-muted-foreground">Manage and monitor all students in the system</p>
                </div>
                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className='text-foreground'>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add Students
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(AdnPaths.STUDENTS_ONBOARD)}>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Onboard Single Student
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(AdnPaths.STUDENTS_BULK_UPLOAD)}>
                                <Upload className="mr-2 h-4 w-4" />
                                Bulk Upload Students
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* ShadcnDataTable Component */}
            <ShadcnDataTable<Student>
                
                data={studentsData}
                columns={columns}
                keyExtractor={(student) => student.id}
                searchable
                searchKeys={['firstName', 'lastName', 'email', 'id']}
                searchPlaceholder="Search students by name, email, or ID..."
                filterable
                filters={filters}
                selectable
                selectedItems={selectedStudents}
                onSelectionChange={setSelectedStudents}
                bulkActions={bulkActions}
                actions={actions}
                pagination
                pageSize={5}
                // pageSizeOptions={[5, 10, 25, 50]}
                // exportable
                // onExport={() => {
                //     // console.log('Exporting all students...');
                //     alert('Exporting student data...');
                // }}
                emptyMessage="No students found. Start by onboarding your first student."
            />

            {/* Single Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, student: null })}
                onConfirm={() => {
                    if (deleteDialog.student) {
                        deleteStudent(deleteDialog.student.id, {
                            onSuccess: () => {
                                toast.success('Student deleted successfully');
                                refetch();
                                setDeleteDialog({ isOpen: false, student: null });
                            },
                        });
                    }
                }}
                title="Delete Student"
                description={`Are you sure you want to delete ${formatFullName(deleteDialog.student || {})}? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                variant="destructive"
            />

            {/* Bulk Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={bulkDeleteDialog.isOpen}
                onClose={() => setBulkDeleteDialog({ isOpen: false, count: 0 })}
                onConfirm={() => {
                    // Handle bulk delete
                    toast.success(`Deleting ${bulkDeleteDialog.count} students...`);
                    setBulkDeleteDialog({ isOpen: false, count: 0 });
                }}
                title="Delete Multiple Students"
                description={`Are you sure you want to delete ${bulkDeleteDialog.count} selected students? This action cannot be undone.`}
                confirmText="Delete All"
                cancelText="Cancel"
                variant="destructive"
            />
        </div>
    );
}

export default StudentList;
