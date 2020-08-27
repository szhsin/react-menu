import React, { useState, useCallback, useRef } from 'react';
import './styles/index.scss';
import { bem, menuContainerClass } from '../utils';
import { MenuList } from './MenuList'

export const Menu = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const containerRef = useRef(null);
    const buttonRef = useRef(null);

    const handleMenuButtonClick = useCallback(e => {
        setIsOpen(o => !o);
    }, []);

    const handleBlur = useCallback(e => {
        // setIsOpen(false);
        // buttonRef.current.focus();
    }, []);

    return (
        <div className={bem(menuContainerClass, null, ['open', isOpen])}
            role="presentation" ref={containerRef}>
            {props.renderButton &&
                props.renderButton({ onClick: handleMenuButtonClick }, buttonRef)}

            <MenuList isOpen={isOpen} containerRef={containerRef}
                anchorRef={buttonRef} onBlur={handleBlur}>
                {props.children}
            </MenuList>
        </div>
    );
}


