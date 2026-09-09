import { getUserItem } from "@/storage";

/**
 * Format currency amount with proper locale formatting
 */


/**
 * Format date in a user-friendly way
 */
export const formatDate = (dateInput: Date | string): string => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset time for date comparison
    const dateOnly = new Date(date?.getFullYear(), date?.getMonth(), date?.getDate());

    if (dateOnly.getTime() === today.getTime()) {
        return 'Today';
    } else if (dateOnly?.getTime() === yesterday.getTime()) {
        return 'Yesterday';
    } else {
        return date?.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date?.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
        });
    }
};

/**
 * Format time in 12-hour format
 */
export const formatTime = (dateInput: Date | string): string => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return date?.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};

/**
 * Mask phone number for display
 */
export const maskPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
        return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
};

/**
 * Mask card number for display
 */
export const maskCardNumber = (cardNumber: string): string => {
    return `**** **** **** ${cardNumber.slice(-4)}`;
};

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

/**
 * Generate random color for avatars
 */
export const getRandomAvatarColor = (seed: string): string => {
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
        '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
        '#EE5A24', '#009432', '#0652DD', '#9C88FF', '#FFC312',
    ];

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate phone number format
 */
export const isValidPhoneNumber = (phone: string): boolean => {
    // Accepts Nigerian numbers with or without +234, or starting with 0, and 11 digits
    const cleaned = phone.replace(/\D/g, '');
    // Nigerian numbers: 11 digits starting with 0, or 13 digits starting with 234
    if (cleaned.length === 11 && cleaned.startsWith('0')) return true;
    if (cleaned.length === 13 && cleaned.startsWith('234')) return true;
    return false;
};


/**
 * Get the authentication token
 */
export const getAuthToken = async (): Promise<string | null> => {
    try {
        const token = await getUserItem("token");
        return token;
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
};

/**
 * Test if the current authentication token is valid
 */
export const testAuthToken = async (): Promise<boolean> => {
    try {
        const token = await getAuthToken();
        if (!token) {
            console.warn('No authentication token found!');
            return false;
        }

        // You could call an API endpoint that requires authentication
        // For now we'll just check if the token exists and seems valid
        return token.length > 20; // Basic validation: tokens are usually long strings
    } catch (error) {
        console.error('Error testing authentication:', error);
        return false;
    }
};

// export const fetchHeaders = async (isJson = true) => {
//     try {
//         const token = await getAuthToken();

//         // Log token for debugging (masked for security)
//         if (token) {
//             const maskedToken = token.substring(0, 10) + '...' + token.substring(token.length - 5);
//             // console.log(`Using token: ${maskedToken}`);
//         } else {
//             console.warn('No authentication token found! Requests requiring authentication will fail.');
//         }

//         const headers: Record<string, string> = {};

//         // Only set Content-Type for non-FormData requests
//         // When isJson is false (meaning FormData), let the browser set the Content-Type with boundary
//         if (isJson) {
//             headers["Content-Type"] = "application/json";
//         }

//         // Add Authorization header if token exists
//         if (token) {
//             headers.Authorization = `Bearer ${token}`;
//         }

//         // console.log('Request headers:', headers);
//         return headers;
//     } catch (error) {
//         console.error('Error getting headers:', error);

//         // In case of error, at least provide content-type header
//         const headers: Record<string, string> = {};
//         if (isJson) {
//             headers["Content-Type"] = "application/json";
//         }
//         return headers;
//     }
// };

export const fetchHeaders = async (isJson = true) => {
    const token = await getAuthToken();
    const headers: Record<string, string> = {};

    if (isJson) {
        headers["Content-Type"] = "application/json";
        headers["Accept"] = "application/json";
    }

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
};


export const formatPhoneNumber = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 13 && digits.startsWith('234')) {
        return '0' + digits.slice(3);
    }
    // If user enters 10 digits (without leading 0), add leading 0
    if (digits.length === 10) {
        return '0' + digits;
    }
    // Otherwise, just return last 11 digits
    return digits.slice(-11);
};

export const generatePriceWithOriginal = (price: number) => {
    // Add a random 5% to 10% markup for original price
    const markupPercentage = Math.floor(Math.random() * 6) + 5; // 5 to 10
    const originalPrice = Math.round(price + (price * markupPercentage) / 100);

    return {
        price,
        originalPrice,
    };
};

export const checkIsAdmin = (user: { role?: string }, isAdminProp?: boolean): boolean => {
    if (typeof isAdminProp !== 'undefined') {
        return isAdminProp;
    }

    const role = user.role?.toLowerCase();
    return role === 'owner' || role === 'manager' || role === 'admin';
};

export const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return 'Good Morning 👋';
    } else if (currentHour >= 12 && currentHour < 17) {
        return 'Good Afternoon ☀️';
    } else if (currentHour >= 17 && currentHour < 21) {
        return 'Good Evening 🌇';
    } else {
        return 'Good Night 🌙';
    }
};


// Filter transactions created today and calculate total
export const getTodaysTotalSales = (transactions: any[]) => {
    if (!transactions || transactions.length === 0) {
        return {
            totalSales: '0.00',
            transactionCount: 0,
            transactions: []
        };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    const todaysTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        transactionDate.setHours(0, 0, 0, 0);
        return transactionDate.getTime() === today.getTime();
    });

    const totalSales = todaysTransactions.reduce((sum, transaction) => {
        return sum + parseFloat(transaction.totalPrice || 0);
    }, 0);

    return {
        totalSales: totalSales.toFixed(2),
        transactionCount: todaysTransactions.length,
        transactions: todaysTransactions
    };
};

// export const formatCurrency = (amount: number, currency: string = 'NGN'): string => {
//     if (currency === 'NGN') {
//         return `₦${amount?.toLocaleString()}`;
//     }
//     return new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency,
//         minimumFractionDigits: 2,
//     }).format(amount);
// };

export const formatCurrency = (amount: number | string) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `₦${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/**
 * Format currency with smart abbreviations for large numbers
 * Converts to B (billions), M (millions), K (thousands) while maintaining precision
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string with abbreviation
 * 
 * Examples:
 * 1,259,895,949.2 => ₦1.26B
 * 837,160,000 => ₦837.16M
 * 45,500 => ₦45.50K
 * 999.99 => ₦999.99
 */
export const formatCurrencySmart = (
    amount: number | string,
    options?: {
        showFullBelow?: number; // Show full amount below this threshold (default: 10000)
        decimalPlaces?: number; // Number of decimal places for abbreviated values (default: 2)
    }
) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(num)) {
        return '₦0.00';
    }

    const { showFullBelow = 10000, decimalPlaces = 2 } = options || {};

    // For small amounts, show full value with 2 decimals
    if (Math.abs(num) < showFullBelow) {
        return `₦${num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    }

    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';

    // Billions (1,000,000,000+)
    if (absNum >= 1_000_000_000) {
        const billions = absNum / 1_000_000_000;
        return `${sign}₦${billions.toFixed(decimalPlaces)}B`;
    }

    // Millions (1,000,000+)
    if (absNum >= 1_000_000) {
        const millions = absNum / 1_000_000;
        return `${sign}₦${millions.toFixed(decimalPlaces)}M`;
    }

    // Thousands (10,000+)
    if (absNum >= 10_000) {
        const thousands = absNum / 1_000;
        return `${sign}₦${thousands.toFixed(decimalPlaces)}K`;
    }

    // Default: show with 2 decimal places
    return `${sign}₦${absNum.toFixed(2)}`;
};