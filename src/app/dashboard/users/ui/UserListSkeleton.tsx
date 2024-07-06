import { Skeleton } from "@nextui-org/react";

function CardSkeleton() {
  return (
    <div className="flex flex-col gap-3 w-full h-full p-3 rounded-2xl bg-white duration-150 items-center">
      <Skeleton className="shrink-0 rounded-full w-24 h-24" />
      <Skeleton className="rounded-full h-6 w-20" />
    </div>
  );
}

export default function ScenarioListSkeleton() {
  return (
    <div className="grid grid-cols-user-list gap-4 w-full h-full">
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
