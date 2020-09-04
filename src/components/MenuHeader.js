import React from 'react';
import { defineName, bem, menuClass, menuHeaderClass } from '../utils';


export const MenuHeader = defineName(({ children }) => {

    return (
        <li className={bem(menuClass, menuHeaderClass)} role="presentation">{children}</li>
    );
}, 'MenuHeader');
