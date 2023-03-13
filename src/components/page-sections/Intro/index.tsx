import { XMLize } from '@/components';
import Image from 'next/image';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';

export const IntroSection = () => {
  return (
    <section className="intro-section">
      <div className="w-fit">
        <motion.div
          initial={{ scale: 2.5, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: { duration: 0.5 },
          }}
          className="intro-section-avatar"
        >
          <Image alt="alan" src="/static/alan.webp" fill className="w-full h-full" priority />
        </motion.div>
      </div>
      <div className="flex flex-col space-y-4">
        <motion.h1
          initial={{ width: 0 }}
          animate={{ width: '100%', transition: { duration: 1, delay: 0.5 } }}
          className="intro-section-title overflow-hidden whitespace-nowrap"
        >
          Alan Habibullah
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.65 } }}
          className="flex flex-col space-y-4"
        >
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
                'Enjoys roasting, grinding, brewing, and drinking coffee',
                'Seems like a pro but just casual gamer',
                'Professional bathroom singer',
                'Denial about being a weeb even though watches anime all the time',
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
        </motion.div>
      </div>
    </section>
  );
};
