import { Skeleton } from "@nextui-org/react";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

function AvatarSkeleton() {
  return <Skeleton className="shrink-0 rounded-full w-24 h-24" />;
}

export default function UserCard({ user }: { user: User }) {
  return (
    <Link
      href={`/dashboard/users/${user.id}`}
      className="flex flex-col gap-3 w-full h-full p-3 rounded-2xl hover:shadow-soft-md bg-white duration-150 items-center"
    >
      <Suspense fallback={<AvatarSkeleton />}>
        <figure className="shrink-0 rounded-full overflow-hidden">
          <Image
            className="object-cover w-24 h-24 bg-zinc-100"
            src={user.thumbnailPath || "/default_avatar.png"}
            alt={user.name}
            width={96}
            height={96}
            sizes=""
          />
        </figure>
      </Suspense>
      <h2 className="font-bold text-base line-clamp-1">{user.name}</h2>
    </Link>
  );
}
