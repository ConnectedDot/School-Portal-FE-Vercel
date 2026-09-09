import React, { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Search,
    MoreHorizontal,
    ChevronUp,
    ChevronDown,
    Download,
    Plus
} from 'lucide-react';

// Column definition type
export interface ShadcnDataTableColumn<T> {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (item: T, index: number) => ReactNode;
    className?: string;
    width?: string;
}

// Filter configuration type
export interface ShadcnDataTableFilter {
    key: string;
    label: string;
    options: { value: string; label: string }[];
    defaultValue?: string;
}

// Action configuration
export interface ShadcnDataTableAction<T> {
    label: string;
    icon?: React.ElementType;
    onClick: (item: T) => void;
    variant?: 'default' | 'destructive' | 'secondary';
    show?: (item: T) => boolean;
}

// Bulk action configuration
export interface ShadcnDataTableBulkAction {
    label: string;
    icon?: React.ElementType;
    onClick: (selectedIds: string[]) => void;
    variant?: 'default' | 'destructive' | 'secondary';
}

// Props interface
export interface ShadcnDataTableProps<T> {
    // Basic props
    data: T[];
    columns: ShadcnDataTableColumn<T>[];
    keyExtractor: (item: T) => string;

    // Table configuration
    title?: string;
    description?: string;
    className?: string;

    // Search configuration
    searchable?: boolean;
    searchPlaceholder?: string;
    searchKeys?: string[]; // Keys to search in the data objects
    onSearch?: (query: string) => void;

    // Filter configuration
    filterable?: boolean;
    filters?: ShadcnDataTableFilter[];
    onFilterChange?: (filterKey: string, value: string) => void;

    // Selection configuration
    selectable?: boolean;
    selectedItems?: string[];
    onSelectionChange?: (selectedIds: string[]) => void;

    // Actions
    actions?: ShadcnDataTableAction<T>[];
    bulkActions?: ShadcnDataTableBulkAction[];

    // Pagination
    pagination?: boolean;
    pageSize?: number;
    totalItems?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;

    // Additional features
    exportable?: boolean;
    onExport?: () => void;
    addButton?: {
        label: string;
        onClick: () => void;
    };

    // Loading state
    loading?: boolean;
    emptyMessage?: string;
}

