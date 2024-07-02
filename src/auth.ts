import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getUserByDiscordId } from './app/lib/db/user';

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("start authorize");

        const parsedCredentials = z
          .object({ discordId: z.string().min(1), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { discordId, password } = parsedCredentials.data;
          const user = await getUserByDiscordId(discordId);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }): Promise<JWT> {
      if (user && user.id && user.name) {
        token.id = user.id;
        token.name = user.name;
        token.thumbnailPath = user.thumbnailPath;
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session }
        return token;
      };

      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }): Promise<Session> {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.thumbnailPath = token.thumbnailPath
      }
      return session;
    },
  },
});