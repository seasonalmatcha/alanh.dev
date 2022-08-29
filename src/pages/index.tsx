import { NextPage } from 'next';
import Head from 'next/head';
import { ExperienceSection, IntroSection, ProjectSection, ToolStackSection } from '@/components';
import { generateMetatags } from '@/utils/generateMetatags';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        {generateMetatags({
          title: 'Alan Habibullah',
          url: '/',
        })}
      </Head>

      <div className="flex flex-col space-y-10 lg:space-y-24">
        <IntroSection />
        <ExperienceSection />
        <ProjectSection />
        <ToolStackSection />
      </div>
    </>
  );
};

export default Home;
