import * as z from 'zod';

export const signUpSchema = z.object({
  username: z.string().min(1, {
    message: 'ユーザー名は必須です',
  }),
  discordId: z.string().min(1, {
    message: 'DiscordIDは必須です',
  }),
  password: z.string()
    .min(8, { message: "8文字以上で入力してください" })
    .max(32, { message: "32文字以内で入力してください" })
    .regex(/[0-9]+/, { message: "数字を1文字以上使用してください" })
    .regex(/[#?!@$%^&*-]+/, { message: "記号(#?!@$%^&*-)の中で1文字以上使用してください" })
    .regex(/[a-z]+/, { message: "英小文字を1文字以上使用してください" })
    .regex(/[A-Z]+/, { message: "英大文字を1文字以上使用してください" })
  ,
});