import { Metadata } from 'next';
import { Link } from '@nextui-org/react';
import SubmitButton from '@/app/ui/SubmitButton';
import { signIn } from '@/auth';

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
          await signIn('discord');
        }}
        className='flex w-full flex-col gap-4'
      >
        <SubmitButton text='ログイン' />
      </form>
      <p className='text-sm'>
        まだ登録していない場合は
        <Link href='/signup' className='text-sm'>
          新規アカウント登録
        </Link>
        から。
      </p>
    </>
  );
}
