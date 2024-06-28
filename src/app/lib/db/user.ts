'use server';

import { prisma } from "@/app/lib/prisma";

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });

    return user;
  } catch (e) {
    return null;
  }
};

export async function getUserByDiscordId(discordId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { discordId: discordId } });

    return user;
  } catch (e) {
    return null;
  }
};