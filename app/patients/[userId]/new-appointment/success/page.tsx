import Link from 'next/link';
import Image from 'next/image';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const doctorLookup = new Map(Doctors.map((doc) => [doc.name, doc]));

const Success = async ({ params, searchParams }: SearchParamProps) => {
  const { userId } = await params;
  const { appointmentId } = await searchParams;
  const id = (appointmentId as string) || '';
  const appointment = await getAppointment(id);

  const doctor = doctorLookup.get(appointment.primaryPhysician);

  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
      <div className='success-img'>
        <Link href='/'>
          <Image
            src='/assets/icons/logo-full.svg'
            height={1000}
            width={1000}
            alt='HealthSync'
            className='h-10 w-fit'
          />
        </Link>
        <section className='flex flex-col items-center'>
          <Image
            src='/assets/gifs/success.gif'
            height={300}
            width={280}
            alt='success'
          />
          <h2 className='header mb-6 max-w-[600px] text-center text-white'>
            Your <span className='text-green-500'>appointment request</span>{' '}
            has been successfully submitted
          </h2>
          <p className='text-dark-700'>We will be in touch shortly to confirm.</p>
        </section>

        <section className='request-details'>
          <p className='text-dark-700'>Requested appointment details:</p>
          {doctor && (
            <div className='flex items-center gap-3'>
              <Image
                src={doctor.image}
                alt={doctor.name}
                height={100}
                width={100}
                className='size-6'
              />
              <p className='whitespace-nowrap text-white'>Dr. {doctor.name}</p>
            </div>
          )}
          <div className='flex gap-2'>
            <Image
              src='/assets/icons/calendar.svg'
              alt=''
              height={24}
              width={24}
            />
            <p className='text-white'>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button
          variant='outline'
          className='shad-primary-btn'
          asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            Book Another Appointment
          </Link>
        </Button>
        <p className='copyright'>© 2026 HealthSync</p>
      </div>
    </div>
  );
};

export default Success;
