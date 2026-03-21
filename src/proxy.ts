import { withAuth } from 'next-auth/middleware';

const AUTHORIZED_EMAIL = 'kumailkmr.dev@gmail.com';

export const proxy = withAuth({
  callbacks: {
    authorized: ({ token }) => {
      if (!token?.email) return false;
      return token.email.toLowerCase() === AUTHORIZED_EMAIL && token.role === 'ADMIN';
    },
  },
});

export default proxy;

export const config = {
  matcher: ['/admin', '/admin/((?!login).*)'],
};
