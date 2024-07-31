import { getScenarios } from '@/lib/data';
import ScenarioCard from '@/app/ui/scenarios/card';
import { ScenarioWithTag } from '@/lib/data-type';
import ScenarioListClient from './ScenarioListClient';

const PAGE_SIZE = 20;

async function loadMoreScenario(query: object | undefined, offset: number = 0) {
  'use server';
  const scenarios = await getScenarios(query, offset, PAGE_SIZE);
  const nextOffset =
    scenarios.length >= PAGE_SIZE ? offset + PAGE_SIZE : undefined;
  return [
    scenarios.map((scenario: ScenarioWithTag) => (
      <ScenarioCard key={scenario.id} scenario={scenario} />
    )),
    nextOffset,
  ] as const;
}

export default async function ScenarioListWrapper({
  scenarioNameQueryString,
}: {
  scenarioNameQueryString: string | undefined;
}) {
  let queries = [];

  if (scenarioNameQueryString) {
    const scenarioNameQueries = scenarioNameQueryString.split(' ');
    let scenarioNameQuery: object[] = [];
    scenarioNameQueries.forEach((scenarioName) => {
      scenarioNameQuery.push({
        name: {
          contains: scenarioName,
          mode: 'insensitive',
        },
      });
    });
    queries.push({ OR: [...scenarioNameQuery] });
  }

  const query = queries.length > 0 ? { AND: queries } : undefined;

  const initialScenarios = await getScenarios(query, 0, PAGE_SIZE);

  const initialScenarioNodes = initialScenarios.map(
    (scenario: ScenarioWithTag) => (
      <ScenarioCard key={scenario.id} scenario={scenario} />
    ),
  );

  return (
    <ScenarioListClient
      key={scenarioNameQueryString}
      initialScenarios={initialScenarioNodes}
      query={query}
      pageSize={PAGE_SIZE}
      loadMoreAction={loadMoreScenario}
    />
  );
}
