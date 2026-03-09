'use client';

import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import StatusBadge from '../StatusBadge';
import { formatDateTime } from '@/lib/utils';
import { Doctors } from '@/constants';
import AppointmentModal from '../AppointmentModal';
import { Appointment } from '@/types/appwrite.types';

const doctorLookup = new Map(Doctors.map((doc) => [doc.name, doc]));

export const columns: ColumnDef<Appointment>[] = [
  {
    header: 'ID',
    cell: ({ row }) => <p className='text-14-medium text-white'>{row.index + 1}</p>,
  },
  {
    accessorKey: 'patient',
    header: ({ column }) => (
      <button
        className='flex items-center gap-1 text-dark-700 hover:text-white transition-colors'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Patient
        <span className='text-xs'>{column.getIsSorted() === 'asc' ? '↑' : column.getIsSorted() === 'desc' ? '↓' : '↕'}</span>
      </button>
    ),
    accessorFn: (row) => row.patient.name,
    cell: ({ row }) => (
      <p className='text-14-medium text-white'>{row.original.patient.name}</p>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className='min-w-[115px]'>
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: 'schedule',
    header: ({ column }) => (
      <button
        className='flex items-center gap-1 text-dark-700 hover:text-white transition-colors'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Appointment
        <span className='text-xs'>{column.getIsSorted() === 'asc' ? '↑' : column.getIsSorted() === 'desc' ? '↓' : '↕'}</span>
      </button>
    ),
    cell: ({ row }) => (
      <p className='text-14-regular min-w-[100px] text-white'>
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: 'primaryPhysician',
    header: 'Doctor',
    cell: ({ row }) => {
      const doctor = doctorLookup.get(row.original.primaryPhysician);

      if (!doctor) {
        return <p className='text-14-medium text-dark-600'>{row.original.primaryPhysician}</p>;
      }

      return (
        <div className='flex items-center gap-3'>
          <Image
            src={doctor.image}
            alt={`Dr. ${doctor.name}`}
            height={100}
            width={100}
            className='size-8 rounded-full'
          />
          <p className='whitespace-nowrap text-white'>Dr. {doctor.name}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className='pl-4'>Actions</div>,
    cell: ({ row: { original: data } }) => (
      <div className='flex gap-1'>
        <AppointmentModal
          type={'schedule'}
          patientId={data.patient.$id}
          userId={data.userId}
          appointment={data}
        />
        <AppointmentModal
          type={'cancel'}
          patientId={data.patient.$id}
          userId={data.userId}
          appointment={data}
        />
      </div>
    ),
  },
];
