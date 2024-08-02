import Search from '@/app/ui/search';
import ScenarioListWrapper from './ui/ScenarioListWrapper';
import { Suspense } from 'react';
import ScenarioListSkeleton from './ui/ScenarioListSkeleton';
import { ScrollShadow } from '@nextui-org/react';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const scenarioNameQueryString = searchParams?.query;

  return (
    <main className='flex max-h-full flex-col items-center justify-between gap-4 pt-6'>
      <div className='z-10 flex w-[calc(100%-32px)] flex-row-reverse rounded-xl bg-white p-2 shadow-soft-md md:mr-8'>
        <Search placeholder='シナリオを検索' value={searchParams?.query} />
      </div>
      <ScrollShadow className='h-full w-full px-6 pb-6 md:overflow-y-auto md:px-0 md:pr-8'>
        <Suspense fallback={<ScenarioListSkeleton />}>
          <ScenarioListWrapper
            key={scenarioNameQueryString}
            scenarioNameQueryString={scenarioNameQueryString}
          />
        </Suspense>
      </ScrollShadow>
    </main>
  );
}
