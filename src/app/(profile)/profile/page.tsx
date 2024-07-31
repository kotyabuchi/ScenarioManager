import { Metadata } from 'next';
import { Suspense } from 'react';
import ProfileSkeleton from './ui/ProfileSkeleton';
import Profile from './ui/Profile';

export const metadata: Metadata = {
  title: 'プロフィール',
};

export default async function Page() {
  return (
    <div className='flex w-full flex-col gap-3 px-6'>
      <h1 className='text-xl'>プロフィール</h1>
      <div className='flex w-full flex-col gap-6 border-zinc-200 bg-zinc-50 sm:rounded-xl sm:border sm:p-6'>
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile />
        </Suspense>
      </div>
    </div>
  );
}
