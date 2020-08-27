import React from 'react';
import './styles/index.scss';
import { bem, menuClass, menuItemClass } from '../utils';

export const MenuItem = (props) => {
    return (
        <li className={bem(menuClass, menuItemClass)}
            role="menuitem">
            {props.children}
        </li>
    );
}
