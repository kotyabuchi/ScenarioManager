import { checkExistingDiscordUser } from '../../lib/data';
import {
  getUserByDiscordId,
  getUserById,
  updateUserById,
} from '../../lib/db/user';
import { updateUserSchema } from '../../schemas';

export interface State {
  isSuccess: boolean;
  errors?: {
    username?: string[];
    discordId?: string[];
  };
  message?: string | null;
  newData?: {
    name: string;
    discordId: string;
    thumbnailPath?: string;
  };
}

export async function updateUser(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const id = formData.get('id')?.toString();
  const validatedFields = updateUserSchema.safeParse({
    username: formData.get('username'),
    discordId: formData.get('discordId'),
  });

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
    const oldData = await getUserById(id);

    if (oldData.discordId !== validatedFields.data.discordId) {
      const registeredDiscordUser = await getUserByDiscordId(
        validatedFields.data.discordId,
      );

      if (registeredDiscordUser) {
        return {
          isSuccess: false,
          errors: {
            discordId: ['このDiscordIDは既に登録されています。'],
          },
          message: '登録に失敗しました。',
        };
      }

      const isExistingDiscordUser = await checkExistingDiscordUser(
        validatedFields.data.discordId,
      );

      if (!isExistingDiscordUser) {
        return {
          isSuccess: false,
          errors: {
            discordId: ['このDiscordIDは存在しません。'],
          },
          message: 'フォームに入力された内容が正しくありません。',
        };
      }
    }

    const newData = {
      name: validatedFields.data.username,
      discordId: validatedFields.data.discordId,
      introduction: formData.get('introduction')?.toString(),
      // thumbnailPath: formData.get("thumbnailPath")?.toString(),
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
