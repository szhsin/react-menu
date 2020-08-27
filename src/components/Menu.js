import React, { useState, useCallback, useRef, useEffect } from 'react';
import './styles/index.scss';
import { classSet } from '../utils';

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
        <div className={classSet({'rc-menu-container': true, 'rc-menu-container--open': isOpen})} 
        role="presentation" ref={containerRef}>
            {props.renderButton &&
                props.renderButton({ onClick: handleMenuButtonClick }, buttonRef)}

            {isOpen &&
                <ul className="rc-menu" role="menu" tabIndex="0" ref={menuRef}
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

export const MenuButton = React.memo(React.forwardRef((props, ref) => {
    console.log('render MenuButton');
    return (
        <button ref={ref} className="rc-menu-button"
            onClick={props.onClick} >
            {props.children}
        </button>
    );
}));
