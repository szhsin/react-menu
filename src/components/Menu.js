import React, { useState, useCallback, useRef, useEffect } from 'react';
import './styles/index.scss';
import { bem, menuContainerClass, menuClass } from '../utils';

export const Menu = (props) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isOpen, setIsOpen] = useState(false);

    const containerRef = useRef(null);
    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        if (isOpen) menuRef.current.focus();
    }, [isOpen]);

    const handleMenuButtonClick = useCallback(e => {
        setIsOpen(true);
        const containerRect = containerRef.current.getBoundingClientRect();
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setPosition({
            x: buttonRect.left - containerRect.left,
            y: buttonRect.top + buttonRect.height - containerRect.top
        });
    }, []);

    function handleBlur(e) {
        setIsOpen(false);
        // buttonRef.current.focus();
    }

    return (
        <div className={bem(menuContainerClass, null, ['open', isOpen])}
            role="presentation" ref={containerRef}>
            {props.renderButton &&
                props.renderButton({ onClick: handleMenuButtonClick }, buttonRef)}

            {isOpen &&
                <ul className={bem(menuClass)} role="menu" tabIndex="0" ref={menuRef}
                    onBlur={handleBlur}
                    style={{
                        left: position.x,
                        top: position.y
                    }}>
                    {props.children}
                </ul>}
        </div>
    );
}


