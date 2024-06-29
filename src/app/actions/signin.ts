'use server'

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(prevState: { success: boolean, error?: string } | undefined, formData: FormData) {
  try {
    console.log("try signin");

    const result = await signIn("credentials", {
      redirect: false,
      discordId: formData.get("discordId"),
      password: formData.get("password"),
    });

    if (result?.error) {
      return { success: false, error: 'Invalid credentials.' };
    }

    console.log("signin successful");
    return { success: true };
  } catch (error) {
    console.error("Signin error:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'メールアドレスまたはパスワードが間違っています。' }
        default:
          return { success: false, error: 'ログインに失敗しました。' }
      }
    }
    return { success: false, error: 'An unexpected' }
  }
}