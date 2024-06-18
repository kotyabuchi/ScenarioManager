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
      className="card card-side items-center h-full rounded-lg bg-base-100 hover-primary hover:text-primary-content duration-150 lg:w-[calc(50%-4px)]"
    >
      <figure className='shrink-0 rounded-xl'>
        <Image
          className="object-cover w-20 h-20 bg-opacity-20 bg-primary"
          src="/default_avatar.png"
          alt={user.name}
          width={80}
          height={80}
          sizes=''
        />
      </figure>
      <div className="card-body gap-0 w-full h-fit px-4 py-0">
        <h2 className="card-title text-base">{user.name}</h2>
        <p className='text-sm opacity-70 w-auto max-h-10 line-clamp-2 break-words break-all'>{user.introduction}</p>
      </div>
    </Link>
  )
}