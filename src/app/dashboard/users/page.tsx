import UserCard from "@/app/ui/users/card";
import { getUsers } from '@/app/lib/data';
import { User } from '@prisma/client';
import UserList from '@/app/ui/users/list';
import Search from "@/app/ui/search";

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

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  let queries = []

  const userNameQueryString = searchParams?.query || ''
  const userNameQueries = userNameQueryString.split(' ')
  let userNameQuery: object[] = []
  userNameQueries.forEach((userName) => {
    userNameQuery.push({
      name: {
        contains: userName,
        mode: 'insensitive',
      },
    })
  })

  queries.push({ OR: [...userNameQuery] })

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="sticky top-2 md:top-0 flex flex-row-reverse z-10 w-full h-10">
        <Search placeholder="ユーザーを検索" />
      </div>
      <div className="w-full h-full mt-2">
        <UserList query={{ AND: queries }} initialOffset={PAGE_SIZE} loadMoreAction={loadMoreUser}>
          {
            loadMoreUser({ AND: queries }, 0)
              .then(([node, next]) => {
                return node
              })
              .catch((error) => {
                console.log(error);
                return (<p className="w-full self-center text-center px-12 py-4">読み込めませんでした。</p>)
              })
          }
        </UserList>
      </div>
    </main>
  );
}