import { Skeleton } from '@nextui-org/react';

export default function ProfileSkeleton() {
  return (
    <div className='flex flex-col gap-3 w-full'>
      <div className='flex flex-row gap-6'>
        <Skeleton className='shrink-0 w-36 h-36 rounded-full' />
        <div className='flex flex-col gap-2'>
          <Skeleton className='w-36 h-8 px-1' />
          <div className='flex flex-col gap-1'>
            <Skeleton className='w-16 h-3' />
            <Skeleton className='w-40 h-4' />
          </div>
          <Skeleton className='hidden sm:block w-80 h-6' />
        </div>
      </div>
      <Skeleton className='sm:hidden w-80 h-6' />
    </div>
  );
}
