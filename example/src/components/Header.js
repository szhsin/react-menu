import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
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
          <NavBarLink exact to="/">
            Home
          </NavBarLink>
          <NavBarLink to="/docs">Docs</NavBarLink>
          <NavBarLink to="/style-guide">Styling</NavBarLink>
        </ul>

        <ThemeSwitch />

        <a
          className={bem(blockName, 'github')}
          title="GitHub"
          href="https://github.com/szhsin/react-menu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={`GitHub-Mark-${isDark ? 'Light-' : ''}64px.png`} alt="GitHub" />
        </a>
      </nav>
    </header>
  );
});

function NavBarLink(props) {
  return (
    <li className={bem(blockName, 'link')}>
      <NavLink {...props} />
    </li>
  );
}
