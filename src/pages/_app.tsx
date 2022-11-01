import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import type { AppRouter } from '@/server/router';
import { ThemeProvider } from 'next-themes';
import { MainLayout } from '@/components';
import { NextPageWithLayout } from './page';
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import { AnimatePresence } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { env } from '@/env/client.mjs';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
  pageProps: AppProps['pageProps'] & {
    session: Session;
  };
}

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <GoogleReCaptchaProvider
          reCaptchaKey={env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
          scriptProps={{
            defer: true,
            appendTo: 'head',
          }}
        >
          <AnimatePresence>{getLayout(<Component {...pageProps} />)}</AnimatePresence>
        </GoogleReCaptchaProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default withTRPC<AppRouter>({
  config() {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);
