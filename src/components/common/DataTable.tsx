import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { Card } from './Card';
import { Input } from './Input';
import { Button } from './Button';

// Column definition type
export interface DataTableColumn<T> {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (item: T, index: number) => ReactNode;
    className?: string;
}

// Filter configuration type
export interface DataTableFilter {
    key: string;
    label: string;
    options: { value: string; label: string }[];
    defaultValue?: string;
}

// Props interface
export interface DataTableProps<T> {
    // Required props
    data: T[];
    columns: DataTableColumn<T>[];
    keyExtractor: (item: T) => string;

    // Search configuration
    searchable?: boolean;
    searchPlaceholder?: string;
    searchKeys?: string[]; // Keys to search in the data objects
    onSearch?: (query: string) => void;

    // Filter configuration
    filterable?: boolean;
    filters?: DataTableFilter[];
    onFilterChange?: (filterKey: string, value: string) => void;

    // Selection configuration
    selectable?: boolean;
    selectedItems?: string[];
    onSelectionChange?: (selectedIds: string[]) => void;

    // Bulk actions
    bulkActions?: {
        label: string;
        icon?: string;
        onClick: (selectedIds: string[]) => void;
        variant?: 'primary' | 'outline' | 'danger';
        className?: string;
    }[];

    // Pagination
    paginated?: boolean;
    pageSize?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;

    // Styling
    className?: string;
    tableClassName?: string;
    emptyState?: ReactNode;

    // Loading state
    loading?: boolean;

    // Actions column
    actions?: (item: T) => ReactNode;
}

