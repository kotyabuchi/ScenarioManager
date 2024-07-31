import { Skeleton } from '@nextui-org/react';
import { User } from '@prisma/client';
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
      className='flex h-full w-full flex-col items-center gap-3 rounded-2xl bg-white p-3 duration-150 hover:shadow-soft-md'
    >
      <Suspense fallback={<AvatarSkeleton />}>
        <figure className='shrink-0 overflow-hidden rounded-full'>
          <Image
            className='h-24 w-24 bg-zinc-100 object-cover'
            src={user.thumbnailPath || '/default_avatar.png'}
            alt={user.name}
            width={96}
            height={96}
            sizes=''
          />
        </figure>
      </Suspense>
      <h2 className='line-clamp-1 text-base font-bold'>{user.name}</h2>
    </Link>
  );
}
