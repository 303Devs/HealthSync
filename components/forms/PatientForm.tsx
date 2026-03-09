'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';
import { UserFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions/patient.actions';
import Image from 'next/image';

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);
      // if (user) router.push(`/patients/${user.$id}/register`);
      if (user && 'newUser' in user) {
        router.push(`/patients/${user.newUser.$id}/register`);
      } else if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 flex-1'>
        <section className='mb-8 space-y-4'>
          <h1 className='header text-white'>
            Your Health,{' '}
            <span className='text-green-500'>Simplified.</span>
          </h1>
          <p className='text-dark-700'>
            Book and manage appointments in minutes — secure, simple, and always available.
          </p>
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='name'
          label='Full name'
          placeholder='John Doe'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user'
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='email'
          label='Email'
          placeholder='johndoe@gmail.com'
          iconSrc='/assets/icons/email.svg'
          iconAlt='email'
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name='phone'
          label='Phone number'
          placeholder='(555) 123-4567'
        />
        <div className='flex flex-wrap gap-4 pt-2'>
          <div className='flex items-center gap-2 text-dark-700 text-12-regular'>
            <Image src='/assets/icons/check-circle.svg' width={14} height={14} alt='' />
            <span>Secure &amp; Private</span>
          </div>
          <div className='flex items-center gap-2 text-dark-700 text-12-regular'>
            <Image src='/assets/icons/calendar.svg' width={14} height={14} alt='' />
            <span>Easy Scheduling</span>
          </div>
          <div className='flex items-center gap-2 text-dark-700 text-12-regular'>
            <Image src='/assets/icons/check.svg' width={14} height={14} alt='' />
            <span>Always Available</span>
          </div>
        </div>
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
