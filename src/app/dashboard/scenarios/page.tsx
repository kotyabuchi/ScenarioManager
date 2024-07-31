import Search from '@/app/ui/search';
import ScenarioListWrapper from './ui/ScenarioListWrapper';
import { Suspense } from 'react';
import ScenarioListSkeleton from './ui/ScenarioListSkeleton';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const scenarioNameQueryString = searchParams?.query;

  return (
    <main className='flex flex-col items-center justify-between lg:px-8'>
      <div className='sticky top-2 z-10 flex w-full flex-row-reverse md:top-0'>
        <Search placeholder='シナリオを検索' value={searchParams?.query} />
      </div>
      <div className='mt-3 h-full w-full'>
        <Suspense fallback={<ScenarioListSkeleton />}>
          <ScenarioListWrapper
            key={scenarioNameQueryString}
            scenarioNameQueryString={scenarioNameQueryString}
          />
        </Suspense>
      </div>
    </main>
  );
}
