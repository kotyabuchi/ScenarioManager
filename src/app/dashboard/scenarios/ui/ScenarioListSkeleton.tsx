import { Skeleton } from '@nextui-org/react';

function CardSkeleton() {
  return (
    <div className='flex h-full w-full flex-row items-center gap-3 rounded-2xl bg-white p-4'>
      <Skeleton className='h-24 w-24 shrink-0 rounded-lg md:h-28 md:w-28' />
      <div className='flex w-fit flex-col gap-1'>
        <div className='flex gap-2'>
          <Skeleton className='h-5 w-32 max-w-[30%] rounded-full px-2' />
          <Skeleton className='h-5 w-24 max-w-[20%] rounded-full px-2' />
        </div>
        <div className='flex flex-col flex-wrap items-baseline gap-3 gap-y-1 lg:flex-row'>
          <Skeleton className='h-6 rounded-full md:w-52 lg:w-60' />
          <Skeleton className='h-4 w-16 rounded-full' />
        </div>
        <div className='flex flex-wrap gap-x-2 gap-y-1 text-xs'>
          <Skeleton className='h-6 w-16 rounded-full bg-primary-100' />
          <Skeleton className='h-6 w-16 rounded-full bg-secondary-100' />
          <Skeleton className='h-6 w-16 rounded-full bg-success-100' />
        </div>
        <div className='flex flex-col gap-[2px]'>
          <Skeleton className='h-4 w-96 max-w-[55%] rounded-full md:max-w-[60%] lg:max-w-[100%]' />
          <Skeleton className='h-4 w-64 max-w-[30%] rounded-full md:max-w-[40%] lg:max-w-[70%]' />
          <Skeleton className='h-4 w-80 max-w-[40%] rounded-full md:max-w-[50%] lg:max-w-[850%]' />
        </div>
      </div>
    </div>
  );
}

export default function ScenarioListSkeleton() {
  return (
    <div className='grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2'>
      {
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      }
    </div>
  );
}
