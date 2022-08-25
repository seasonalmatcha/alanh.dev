import { ISnippet } from '@/types';
import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { bounceAnimation } from '@/animations';

export type ISnippetCardProps = Pick<
  ISnippet,
  'id' | 'excerpt' | 'logo' | 'slug' | 'title' | 'language'
> & {
  bounce?: boolean;
};

export const SnippetCard = ({
  language,
  slug,
  title,
  excerpt,
  logo,
  bounce,
}: ISnippetCardProps) => {
  const controls = useAnimationControls();

  useEffect(() => {
    if (bounce) {
      controls.start(bounceAnimation);
      return;
    }

    controls.stop();
  }, [bounce, controls]);

  return (
    <motion.div animate={controls}>
      <Link href={`/snippets/${slug}`} passHref>
        <a className="snippet-card group">
          {logo && (
            <div className="snippet-card-logo">
              <Image alt="" aria-hidden src={logo} layout="fill" />
            </div>
          )}
          <h3 className="snippet-card-title">{title}</h3>
          <p>{excerpt}</p>
          <div className="flex justify-between">
            {bounce && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AiOutlineLoading3Quarters className="animate-spin" />
              </motion.span>
            )}
            {language && language.logo && (
              <div className="snippet-card-language-logo">
                <Image alt={language.name} src={language.logo} layout="fill" />
              </div>
            )}
          </div>
        </a>
      </Link>
    </motion.div>
  );
};
