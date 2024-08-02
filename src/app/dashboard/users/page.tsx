import Search from '@/app/ui/search';
import { Suspense } from 'react';
import UserListWrapper from './ui/UserListWrapper';
import UserListSkeleton from './ui/UserListSkeleton';
import { ScrollShadow } from '@nextui-org/react';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const userNameQueryString = searchParams?.query;

  return (
    <main className='flex max-h-full flex-col items-center justify-between gap-4 pt-6'>
      <div className='z-10 flex w-[calc(100%-32px)] flex-row-reverse rounded-xl bg-white p-2 shadow-soft-md md:mr-8'>
        <Search placeholder='ユーザーを検索' value={searchParams?.query} />
      </div>
      <ScrollShadow className='h-full w-full px-6 pb-6 md:overflow-y-auto md:px-0 md:pr-8'>
        <Suspense fallback={<UserListSkeleton />}>
          <UserListWrapper
            key={userNameQueryString}
            userNameQueryString={userNameQueryString}
          />
        </Suspense>
      </ScrollShadow>
    </main>
  );
}
