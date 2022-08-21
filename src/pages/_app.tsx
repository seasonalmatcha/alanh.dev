import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { MainLayout } from '@/components';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
};

export default MyApp;
