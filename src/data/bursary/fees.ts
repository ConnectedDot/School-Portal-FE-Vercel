/**
 * Bursary/Finance Fees Dummy Data
 */

export interface FeeStructure {
    id: string;
    name: string;
    class: string;
    term: 'First' | 'Second' | 'Third';
    amount: number;
    dueDate: string;
    description: string;
}

export const dummyFeeStructures: FeeStructure[] = [
    {
        id: '1',
        name: 'Tuition Fee',
        class: 'JSS1',
        term: 'First',
        amount: 150000,
        dueDate: '2025-02-28',
        description: 'Tuition fee for first term',
    },
    {
        id: '2',
        name: 'Tuition Fee',
        class: 'SS2',
        term: 'First',
        amount: 200000,
        dueDate: '2025-02-28',
        description: 'Tuition fee for first term',
    },
    {
        id: '3',
        name: 'Lab Fee',
        class: 'SS2 Science',
        term: 'First',
        amount: 50000,
        dueDate: '2025-02-28',
        description: 'Science laboratory fee',
    },
    {
        id: '4',
        name: 'Library Fee',
        class: 'All',
        term: 'First',
        amount: 10000,
        dueDate: '2025-02-28',
        description: 'Library resource fee',
    },
];
