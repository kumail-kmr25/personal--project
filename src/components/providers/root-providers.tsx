'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryProvider } from '@/components/providers/query-provider';

export function RootProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>
        {children}
        <Toaster
          position='top-right'
          toastOptions={{
            style: {
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text-primary)',
            },
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
      </QueryProvider>
    </SessionProvider>
  );
}
