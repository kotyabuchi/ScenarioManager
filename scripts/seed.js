const { sql } = require('@vercel/postgres')
const {
  users,
  scenarios,
  tags,
} = require('../src/app/lib/place_holder')
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

async function seedUsers() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        introduction TEXT,
        thumbnail_path TEXT
      );
    `;

    console.log(`Created "users" table`);

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return sql`
        INSERT INTO users (id, name, email, password, introduction, thumbnail_path)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.introduction.replace(/\r?\n/g, "\n")}, ${user.thumbnail_path})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedScenarios() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS scenarios (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        author TEXT,
        description TEXT,
        short_description TEXT,
        thumbnail_path TEXT,
        min_player SMALLINT,
        max_player SMALLINT,
        min_playtime SMALLINT,
        max_playtime SMALLINT,
        uploaded_by UUID
      );
    `;

    console.log(`Created "scenarios" table`);

    const insertedScenarios = await Promise.all(
      scenarios.map(async (scenario) => {
        return sql`
        INSERT INTO scenarios (id, name, author, description, short_description, thumbnail_path, min_player, max_player, min_playtime, max_playtime, uploaded_by)
        VALUES (${v4()}, ${scenario.name}, ${scenario.author}, ${scenario.description}, ${scenario.short_description}, ${scenario.thumbnail_path}, ${scenario.min_player}, ${scenario.max_player}, ${scenario.min_playtime}, ${scenario.max_playtime}, ${scenario.uploaded_by})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedScenarios.length} scenarios`);

    return {
      createTable,
      scenarios: insertedScenarios,
    };
  } catch (error) {
    console.error('Error seeding scenarios:', error);
    throw error;
  }
}

async function seedTags() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS tags (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        color TEXT
      );
    `;

    console.log(`Created "tags" table`);

    const insertedUsers = await Promise.all(
      tags.map(async (tag) => {
        return sql`
        INSERT INTO tags (id, name, color)
        VALUES (${v4()}, ${tag.name}, ${tag.color})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function main() {
  await seedUsers()
  await seedScenarios()
  await seedTags()
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});