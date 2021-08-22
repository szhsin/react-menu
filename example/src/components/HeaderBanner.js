import React, { useContext } from 'react';
import { version, DomInfoContext } from '../utils';

export function HeaderBanner({ onClose }) {
    const isFullSize = useContext(DomInfoContext).vWidth > 700;

    return (
        <div className="header-banner" role="alert">
            {isFullSize &&
                <span className="banner-text">This website is for React-Menu v{version}</span>}
            <a href="https://szhsin.github.io/react-menu/">
                {isFullSize ? 'You can find the latest version here.' : 'Visit the latest version'}
            </a>
            <i className="close-btn material-icons" onClick={onClose}>close</i>
        </div>
    );
}
