import { withAuth } from 'next-auth/middleware';

export const proxy = withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export default proxy;

export const config = {
  matcher: ['/admin/:path*'],
};
