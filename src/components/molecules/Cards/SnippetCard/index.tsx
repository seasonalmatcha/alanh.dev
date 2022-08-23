import { ISnippet } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export type ISnippetCardProps = Pick<ISnippet, 'excerpt' | 'logo' | 'slug' | 'title'>;

export const SnippetCard = ({ slug, title, excerpt, logo }: ISnippetCardProps) => {
  return (
    <Link href={`/snippets/${slug}`} passHref>
      <a className="snippet-card group">
        {logo && (
          <div className="snippet-card-logo">
            <Image alt="" src={logo} layout="fill" />
          </div>
        )}
        <h3 className="snippet-card-title">{title}</h3>
        <p>{excerpt}</p>
      </a>
    </Link>
  );
};