export function ShadcnDataTable<T>({
    data = [],
    columns,
    keyExtractor,
    title,
    description,
    className,
    searchable = true,
    searchPlaceholder = "Search...",
    searchKeys = [],
    onSearch,
    filterable = false,
    filters = [],
    onFilterChange,
    selectable = false,
    selectedItems = [],
    onSelectionChange,
    actions = [],
    bulkActions = [],
    pagination = true,
    pageSize = 10,
    totalItems,
    currentPage = 1,
    onPageChange,
    exportable = false,
    onExport,
    addButton,
    loading = false,
    emptyMessage = "No data available",
}: ShadcnDataTableProps<T>) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | 'desc';
    } | null>(null);
    const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
    const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage);

    const readValue = (item: any, key: string) => {
        return key.split('.').reduce((value, part) => value?.[part], item);
    };

    // Handle search
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (onSearch) {
            onSearch(query);
        }
    };

    // Handle sorting
    const handleSort = (columnKey: string) => {
        const column = columns.find(col => col.key === columnKey);
        if (!column?.sortable) return;

        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig?.key === columnKey && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key: columnKey, direction });
    };

    // Handle filter change
    const handleFilterChange = (filterKey: string, value: string) => {
        const newFilters = { ...activeFilters };
        if (value === 'all') {
            delete newFilters[filterKey];
        } else {
            newFilters[filterKey] = value;
        }
        setActiveFilters(newFilters);

        if (onFilterChange) {
            onFilterChange(filterKey, value);
        }
    };

    // Filter and sort data
    const processedData = useMemo(() => {
        let filtered = [...data];

        // Apply search filter
        if (searchQuery && searchKeys.length > 0) {
            filtered = filtered.filter((item: any) =>
                searchKeys.some(key =>
                    String(readValue(item, key) || '').toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        // Apply filters
        Object.entries(activeFilters).forEach(([key, value]) => {
            filtered = filtered.filter((item: any) => String(readValue(item, key)) === value);
        });

        // Apply sorting
        if (sortConfig) {
            filtered.sort((a: any, b: any) => {
                const aValue = readValue(a, sortConfig.key);
                const bValue = readValue(b, sortConfig.key);
                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filtered;
    }, [data, searchQuery, searchKeys, activeFilters, sortConfig]);

    // Paginate data
    const paginatedData = useMemo(() => {
        if (!pagination) return processedData;

        const start = (internalCurrentPage - 1) * pageSize;
        const end = start + pageSize;
        return processedData.slice(start, end);
    }, [processedData, internalCurrentPage, pageSize, pagination]);

    // Handle selection
    const handleSelectAll = (checked: boolean) => {
        if (!onSelectionChange) return;

        if (checked) {
            const allIds = paginatedData.map(keyExtractor);
            onSelectionChange([...new Set([...selectedItems, ...allIds])]);
        } else {
            const pageIds = paginatedData.map(keyExtractor);
            onSelectionChange(selectedItems.filter(id => !pageIds.includes(id)));
        }
    };

    const handleSelectItem = (itemId: string, checked: boolean) => {
        if (!onSelectionChange) return;

        if (checked) {
            onSelectionChange([...selectedItems, itemId]);
        } else {
            onSelectionChange(selectedItems.filter(id => id !== itemId));
        }
    };

    // Calculate pagination
    const totalPages = Math.ceil((totalItems || processedData.length) / pageSize);
    const isAllSelected = paginatedData.length > 0 &&
        paginatedData.every(item => selectedItems.includes(keyExtractor(item)));
    const isIndeterminate = paginatedData.some(item => selectedItems.includes(keyExtractor(item))) && !isAllSelected;

    return (
        <Card className={`overflow-hidden rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04] ${className || ''}`}>
            <CardHeader className="gap-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                        {title && <CardTitle className='text-2xl font-black'>{title}</CardTitle>}
                        {description && <CardDescription className=''>{description}</CardDescription>}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        {exportable && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full"
                                onClick={onExport}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                        )}
                        {addButton && (
                            <Button
                                size="sm"
                                className="rounded-full"
                                onClick={addButton.onClick}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                {addButton.label}
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    {/* Search */}
                    {searchable && (
                        <div className="relative w-full xl:max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="h-11 rounded-full border-slate-200 bg-slate-50/80 pl-10 dark:border-white/10 dark:bg-white/[0.04]"
                            />
                        </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                    {/* Filters */}
                    {filterable && filters.map((filter) => (
                        <Select
                            key={filter.key}
                            value={activeFilters[filter.key] || 'all'}
                            onValueChange={(value) => handleFilterChange(filter.key, value)}
                        >
                            <SelectTrigger className="h-10 w-full rounded-full sm:w-44">
                                <SelectValue placeholder={filter.label} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All {filter.label}</SelectItem>
                                {filter.options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ))}

                    {/* Bulk Actions */}
                    {selectable && selectedItems.length > 0 && bulkActions.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary">
                                {selectedItems.length} selected
                            </Badge>
                            {bulkActions.map((action, index) => (
                                <Button
                                    key={index}
                                    variant={action.variant || 'default'}
                                    size="sm"
                                    className="rounded-full"
                                    onClick={() => action.onClick(selectedItems)}
                                >
                                    {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                                    {action.label}
                                </Button>

                            ))}
                        </div>
                    )}
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.02]">
                    <div className="custom-scrollbar w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 dark:bg-white/[0.03] dark:hover:bg-white/[0.03]">
                                {selectable && (
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={isAllSelected}
                                            onCheckedChange={handleSelectAll}
                                            ref={(el) => {
                                                if (el && 'indeterminate' in el) {
                                                    (el as HTMLInputElement).indeterminate = isIndeterminate;
                                                }
                                            }}
                                        />
                                    </TableHead>
                                )}
                                {columns.map((column) => (
                                    <TableHead
                                        key={column.key}
                                        className={`${column.className || ''} whitespace-nowrap text-xs font-black uppercase text-muted-foreground ${column.sortable ? 'cursor-pointer select-none hover:bg-muted/50' : ''}`}
                                        style={column.width ? { width: column.width } : undefined}
                                        onClick={() => column.sortable && handleSort(column.key)}
                                    >
                                        <div className="flex items-center gap-2">
                                            {column.label}
                                            {column.sortable && (
                                                <div className="flex flex-col">
                                                    <ChevronUp className={`h-3 w-3 ${sortConfig?.key === column.key && sortConfig.direction === 'asc' ? 'text-foreground' : 'text-muted-foreground'}`} />
                                                    <ChevronDown className={`h-3 w-3 -mt-1 ${sortConfig?.key === column.key && sortConfig.direction === 'desc' ? 'text-foreground' : 'text-muted-foreground'}`} />
                                                </div>
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                                {actions.length > 0 && (
                                    <TableHead className="w-16">Actions</TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}>
                                        <div className="flex items-center justify-center py-8">
                                            Loading...
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : paginatedData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}>
                                        <div className="flex items-center justify-center py-8 text-muted-foreground">
                                            {emptyMessage}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedData.map((item, index) => {
                                    const itemId = keyExtractor(item);
                                    const isSelected = selectedItems.includes(itemId);

                                    return (
                                        <TableRow key={itemId} className={`${isSelected ? 'bg-muted/50' : ''} transition-colors hover:bg-brand-50/40 dark:hover:bg-white/[0.04]`}>
                                            {selectable && (
                                                <TableCell>
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onCheckedChange={(checked) => handleSelectItem(itemId, !!checked)}
                                                    />
                                                </TableCell>
                                            )}
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.key}
                                                    className={`${column.className || ''} min-w-[120px] align-middle`}
                                                >
                                                    {column.render ? column.render(item, index) : (item as any)[column.key]}
                                                </TableCell>
                                            ))}
                                            {actions.length > 0 && (
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            {actions.map((action, actionIndex) => {
                                                                if (action.show && !action.show(item)) return null;

                                                                return (
                                                                    <DropdownMenuItem
                                                                        key={actionIndex}
                                                                        onClick={() => action.onClick(item)}
                                                                        className={action.variant === 'destructive' ? 'text-destructive focus:text-destructive' : ''}
                                                                    >
                                                                        {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                                                                        {action.label}
                                                                    </DropdownMenuItem>
                                                                );
                                                            })}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                    </div>
                </div>

                {/* Pagination */}
                {pagination && totalPages > 1 && (
                    <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm text-muted-foreground">
                            Showing {(internalCurrentPage - 1) * pageSize + 1} to{' '}
                            {Math.min(internalCurrentPage * pageSize, totalItems || processedData.length)} of{' '}
                            {totalItems || processedData.length} entries
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full"
                                onClick={() => {
                                    const newPage = internalCurrentPage - 1;
                                    setInternalCurrentPage(newPage);
                                    onPageChange?.(newPage);
                                }}
                                disabled={internalCurrentPage <= 1}
                            >
                                Previous
                            </Button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(page => {
                                        const current = internalCurrentPage;
                                        return page === 1 || page === totalPages ||
                                            (page >= current - 1 && page <= current + 1);
                                    })
                                    .map((page, index, array) => {
                                        const prevPage = array[index - 1];
                                        const showEllipsis = prevPage && page - prevPage > 1;

                                        return (
                                            <React.Fragment key={page}>
                                                {showEllipsis && (
                                                    <span className="px-2 text-muted-foreground">...</span>
                                                )}
                                                <Button
                                                    variant={page === internalCurrentPage ? 'default' : 'outline'}
                                                    size="sm"
                                                    className="h-9 min-w-9 rounded-full"
                                                    onClick={() => {
                                                        setInternalCurrentPage(page);
                                                        onPageChange?.(page);
                                                    }}
                                                >
                                                    {page}
                                                </Button>
                                            </React.Fragment>
                                        );
                                    })}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full"
                                onClick={() => {
                                    const newPage = internalCurrentPage + 1;
                                    setInternalCurrentPage(newPage);
                                    onPageChange?.(newPage);
                                }}
                                disabled={internalCurrentPage >= totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
