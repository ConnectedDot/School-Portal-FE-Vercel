import { useCreateItem, useGetItems, useGetItem, useUpdateItem, useDeleteItem } from "./general";

// Types for Book (matches Postman collection + backward compatibility)
export interface Book {
    id: string;
    title: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    // Legacy fields for backward compatibility
    author?: string;
    isbn?: string;
    publisher?: string;
    publishedDate?: string;
    category?: string;
    quantity?: number;
    availableQuantity?: number;
    location?: string;
    coverImage?: string;
    status?: string;
}

export interface CreateBookDto {
    title: string;
    description?: string;
    // Legacy fields for backward compatibility
    author?: string;
    isbn?: string;
    publisher?: string;
    publishedDate?: string;
    category?: string;
    quantity?: number;
    location?: string;
    coverImage?: string;
}

export interface UpdateBookDto {
    title?: string;
    description?: string;
    // Legacy fields for backward compatibility
    author?: string;
    isbn?: string;
    publisher?: string;
    publishedDate?: string;
    category?: string;
    quantity?: number;
    availableQuantity?: number;
    location?: string;
    coverImage?: string;
    status?: string;
}

// Get all books
export const useGetBooks = () => {
    return useGetItems<Book>('/book');
};

// Get single book by ID
export const useGetBook = (id: string, enabled: boolean = true) => {
    return useGetItem<Book>(
        '/book',
        id,
        undefined,
        { enabled: !!id && enabled }
    );
};

// Create new book
export const useCreateBook = (
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useCreateItem<Book>(
        '/book',
        'Book added successfully',
        onSuccessFn,
        false, // Not form data
        true,  // Show success alert
        true   // Show error alert
    );
};

// Update book
export const useUpdateBook = (
    id: string,
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useUpdateItem<Book>(
        `/book/${id}`,
        'Book updated successfully',
        onSuccessFn,
        false,
        true,
        true
    );
};

// Delete book
export const useDeleteBook = () => {
    return useDeleteItem<Book>(
        '/book',
        'Book deleted successfully',
        true,
        true
    );
};
