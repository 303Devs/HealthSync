'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { checkAdminSession, validateAdminPasskey } from '@/lib/actions/admin.actions';

const PasskeyModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAdminSession().then((authenticated) => {
      if (authenticated) {
        setOpen(false);
        router.push('/admin');
      }
    });
  }, [router]);

  const validatePasskey = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await validateAdminPasskey(passkey);

    if (result.success) {
      setOpen(false);
      router.push('/admin');
    } else {
      setError(result.error ?? 'Invalid passkey, please try again.');
    }

    setIsLoading(false);
  };

  const closeModal = () => {
    setOpen(false);
    router.push('/');
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}>
      <AlertDialogContent className='shad-alert-dialog'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-start justify-between text-white'>
            Admin Access Verification
            <Image
              src='/assets/icons/close.svg'
              alt='close'
              width={20}
              height={20}
              onClick={closeModal}
              className='cursor-pointer'
            />
          </AlertDialogTitle>
          <AlertDialogDescription className='text-dark-700'>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}>
            <InputOTPGroup className='shad-otp'>
              <InputOTPSlot className='shad-otp-slot' index={0} />
              <InputOTPSlot className='shad-otp-slot' index={1} />
              <InputOTPSlot className='shad-otp-slot' index={2} />
              <InputOTPSlot className='shad-otp-slot' index={3} />
              <InputOTPSlot className='shad-otp-slot' index={4} />
              <InputOTPSlot className='shad-otp-slot' index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className='shad-error text-14-regular mt-4 flex justify-center'>
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={validatePasskey}
            disabled={isLoading}
            className='shad-primary-btn w-full'>
            {isLoading ? 'Verifying...' : 'Enter Admin Passkey'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;
