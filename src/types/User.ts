import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id?: string;
    name?: string | null;
    thumbnailPath: string | null;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      thumbnailPath: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    thumbnailPath: string | null;
  }
}
