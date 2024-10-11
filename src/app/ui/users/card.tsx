import { User } from '@/lib/db/dao/userDao';
import { Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

function AvatarSkeleton() {
  return <Skeleton className='h-24 w-24 shrink-0 rounded-full' />;
}

export default function UserCard({ user }: { user: User }) {
  return (
    <Link
      href={`/dashboard/users/${user.id}`}
      className='flex h-full w-full flex-col items-center gap-1 rounded-xl bg-white p-3 duration-150 hover:shadow-soft-md'
    >
      <Suspense fallback={<AvatarSkeleton />}>
        <figure className='shrink-0 overflow-hidden rounded-full'>
          <Image
            className='h-16 w-16 bg-zinc-100 object-cover'
            src={user.image || '/default_avatar.png'}
            alt={user.nickname}
            width={64}
            height={64}
            sizes=''
          />
        </figure>
      </Suspense>
      <p className='line-clamp-1 text-base'>{user.nickname}</p>
    </Link>
  );
}
