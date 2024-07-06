import { getUsers } from "@/app/lib/data";
import userCard from "@/app/ui/users/card";
import UserListClient from "./UserListClient";
import { User } from "@prisma/client";
import UserCard from "@/app/ui/users/card";

const PAGE_SIZE = 20;

async function loadMoreUser(query: object | undefined, offset: number = 0) {
  "use server";
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
    const userNameQueries = userNameQueryString.split(" ");
    let userNameQuery: object[] = [];
    userNameQueries.forEach((userName) => {
      userNameQuery.push({
        name: {
          contains: userName,
          mode: "insensitive",
        },
      });
    });
    queries.push({ OR: [...userNameQuery] });
  }

  const query = queries.length > 0 ? { AND: queries } : undefined;

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
