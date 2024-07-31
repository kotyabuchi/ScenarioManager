import type { NextAuthConfig } from 'next-auth';

const publicRoutes: string[] = ['/'];
const authRoutes: string[] = ['/signup', '/signin'];
const apiAuthPrefix: string = '/api/auth';

export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      const isAuthRoute = authRoutes.includes(nextUrl.pathname);

      if (isApiAuthRoute) {
        return nextUrl.pathname === '/api/auth/session' || isLoggedIn;
      }
      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
      }
      if (!isLoggedIn && !isPublicRoute) {
        return false;
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
