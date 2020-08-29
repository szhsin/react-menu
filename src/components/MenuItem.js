import React, { useContext } from 'react';
import './styles/index.scss';
import { bem, menuClass, menuItemClass, ActiveIndexContext } from '../utils';

export const MenuItem = React.memo(({ index, children, onMouseEnter }) => {
    // console.log(`render MenuItem: ${index}`)
    return (
        <li className={bem(menuClass, menuItemClass,
            ['active', useContext(ActiveIndexContext) === index])}
            role="menuitem"
            onMouseEnter={(e) => onMouseEnter(index, e)}>
            {children}
        </li>
    );
});
