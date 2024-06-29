import { getScenarios } from "@/app/lib/data";
import ScenarioList from '@/app/ui/scenarios/list';
import { ScenarioWithTag } from '@/app/lib/data-type';
import ScenarioCard from "@/app/ui/scenarios/card";
import Search from "@/app/ui/search";

const PAGE_SIZE = 20

async function loadMoreScenario(query: object, offset: number = 0) {
  'use server';
  const scenarios = await getScenarios(query, offset, PAGE_SIZE);
  const nextOffset = scenarios.length >= PAGE_SIZE ? offset + PAGE_SIZE : undefined;
  return [
    scenarios.map((scenario: ScenarioWithTag) => <ScenarioCard key={scenario.id} scenario={scenario} />),
    nextOffset,
  ] as const;
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  let queries = []

  const scenarioNameQueryString = searchParams?.query || ''
  const scenarioNameQueries = scenarioNameQueryString.split(' ')
  let scenarioNameQuery: object[] = []
  scenarioNameQueries.forEach((scenarioName) => {
    scenarioNameQuery.push({
      name: {
        contains: scenarioName,
        mode: 'insensitive',
      },
    })
  })

  queries.push({ OR: [...scenarioNameQuery] })

  const { initialScenarios, initialOffset } = await loadMoreScenario({ AND: queries })
    .then(([node, nextOffset]) => {
      return {
        initialScenarios: node,
        initialOffset: nextOffset
      }
    })
    .catch((error) => {
      console.log(error);
      return {
        initialScenarios: <p key={"error"} className="w-full self-center text-center px-12 py-4">読み込めませんでした。</p>,
        initialOffset: undefined
      }
    })

  return (
    <main className="flex flex-col items-center justify-between lg:px-8">
      <div className="sticky top-2 md:top-0 flex flex-row-reverse z-10 w-full">
        <Search placeholder="シナリオを検索" value={searchParams?.query} />
      </div>
      <div className="w-full h-full mt-3">
        <ScenarioList
          query={{ AND: queries }}
          initialOffset={initialOffset}
          loadMoreAction={loadMoreScenario}>
          {initialScenarios}
        </ScenarioList>
      </div>
    </main>
  );
}