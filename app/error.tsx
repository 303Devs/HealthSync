'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-6'>
      <Image
        src='/assets/icons/logo-full.svg'
        alt='HealthSync'
        width={162}
        height={32}
        className='h-8 w-fit'
      />
      <h2 className='text-24-bold'>Something went wrong</h2>
      <p className='text-dark-700'>
        {error.message || 'An unexpected error occurred.'}
      </p>
      <div className='flex gap-4'>
        <button onClick={reset} className='shad-primary-btn px-6 py-2'>
          Try again
        </button>
        <Link href='/' className='shad-gray-btn px-6 py-2'>
          Go home
        </Link>
      </div>
    </div>
  );
}
