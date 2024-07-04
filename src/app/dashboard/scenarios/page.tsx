import Search from "@/app/ui/search";
import ScenarioListWrapper from "./ui/ScenarioListWrapper";
import { Suspense } from "react";
import ScenarioListSkeleton from "./ui/ScenarioListSkeleton";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const scenarioNameQueryString = searchParams?.query

  return (
    <main className="flex flex-col items-center justify-between lg:px-8">
      <div className="sticky top-2 md:top-0 flex flex-row-reverse z-10 w-full">
        <Search placeholder="シナリオを検索" value={searchParams?.query} />
      </div>
      <div className="w-full h-full mt-3">
        <Suspense fallback={<ScenarioListSkeleton />}>
          <ScenarioListWrapper key={scenarioNameQueryString} scenarioNameQueryString={scenarioNameQueryString} />
        </Suspense>
      </div>
    </main>
  );
}