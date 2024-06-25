import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

export default function UserCard({
  user,
}: {
  user: User
}) {
  return (
    <Link
      href={`/dashboard/users/${user.id}`}
      className="flex flex-row gap-3 w-full h-full p-3 shadow-md rounded-2xl bg-white hover:bg-primary-50 duration-150"
    >
      <figure className='shrink-0 rounded-lg overflow-hidden'>
        <Image
          className="object-cover w-20 h-20 bg-opacity-20 bg-primary"
          src="/default_avatar.png"
          alt={user.name}
          width={80}
          height={80}
          sizes=''
        />
      </figure>
      <div className="flex flex-col gap-0 w-full h-full">
        <h2 className="font-bold text-base line-clamp-1">{user.name}</h2>
        <p className='text-sm opacity-70 w-auto max-h-10 line-clamp-2 break-words break-all'>{user.introduction}</p>
      </div>
    </Link>
  )
}