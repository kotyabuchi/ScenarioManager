import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/ui/global.css";
import { Providers } from "./ui/providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | シナプレ管理くん',
    default: 'シナプレ管理くん',
  },
  description: "TRPG・マダミスのシナリオ・セッションを管理するWebアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="bg-slate-100">
      <body className={`${inter.className}`}>
        <Providers>
          <Toaster richColors />
          {children}
        </Providers>
      </body>
    </html>
  );
}
