/**
 * Data Parser Utility Functions
 * 
 * Converts API data structures into user-readable formats
 * without fabricating unnecessary data.
 */

/**
 * Parse student grade from API format to user-readable format
 * Example: "JSS_2" → "JSS 2", "SS_3" → "SS 3"
 */
export function parseGrade(grade: string | null | undefined): string {
    if (!grade) return 'Not Assigned';
    
    // Replace underscores with spaces for readability
    return grade.replace(/_/g, ' ');
}

/** Converts API enum tokens to compact, readable labels without inventing values. */
export function formatEnumLabel(value: string | null | undefined, fallback = 'Not Assigned'): string {
    if (!value) return fallback;
    return value
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
        .replace(/\bJss\b/g, 'JSS')
        .replace(/\bSs\b/g, 'SS');
}

/**
 * Parse class/section from API format
 * Example: "JSS_2A" → "JSS 2A", "NONE" → "Not Assigned"
 */
export function parseClass(classValue: string | null | undefined): string {
    if (!classValue || classValue === 'NONE' || classValue === 'none') {
        return 'Not Assigned';
    }
    
    // Replace underscores with spaces for readability
    return classValue.replace(/_/g, ' ');
}

/**
 * Parse student level/year from API format
 * Example: "JSS_2" → "Junior Secondary School 2"
 */
export function parseStudentLevel(level: string | null | undefined): string {
    return formatEnumLabel(level);
}

/**
 * Format date in user-friendly format
 */
export function formatDate(dateString: string | null | undefined): string {
    if (! dateString) return 'N/A';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    } catch {
        return dateString;
    }
}

/**
 * Format full name from API structure
 * Handles both flat and nested profile structures
 */
export function formatFullName(data: any): string {
    const firstName = data.firstName || data.profile?.firstName || '';
    const lastName = data.lastName || data.profile?.lastName || '';
    
    if (!firstName && !lastName) return 'Unknown';
    return `${firstName} ${lastName}`.trim();
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
    const parts = name.trim().split(' ');
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
