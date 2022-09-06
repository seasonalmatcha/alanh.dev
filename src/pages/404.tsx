import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from './page';

const NotFoundPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [pageRoute, setPageRoute] = useState('');
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    setPageRoute(router.asPath);
    setDate(new Date());
  }, [router]);

  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>

      <div className="text-lg font-mono border p-4 rounded-t-lg">
        <div className="flex space-x-2">
          <span className="text-violet-600">try</span>
          <span>&#123;</span>
        </div>
        <div className="ml-4">
          <span className="text-blue-400">getPage</span>
          <span>
            &#40;<span className="text-green-500">&apos;{pageRoute}&apos;</span>&#41;&#59;
          </span>
        </div>
        <div className="flex space-x-2">
          <span>&#125;</span>
          <span className="text-violet-600 ml-2">catch</span>
          <span>
            &#40;<span className="text-red-400">e</span>&#41;
          </span>
          <span>&#123;</span>
        </div>
        <div className="ml-4">
          <span className="text-yellow-500">console</span>
          <span>.</span>
          <span className="text-blue-400">log</span>
          <span>
            &#40;<span className="text-red-400">e</span>
            &#41;&#59;
          </span>
        </div>
        <span>&#125;</span>
      </div>

      <div className="text-lg font-mono border border-t-0 p-4 rounded-b-lg">
        <div>
          <span className="text-red-400">
            &#9656; Error: Oops! The page you are looking for does not exist
          </span>
        </div>
        <div className="ml-6">
          <div>at request page &lt;{pageRoute}&gt;</div>
          <div>at request date &lt;{date?.toLocaleDateString()}&gt;</div>
          <div>at request time &lt;{date?.toLocaleTimeString()}&gt;</div>
          <div className="text-5xl w-fit ml-auto mt-4">404</div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
