import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { bounceAnimation } from '@/animations';
import { Language, Snippet } from '@prisma/client';

export type ISnippetCardProps = Pick<Snippet, 'id' | 'excerpt' | 'logo' | 'slug' | 'title'> & {
  language: Omit<Language, 'createdAt' | 'updatedAt'> | null;
  bounce: boolean;
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
    <Link href={`/snippets/${slug}`} passHref>
      <motion.a animate={controls} className="snippet-card group">
        <div className="card-body">
          {logo && (
            <div className="snippet-card-logo">
              <Image alt="" aria-hidden src={logo} layout="fill" />
            </div>
          )}
          <h3 className="snippet-card-title">{title}</h3>
          <p>{excerpt}</p>
        </div>
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
      </motion.a>
    </Link>
  );
};
