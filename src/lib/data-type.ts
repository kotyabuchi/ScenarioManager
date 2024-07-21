import { Prisma, Tag } from '@prisma/client'

export type ScenarioWithTag = Prisma.ScenarioGetPayload<{
  include: {
    scenarioTag: {
      include: {
        tag: true,
      },
    },
  }
}>

export type ConvertedScenarioDisplayData = {
  id: string
  name: string
  author: string
  short_description: string | null
  description: string | null
  thumbnailPath: string
  playerAmount: string
  playtime: string
  handoutType: string
  distributeUrl: string | null
  uploadedUserId: string
  createdAt: Date
  updatedAt: Date
  scenarioTags: Tag[]
}