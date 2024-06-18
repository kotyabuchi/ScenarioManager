import UserCard from "@/app/ui/users/card";
import { getUsers } from '@/app/lib/data';
import { User } from '@prisma/client';
import UserList from '@/app/ui/card-list';

const PAGE_SIZE = 20

async function loadMoreUser(query: object, offset: number = 0) {
  'use server';
  const users = await getUsers(query, offset, PAGE_SIZE);

  const nextOffset = users.length >= PAGE_SIZE ? offset + PAGE_SIZE : null;

  return [
    users.map((user: User) => <UserCard key={user.id} user={user} />),
    nextOffset,
  ] as const;
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="sticky top-2 md:top-0 flex flex-row z-10 border w-full h-8">

      </div>
      <div className="w-full h-full mt-2">
        <UserList query={{}} initialOffset={PAGE_SIZE} loadMoreAction={loadMoreUser}>
          {
            loadMoreUser({}, 0)
              .then(([node, next]) => {
                return node
              })
              .catch((error) => {
                console.log(error);
                return (<p>読み込めませんでした。</p>)
              })
          }
        </UserList>
      </div>
    </main>
  );
}