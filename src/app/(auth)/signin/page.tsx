import { Metadata } from 'next';
import SubmitButton from '@/app/ui/SubmitButton';
import { signIn } from '@/auth';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'ログイン',
};

export default function Page() {
  return (
    <>
      <h2 className='w-fit border-b-2 border-primary-300 px-1 text-2xl'>
        アカウントにログイン
      </h2>
      <form
        action={async () => {
          'use server';
          await signIn('discord', {}, { scope: 'identify email guilds' });
        }}
        className='flex w-full flex-col gap-4'
      >
        <SubmitButton
          className='bg-[#5865F2]'
          text='Discordでログイン'
          startContent={
            <Image
              src='/DiscordIcon_white.svg'
              alt='Discord'
              width={24}
              height={24}
            />
          }
        />
      </form>
    </>
  );
}
