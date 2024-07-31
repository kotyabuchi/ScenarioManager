import { Skeleton } from '@nextui-org/react';

export default function ProfileSkeleton() {
  return (
    <div className='flex w-full flex-col gap-3'>
      <div className='flex flex-row gap-6'>
        <Skeleton className='h-36 w-36 shrink-0 rounded-full' />
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-8 w-36 px-1' />
          <div className='flex flex-col gap-1'>
            <Skeleton className='h-3 w-16' />
            <Skeleton className='h-4 w-40' />
          </div>
          <Skeleton className='hidden h-6 w-80 sm:block' />
        </div>
      </div>
      <Skeleton className='h-6 w-80 sm:hidden' />
    </div>
  );
}
