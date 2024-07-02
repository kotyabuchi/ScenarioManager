import type { Metadata } from "next";
import { mPlus1Code } from '@/app/ui/fonts';
import "@/app/ui/global.css";
import { Providers } from "./ui/providers";
import { Toaster } from "sonner";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: {
    template: '%s | シナプレ管理くん',
    default: 'シナプレ管理くん',
  },
  description: "TRPG・マダミスのシナリオ・セッションを管理するWebアプリ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="ja" className="bg-zinc-100">
      <body className={`${mPlus1Code.className} antialiased`}>
        <Providers>
          <SessionProvider session={session}>
            <Toaster richColors expand />
            {children}
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
