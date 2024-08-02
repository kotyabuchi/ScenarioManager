import Image from 'next/image';
import { getDiscordUser, getUser } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Button, ScrollShadow, Tooltip } from '@nextui-org/react';
import DiscordIcon from '@/../public/DiscordIcon.svg';
import LinkBadge from '@/app/ui/users/link-badge';
import { auth } from '@/auth';
import { SquarePen } from 'lucide-react';
import Link from 'next/link';

type Props = {
  params: { id: string };
};

const underLineCss =
  '[&_h2]:w-fit [&_h2]:px-1 [&_h2]:border-b-2 [&_h2]:border-primary-300 [&_h3]:w-fit [&_h3]:px-1 [&_h3]:border-b-2 [&_h3]:border-primary-300';

export default async function Page({ params }: Props) {
  const id = params.id;
  const user = await getUser(id);

  if (user) {
    const session = await auth();
    const isMyPage = session?.user.id === id;
    const userImage = user.thumbnailPath || '/default_avatar.png';
    const isUpdated = user.createdAt.getTime() !== user.updatedAt.getTime();
    const discordUser = await getDiscordUser(user.discordId);

    return (
      <main
        className={`flex max-h-full flex-col gap-6 ${underLineCss} p-8 md:overflow-y-auto md:pl-0`}
      >
        <div className='flex flex-row text-sm'>
          <p>
            {isUpdated ? '更新日:' : '登録日:'}
            <span>{user.updatedAt.toLocaleDateString()}</span>
          </p>
        </div>
        <div className='flex flex-col gap-4 md:gap-8'>
          <div className='mx-auto flex w-full flex-col gap-4 md:flex-row md:gap-6 lg:mx-0'>
            <div className='flex flex-col gap-4'>
              <Image
                className='bg-base-200 relative z-10 self-center rounded-full border-3 border-zinc-200 bg-white object-contain md:w-full'
                src={userImage}
                alt={user.name}
                width={144}
                height={144}
                sizes=''
              />
              <div className='hidden flex-col gap-2 md:flex'>
                <p className='text-sm'>リンク</p>
                <div className='flex flex-col gap-2'>
                  {discordUser.id && (
                    <LinkBadge
                      badgeTitle={discordUser.global_name}
                      href={`discord://-/users/${discordUser.id}`}
                      icon={DiscordIcon}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='flex w-full flex-col gap-3'>
              <div className='flex flex-row justify-between'>
                <h2 className='break-words break-all text-3xl'>{user.name}</h2>
                {isMyPage && (
                  <Tooltip content='プロフィールを編集'>
                    <Button
                      as={Link}
                      href='/profile/edit'
                      isIconOnly
                      variant='light'
                      radius='full'
                    >
                      <SquarePen />
                    </Button>
                  </Tooltip>
                )}
              </div>
              <p className='whitespace-break-spaces rounded-xl bg-white p-4 text-sm'>
                {user.introduction}
              </p>
              <div className='flex flex-col gap-2 md:hidden'>
                <p className='text-sm'>リンク</p>
                <div className='flex flex-col gap-2'>
                  {discordUser.id && (
                    <LinkBadge
                      badgeTitle={discordUser.global_name}
                      href={`discord://-/users/${discordUser.id}`}
                      icon={DiscordIcon}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg'>未プレイ</h3>
              <ScrollShadow
                orientation='horizontal'
                className='flex h-fit max-w-full flex-row gap-2 pb-4'
              >
                {[...Array(10)].map((_, i) => {
                  return (
                    <div
                      key={`未プレイ_${i}`}
                      className='flex min-w-fit flex-col gap-1 rounded-lg bg-white p-3'
                    >
                      <p className='min-w-fit max-w-full self-center text-sm'>
                        シナリオタイトル
                      </p>
                      <Image
                        className='bg-base-200 relative z-10 self-center object-contain md:w-24'
                        src='/noImage.png'
                        alt={user.name}
                        width={144}
                        height={144}
                        sizes=''
                      />
                    </div>
                  );
                })}
              </ScrollShadow>
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg'>シナリオ保有・KP可</h3>
              <ScrollShadow
                orientation='horizontal'
                className='flex h-fit max-w-full flex-row gap-2 pb-4'
              >
                {[...Array(10)].map((_, i) => {
                  return (
                    <div
                      key={`シナリオ保有・KP可_${i}`}
                      className='flex min-w-fit flex-col gap-1 rounded-lg bg-white p-3'
                    >
                      <p className='min-w-fit max-w-full self-center text-sm'>
                        シナリオタイトル
                      </p>
                      <Image
                        className='bg-base-200 relative z-10 self-center object-contain md:w-24'
                        src='/noImage.png'
                        alt={user.name}
                        width={144}
                        height={144}
                        sizes=''
                      />
                    </div>
                  );
                })}
              </ScrollShadow>
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg'>プレイ済み・視聴済み</h3>
              <ScrollShadow
                orientation='horizontal'
                className='flex h-fit max-w-full flex-row gap-2 pb-4'
              >
                {[...Array(10)].map((_, i) => {
                  return (
                    <div
                      key={`プレイ済み・視聴済み_${i}`}
                      className='flex min-w-fit flex-col gap-1 rounded-lg bg-white p-3'
                    >
                      <p className='min-w-fit max-w-full self-center text-sm'>
                        シナリオタイトル
                      </p>
                      <Image
                        className='bg-base-200 relative z-10 self-center object-contain md:w-24'
                        src='/noImage.png'
                        alt={user.name}
                        width={144}
                        height={144}
                        sizes=''
                      />
                    </div>
                  );
                })}
              </ScrollShadow>
            </div>
          </div>
        </div>
      </main>
    );
  } else {
    return notFound();
  }
}
