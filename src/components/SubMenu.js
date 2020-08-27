import React, { useState, useCallback, useRef } from 'react';
import './styles/index.scss';
import { bem, menuClass, subMenuClass, menuItemClass } from '../utils';
import { MenuList } from './MenuList'

export const SubMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const handleSubMenuClick = useCallback(e => {
        setIsOpen(o => !o);
    }, []);

    const handleBlur = useCallback(e => {
        // setIsOpen(false);
        // buttonRef.current.focus();
    }, []);

    return (
        <li className={bem(menuClass, subMenuClass, ['open', isOpen])} role="presentation" ref={containerRef}>
            <div className={bem(menuClass, menuItemClass)}
                role="menuitem" aria-haspopup="true" aria-expanded="false"
                onClick={handleSubMenuClick}>
                {props.label}
            </div>

            <MenuList
                isOpen={isOpen}
                containerRef={containerRef}
                anchorRef={containerRef}
                direction="inline-end"
                onBlur={handleBlur}>
                {props.children}
            </MenuList>
        </li>
    );
}
