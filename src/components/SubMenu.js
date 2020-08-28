import React, { useState, useCallback, useRef } from 'react';
import './styles/index.scss';
import { bem, menuClass, subMenuClass, menuItemClass } from '../utils';
import { MenuList } from './MenuList'

export const SubMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const handleMouseLeave = useCallback(e => {
        if (!(e.relatedTarget instanceof Node)
            || !containerRef.current.contains(e.relatedTarget)) {
            setIsOpen(false);
        }
    });

    return (
        <li className={bem(menuClass, subMenuClass, ['open', isOpen])}
            role="presentation" ref={containerRef}>
            <div className={bem(menuClass, menuItemClass)}
                role="menuitem" aria-haspopup="true" aria-expanded="false"
                onMouseEnter={e => setIsOpen(true)}
                onMouseLeave={handleMouseLeave}>
                {props.label}
            </div>

            <MenuList
                isOpen={isOpen}
                containerRef={containerRef}
                anchorRef={containerRef}
                direction="inline-end"
                onMouseLeave={handleMouseLeave}>
                {props.children}
            </MenuList>
        </li>
    );
}
