import { Metadata } from "next";
import SignupForm from "@/app/ui/auth/signup-form";
import { Link } from "@nextui-org/react";

export const metadata: Metadata = {
  title: '新規登録',
};

export default function Page() {
  return (
    <>
      <h2 className="text-2xl w-fit px-1 border-b-2 border-primary-300">新規アカウント登録</h2>
      <SignupForm />
      <p className="text-sm">既に登録している場合は<Link href="/signin" className="text-sm">ログイン</Link>から。</p>
    </>
  )
}