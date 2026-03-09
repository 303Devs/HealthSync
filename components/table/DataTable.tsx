'use client';

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Image from 'next/image';
import { useState } from 'react';
import { Appointment } from '@/types/appwrite.types';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _, filterValue) => {
      const search = filterValue.toLowerCase();
      const appointment = row.original as Appointment;
      return (
        appointment.patient?.name?.toLowerCase().includes(search) ||
        appointment.primaryPhysician?.toLowerCase().includes(search) ||
        appointment.status?.toLowerCase().includes(search)
      );
    },
  });

  return (
    <div className='w-full space-y-4'>
      <Input
        placeholder='Search by patient, doctor, or status...'
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className='shad-input max-w-sm'
      />
      <div className='data-table'>
        <Table className='shad-table'>
          <TableHeader className='bg-dark-200'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className='shad-table-row-header'>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ?
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='shad-table-row'>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
        <div className='table-actions'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label='Previous page'
            className='shad-gray-btn'>
            <Image
              src={'/assets/icons/arrow.svg'}
              alt={'previous'}
              width={24}
              height={24}
            />
          </Button>
          <p className='text-14-regular text-dark-600'>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {Math.max(table.getPageCount(), 1)}
          </p>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label='Next page'
            className='shad-gray-btn'>
            <Image
              src={'/assets/icons/arrow.svg'}
              alt={'next'}
              width={24}
              height={24}
              className={'rotate-180'}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
