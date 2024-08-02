import { Metadata } from 'next';
import { Suspense } from 'react';
import ProfileSkeleton from './ui/ProfileSkeleton';
import Profile from './ui/Profile';

export const metadata: Metadata = {
  title: 'プロフィール',
};

export default async function Page() {
  return (
    <main className='flex w-full flex-col gap-4 px-6'>
      <h1 className='text-xl'>プロフィール</h1>
      <div className='flex w-full flex-col gap-6 rounded-xl bg-white p-6 shadow-soft-md sm:border'>
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile />
        </Suspense>
      </div>
    </main>
  );
}
