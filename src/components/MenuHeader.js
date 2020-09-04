import React from 'react';
import './styles/index.scss';
import { defineName, bem, menuClass, menuHeaderClass } from '../utils';


export const MenuHeader = defineName(({ children }) => {

    return (
        <li className={bem(menuClass, menuHeaderClass)} role="presentation">{children}</li>
    );
}, 'MenuHeader');
