import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hoverable?: boolean;
}

export const Card = ({
    children,
    title,
    subtitle,
    className = '',
    padding = 'md',
    hoverable = false,
}: CardProps) => {
    const paddingClasses = {
        none: '',
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-6',
    };

    const hoverClass = hoverable ? 'hover:shadow-xl transition-shadow duration-300' : '';

    return (
        <div className={`rounded-lg bg-white text-slate-950 shadow-md dark:bg-slate-900 dark:text-white ${hoverClass} ${className}`}>
            {(title || subtitle) && (
                <div className={`border-b border-gray-100 ${paddingClasses[padding]}`}>
                    {title && <h3 className="text-lg font-semibold text-inherit">{title}</h3>}
                    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
                </div>
            )}
            <div className={title || subtitle ? paddingClasses[padding] : paddingClasses[padding]}>
                {children}
            </div>
        </div>
    );
};
