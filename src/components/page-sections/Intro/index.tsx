import { XMLize } from '@/components';
import Image from 'next/image';
import { IoDocumentTextOutline } from 'react-icons/io5';

export const IntroSection = () => {
  return (
    <section>
      <div className="intro-section">
        <div className="w-fit">
          <div className="intro-section-avatar">
            <Image alt="alan" src="/alan.jpg" layout="fill" className="w-full h-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h1 className="intro-section-title">Alan Habibullah</h1>
          <div className="flex flex-col space-y-2 rounded-lg p-4 border">
            <XMLize
              text="A passionate frontend engineer based in Jakarta, Indonesia"
              title={<h4>Job</h4>}
            />
            <XMLize
              text="Introvert yet seems extrovert when meeting people online"
              title={<h4>Personality</h4>}
            />
            <XMLize
              text={[
                "Can't live without a guitar",
                'Seems like a pro but just casual gamer',
                'Professional bathroom singer',
                'Denial about being a weeb eventhough watches anime all the time',
              ]}
              title={<h4>Hobby</h4>}
            />
          </div>

          <a
            href="https://drive.google.com/file/d/1psmMRl8uuBzxgAGmqkW4BTAiN6hISNn0/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="btn-outline w-fit"
          >
            <IoDocumentTextOutline className="h-6 w-6" />
            <span>My Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
};
