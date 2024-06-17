'use server';

import { PrismaClient } from "@prisma/client"
import { unstable_noStore as noStore } from 'next/cache'
import { ConvertedScenarioDisplayData, ScenarioWithTag } from "./data-type";

const prisma = new PrismaClient()

export async function convertScenarioData(scenario: ScenarioWithTag) {
  const minPlayer = scenario.minPlayer
  const maxPlayer = scenario.maxPlayer

  const playerAmount = (maxPlayer)
    ? `${minPlayer || ""}〜${maxPlayer || ""}人`
    : (minPlayer)
      ? `${minPlayer}人以上`
      : `なし`

  const minPlayTimeFull: number = scenario.minPlaytime ?? 0
  const maxPlayTimeFull: number = scenario.maxPlaytime ?? 0
  const minHour: number = Math.ceil(minPlayTimeFull / 60.0)
  const minMinutes: number = Math.ceil(minPlayTimeFull % 60 / 60 * 10) / 10
  const maxHour: number = Math.ceil(maxPlayTimeFull / 60.0)
  const maxMinutes: number = Math.ceil(maxPlayTimeFull % 60 / 60 * 10) / 10
  const minPlayTime = minHour + minMinutes
  const maxPlayTime = maxHour + maxMinutes

  const playtime = (maxPlayTime)
    ? `${minPlayTime || ""}〜${maxPlayTime || ""}時間`
    : (minPlayTime)
      ? `${minPlayTime}時間以上`
      : `なし`

  function hoType() {
    switch (scenario.handoutType) {
      case 'NONE': return "なし"
      case 'PUBLIC': return "公開"
      case 'SECRET': return "秘匿"
    }
  }

  const description = scenario.shortDescription
    ? scenario.shortDescription
    : scenario.description ?? ""

  const scenarioTags = scenario.scenarioTag.map((scenarioTag) => {
    return scenarioTag.tag
  })

  const result: ConvertedScenarioDisplayData = {
    id: scenario.id,
    name: scenario.name,
    author: scenario.author ?? "不明",
    description: description,
    thumbnailPath: scenario.thumbnailPath ?? "/noImage.png",
    playerAmount: playerAmount,
    playtime: playtime,
    handoutType: hoType(),
    distributeUrl: scenario.distributeUrl,
    uploadedUserId: scenario.uploadedUserId,
    createdAt: scenario.createdAt,
    updatedAt: scenario.updatedAt,
    scenarioTags: scenarioTags
  }

  return result
}

export async function getScenario(
  id: string,
) {
  noStore()

  try {
    const scenario = await prisma.scenario.findUnique({
      relationLoadStrategy: 'join',
      where: {
        id: id
      },
      include: {
        scenarioTag: {
          include: {
            tag: true,
          },
        },
      },
    })

    return scenario
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch scenarios.');
  }
}

export async function getScenarios(
  query: object,
  offset: number,
  loadSize: number,
) {
  noStore()

  console.log({
    query: query,
    offset: offset
  })

  try {
    const scenarios = await prisma.scenario.findMany({
      relationLoadStrategy: 'join',
      where: query,
      include: {
        scenarioTag: {
          include: {
            tag: true,
          },
        },
      },
      skip: offset,
      take: loadSize,
    })

    return scenarios
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch scenarios.');
  }
}