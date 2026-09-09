import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Search, Filter, Loader2, Mail, Phone, Calendar } from 'lucide-react';
import { useGetAllUsers, type User } from '@/hooks/admin';
import { Skeleton } from '@/components/ui/skeleton';
import { ShadcnDataTable, type ShadcnDataTableColumn, type ShadcnDataTableAction } from '@/components/common/ShadcnDataTable';
import { getRoleBadgeVariant, getStatusBadgeVariant } from '@/helpers';

const AdminUsersList = () => {
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');

    const { data: users, isLoading, error, refetch } = useGetAllUsers(
        1,
        50,
        // {
        //     role: roleFilter !== 'all' ? roleFilter : undefined,
        //     search: debouncedSearch || undefined,
        // }
    );

    const UserList: User[] = Array.isArray(users)
        ? users
        : (users && Array.isArray((users as any).data))
            ? (users as any).data
            : [];


    // {
    //     (Array.isArray(users)
    //         ? users
    //         : users?.data || []
    //     )




    // Debounce search
    const handleSearch = (value: string) => {
        setSearchQuery(value);
        const timer = setTimeout(() => {
            setDebouncedSearch(value);
        }, 500);
        return () => clearTimeout(timer);
    };



    // Define table columns
    const columns: ShadcnDataTableColumn<any>[] = [
        {
            key: 'name',
            label: 'Name',
            render: (user) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-foreground">
                            {user?.profile?.firstName?.[0]}{user?.profile?.lastName?.[0]}
                        </span>
                    </div>
                    <div>
                        <div className="font-medium">{user?.profile?.firstName} {user?.profile?.lastName}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: 'role',
            label: 'Role',
            render: (user) => (
                <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                </Badge>
            ),
        },
        {
            key: 'department',
            label: 'Department',
            render: (user) => user.department || 'N/A',
        },
        {
            key: 'contact',
            label: 'Contact',
            render: (user) => (
                <div className="space-y-1 text-sm">
                    {user.phoneNumber && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {user.phoneNumber}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (user) => (
                <Badge variant={getStatusBadgeVariant(user.status || 'active')}>
                    {user.status || 'Active'}
                </Badge>
            ),
        },
        {
            key: 'createdAt',
            label: 'Joined',
            render: (user) => (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </div>
            ),
        },
    ];

    // Define table actions
    const actions: ShadcnDataTableAction<any>[] = [
        {
            label: 'View Profile',
            onClick: (user) => {
                console.log('View profile:', user);
                // Navigate to user profile
            },
        },
        {
            label: 'Edit',
            onClick: (user) => {
                console.log('Edit user:', user);
                // Navigate to edit page
            },
        },
    ];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    // if (error) {
    //     return (
    //         <div className="space-y-6">
    //             <h1 className="text-3xl font-bold text-destructive">Error Loading Users</h1>
    //             <p className="text-muted-foreground">Failed to load users. Please try again.</p>
    //             <Button onClick={() => refetch()}>Retry</Button>
    //         </div>
    //     );
    // }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                    <Users className="h-8 w-8" />
                    All Users
                </h1>
                <p className="text-muted-foreground mt-2">
                    Manage all users across the platform
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                        <div className="text-2xl font-bold">{UserList?.length || 0}</div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Students</CardTitle>
                        <div className="text-2xl font-bold">
                            {UserList?.filter(u => u.role?.toLowerCase() === 'student').length || 0}
                        </div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Teachers</CardTitle>
                        <div className="text-2xl font-bold">
                            {UserList?.filter(u => u.role?.toLowerCase() === 'teacher').length || 0}
                        </div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Admins</CardTitle>
                        <div className="text-2xl font-bold">
                            {UserList?.filter(u => u.role?.toLowerCase() === 'administrator').length || 0}
                        </div>
                    </CardHeader>
                </Card>
            </div>

            {/* Filters */}
          
            {/* Users Table */}
            <ShadcnDataTable<User>
                title="Users Directory"
                description="Manage all users across the platform"
                data={UserList}
                columns={columns}
                keyExtractor={(user) => user.id}
                searchable
                searchKeys={['firstName', 'lastName', 'email', 'role', 'department']}
                searchPlaceholder="Search users by name, email, role, department..."
                selectable
                selectedItems={[]}
                onSelectionChange={() => {}}
                bulkActions={[]}
                actions={actions}
                pagination
                pageSize={10}
                exportable
                onExport={() => {
                    // Implement export logic here
                }}
                // addButton={{
                //     label: 'Add New User',
                //     onClick: () => {
                //         // Implement navigation to add user page
                //     },
                // }}
                emptyMessage="No users found. Start by adding a new user."
            />
        </div>
    );
};

export default AdminUsersList;
