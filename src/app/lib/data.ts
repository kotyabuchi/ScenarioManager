'use server';

import { PrismaClient } from "@prisma/client"
import { unstable_noStore as noStore } from 'next/cache'

const prisma = new PrismaClient()

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