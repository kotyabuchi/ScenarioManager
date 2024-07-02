import { auth } from "@/auth";
import ProfileForm from "./ui/profile-form";
import { getUserById } from "@/app/lib/db/user";
import RefleshButton from "@/app/ui/RefleshButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'プロフィール編集',
};

function errorComponent(message: string) {
  return (
    <div className="flex flex-col gap-1 w-full items-center">
      <p className="h-10 text-center font-semibold leading-10">{message}</p>
      <RefleshButton />
    </div>
  )
}

export default async function Page() {
  const session = await auth();
  if (session === null) return errorComponent("セッションが見つかりませんでした。");
  try {
    const { password, ...passwordLessUser } = await getUserById(session.user.id);
    return (
      <div className="flex flex-col gap-4 w-full px-6">
        <h1 className="text-xl">プロフィール設定</h1>
        <ProfileForm user={passwordLessUser} />
      </div>
    )
  } catch (error) {
    return errorComponent("ユーザーが見つかりませんでした。")
  }
};