'use server';

import { getUserById, updateUserById } from "../lib/db/user";
import { changePasswordSchema } from "../schemas";
import bcrypt from 'bcrypt';

export interface State {
  isSuccess: boolean,
  errors?: {
    currentPassword?: string[],
    newPassword?: string[],
  },
  message?: string | null,
};

export async function changePassword(
  prevState: State,
  formData: FormData
): Promise<State> {
  const id = formData.get("id")?.toString();
  const validatedFields = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    newPasswordAgain: formData.get("newPasswordAgain"),
  });

  if (id === undefined) {
    console.error(`パスワード変更でエラーが発生しました。IDが見つかりません。`);
    return {
      isSuccess: false,
    }
  }

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'フォームに入力された内容が正しくありません。',
    };
  }

  if (validatedFields.data.newPassword !== formData.get("newPasswordAgain")?.toString()) {
    return {
      isSuccess: false,
      message: '新しいパスワードと新しいパスワード(確認)が一致しません。',
    };
  }

  try {
    const user = await getUserById(id);
    const currentPasswordsMatch = await bcrypt.compare(validatedFields.data.currentPassword, user.password);
    if (!currentPasswordsMatch) return {
      isSuccess: false,
      errors: {
        currentPassword: ["パスワードが間違っています"]
      },
    }

    const newPasswordsMatch = await bcrypt.compare(validatedFields.data.newPassword, user.password);
    if (newPasswordsMatch) return {
      isSuccess: false,
      errors: {
        newPassword: ["同じパスワードは設定できません"]
      },
    }

    const hashedPassword = await bcrypt.hash(validatedFields.data.newPassword, 10);

    const newData = {
      password: hashedPassword,
    }
    const result = await updateUserById(id, newData);

    if (result) {
      console.log(`${user.name}[${id}]がパスワードを変更しました。`);
      return {
        isSuccess: true,
      }
    }
  } catch (error) {
    console.error(`パスワード変更でエラーが発生しました。ID[${id}]: ${error}`);
  }

  return {
    isSuccess: false,
    message: "変更に失敗しました。",
  }
}