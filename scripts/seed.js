const { PrismaClient } = require("@prisma/client")
const {
  users,
  scenarios,
  tags,
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
    const result = await prisma.scenario.createMany({
      data: scenarios
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

async function main() {
  // await seedUsers()
  // await seedScenarios()
  // await seedTags()
  // await seedScenarioTags()
  const scenarios = await prisma.scenario.findMany({
    relationLoadStrategy: 'join',
    where: {
      id: 'd9342150-d6de-406c-87c6-3d1ecab1b42a',
    },
    include: {
      scenarioTag: {
        include: {
          tag: true,
        },
      },
    },
  })

  console.log(JSON.stringify(scenarios, null, "\t"))
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});