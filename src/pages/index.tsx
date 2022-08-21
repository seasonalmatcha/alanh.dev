import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Alan H</title>
      </Head>

      <div className="h-screen w-screen flex items-center justify-center">
        <h1 className="text-4xl">Alan H</h1>
      </div>
    </>
  );
};

export default Home;
