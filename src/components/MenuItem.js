import React from 'react';
import './styles/index.scss';

export const MenuItem = (props) => {
    return (
        <li className="rc-menu__item" role="menuitem">{props.children}</li>
    );
}
