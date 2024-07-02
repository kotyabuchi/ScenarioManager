import { auth } from "@/auth";
import { getUserById } from "@/app/lib/db/user";
import RefleshButton from "@/app/ui/RefleshButton";
import { Metadata } from "next";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'プロフィール',
};

const underLineCss = "border-b-2 border-primary-300"

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
    const user = await getUserById(session.user.id);
    const userImage = user.thumbnailPath || "default_avatar.png"
    return (
      <div className="flex flex-col gap-3 w-full px-6">
        <h1 className="text-xl">プロフィール</h1>
        <div className="flex flex-col gap-6 w-full sm:p-6 sm:rounded-xl sm:border border-zinc-200 bg-zinc-50">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-row gap-6">
              <Image
                className="shrink-0 relative object-cover min-w-36 w-36 min-h-36 h-36 rounded-full border-3 border-zinc-200"
                src={userImage}
                alt={`${user.name}のサムネイル`}
                width={144}
                height={144}
              />
              <div className="flex flex-col gap-2">
                <h2 className={`text-3xl break-words break-all w-fit h-fit px-1 ${underLineCss}`}>{user.name}</h2>
                <div className="flex flex-col">
                  <p className="text-xs text-foreground-600">DiscordID</p>
                  <p>{user.discordId}</p>
                </div>
                <p className={`hidden sm:block whitespace-break-spaces ${user.introduction || "text-foreground-600"}`}>{user.introduction || "自己紹介は設定されていません。"}</p>
              </div>
            </div>
            <p className={`sm:hidden whitespace-break-spaces ${user.introduction || "text-foreground-600"}`}>{user.introduction || "自己紹介は設定されていません。"}</p>
          </div>
          <div className="flex flex-row justify-end">
            <Button
              as={Link}
              href="/profile/edit"
              variant="ghost"
              color="primary"
              className="w-fit"
            >
              編集
            </Button>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return errorComponent("ユーザーが見つかりませんでした。")
  }
};