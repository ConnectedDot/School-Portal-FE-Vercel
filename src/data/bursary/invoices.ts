/**
 * Bursary/Finance Invoices Dummy Data
 */

export interface Invoice {
    id: string;
    invoiceNumber: string;
    studentId: string;
    studentName: string;
    class: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue' | 'cancelled';
    dueDate: string;
    issuedDate: string;
    description: string;
}

export const dummyInvoices: Invoice[] = [
    {
        id: '1',
        invoiceNumber: 'INV-2025-001',
        studentId: 'STU001',
        studentName: 'John Doe',
        class: 'SS2 Science',
        amount: 200000,
        status: 'paid',
        dueDate: '2025-02-28',
        issuedDate: '2025-01-15',
        description: 'First term tuition fee',
    },
    {
        id: '2',
        invoiceNumber: 'INV-2025-002',
        studentId: 'STU002',
        studentName: 'Jane Smith',
        class: 'SS2 Science',
        amount: 200000,
        status: 'pending',
        dueDate: '2025-02-28',
        issuedDate: '2025-01-15',
        description: 'First term tuition fee',
    },
    {
        id: '3',
        invoiceNumber: 'INV-2025-003',
        studentId: 'STU003',
        studentName: 'Michael Johnson',
        class: 'JSS1',
        amount: 150000,
        status: 'overdue',
        dueDate: '2025-01-31',
        issuedDate: '2025-01-01',
        description: 'First term tuition fee',
    },
];
