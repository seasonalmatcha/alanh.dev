import { Footer, Navbar } from '@/components';
import { FC, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export interface IAuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: FC<IAuthLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/auth/signIn');
    },
  });

  if (status === 'loading') {
    return <div className="max-w-sm mx-auto">Loading session ...</div>;
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <Navbar />
      <div className="h-full flex flex-col">
        <main className="container px-6 h-full py-8 md:pt-16 lg:pt-24 md:max-w-2xl lg:max-w-3xl mx-auto">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};
