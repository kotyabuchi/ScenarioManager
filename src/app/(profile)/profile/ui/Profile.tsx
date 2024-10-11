import { getUser } from '@/lib/db/dao/userDao';
import RefleshButton from '@/app/ui/RefleshButton';
import { auth } from '@/auth';
import { Button, Image } from '@nextui-org/react';
import Link from 'next/link';

const underLineCss = 'border-b-2 border-primary-300';

function errorComponent(message: string) {
  return (
    <div className='flex w-full flex-col items-center gap-1'>
      <p className='h-10 text-center font-semibold leading-10'>{message}</p>
      <RefleshButton />
    </div>
  );
}

export default async function Profile() {
  const session = await auth();
  if (!session) return errorComponent('セッションが見つかりませんでした。');

  try {
    const user = await getUser(session.user.id);
    if (!user) throw new Error('ユーザーが見つかりませんでした。');
    const userImage = user?.image || 'default_avatar.png';

    return (
      <>
        <div className='flex w-full flex-col gap-3'>
          <div className='flex flex-row gap-6'>
            <Image
              className='relative h-36 min-h-36 w-36 min-w-36 shrink-0 rounded-full border-3 border-zinc-200 object-cover'
              src={userImage}
              alt={`${user.nickname}のサムネイル`}
              width={144}
              height={144}
            />
            <div className='flex flex-col gap-2'>
              <h2
                className={`h-fit w-fit break-words break-all px-1 text-3xl ${underLineCss}`}
              >
                {user.nickname}
              </h2>
              <div className='flex flex-col'>
                <p className='text-xs text-foreground-600'>DiscordID</p>
                <p>{user.discordId}</p>
              </div>
              <p
                className={`hidden whitespace-break-spaces sm:block ${
                  user.bio || 'text-foreground-600'
                }`}
              >
                {user.bio || '自己紹介は設定されていません。'}
              </p>
            </div>
          </div>
          <p
            className={`whitespace-break-spaces sm:hidden ${
              user.bio || 'text-foreground-600'
            }`}
          >
            {user.bio || '自己紹介は設定されていません。'}
          </p>
        </div>
        <div className='flex flex-row justify-end'>
          <Button
            as={Link}
            href='/profile/edit'
            variant='ghost'
            color='primary'
            className='w-fit'
          >
            編集
          </Button>
        </div>
      </>
    );
  } catch (error) {
    return errorComponent('ユーザーが見つかりませんでした。');
  }
}
