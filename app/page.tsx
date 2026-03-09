import PatientForm from '@/components/forms/PatientForm';
import PasskeyModal from '@/components/PasskeyModal';
import Image from 'next/image';
import Link from 'next/link';

const Home = async ({ searchParams }: SearchParamProps) => {
  const { admin } = await searchParams;
  const isAdmin = admin === 'true';
  return (
    <div className='flex h-screen max-h-screen'>
      {isAdmin && <PasskeyModal />}

      <section className='remove-scrollbar container my-auto relative'>
        <div className='pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 blur-3xl' />
        <div className='sub-container max-w-[496px] relative'>
          <Image
            src={'/assets/icons/logo-full.svg'}
            alt={'HealthSync'}
            height={1000}
            width={1000}
            className='mb-8 h-10 w-fit'
          />
          <PatientForm />
          <div className='text-14-regular mt-10 flex justify-between'>
            <p className='justify-items-end text-dark-600 xl:text-left'>
              © 2026 HealthSync
            </p>
            <Link
              href={'/?admin=true'}
              className='text-dark-600 hover:text-green-500 transition-colors text-12-regular'
              aria-label='Admin access'>
              Admin
            </Link>
          </div>
        </div>
      </section>
      <div className='relative hidden h-full max-w-[50%] md:block'>
        <Image
          src={'/assets/images/onboarding-img.png'}
          alt={'patient'}
          height={1000}
          width={1000}
          className={'h-full w-full object-cover'}
          priority
        />
        <div className='absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark-300 to-transparent' />
      </div>
    </div>
  );
};

export default Home;
