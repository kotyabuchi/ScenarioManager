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
  description: string
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