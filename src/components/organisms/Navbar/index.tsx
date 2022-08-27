import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { useTheme } from 'next-themes';
import { BiMenu, BiX } from 'react-icons/bi';
import { BsCloudMoonFill, BsFillCloudSunFill } from 'react-icons/bs';
import { AiFillGithub } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const links = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Snippets',
    href: '/snippets',
  },
  {
    label: 'Bookmarks',
    href: '/#',
  },
  {
    label: 'Blog',
    href: '/#',
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const mobileMenuRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const { status } = useSession();

  const onToggleMenu = () => {
    setIsOpen((prev) => !prev);
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      mobileMenuRef.current.classList.remove('show');
      mobileMenuRef.current.classList.add('hide');
    } else {
      mobileMenuRef.current.classList.remove('hide');
      mobileMenuRef.current.classList.add('show');
    }
  };

  const isCurrentPage = (path: string) => {
    return router.asPath === path;
  };

  useEffect(() => {
    const onRouterChange = () => {
      mobileMenuRef.current?.classList.remove('show');
      mobileMenuRef.current?.classList.add('hide');
      setIsOpen(false);
    };

    router.events.on('routeChangeStart', onRouterChange);

    return () => {
      router.events.off('routeChangeStart', onRouterChange);
    };
  }, [router]);

  return (
    <nav className={classNames('navbar', isOpen ? 'mobile-open' : '')}>
      <div className="navbar-container">
        <button
          className="nav-button md:hidden"
          onClick={onToggleMenu}
          aria-label={`${isOpen ? 'Close' : 'Open'} navigation menu`}
        >
          {isOpen ? <BiX className="menu-icon" /> : <BiMenu className="menu-icon" />}
        </button>

        <ul className="nav-links">
          {links.map(({ href, label }) => (
            <li key={label}>
              <Link href={href} passHref>
                <a
                  className={classNames(
                    'link-secondary text-lg',
                    isCurrentPage(href) ? 'active' : '',
                  )}
                >
                  {label}
                </a>
              </Link>
            </li>
          ))}
          <li className="link-secondary text-lg">
            <a
              href="https://github.com/seasonalmatcha/alanh.dev"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2"
            >
              <AiFillGithub aria-hidden className="w-6 h-6 hidden lg:block" />
              <span>Source</span>
            </a>
          </li>
        </ul>

        {status === 'authenticated' && (
          <div>
            <button
              className="link-secondary text-lg hidden md:block"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign Out
            </button>
          </div>
        )}

        <button
          className="nav-button nav-theme-button"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label={`Set theme ${theme === 'light' ? 'dark' : 'light'}`}
        >
          <BsCloudMoonFill aria-hidden className="nav-theme-icon moon" />
          <BsFillCloudSunFill aria-hidden className="nav-theme-icon sun" />
        </button>
      </div>

      <ul ref={mobileMenuRef} className={classNames('mobile-nav-links')} aria-hidden={!isOpen}>
        {links.map(({ href, label }, i) => (
          <li
            key={label}
            className={classNames('mobile-nav-link', isOpen ? 'nav-link-show' : '')}
            style={{
              animationDelay: `${isOpen ? i * 50 + 100 : 200 - i * 50}ms`,
            }}
          >
            <Link href={href} passHref>
              <a tabIndex={isOpen ? 0 : -1}>{label}</a>
            </Link>
          </li>
        ))}
        {status === 'authenticated' && (
          <li className={classNames('mobile-nav-link', isOpen ? 'nav-link-show' : '')}>
            <button
              className="link-danger md:hidden p-4 w-full text-left"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
