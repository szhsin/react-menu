import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { bem, DomInfoContext, SettingContext, TocContext } from '../utils';

const blockName = 'navbar';

export const Header = React.memo(function Header({ onToggleTheme }) {

    const isFullSize = useContext(DomInfoContext).vWidth > 500;
    const { theme } = useContext(SettingContext);
    const isDarkTheme = theme === 'dark';
    const { setTocOpen } = useContext(TocContext);

    return (
        <header id="header">
            <nav className={bem(blockName, null, { theme })}
                aria-label="Site">
                <button className={bem(blockName, 'toggle')} aria-label="Open table of contents"
                    onClick={() => setTocOpen(true)}>
                    <i className="material-icons">menu</i>
                </button>

                <ul className={bem(blockName, 'link-list')}>
                    <NavBarLink exact to="/">Home</NavBarLink>

                    <NavBarLink to="/docs">
                        {isFullSize ? 'Documentation' : 'Docs'}
                    </NavBarLink>

                    <NavBarLink to="/style-guide">
                        {isFullSize ? 'Style Guide' : 'Styling'}
                    </NavBarLink>
                </ul>

                <input className={bem(blockName, 'theme-switch')} type="checkbox"
                    onChange={onToggleTheme} checked={isDarkTheme} />

                <a className={bem(blockName, 'github')} title="GitHub"
                    href="https://github.com/szhsin/react-menu">
                    <img src={`GitHub-Mark-${isDarkTheme ? 'Light-' : ''}64px.png`} alt="GitHub" />
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
