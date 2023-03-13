import classNames from 'classnames';
import Link from 'next/link';
import { Fragment, HTMLProps } from 'react';

export interface IBreadcrumbProps extends HTMLProps<HTMLElement> {
  links: {
    label: string;
    path: string;
    active?: boolean;
  }[];
}

export const Breadcrumb = ({ links, className, ...restProps }: IBreadcrumbProps) => {
  return (
    <nav className={classNames('flex space-x-2', className)} {...restProps}>
      {links.map((link, i) => (
        <Fragment key={link.path}>
          <Link
            href={link.path}
            passHref
            className={classNames('link-secondary', link.active ? 'active' : '')}
          >
            {link.label}
          </Link>
          {i < links.length - 1 && <span aria-hidden>/</span>}
        </Fragment>
      ))}
    </nav>
  );
};
