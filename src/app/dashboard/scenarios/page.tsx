import { getScenarios } from "@/app/lib/data";
import ScenarioList from '@/app/ui/scenarios/list';
import { ScenarioWithTag } from '@/app/lib/data-type';
import ScenarioCard from "@/app/ui/scenarios/card";

const PAGE_SIZE = 10

async function loadMoreScenario(query: object, offset: number = 0) {
  'use server';
  const scenarios = await getScenarios(query, offset);

  const nextOffset = scenarios.length >= PAGE_SIZE ? offset + PAGE_SIZE : null;

  console.log(scenarios)
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
  return (
    <main className="flex max-h-[calc(100vh-64px-72px-16px)] md:max-h-[calc(100vh-64px-16px)] flex-col items-center justify-between">
      <div className="fixed flex flex-row border w-[calc(100%-48px)] h-8 right-8 md:w-[calc(100%-256px-64px)]">

      </div>
      <div className="w-full h-full mt-10 pr-6 overflow-y-scroll">
        <ScenarioList query={{}} initialOffset={PAGE_SIZE} loadMoreAction={loadMoreScenario}>
          {
            loadMoreScenario({}, 0)
              .then(([node, next]) => {
                return node
              })
              .catch((error) => {
                console.log(error);
                return (<p></p>)
              })
          }
        </ScenarioList>
      </div>
    </main>
  );
}