import { Skeleton } from '@nextui-org/react';

function CardSkeleton() {
  return (
    <div className='flex h-full w-full flex-col items-center gap-3 rounded-2xl bg-white p-3 duration-150'>
      <Skeleton className='h-24 w-24 shrink-0 rounded-full' />
      <Skeleton className='h-6 w-20 rounded-full' />
    </div>
  );
}

export default function ScenarioListSkeleton() {
  return (
    <div className='grid h-full w-full grid-cols-user-list gap-4'>
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
          <CardSkeleton />
        </>
      }
    </div>
  );
}
