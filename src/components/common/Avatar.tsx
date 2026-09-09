interface AvatarProps {
    src?: string;
    alt?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    name?: string;
}

export const Avatar = ({ src, alt, size = 'md', name }: AvatarProps) => {
    const sizeClasses = {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-16 h-16 text-xl',
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (src) {
        return (
            <img
                src={src}
                alt={alt || name || 'Avatar'}
                className={`${sizeClasses[size]} rounded-full object-cover`}
            />
        );
    }

    return (
        <div
            className={`${sizeClasses[size]} rounded-full bg-primary text-white flex items-center justify-center font-medium`}
        >
            {name ? getInitials(name) : '?'}
        </div>
    );
};
