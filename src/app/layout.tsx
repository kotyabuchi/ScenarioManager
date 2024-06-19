import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/ui/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "シナプレ管理くん",
  description: "TRPG・マダミスのシナリオ・セッションを管理するWebアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-theme="cupcake">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
