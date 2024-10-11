import { User } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id?: string;
    discordId: string;
    username: string;
    nickname: string;
    image?: string | null;
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      discordId: string;
      username: string;
      nickname: string;
      image?: string | null;
    };
  }
}

// JWTの型を拡張
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    discordId: string;
    username: string;
    nickname: string;
    image?: string | null;
  }
}
