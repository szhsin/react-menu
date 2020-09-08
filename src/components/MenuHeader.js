import React from 'react';
import { defineName, bem, menuClass, menuHeaderClass } from '../utils';


export const MenuHeader = defineName(({ className, children }) => {

    return (
        <li className={bem(menuClass, menuHeaderClass)(className)}
            role="presentation">
            {children}
        </li>
    );
}, 'MenuHeader');
