import React, { useState, useCallback, useRef, useContext } from 'react';
import './styles/index.scss';
import { bem, menuClass, subMenuClass, menuItemClass, ActiveContext } from '../utils';
import { MenuList } from './MenuList'

export const SubMenu = ({label, index, children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const handleMouseLeave = useCallback(e => {
        if (!(e.relatedTarget instanceof Node)
            || !containerRef.current.contains(e.relatedTarget)) {
            setIsOpen(false);
        }
    }, []);

    const active = useContext(ActiveContext);

    return (
        <li className={bem(menuClass, subMenuClass, ['open', isOpen])}
            role="presentation" ref={containerRef}>
            <div className={bem(menuClass, menuItemClass, ['active', active === index])}
                role="menuitem" aria-haspopup="true" aria-expanded="false"
                onMouseEnter={e => setIsOpen(true)}
                onMouseLeave={handleMouseLeave}>
                {label}
            </div>

            <MenuList
                isOpen={isOpen}
                containerRef={containerRef}
                anchorRef={containerRef}
                direction="inline-end"
                onMouseLeave={handleMouseLeave}>
                {children}
            </MenuList>
        </li>
    );
}
