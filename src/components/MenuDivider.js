import React from 'react';
import {
    defineName, bem, flatStyles,
    menuClass, menuDividerClass
} from '../utils';


export const MenuDivider = defineName(({ className, styles }) => {

    return (
        <li className={bem(menuClass, menuDividerClass)(className)}
            style={flatStyles(styles)}
            role="separator" />
    );
}, 'MenuDivider');
