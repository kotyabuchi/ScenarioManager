import Search from "@/app/ui/search";
import { Suspense } from "react";
import UserListWrapper from "./ui/UserListWrapper";
import UserListSkeleton from "./ui/UserListSkeleton";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const userNameQueryString = searchParams?.query;

  return (
    <main className="flex flex-col items-center justify-between lg:px-8">
      <div className="sticky top-2 md:top-0 flex flex-row-reverse z-10 w-full">
        <Search placeholder="ユーザーを検索" value={searchParams?.query} />
      </div>
      <div className="w-full h-full mt-3">
        <Suspense fallback={<UserListSkeleton />}>
          <UserListWrapper
            key={userNameQueryString}
            userNameQueryString={userNameQueryString}
          />
        </Suspense>
      </div>
    </main>
  );
}
