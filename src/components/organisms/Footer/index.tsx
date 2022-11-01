import Link from 'next/link';

type Links = {
  href: string;
  label: string;
  isExternal?: boolean;
};

const linksGroup: Links[][] = [
  [
    {
      href: '/',
      label: 'Home',
    },
    {
      href: '/snippets',
      label: 'Snippets',
    },
    {
      href: '/bookmarks',
      label: 'Bookmarks',
    },
    {
      href: '/blog',
      label: 'Blog',
    },
  ],
  [
    {
      href: 'https://github.com/seasonalmatcha',
      label: 'Github',
      isExternal: true,
    },
    {
      href: 'https://www.linkedin.com/in/alanhabibullah/',
      label: 'LinkedIn',
      isExternal: true,
    },
    {
      href: 'https://instagram.com/seasonalmatcha',
      label: 'Instagram',
      isExternal: true,
    },
  ],
  [
    {
      href: 'https://github.com/seasonalmatcha/alanh.dev',
      label: 'Source Code',
      isExternal: true,
    },
    {
      href: '/contact',
      label: 'Contact',
    },
  ],
];

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {linksGroup.map((links, i) => {
          return (
            <div key={i} className="footer-links">
              {links.map(({ href, label, isExternal }) => {
                if (isExternal) {
                  return (
                    <a
                      key={label}
                      href={href}
                      className="footer-link link-secondary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {label}
                    </a>
                  );
                }
                return (
                  <Link key={label} href={href} passHref>
                    <a className="footer-link link-secondary">{label}</a>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </footer>
  );
};
