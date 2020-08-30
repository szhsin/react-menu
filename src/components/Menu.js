import React, { useState, useCallback, useRef, useMemo } from 'react';
import './styles/index.scss';
import { bem, menuContainerClass, keyCodes } from '../utils';
import { MenuList } from './MenuList'

export const Menu = ({ menuButton, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const containerRef = useRef(null);
    const buttonRef = useRef(null);

    const handleMenuButtonClick = useCallback(e => {
        setIsOpen(o => !o);
    }, []);

    const handleKeyDown = e => {
        switch (e.keyCode) {
            case keyCodes.ESC:
                setIsOpen(false);
                buttonRef.current.focus();
                break;
        }
    }

    const handleBlur = e => {
        if (!containerRef.current.contains(e.relatedTarget)) {
            setIsOpen(false);
        }
    }

    const button = useMemo(() => (
        menuButton &&
        React.cloneElement(menuButton,
            { ref: buttonRef, onClick: handleMenuButtonClick })
    ), [menuButton, handleMenuButtonClick]);

    return (
        <div className={bem(menuContainerClass, null, ['open', isOpen])}
            role="presentation" ref={containerRef}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}>
            {button}

            <MenuList isOpen={isOpen} containerRef={containerRef}
                anchorRef={buttonRef}>
                {children}
            </MenuList>
        </div>
    );
}


