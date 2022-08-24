import { ISnippet } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export type ISnippetCardProps = Pick<
  ISnippet,
  'id' | 'excerpt' | 'logo' | 'slug' | 'title' | 'language'
>;

export const SnippetCard = ({ language, slug, title, excerpt, logo }: ISnippetCardProps) => {
  return (
    <Link href={`/snippets/${slug}`} passHref>
      <a className="snippet-card group">
        {logo && (
          <div className="snippet-card-logo">
            <Image alt="" aria-hidden src={logo} layout="fill" />
          </div>
        )}
        <h3 className="snippet-card-title">{title}</h3>
        <p>{excerpt}</p>
        {language && language.logo && (
          <div className="snippet-card-language-logo">
            <Image alt={language.name} src={language.logo} layout="fill" />
          </div>
        )}
      </a>
    </Link>
  );
};
