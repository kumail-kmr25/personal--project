import type { Metadata } from 'next';
import { DM_Sans, Space_Grotesk, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import { RootProviders } from '@/components/providers/root-providers';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
});

export const metadata: Metadata = {
  title: 'Kumail-kmr | premium Full stack Developer',
  description:
    'Portfolio website for kumail kmr with a modern high-conversion web experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={spaceGrotesk.variable + ' ' + dmSans.variable + ' ' + sourceCodePro.variable}
      suppressHydrationWarning
    >
      <body className='min-h-screen bg-background text-text-primary antialiased'>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
