import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/ui/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "シナリオ管理",
  description: "TRPGやマダミスのシナリオ・セッションを管理します。",
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
