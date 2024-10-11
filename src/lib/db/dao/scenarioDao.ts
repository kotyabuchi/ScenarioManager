'use server';

import { scenarios, tags } from '../schema';
import {
  and,
  asc,
  desc,
  eq,
  gte,
  InferSelectModel,
  like,
  lte,
} from 'drizzle-orm';
import { db } from '../db';

type Scenario = InferSelectModel<typeof scenarios>;
type Tag = InferSelectModel<typeof tags>;

export interface ScenarioWithTags extends Scenario {
  scenarioTags: Tag[];
}

export type IncludeColumns = (
  | 'tags'
  | 'sessions'
  | 'reviews'
  | 'preferences'
  | 'videoLinks'
)[];

export interface ScenarioQuery {
  id?: string;
  name?: string;
  author?: string;
  tags?: string[];
  minPlayers?: number;
  maxPlayers?: number;
  minPlayTime?: number;
  maxPlayTime?: number;
  createdAtStart?: Date;
  createdAtEnd?: Date;
  updatedAtStart?: Date;
  updatedAtEnd?: Date;
  order?: 'asc' | 'desc';
  orderBy?: keyof typeof scenarios.$inferSelect;
}

export async function getScenario(id: string) {
  return await db.query.scenarios.findFirst({
    where: eq(scenarios.id, id),
  });
}

export async function getScenariosWithTags(
  query: ScenarioQuery | undefined,
  offset: number = 0,
  limit: number = 20,
): Promise<ScenarioWithTags[]> {
  const whereConditions = [];

  if (query?.id) whereConditions.push(eq(scenarios.id, query.id));
  if (query?.name)
    whereConditions.push(like(scenarios.name, `%${query.name}%`));
  if (query?.author) whereConditions.push(eq(scenarios.author, query.author));
  if (query?.minPlayers)
    whereConditions.push(gte(scenarios.minPlayer, query.minPlayers));
  if (query?.maxPlayers)
    whereConditions.push(lte(scenarios.maxPlayer, query.maxPlayers));
  if (query?.minPlayTime)
    whereConditions.push(gte(scenarios.minPlaytime, query.minPlayTime));
  if (query?.maxPlayTime)
    whereConditions.push(lte(scenarios.maxPlaytime, query.maxPlayTime));
  if (query?.createdAtStart)
    whereConditions.push(gte(scenarios.createdAt, query.createdAtStart));
  if (query?.createdAtEnd)
    whereConditions.push(lte(scenarios.createdAt, query.createdAtEnd));
  if (query?.updatedAtStart)
    whereConditions.push(gte(scenarios.updatedAt, query.updatedAtStart));
  if (query?.updatedAtEnd)
    whereConditions.push(lte(scenarios.updatedAt, query.updatedAtEnd));

  const results = await db.query.scenarios.findMany({
    where: and(...whereConditions),
    limit: limit,
    offset: offset,
    orderBy:
      query?.order && query?.orderBy
        ? [
            query.order === 'asc'
              ? asc(scenarios[query.orderBy])
              : desc(scenarios[query.orderBy]),
          ]
        : undefined,
    with: {
      scenarioTags: {
        columns: {},
        with: {
          tag: {},
        },
      },
    },
  });

  return results.map((scenario) => ({
    ...scenario,
    scenarioTags: scenario.scenarioTags
      ?.filter(
        (
          st,
        ): st is { tag: { id: string; name: string; color: string | null } } =>
          'tag' in st,
      )
      .map((st) => st.tag),
  }));
}

export async function getScenarios(
  query: ScenarioQuery | undefined,
  include: IncludeColumns,
  offset: number = 0,
  limit: number = 20,
) {
  return await db.query.scenarios.findMany({
    where: query?.id ? eq(scenarios.id, query.id) : undefined,
    limit: limit,
    offset: offset,
    orderBy:
      query?.order && query?.orderBy
        ? [
            query.order === 'asc'
              ? asc(scenarios[query.orderBy])
              : desc(scenarios[query.orderBy]),
          ]
        : undefined,
    with: {
      scenarioTags: include?.includes('tags')
        ? {
            columns: {},
            with: {
              tag: {
                columns: {
                  name: true,
                  color: true,
                },
              },
            },
          }
        : undefined,
      sessions: include?.includes('sessions')
        ? {
            columns: {
              id: true,
            },
          }
        : undefined,
      reviews: include?.includes('reviews') ? true : undefined,
      preferences: include?.includes('preferences') ? true : undefined,
      videoLinks: include?.includes('videoLinks') ? true : undefined,
    },
  });
}
