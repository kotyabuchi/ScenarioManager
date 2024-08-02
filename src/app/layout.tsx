import type { Metadata } from 'next';
import { mPlus1Code } from '@/app/ui/fonts';
import '@/app/ui/global.css';
import { Providers } from './ui/providers';
import { Toaster } from 'sonner';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import SideBar from './ui/sidebar';

export const metadata: Metadata = {
  title: {
    template: '%s | シナプレ管理くん',
    default: 'シナプレ管理くん',
  },
  description: 'TRPG・マダミスのシナリオ・セッションを管理するWebアプリ',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang='ja' className='bg-[#f0f5f9]'>
      <body className={`${mPlus1Code.className} antialiased`}>
        <Providers>
          <SessionProvider session={session}>
            <Toaster richColors expand />
            <div className='flex h-dvh flex-row justify-center'>
              {session && <SideBar session={session} />}
              {children}
              <SpeedInsights />
            </div>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
