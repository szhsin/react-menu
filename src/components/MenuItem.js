import React, { useContext, useEffect, useRef } from 'react';
import './styles/index.scss';
import {
    bem, menuClass, menuItemClass,
    ActiveIndexContext, EventHandlersContext, keyCodes
} from '../utils';


export const MenuItem = React.memo(({ type, checked, index, children, onMouseEnter, eventValue, onClick }) => {
    // console.log(`render MenuItem: ${children}`)

    const itemRef = useRef(null);
    const isActive = useContext(ActiveIndexContext) === index;
    const eventHandlers = useContext(EventHandlersContext);

    const handleClick = (isKeyEvent) => {
        let isStopPropagation = false;

        if (onClick) {
            isStopPropagation = onClick(eventValue) === false;
        }

        eventHandlers.handleClick(eventValue, isStopPropagation, isKeyEvent);
    }

    const handleKeyDown = e => {
        switch (e.keyCode) {
            case keyCodes.SPACE:
            case keyCodes.RETURN:
                handleClick(true);
                break;
        }
    }

    useEffect(() => {
        if (isActive) {
            itemRef.current.focus();
        }
    }, [isActive]);

    return (
        <li className={bem(menuClass, menuItemClass,
            ['active', isActive],
            ['type', type],
            ['checked', checked])}
            role="menuitem"
            tabIndex={isActive ? 0 : -1}
            ref={itemRef}
            onMouseEnter={(e) => onMouseEnter(index, e)}
            onClick={() => handleClick(false)}
            onKeyDown={handleKeyDown}>
            {children}
        </li>
    );
});
