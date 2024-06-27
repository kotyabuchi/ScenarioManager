const { PrismaClient } = require("@prisma/client")
const {
  users,
  tags,
  scenarios,
} = require('../src/app/lib/place_holder')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()


async function seedUsers() {
  users.map(async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword
    try {
      const result = await prisma.user.create({ data })
      console.log(result)
    } catch (error) {
      throw error
    }
  })
}

async function seedScenarios() {
  try {
    let editedScenarios = []
    scenarios.forEach(async (scenario) => {
      delete scenario.scenarioTag
      editedScenarios.push(scenario)
    })
    const result = await prisma.scenario.createMany({
      data: editedScenarios
    })
    console.log(result)
  } catch (error) {
    console.error('Error seeding scenarios:', error);
    throw error;
  }
}

async function seedTags() {
  try {
    const result = await prisma.tag.createMany({
      data: tags
    })
    console.log(result)
  } catch (error) {
    console.error('Error seeding tags:', error);
    throw error;
  }
}

async function seedScenarioTags() {
  try {
    const scenarios = await prisma.scenario.findMany()
    let tags = await prisma.tag.findMany()
    const trpg = tags.filter((tag) => tag.name == "TRPG")[0]
    const mm = tags.filter((tag) => tag.name == "マダミス")[0]
    const otherTag = tags.filter((tag) => tag.id != trpg.id && tag.id != mm.id)

    scenarios.forEach(async (scenario) => {
      const result = await prisma.scenarioTag.createMany({
        data: [
          {
            scenarioId: scenario.id,
            tagId: (Math.random() > 0.5) ? trpg.id : mm.id
          },
          {
            scenarioId: scenario.id,
            tagId: otherTag[Math.floor(Math.random() * otherTag.length)].id
          }
        ]
      })
      console.log(result)
    })
  } catch (error) {
    console.error('Error seeding scenario tags:', error);
    throw error;
  }
}

async function updateTags() {
  try {
    tags.forEach(async (tag) => {
      const result = await prisma.tag.update({
        where: {
          name: tag.name,
        },
        data: {
          color: tag.color,
        }
      })

      console.log(result);
    })
  } catch (error) {
    console.error('Error updating tags:', error);
    throw error;
  }
}

async function bindScenarioTags() {
  const scenarioTags = await prisma.scenarioTag.findMany({
    select: {
      scenarioId: true
    }
  })

  let filterRegisteredScenarioIds = {
    AND: []
  }
  scenarioTags.forEach((tag) => {
    filterRegisteredScenarioIds.AND.push({
      id: {
        not: tag.scenarioId
      }
    })
  })

  const filteredScenarios = await prisma.scenario.findMany({
    select: {
      id: true,
      name: true,
    },
    where: filterRegisteredScenarioIds
  })

  let scenarioIdMapping = {}
  filteredScenarios.forEach((scenario) => {
    scenarioIdMapping[scenario.name] = scenario.id
  })

  const tagIds = await prisma.tag.findMany({})
  let tagIdMapping = {}
  tagIds.forEach((tag) => {
    tagIdMapping[tag.name] = tag.id
  })

  let mappedScenarioTags = []
  scenarios.forEach(async (scenario) => {
    const scenarioId = scenarioIdMapping[scenario.name]

    scenarioId && scenario.scenarioTag.forEach(async (tag) => {
      const tagId = tagIdMapping[tag]

      mappedScenarioTags.push({
        scenarioId: scenarioId,
        tagId: tagId
      })
    })
  })

  const result = await prisma.scenarioTag.createMany({
    data: mappedScenarioTags
  })

  console.log(result)
}

async function main() {
  // await updateTags()
  // await seedUsers()
  // await seedTags()
  // await seedScenarios()
  // await seedScenarioTags()
  // await bindScenarioTags()
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});