import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShadcnDataTable, type ShadcnDataTableColumn, type ShadcnDataTableFilter, type ShadcnDataTableAction, type ShadcnDataTableBulkAction } from '../../../components/common/ShadcnDataTable';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AdnPaths } from '@/router/paths';
import { Eye, Edit, Trash2, Mail, Download, Loader2 } from 'lucide-react';
import { useGetTeachers, useDeleteTeacher } from '@/hooks/teachers';
import { toast } from 'sonner';
import type { TeacherData } from '@/types/teachers';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { formatEnumLabel, formatFullName } from '@/lib/data-parser';

const FacultyList = () => {
    const navigate = useNavigate();
    const [selectedFaculty, setSelectedFaculty] = useState<string[]>([]);
    const [deleteDialog, setDeleteDialog] = useState<TeacherData | null>(null);
    const [bulkDeleteCount, setBulkDeleteCount] = useState(0);
    
    // Fetch teachers from API
    const { data: teachers, isLoading, error, refetch } = useGetTeachers(1, 50, true);
    const { mutate: deleteTeacher, isPending: isDeleting } = useDeleteTeacher();

    // Handle loading state
    // if (isLoading) {
    //     return (
    //         <div className="flex items-center justify-center h-96">
    //             <Loader2 className="h-8 w-8 animate-spin text-primary" />
    //             <span className="ml-2">Loading faculty...</span>
    //         </div>
    //     );
    // }

    // Handle error state
    // if (error) {
    //     return (
    //         <div className="flex flex-col items-center justify-center h-96 space-y-4">
    //             <p className="text-destructive">Failed to load faculty members</p>
    //             <button 
    //                 onClick={() => refetch()} 
    //                 className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
    //             >
    //                 Retry
    //             </button>
    //         </div>
    //     );
    // }

    const facultyList: TeacherData[] = teachers || [];

    // Define columns for ShadcnDataTable
    const columns: ShadcnDataTableColumn<TeacherData>[] = [
        {
            key: 'id',
            label: 'Teacher ID',
            sortable: true,
            width: '120px',
            render: (teacher) => (
                <Badge variant="secondary">{teacher?.id?.slice(0, 8)}</Badge>
            ),
        },
        {
            key: 'firstName',
            label: 'Teacher',
            sortable: true,
            render: (teacher) => (
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage
                            src={teacher.avatar || undefined}
                            alt={`${teacher.firstName || 'Faculty'} ${teacher.lastName || ''}`}
                        />
                        <AvatarFallback>
                            {`${teacher.firstName?.[0] || ''}${teacher.lastName?.[0] || ''}` || 'FT'}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">
                            {teacher.firstName || 'Faculty'} {teacher.lastName || ''}
                        </div>
                        <div className="text-sm text-muted-foreground">{teacher.email}</div>
                    </div>
                </div>
            ),
        },
        // {
        //     key: 'department',
        //     label: 'Department',
        //     sortable: true,
        //     width: '150px',
        //     render: (teacher) => (
        //         <Badge variant="outline">{teacher.department || 'N/A'}</Badge>
        //     ),
        // },
        // {
        //     key: 'specialization',
        //     label: 'Specialization',
        //     sortable: true,
        //     width: '150px',
        //     render: (teacher) => (
        //         <span className="text-sm">{teacher.specialization || 'N/A'}</span>
        //     ),
        // },
        {
            key: 'phone',
            label: 'Contact',
            render: (teacher) => (
                <div className="text-sm">{teacher.phone || 'N/A'}</div>
            ),
        },
        {
            key: 'gender',
            label: 'Gender',
            sortable: true,
            width: '100px',
            render: (teacher) => (
                <Badge variant={teacher.gender === 'MALE' ? 'default' : 'secondary'}>
                    {teacher.gender}
                </Badge>
            ),
        },
    ];

    // Define filters for ShadcnDataTable
    const filters: ShadcnDataTableFilter[] = [
        {
            key: 'gender',
            label: 'Gender',
            options: [...new Set(facultyList.map((t: TeacherData) => String(t.gender || '')).filter(Boolean))].sort().map(g => ({
                value: g,
                label: g,
            })),
        },
        {
            key: 'employmentType',
            label: 'Employment Type',
            options: [...new Set(facultyList.map((t: TeacherData) => String(t.employmentType || '')).filter(Boolean))].sort().map(s => ({
                value: s,
                label: s,
            })),
        },
        {
            key: 'status',
            label: 'Status',
            options: [...new Set(facultyList.map((t: TeacherData) => String(t.status || '')).filter(Boolean))]
                .sort()
                .map(status => ({ value: status, label: formatEnumLabel(status) })),
        },
    ];

    // Define bulk actions
    const bulkActions: ShadcnDataTableBulkAction[] = [
        {
            label: 'Export Selected',
            icon: Download,
            onClick: (selected: string[]) => {
                // console.log('Exporting faculty:', selected);
                toast.success(`Exporting ${selected.length} faculty members...`);
            },
        },
        {
            label: 'Send Email',
            icon: Mail,
            onClick: (selected: string[]) => {
                // console.log('Sending email to:', selected);
                toast.success(`Sending email to ${selected.length} faculty members...`);
            },
        },
        {
            label: 'Delete Selected',
            icon: Trash2,
            variant: 'destructive',
            onClick: (selected: string[]) => {
                setBulkDeleteCount(selected.length);
            },
        },
    ];

    // Define row actions
    const actions: ShadcnDataTableAction<TeacherData>[] = [
        {
            label: 'View',
            icon: Eye,
            onClick: (teacher) => navigate(`${AdnPaths.FACULTY}/${teacher?.id || ''}`),
        },
        {
            label: 'Edit',
            icon: Edit,
            onClick: (teacher) => navigate(AdnPaths.FACULTY_EDIT.replace(':id', teacher?.id || '')),
        },
        {
            label: 'Delete',
            icon: Trash2,
            variant: 'destructive',
            onClick: setDeleteDialog,
        },
    ];

    return (
        <div className="space-y-6">
            {/* ShadcnDataTable Component */}
            <ShadcnDataTable<TeacherData>
                title="Faculty Management"
                description="Manage and monitor all faculty members in the system"
                data={facultyList}
                columns={columns}
                keyExtractor={(teacher) => teacher?.id || ''}
                searchable
                searchKeys={['firstName', 'lastName', 'email', 'department', 'specialization']}
                searchPlaceholder="Search faculty by name, email, department, or specialization..."
                filterable
                filters={filters}
                selectable
                selectedItems={selectedFaculty}
                onSelectionChange={setSelectedFaculty}
                bulkActions={bulkActions}
                actions={actions}
                pagination
                pageSize={5}
                // pageSizeOptions={[5, 10, 25, 50]}
                exportable
                onExport={() => {
                    // console.log('Exporting all faculty...');
                    toast.success('Exporting faculty data...');
                }}
                addButton={{
                    label: 'Add Faculty Member',
                    onClick: () => navigate(AdnPaths.FACULTY_CREATE),
                }}
                emptyMessage="No faculty members found. Start by adding your first teacher."
            />
            <ConfirmDialog
                isOpen={!!deleteDialog}
                onClose={() => setDeleteDialog(null)}
                onConfirm={() => {
                    if (!deleteDialog?.id) return;
                    deleteTeacher(deleteDialog.id, {
                        onSuccess: () => {
                            toast.success('Faculty member deleted successfully');
                            setDeleteDialog(null);
                            refetch();
                        },
                    });
                }}
                title="Delete faculty member?"
                description={`You are about to permanently remove ${formatFullName(deleteDialog || {})} and their portal access. This action cannot be undone.`}
                confirmText={isDeleting ? 'Deleting…' : 'Proceed with deletion'}
                cancelText="Keep faculty member"
                variant="destructive"
            />
            <ConfirmDialog
                isOpen={bulkDeleteCount > 0}
                onClose={() => setBulkDeleteCount(0)}
                onConfirm={() => {
                    toast.info('Bulk deletion requires a supported API endpoint. No records were removed.');
                    setBulkDeleteCount(0);
                }}
                title="Delete selected faculty?"
                description={`This would permanently remove ${bulkDeleteCount} faculty records. The current API does not expose a safe bulk-delete operation, so no deletion will be attempted.`}
                confirmText="Acknowledge"
                cancelText="Cancel"
                variant="destructive"
            />
        </div>
    );
};

export default FacultyList;
