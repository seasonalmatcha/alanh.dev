import { Footer, Navbar } from '@/components';
import { FC, ReactNode } from 'react';

export interface IMainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
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
