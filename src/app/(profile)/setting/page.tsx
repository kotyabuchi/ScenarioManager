import { Metadata } from "next";
import SettingForm from "./ui/setting-form";
import { auth } from "@/auth";
import ErrorAndReload from "../ui/error-and-reload";

export const metadata: Metadata = {
  title: '設定',
};

export default async function Page() {
  const session = await auth();
  if (session === null) return <ErrorAndReload message="セッションが見つかりませんでした。" />;
  return (
    <div className="flex flex-col gap-3 w-full px-6">
      <h1 className="text-xl">設定</h1>
      <SettingForm id={session.user.id} />
    </div>
  );
};
