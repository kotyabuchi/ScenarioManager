import { getScenarios } from "@/app/lib/data";
import ScenarioList from '@/app/ui/scenarios/list';
import { ScenarioWithTag } from '@/app/lib/data-type';
import ScenarioCard from "@/app/ui/scenarios/card";
import Search from "@/app/ui/search";

const PAGE_SIZE = 20

async function loadMoreScenario(query: object, offset: number = 0) {
  'use server';
  const scenarios = await getScenarios(query, offset, PAGE_SIZE);

  const nextOffset = scenarios.length >= PAGE_SIZE ? offset + PAGE_SIZE : null;

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

  const initialScenarios = await loadMoreScenario({ AND: queries }, 0)
    .then(([node, next]) => {
      return {
        initialScenarios: node,
        initialOffset: next ?? undefined
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        initialScenarios: (<p className="w-full self-center text-center px-12 py-4">読み込めませんでした。</p>),
        initialOffset: undefined
      };
    })

  return (
    <main className="flex flex-col items-center justify-between lg:px-8">
      <div className="sticky top-2 md:top-0 flex flex-row-reverse z-10 w-full">
        <Search placeholder="シナリオを検索" value={searchParams?.query} />
      </div>
      <div className="w-full h-full mt-2">
        <ScenarioList query={{ AND: queries }} initialOffset={initialScenarios.initialOffset} loadMoreAction={loadMoreScenario}>
          {
            initialScenarios.initialScenarios
          }
        </ScenarioList>
      </div>
    </main>
  );
}