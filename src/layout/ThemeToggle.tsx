import React from 'react';

const ThemeToggle: React.FC = () => {
    const [isDark, setIsDark] = React.useState(
        () => document.documentElement.classList.contains('dark')
    );

    const toggle = () => {
        const next = !isDark;
        setIsDark(next);
        if (next) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    };

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
            <span className="hidden sm:inline">{isDark ? 'Dark' : 'Light'}</span>
            <span className="relative inline-flex">
                <span className={`h-4 w-4 rounded-full ${isDark ? 'bg-yellow-300' : 'bg-gray-700'}`} />
            </span>
        </button>
    );
};

export default ThemeToggle;