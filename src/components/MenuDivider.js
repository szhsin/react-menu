import React from 'react';
import './styles/index.scss';
import { bem, menuClass, menuDividerClass } from '../utils';


export const MenuDivider = () => {

    return (
        <li className={bem(menuClass, menuDividerClass)} role="separator"></li>
    );
};

MenuDivider.__name__ = 'MenuDivider';