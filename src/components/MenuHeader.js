import React from 'react';
import {
    defineName, bem, flatStyles,
    menuClass, menuHeaderClass
} from '../utils';


export const MenuHeader = defineName(({ className, styles, children }) => {

    return (
        <li className={bem(menuClass, menuHeaderClass)(className)}
            style={flatStyles(styles)}
            role="presentation">
            {children}
        </li>
    );
}, 'MenuHeader');
