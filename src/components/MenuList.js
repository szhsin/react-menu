import React, { useState, useLayoutEffect, useRef } from 'react';
import './styles/index.scss';
import { bem, menuClass } from '../utils';

export const MenuList = ({ isOpen, containerRef, anchorRef, children, direction, onBlur }) => {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef(null);

    useLayoutEffect(() => {
        if (isOpen) {
            menuRef.current.focus();
            const containerRect = containerRef.current.getBoundingClientRect();
            const anchorRect = anchorRef.current.getBoundingClientRect();

            let newPosition;
            switch (direction) {
                case 'inline-end':
                    newPosition = {
                        x: anchorRect.right - containerRect.left,
                        y: anchorRect.top - containerRect.top
                    };
                    break;

                case 'block-end':
                default:
                    newPosition = {
                        x: anchorRect.left - containerRect.left,
                        y: anchorRect.bottom - containerRect.top
                    };
            }
            setPosition(newPosition);
        }
    }, [isOpen]);

    return (
        <React.Fragment>
            {isOpen && <ul className={bem(menuClass)} role="menu" tabIndex="0" ref={menuRef}
                onBlur={onBlur}
                style={{
                    left: position.x,
                    top: position.y
                }}>
                {children}
            </ul>}
        </React.Fragment>
    );
}
