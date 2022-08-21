import { useRef, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { useTheme } from 'next-themes';
import { BiMenu, BiX } from 'react-icons/bi';
import { BsCloudMoonFill, BsFillCloudSunFill } from 'react-icons/bs';

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
    href: '/bookmarks',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const mobileMenuRef = useRef<HTMLUListElement>(null);

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

  return (
    <nav className="navbar">
      <div className="mobile-nav-container">
        <button className="nav-button" onClick={onToggleMenu}>
          {isOpen ? <BiX className="menu-icon" /> : <BiMenu className="menu-icon" />}
        </button>

        <ul ref={mobileMenuRef} className={classNames('mobile-nav-links')}>
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
        </ul>
      </div>

      <ul className="nav-links">
        {links.map(({ href, label }) => (
          <li key={label} className="nav-link">
            <Link href={href} passHref>
              <a>{label}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button
        className="nav-button nav-theme-button"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <BsCloudMoonFill className="nav-theme-icon moon" />
        <BsFillCloudSunFill className="nav-theme-icon sun" />
      </button>
    </nav>
  );
};
