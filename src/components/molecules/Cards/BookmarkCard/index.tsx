import { BsFillPinAngleFill } from 'react-icons/bs';
import Image from 'next/image';
import { Bookmark } from '@prisma/client';

export type IBookmarkCardProps = Bookmark;

export const BookmarkCard = ({ title, thumbnail, excerpt, url, urlText }: IBookmarkCardProps) => {
  return (
    <div>
      <div className="bookmark-card-title">
        {title}
        <BsFillPinAngleFill className="bookmark-card-pin" />
      </div>
      <div className="bookmark-card-body">
        {thumbnail && (
          <div className="w-fit">
            <div className="bookmark-card-thumbnail">
              <Image src={thumbnail} fill alt="" />
            </div>
          </div>
        )}
        <div>
          <p className="bookmark-card-description">{excerpt}</p>
          <a href={url} target="_blank" rel="noreferrer" className="link">
            {urlText}
          </a>
        </div>
      </div>
    </div>
  );
};
