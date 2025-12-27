'use client';

import React from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SortField, SortDirection } from '@/types';

interface TableHeaderProps {
  label: string;
  field: SortField;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  sortable?: boolean;
  className?: string;
}

export const TableHeader = React.memo<TableHeaderProps>(
  ({ label, field, sortField, sortDirection, onSort, sortable = true, className }) => {
    const handleClick = () => {
      if (sortable) {
        onSort(field);
      }
    };

    const getSortIcon = () => {
      if (!sortable || sortField !== field) {
        return <ChevronsUpDown className="h-4 w-4 text-gray-500" />;
      }
      if (sortDirection === 'asc') {
        return <ChevronUp className="h-4 w-4 text-blue-500" />;
      }
      if (sortDirection === 'desc') {
        return <ChevronDown className="h-4 w-4 text-blue-500" />;
      }
      return <ChevronsUpDown className="h-4 w-4 text-gray-500" />;
    };

    return (
      <th
        className={cn(
          'px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider',
          sortable && 'cursor-pointer hover:bg-gray-800/50 transition-colors',
          className
        )}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          {label}
          {sortable && getSortIcon()}
        </div>
      </th>
    );
  }
);

TableHeader.displayName = 'TableHeader';

