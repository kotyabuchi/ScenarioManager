import userCard from '@/app/ui/users/card';
import UserListClient from './UserListClient';
import UserCard from '@/app/ui/users/card';
import { getUsers, User, UserQuery } from '@/lib/db/dao/userDao';

const PAGE_SIZE = 20;

async function loadMoreUser(query: UserQuery | undefined, offset: number = 0) {
  'use server';
  const users = await getUsers(query, offset, PAGE_SIZE);
  const nextOffset = users.length >= PAGE_SIZE ? offset + PAGE_SIZE : undefined;
  return [
    users.map((user: User) => <UserCard key={user.id} user={user} />),
    nextOffset,
  ] as const;
}

export default async function userListWrapper({
  userNameQueryString,
}: {
  userNameQueryString: string | undefined;
}) {
  let queries = [];

  if (userNameQueryString) {
    const userNameQueries = userNameQueryString.split(' ');
    let userNameQuery: object[] = [];
    userNameQueries.forEach((userName) => {
      userNameQuery.push({
        name: {
          contains: userName,
          mode: 'insensitive',
        },
      });
    });
    queries.push({ OR: [...userNameQuery] });
  }

  const query = undefined;

  const [initialUsers, _] = await loadMoreUser(query);

  return (
    <UserListClient
      key={userNameQueryString}
      initialUsers={initialUsers}
      query={query}
      pageSize={PAGE_SIZE}
      loadMoreAction={loadMoreUser}
    />
  );
}
