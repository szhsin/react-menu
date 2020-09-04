import React from 'react';
import { defineName, bem, menuClass, menuDividerClass } from '../utils';


export const MenuDivider = defineName(() => {

    return (
        <li className={bem(menuClass, menuDividerClass)} role="separator"></li>
    );
}, 'MenuDivider');
