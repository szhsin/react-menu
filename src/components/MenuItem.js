import React, { useContext, useEffect, useRef } from 'react';
import './styles/index.scss';
import { bem, menuClass, menuItemClass, ActiveIndexContext } from '../utils';


export const MenuItem = React.memo(({ index, children, onMouseEnter, onClick }) => {
    // console.log(`render MenuItem: ${index}`)

    const itemRef = useRef(null);
    const isActive = useContext(ActiveIndexContext) === index;

    useEffect(() => {
        if (isActive) {
            itemRef.current.focus();
        }
    }, [isActive]);

    return (
        <li className={bem(menuClass, menuItemClass, ['active', isActive])}
            role="menuitem"
            tabIndex={isActive ? 0 : -1}
            ref={itemRef}
            onMouseEnter={(e) => onMouseEnter(index, e)}
            onClick={onClick}>
            {children}
        </li>
    );
});
