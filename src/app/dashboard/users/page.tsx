import UserCard from "@/app/ui/users/card";
import { getUsers } from '@/app/lib/data';
import { User } from '@prisma/client';
import UserList from '@/app/ui/users/list';
import Search from "@/app/ui/search";

const PAGE_SIZE = 20

async function loadMoreUser(query: object, offset: number = 0) {
  'use server';
  const users = await getUsers(query, offset, PAGE_SIZE);

  const nextOffset = users.length >= PAGE_SIZE ? offset + PAGE_SIZE : undefined;

  return [
    users.map((user: User) => <UserCard key={user.id} user={user} />),
    nextOffset,
  ] as const;
}

export default async function Home({
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

  const { initialUsers, initialOffset } = await loadMoreUser({ AND: queries })
    .then(([node, nextOffset]) => {
      return {
        initialUsers: node,
        initialOffset: nextOffset
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        initialUsers: (<p className="w-full self-center text-center px-12 py-4">読み込めませんでした。</p>),
        initialOffset: undefined
      };
    })

  return (
    <main className="flex flex-col items-center justify-between lg:px-8">
      <div className="sticky top-2 md:top-0 flex flex-row-reverse z-10 w-full">
        <Search placeholder="ユーザーを検索" value={searchParams?.query} />
      </div>
      <div className="w-full h-full mt-3">
        <UserList
          query={{ AND: queries }}
          initialOffset={initialOffset}
          loadMoreAction={loadMoreUser}>
          {initialUsers}
        </UserList>
      </div>
    </main>
  );
}