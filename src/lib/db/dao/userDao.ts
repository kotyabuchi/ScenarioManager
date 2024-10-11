'use server';

import { users } from '../schema';
import { and, asc, desc, eq, gte, lte } from 'drizzle-orm';
import { db } from '../db';

export type User = typeof users.$inferSelect;

export interface UserQuery {
  id?: string;
  username?: string;
  nickname?: string;
  discordId?: string;
  createdAtStart?: Date;
  createdAtEnd?: Date;
  order?: 'asc' | 'desc';
  orderBy?: keyof typeof users.$inferSelect;
}

export async function getUsers(
  query: UserQuery | undefined,
  offset: number = 0,
  limit: number = 20,
) {
  const whereConditions = [];

  if (query?.id) {
    whereConditions.push(eq(users.id, query.id));
  }
  if (query?.username) {
    whereConditions.push(eq(users.username, query.username));
  }
  if (query?.nickname) {
    whereConditions.push(eq(users.nickname, query.nickname));
  }
  if (query?.discordId) {
    whereConditions.push(eq(users.discordId, query.discordId));
  }
  if (query?.createdAtStart) {
    whereConditions.push(gte(users.createdAt, query.createdAtStart));
  }
  if (query?.createdAtEnd) {
    whereConditions.push(lte(users.createdAt, query.createdAtEnd));
  }

  return await db.query.users.findMany({
    where: and(...whereConditions),
    offset: offset,
    limit: limit,
    orderBy:
      query?.order && query?.orderBy
        ? [
            query.order === 'asc'
              ? asc(users[query.orderBy])
              : desc(users[query.orderBy]),
          ]
        : undefined,
  });
}

export async function getUser(id: string) {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
  });
}

export async function getUserByUsername(username: string) {
  return await db.query.users.findFirst({
    where: eq(users.username, username),
  });
}

export async function getUserByDiscordId(discordId: string) {
  return await db.query.users.findFirst({
    where: eq(users.discordId, discordId),
  });
}

export async function userExists(username: string): Promise<boolean> {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  return user !== undefined;
}

export async function discordIdExists(discordId: string): Promise<boolean> {
  const user = await db.query.users.findFirst({
    where: eq(users.discordId, discordId),
  });

  return user !== undefined;
}

export async function registerUser(
  username: string,
  nickname: string,
  discordId: string,
  image: string,
) {
  return (
    await db
      .insert(users)
      .values({
        username: username,
        nickname: nickname,
        discordId: discordId,
        image: image,
      })
      .returning()
  )[0];
}

export async function updateUserById(
  id: string,
  newData: {
    username?: string;
    bio?: string;
    image?: string;
  },
) {
  return (
    await db
      .update(users)
      .set({
        username: newData.username,
        bio: newData.bio,
        image: newData.image,
      })
      .where(eq(users.id, id))
      .returning()
  )[0];
}
