import React, { useContext } from 'react';
import './styles/index.scss';
import { bem, menuClass, menuItemClass, ActiveContext } from '../utils';

export const MenuItem = ({ index, children }) => {
    // const active = useContext(ActiveContext);
    console.log(`render MenuItem: ${index}`)
    return (
        <li className={bem(menuClass, menuItemClass, ['active', useContext(ActiveContext) === index])}
            role="menuitem">
            {children}
        </li>
    );
}
