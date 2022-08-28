import { Breadcrumb, IBreadcrumbProps } from '@/components/molecules';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { FiPaperclip } from 'react-icons/fi';

export interface IDashboardTemplateProps {
  title: string;
  actionAddPath?: string;
  links?: IBreadcrumbProps['links'];
}

export const DashboardTemplate = ({
  actionAddPath,
  links,
  title,
  children,
}: PropsWithChildren<IDashboardTemplateProps>) => {
  return (
    <>
      {links && <Breadcrumb links={links} />}

      <h1 className="text-4xl my-8">{title}</h1>

      {actionAddPath && (
        <div className="text-right mb-4">
          <Link href={actionAddPath} passHref>
            <a className="btn-outline">
              <FiPaperclip />
              <span>Add new</span>
            </a>
          </Link>
        </div>
      )}

      {children}
    </>
  );
};
