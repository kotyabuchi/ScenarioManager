'use server';

import { signUpSchema } from '@/app/schemas';
import { ActionsResult } from '@/app/types/ActionResult';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getUserByDiscordId, getUserById } from '@/app/lib/db/user';
import { prisma } from '@/app/lib/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export interface State {
  isSuccess: boolean,
  errors: {
    username?: string[];
    discordId?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function signUp(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = signUpSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    discordId: formData.get("discordId"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'フォームに入力された内容が正しくありません。',
    };
  }

  const { discordId, password, username } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingDiscordUser = await getUserByDiscordId(discordId);

    if (existingDiscordUser) {
      return {
        isSuccess: false,
        errors: {
          discordId: ["このDiscordIDは既に登録されています。"]
        },
        message: "登録に失敗しました。"
      }
    }

    await prisma.user.create({
      data: {
        discordId: discordId,
        name: username,
        password: hashedPassword,
      },
    });

    // redirect("/dashboard");
    return { isSuccess: true, message: "完了！", errors: {} }
  } catch (error) {
    console.log("サインアップでエラーが発生しました。:" + error);

    return {
      isSuccess: false,
      errors: {},
      message: "予期せぬエラーが発生しました。",
    };
  }
};