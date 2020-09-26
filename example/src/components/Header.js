import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DomInfoContext } from '../utils';

export const Header = React.memo(function Header() {

    const isFullSize = useContext(DomInfoContext).vWidth > 450;

    return (
        <header id="header" >
            <nav className="navbar fixed-top navbar-expand navbar-dark bg-dark"
                aria-label="Site">
                <ul className="navbar-nav">
                    <li>
                        <NavLink className="nav-link" exact to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/documentation">
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
