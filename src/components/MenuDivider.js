import React from 'react';
import { defineName, bem, menuClass, menuDividerClass } from '../utils';


export const MenuDivider = defineName(({ className }) => {

    return (
        <li className={bem(menuClass, menuDividerClass)(className)}
            role="separator" />
    );
}, 'MenuDivider');
