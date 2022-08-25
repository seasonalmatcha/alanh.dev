import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import type { AppRouter } from '@/server/router';
import { ThemeProvider } from 'next-themes';
import { MainLayout } from '@/components';
import { NextPageWithLayout } from './page';
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import { AnimatePresence } from 'framer-motion';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AnimatePresence>{getLayout(<Component {...pageProps} />)}</AnimatePresence>
    </ThemeProvider>
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
