'use server';

import { signUpSchema } from '@/app/schemas';
import bcrypt from 'bcrypt';
import { getUserByDiscordId } from '@/app/lib/db/user';
import prisma from '@/app/lib/prisma';

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

    return { isSuccess: true, message: "アカウントを登録しました", errors: {} }
  } catch (error) {
    console.log("アカウント登録でエラーが発生しました。:" + error);

    return {
      isSuccess: false,
      errors: {},
      message: "予期せぬエラーが発生しました。",
    };
  }
};