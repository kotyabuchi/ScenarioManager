import { Skeleton } from "@nextui-org/react";

function CardSkeleton() {
  return (
    <div className="flex flex-row gap-3 w-full h-full p-4 rounded-2xl bg-white items-center">
      <Skeleton className="shrink-0 rounded-lg w-24 h-24 md:w-28 md:h-28" />
      <div className="flex flex-col gap-1 w-fit">
        <div className='flex gap-2'>
          <Skeleton className="rounded-full h-5 max-w-[30%] w-32 px-2" />
          <Skeleton className="rounded-full h-5 max-w-[20%] w-24 px-2" />
        </div>
        <div className="flex flex-col lg:flex-row flex-wrap gap-y-1 gap-3 items-baseline">
          <Skeleton className="rounded-full h-6 md:w-52 lg:w-60" />
          <Skeleton className="rounded-full h-4 w-16" />
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs">
          <Skeleton className="rounded-full h-6 w-16 bg-primary-100" />
          <Skeleton className="rounded-full h-6 w-16 bg-secondary-100" />
          <Skeleton className="rounded-full h-6 w-16 bg-success-100" />
        </div>
        <div className="flex flex-col gap-[2px]">
          <Skeleton className="rounded-full h-4 max-w-[55%] md:max-w-[60%] lg:max-w-[100%] w-96" />
          <Skeleton className="rounded-full h-4 max-w-[30%] md:max-w-[40%] lg:max-w-[70%] w-64" />
          <Skeleton className="rounded-full h-4 max-w-[40%] md:max-w-[50%] lg:max-w-[850%] w-80" />
        </div>
      </div>
    </div>
  )
}

export default function ScenarioListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
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
};
