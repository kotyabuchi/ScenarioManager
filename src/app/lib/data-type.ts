import { Prisma } from '@prisma/client'

export type ScenarioWithTag = Prisma.ScenarioGetPayload<{
  include: {
    scenarioTag: {
      include: {
        tag: true,
      },
    },
  }
}>