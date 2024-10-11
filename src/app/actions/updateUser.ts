'use server';

import { updateUserById } from '@/lib/db/dao/userDao';
import { z } from 'zod';

export interface State {
  isSuccess: boolean;
  errors?: {
    nickname?: string[];
  };
  message?: string | null;
  newData?: {
    nickname: string;
    bio: string;
    image?: string;
  };
}

export async function updateUser(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const id = formData.get('id')?.toString();
  const validatedFields = z
    .object({
      nickname: z.string(),
      bio: z.string(),
    })
    .safeParse(Object.fromEntries(formData));

  if (id === undefined) {
    return {
      isSuccess: false,
    };
  }

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'フォームに入力された内容が正しくありません。',
    };
  }

  try {
    const newData = {
      nickname: validatedFields.data.nickname,
      bio: validatedFields.data.bio,
      image: formData.get('image')?.toString() || undefined,
    };
    const result = await updateUserById(id, newData);

    if (result)
      return {
        isSuccess: true,
        newData: newData,
      };
  } catch (error) {
    console.log(`ユーザー更新でエラーが発生しました。: ${error}`);
  }

  return {
    isSuccess: false,
    message: '登録に失敗しました。',
  };
}
