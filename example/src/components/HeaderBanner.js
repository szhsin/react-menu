import React from 'react';
import { version } from '../utils';

export function HeaderBanner({ onClose }) {
    return (
        <div className="header-banner" role="alert">
            This website is for React-Menu v{version}
            <a href="https://szhsin.github.io/react-menu/">You can find the latest version here.</a>
            <i className="close-btn material-icons" onClick={onClose}>close</i>
        </div>
    );
}
