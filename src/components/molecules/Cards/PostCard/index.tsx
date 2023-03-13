import { motion, useAnimationControls } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { bounceAnimation } from '@/animations';
import { Post } from '@prisma/client';
import classNames from 'classnames';

export type IPostCardProps = Pick<Post, 'id' | 'excerpt' | 'slug' | 'title'> & {
  bounce?: boolean;
};

export const PostCard = ({ slug, title, excerpt, bounce }: IPostCardProps) => {
  const controls = useAnimationControls();

  useEffect(() => {
    if (bounce) {
      controls.start(bounceAnimation);
      return;
    }

    controls.stop();
  }, [bounce, controls]);

  return (
    <Link href={`/blog/${slug}`} passHref>
      <motion.div
        animate={controls}
        className={classNames('group block', bounce ? 'focus:ring-0' : '')}
      >
        <h2 className="dark:text-white group-hover:text-teal-400 text-xl font-semibold">{title}</h2>
        <p className="mt-2">{excerpt}</p>
        {bounce && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block mt-4"
          >
            <AiOutlineLoading3Quarters className="animate-spin" />
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
};