export function DataTable<T extends Record<string, unknown>>({
    data,
    columns,
    keyExtractor,
    searchable = false,
    searchPlaceholder = '🔍 Search...',
    searchKeys = [],
    onSearch,
    filterable = false,
    filters = [],
    onFilterChange,
    selectable = false,
    selectedItems = [],
    onSelectionChange,
    bulkActions = [],
    paginated = false,
    pageSize = 10,
    currentPage = 1,
    onPageChange,
    className = '',
    tableClassName = '',
    emptyState,
    loading = false,
    actions,
}: DataTableProps<T>) {
    // Internal state for search and filters if not controlled
    const [internalSearchQuery, setInternalSearchQuery] = useState('');
    const [internalFilters, setInternalFilters] = useState<Record<string, string>>(
        filters.reduce((acc, filter) => {
            acc[filter.key] = filter.defaultValue || 'all';
            return acc;
        }, {} as Record<string, string>)
    );
    const [internalSelectedItems, setInternalSelectedItems] = useState<string[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    // Use controlled or internal state
    const searchQuery = onSearch !== undefined ? internalSearchQuery : internalSearchQuery;
    const filterValues = onFilterChange !== undefined ? internalFilters : internalFilters;
    const selected = onSelectionChange !== undefined ? selectedItems : internalSelectedItems;

    // Handle search
    const handleSearchChange = (value: string) => {
        setInternalSearchQuery(value);
        onSearch?.(value);
    };

    // Handle filter change
    const handleFilterChange = (filterKey: string, value: string) => {
        setInternalFilters(prev => ({ ...prev, [filterKey]: value }));
        onFilterChange?.(filterKey, value);
    };

    // Handle selection
    const handleSelectionChange = (ids: string[]) => {
        setInternalSelectedItems(ids);
        onSelectionChange?.(ids);
    };

    // Filter and search data
    const filteredData = useMemo(() => {
        let result = [...data];

        // Apply search
        if (searchable && searchQuery && searchKeys.length > 0) {
            result = result.filter(item => {
                return searchKeys.some(key => {
                    const value = String(item[key] || '').toLowerCase();
                    return value.includes(searchQuery.toLowerCase());
                });
            });
        }

        // Apply filters
        if (filterable && filters.length > 0) {
            filters.forEach(filter => {
                const filterValue = filterValues[filter.key];
                if (filterValue && filterValue !== 'all') {
                    result = result.filter(item => item[filter.key] === filterValue);
                }
            });
        }

        // Apply sorting
        if (sortConfig) {
            result.sort((a, b) => {
                const aValue = a[sortConfig.key] as string | number;
                const bValue = b[sortConfig.key] as string | number;

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [data, searchQuery, searchKeys, filterValues, filters, sortConfig, searchable, filterable]);

    // Paginate data
    const paginatedData = useMemo(() => {
        if (!paginated) return filteredData;

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, paginated, currentPage, pageSize]);

    const totalPages = Math.ceil(filteredData.length / pageSize);

    // Handle sort
    const handleSort = (columnKey: string) => {
        setSortConfig(current => {
            if (!current || current.key !== columnKey) {
                return { key: columnKey, direction: 'asc' };
            }
            if (current.direction === 'asc') {
                return { key: columnKey, direction: 'desc' };
            }
            return null;
        });
    };

    // Handle select all
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            handleSelectionChange(paginatedData.map(keyExtractor));
        } else {
            handleSelectionChange([]);
        }
    };

    // Handle individual select
    const handleSelectItem = (id: string, checked: boolean) => {
        if (checked) {
            handleSelectionChange([...selected, id]);
        } else {
            handleSelectionChange(selected.filter(sid => sid !== id));
        }
    };

    const isAllSelected = paginatedData.length > 0 && selected.length === paginatedData.length;

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Search and Filters */}
            {(searchable || filterable) && (
                <Card>
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Input */}
                            {searchable && (
                                <div className="flex-1">
                                    <Input
                                        type="text"
                                        placeholder={searchPlaceholder}
                                        value={searchQuery}
                                        onChange={(e) => handleSearchChange(e.target.value)}
                                    />
                                </div>
                            )}

                            {/* Filters */}
                            {filterable && filters.map(filter => (
                                <div key={filter.key} className="w-full md:w-40">
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        value={filterValues[filter.key] || 'all'}
                                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                    >
                                        <option value="all">{filter.label}</option>
                                        {filter.options.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>

                        {/* Bulk Actions Bar */}
                        {selectable && selected.length > 0 && bulkActions.length > 0 && (
                            <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <span className="text-sm font-medium text-blue-900">
                                    {selected.length} item(s) selected
                                </span>
                                {bulkActions.map((action, index) => (
                                    <Button
                                        key={index}
                                        variant={action.variant || 'outline'}
                                        onClick={() => action.onClick(selected)}
                                        className={action.className}
                                    >
                                        {action.icon && <span className="mr-1">{action.icon}</span>}
                                        {action.label}
                                    </Button>
                                ))}
                                <Button
                                    variant="outline"
                                    onClick={() => handleSelectionChange([])}
                                >
                                    Clear Selection
                                </Button>
                            </div>
                        )}
                    </div>
                </Card>
            )}

            {/* Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className={`w-full ${tableClassName}`}>
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                {/* Selection column */}
                                {selectable && (
                                    <th className="px-4 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={isAllSelected}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                            className="rounded border-gray-300"
                                        />
                                    </th>
                                )}

                                {/* Data columns */}
                                {columns.map(column => (
                                    <th
                                        key={column.key}
                                        className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                                            } ${column.className || ''}`}
                                        onClick={() => column.sortable && handleSort(column.key)}
                                    >
                                        <div className="flex items-center gap-2">
                                            {column.label}
                                            {column.sortable && sortConfig?.key === column.key && (
                                                <span className="text-primary">
                                                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                ))}

                                {/* Actions column */}
                                {actions && (
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)} className="px-4 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                            <p className="text-gray-600">Loading...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : paginatedData.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)} className="px-4 py-12 text-center text-gray-500">
                                        {emptyState || (
                                            <div className="flex flex-col items-center gap-2">
                                                <span className="text-4xl">🔍</span>
                                                <p>No data found</p>
                                                <p className="text-sm">Try adjusting your search or filters</p>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((item, index) => {
                                    const itemId = keyExtractor(item);
                                    return (
                                        <tr key={itemId} className="hover:bg-gray-50 transition-colors">
                                            {/* Selection */}
                                            {selectable && (
                                                <td className="px-4 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selected.includes(itemId)}
                                                        onChange={(e) => handleSelectItem(itemId, e.target.checked)}
                                                        className="rounded border-gray-300"
                                                    />
                                                </td>
                                            )}

                                            {/* Data columns */}
                                            {columns.map(column => (
                                                <td key={column.key} className={`px-4 py-4 ${column.className || ''}`}>
                                                    {column.render ? column.render(item, index) : String(item[column.key] || '')}
                                                </td>
                                            ))}

                                            {/* Actions */}
                                            {actions && (
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {actions(item)}
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer with pagination and results info */}
                {!loading && paginatedData.length > 0 && (
                    <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} results
                        </div>

                        {/* Pagination */}
                        {paginated && totalPages > 1 && (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => onPageChange?.(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 text-sm"
                                >
                                    Previous
                                </Button>

                                <div className="flex gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => onPageChange?.(page)}
                                            className={`px-3 py-1 text-sm rounded ${page === currentPage
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <Button
                                    variant="outline"
                                    onClick={() => onPageChange?.(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 text-sm"
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </Card>
        </div>
    );
}
