import React, { useState, useCallback, useRef, useMemo } from 'react';
import './styles/index.scss';
import { bem, menuContainerClass } from '../utils';
import { MenuList } from './MenuList'

export const Menu = ({ menuButton, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const containerRef = useRef(null);
    const buttonRef = useRef(null);

    const handleMenuButtonClick = useCallback(e => {
        setIsOpen(o => !o);
    }, []);

    const handleBlur = useCallback(e => {
        if (!containerRef.current.contains(e.relatedTarget)) setIsOpen(false);
        // buttonRef.current.focus();
    }, []);

    const button = useMemo(() => (
        menuButton &&
        React.cloneElement(menuButton,
            { ref: buttonRef, onClick: handleMenuButtonClick })
    ), [menuButton, handleMenuButtonClick]);

    return (
        <div className={bem(menuContainerClass, null, ['open', isOpen])}
            role="presentation" ref={containerRef}>
            {button}

            <MenuList isOpen={isOpen} containerRef={containerRef}
                anchorRef={buttonRef} onBlur={handleBlur}>
                {children}
            </MenuList>
        </div>
    );
}


