import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShadcnDataTable, type ShadcnDataTableColumn, type ShadcnDataTableAction, type ShadcnDataTableBulkAction } from '../../../components/common/ShadcnDataTable';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AdnPaths } from '../../../router/paths';
import { Eye, Edit, Trash2, BookOpen, Calendar, Users, Download, Award, Building, Loader2 } from 'lucide-react';
import { useGetCourses, useDeleteCourse, type Course } from '@/hooks/courses';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { formatEnumLabel } from '@/lib/data-parser';

const CourseList = () => {
    const navigate = useNavigate();
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
    const [archiveCount, setArchiveCount] = useState(0);

    // Fetch courses from API
    const { data: courses = [], isLoading, error, refetch } = useGetCourses(1, 50);
    const { mutate: deleteCourse } = useDeleteCourse();

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-2">
                    <p className="text-muted-foreground">Failed to load courses</p>
                    <button
                        onClick={() => refetch()}
                        className="text-primary underline"
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    // If courses is an array, use it directly; if it has a 'data' property, use that; otherwise, fallback to empty array
    const courseList: Course[] = Array.isArray(courses)
        ? courses
        : (courses && Array.isArray((courses as any).data))
            ? (courses as any).data
            : [];

            // console.log(courseList, "courseListcourseList")
    // Define columns for ShadcnDataTable
    const columns: ShadcnDataTableColumn<Course>[] = [
        {
            key: 'title',
            label: 'Course Title',
            sortable: true,
            render: (course) => (
                <div>
                    <div className="font-medium flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        {course.title}
                    </div>
                    {course.description && (
                        <div className="text-sm text-muted-foreground line-clamp-1">
                            {course.description}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'subject',
            label: 'Subject',
            sortable: true,
            width: '150px',
            render: (course) => (
                <Badge variant="outline">
                    {formatEnumLabel(course.subject, 'Not specified')}
                </Badge>
            ),
        },
        {
            key: 'courseType',
            label: 'Type',
            sortable: true,
            width: '120px',
            render: (course) => (
                <Badge variant="secondary">
                    {formatEnumLabel(course.courseType, 'Not specified')}
                </Badge>
            ),
        },
        {
            key: 'teacher',
            label: 'Instructor',
            sortable: true,
            render: (course) => (
                <div className="text-sm">
                    {course.teacher ? `${course.teacher.firstName} ${course.teacher.lastName}` : 'Unassigned'}
                </div>
            ),
        },
        {
            key: 'enrollmentCount',
            label: 'Students',
            sortable: true,
            width: '100px',
            render: (course) => (
                <Badge variant="outline" className="gap-1">
                    <Users className="h-3 w-3" />
                    {Array.isArray(course.enrollments) ? course.enrollments.length : (course.enrollmentCount ?? 0)}
                </Badge>
            ),
        },
    ];

    // Define bulk actions
    const bulkActions: ShadcnDataTableBulkAction[] = [
        {
            label: 'Export Selected',
            icon: Download,
            onClick: (selected: string[]) => {
                // console.log('Exporting courses:', selected);
                toast.success(`Exporting ${selected.length} courses...`);
            },
        },
        {
            label: 'Archive Selected',
            icon: Trash2,
            variant: 'destructive',
            onClick: (selected: string[]) => {
                setArchiveCount(selected.length);
            },
        },
    ];

    // Define row actions
    const actions: ShadcnDataTableAction<Course>[] = [
        {
            label: 'View',
            icon: Eye,
            onClick: (course) => navigate(`${AdnPaths.COURSES}/${course.id}`),
        },
        {
            label: 'Edit',
            icon: Edit,
            onClick: (course) => navigate(`${AdnPaths.COURSES}/${course.id}/edit`),
        },
        {
            label: 'Delete',
            icon: Trash2,
            variant: 'destructive',
            onClick: setCourseToDelete,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                                <p className="text-2xl font-bold mt-1">{courseList.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                                <p className="text-2xl font-bold mt-1">
                                    {courseList.some(c => c.status) ? courseList.filter(c => c.status === 'ACTIVE').length : '—'}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Award className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Departments</p>
                                <p className="text-2xl font-bold mt-1">
                                    {new Set(courseList.flatMap(c => c.allowedDepartments || []).filter(department => department && department !== 'NONE')).size}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Building className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Instructors</p>
                                <p className="text-2xl font-bold mt-1">
                                    {new Set(courseList.map(c => c.teacherId).filter(Boolean)).size}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>


            {/* ShadcnDataTable Component */}
            <ShadcnDataTable<Course>
                title="Course Management"
                description="Manage all courses and schedules in the system"
                data={courseList}
                columns={columns}
                keyExtractor={(course) => course.id}
                searchable
                searchKeys={['title', 'subject', 'description', 'courseType']}
                searchPlaceholder="Search courses by title, subject, type..."
                selectable
                selectedItems={selectedCourses}
                onSelectionChange={setSelectedCourses}
                bulkActions={bulkActions}
                actions={actions}
                pagination
                pageSize={5}
                pageSizeOptions={[5, 10, 25, 50]}
                exportable
                onExport={() => {
                    toast.success('Exporting course data...');
                }}
                addButton={{
                    label: 'Add New Course',
                    onClick: () => navigate(`${AdnPaths.COURSES}/create`),
                }}
                emptyMessage="No courses found. Start by creating your first course."
            />
            <ConfirmDialog
                isOpen={!!courseToDelete}
                onClose={() => setCourseToDelete(null)}
                onConfirm={() => {
                    if (!courseToDelete) return;
                    deleteCourse(courseToDelete.id, {
                        onSuccess: () => {
                            setCourseToDelete(null);
                            refetch();
                            toast.success('Course deleted successfully');
                        },
                    });
                }}
                title="Delete course?"
                description={`You are about to permanently delete “${courseToDelete?.title || 'this course'}”. Its associations may no longer be available to teachers and students. This action cannot be undone.`}
                confirmText="Proceed with deletion"
                cancelText="Keep course"
                variant="destructive"
            />
            <ConfirmDialog
                isOpen={archiveCount > 0}
                onClose={() => setArchiveCount(0)}
                onConfirm={() => {
                    toast.info('Course archiving is not available in the current API. No courses were changed.');
                    setArchiveCount(0);
                }}
                title="Archive selected courses?"
                description={`${archiveCount} courses are selected. The current API does not provide an archive operation, so this confirmation will not alter records.`}
                confirmText="Acknowledge"
                cancelText="Cancel"
                variant="destructive"
            />
        </div>
    );
};

export default CourseList;
