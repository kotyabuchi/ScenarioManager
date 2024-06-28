import type { NextAuthConfig } from 'next-auth';

const publicRoutes: string[] = ["/"]
const authRoutes: string[] = ["/signup", "/signin"]

export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
      const isAuthRoute = authRoutes.includes(nextUrl.pathname)

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
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