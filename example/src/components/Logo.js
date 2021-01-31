import React from 'react';
import { version } from '../utils';

export const Logo = React.memo(function Logo() {

    return (
        <a className="app-logo"
            href="https://www.npmjs.com/package/@szhsin/react-menu"
            target="_blank" rel="noopener noreferrer">
            React-Menu<span>v{version}</span>
        </a>
    );
});
