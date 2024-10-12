import NextAuth, { Session } from 'next-auth';
import Discord, { DiscordProfile } from 'next-auth/providers/discord';
import { JWT } from 'next-auth/jwt';
import { authConfig } from './auth.config';
import { getUserByDiscordId, registerUser } from './lib/db/dao/userDao';
import { DrizzleError } from 'drizzle-orm';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [Discord],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'discord' && profile) {
          const discordProfile = profile as DiscordProfile;
          const discordId = discordProfile.id;
          const dbUser = await getUserByDiscordId(discordId);

          if (dbUser) {
            user.id = dbUser.id;
            user.discordId = dbUser.discordId;
            user.username = dbUser.username;
            user.nickname = dbUser.nickname;
            user.image = dbUser.image || discordProfile.image_url;
          } else {
            const registeredUser = await registerUser(
              discordProfile.username,
              discordProfile.global_name || discordProfile.username,
              discordProfile.id,
              discordProfile.image_url,
            );
            user.id = registeredUser.id;
            user.discordId = registeredUser.discordId;
            user.username = registeredUser.username;
            user.nickname = registeredUser.nickname;
            user.image = registeredUser.image || discordProfile.image_url;
          }
        }

        return true;
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes('SQLITE_CONSTRAINT')) {
            console.error('Unique constraint violation:', error.message);
          } else {
            console.error('SQLite error:', error.message);
          }
        } else if (error instanceof DrizzleError) {
          console.error('Drizzle ORM error:', error.message);
        } else {
          console.error('Unknown error:', error);
        }
        return false;
      }
    },
    async jwt({ token, user, trigger, session, account }): Promise<JWT> {
      if (user && user.id) {
        token.id = user.id;
        token.discordId = user.discordId;
        token.username = user.username;
        token.nickname = user.nickname;
        token.image = user.image;
      }

      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }

      if (trigger === 'update' && session) {
        token = { ...token, ...session };
        return token;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      session.user.id = token.id;
      session.user.discordId = token.discordId;
      session.user.username = token.username;
      session.user.nickname = token.nickname;
      session.user.image = token.image;
      session.accessToken = token.accessToken;

      return session;
    },
  },
});
