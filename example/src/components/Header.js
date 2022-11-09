import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { basePath } from '../../next.config';
import { bem, SettingContext, TocContext } from '../utils';
import { Logo } from './Logo';
import { HeaderBanner } from './HeaderBanner';
import { ThemeSwitch } from './ThemeSwitch';

const blockName = 'navbar';

export const Header = React.memo(function Header() {
  const { theme, isDark, showBanner, setShowBanner } = useContext(SettingContext);
  const { setTocOpen } = useContext(TocContext);

  return (
    <header id="header">
      {showBanner && <HeaderBanner onClose={() => setShowBanner(false)} />}
      <nav className={bem(blockName, null, { theme })} aria-label="Site">
        <button
          className={bem(blockName, 'toggle')}
          aria-label="Open table of contents"
          onClick={() => setTocOpen(true)}
        >
          <i className="material-icons">menu</i>
        </button>

        <Logo />

        <ul className={bem(blockName, 'link-list')}>
          <NavBarLink href="/">Home</NavBarLink>
          <NavBarLink href="/docs">Docs</NavBarLink>
          <NavBarLink href="/style-guide">Styling</NavBarLink>
        </ul>

        <ThemeSwitch />

        <a
          className={bem(blockName, 'github')}
          title="GitHub"
          href="https://github.com/szhsin/react-menu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={`${basePath}/GitHub-Mark-${isDark ? 'Light-' : ''}64px.png`} alt="GitHub" />
        </a>
      </nav>
    </header>
  );
});

function NavBarLink({ href, children }) {
  const { pathname } = useRouter();
  const linkProps =
    href === pathname
      ? {
          'aria-current': 'page',
          className: 'active'
        }
      : undefined;
  return (
    <li className={bem(blockName, 'link')}>
      <Link href={href} {...linkProps}>
        {children}
      </Link>
    </li>
  );
}
