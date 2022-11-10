import { NextPage } from 'next';
import {
  ExperienceSection,
  IntroSection,
  Meta,
  ProjectSection,
  ToolStackSection,
} from '@/components';

const Home: NextPage = () => {
  return (
    <>
      <Meta title="Alan Habibullah" url="/" />

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
