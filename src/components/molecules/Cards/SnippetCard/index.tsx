import { ISnippet } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export interface ISnippetCardProps {
  snippet: ISnippet;
}

export const SnippetCard = ({ snippet }: ISnippetCardProps) => {
  return (
    <Link href={`/snippets/${snippet.slug}`} passHref>
      <a className="snippet-card group">
        <div className="snippet-card-logo">
          <Image alt={snippet.language.name} src={snippet.language.logo} layout="fill" />
        </div>
        <h3 className="snippet-card-title">{snippet.title}</h3>
        <p>{snippet.excerpt}</p>
      </a>
    </Link>
  );
};
