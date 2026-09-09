export const getRoleBadgeVariant = (role: string) => {
    switch (role?.toLowerCase()) {
        case 'administrator':
            return 'error';
        case 'teacher':
            return 'success';
        case 'student':
            return 'default';
        case 'guardian':
            return 'outline';
        default:
            return 'secondary';
    }
};

export const getStatusBadgeVariant = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'active':
            return 'success';
        case 'inactive':
            return 'secondary';
        case 'suspended':
            return 'error';
        case 'pending':
            return 'warning';
        default:
            return 'secondary';
    }
};