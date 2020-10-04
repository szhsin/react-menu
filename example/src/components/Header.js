import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DomInfoContext, TocContext } from '../utils';

export const Header = React.memo(function Header() {

    const isFullSize = useContext(DomInfoContext).vWidth > 500;
    const { setTocOpen } = useContext(TocContext);

    return (
        <header id="header" >
            <nav className="navbar fixed-top navbar-expand navbar-dark bg-dark"
                aria-label="Site">
                <button className="menu-btn" aria-label="Open table of contents"
                    onClick={() => setTocOpen(true)}>
                    <i className="material-icons">menu</i>
                </button>

                <ul className="navbar-nav">
                    <li>
                        <NavLink className="nav-link" exact to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/docs">
                            {isFullSize ? 'Documentation' : 'Docs'}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/style-guide">
                            {isFullSize ? 'Style Guide' : 'Styling'}
                        </NavLink>
                    </li>
                </ul>

                <a className="github" title="GitHub" href="https://github.com/szhsin/react-menu">
                    <img src="GitHub-Mark-Light-64px.png" alt="GitHub" />
                </a>
            </nav>
        </header>
    );
});
