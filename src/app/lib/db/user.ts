'use server';

import prisma from "@/app/lib/prisma";

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });

    if (user === null) throw new Error(`User not found by id. ID: ${id}`);
    return user;
  } catch (error) {
    console.log(`Exception in getUserById with [${id}].: ${error}`);
    throw error;
  }
};

export async function getUserByDiscordId(discordId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { discordId: discordId } });

    return user;
  } catch (error) {
    console.log(`Exception in getUserByDiscordId with [${discordId}].: ${error}`);
    return null;
  }
};

interface NewUserData {
  name?: string,
  discordId?: string,
  password?: string,
  introduction?: string,
  thumbnailPath?: string,
}

export async function updateUserById(id: string, newData: NewUserData) {
  try {
    await prisma.user.update(
      {
        where: {
          id: id
        },
        data: newData
      }
    )
    return true;
  } catch (error) {
    console.log(`Exception in updateUserById with [${id}].: ${error}`);
    return false;
  }
}