import { Metadata } from "next";
import { Link } from "@nextui-org/react";
import SigninForm from "@/app/ui/auth/signin-form";

export const metadata: Metadata = {
  title: 'ログイン',
};

export default function Page() {
  return (
    <>
      <h2 className="text-2xl w-fit px-1 border-b-2 border-primary-300">アカウントにログイン</h2>
      <SigninForm />
      <p className="text-sm">まだ登録していない場合は<Link href="/signup" className="text-sm">新規アカウント登録</Link>から。</p>
    </>
  )
}