import React, { useContext, useEffect, useRef, useState } from 'react';
import './styles/index.scss';
import {
    defineName, bem, menuClass, menuItemClass,
    ActiveIndexContext, EventHandlersContext, RadioGroupContext,
    keyCodes, useActiveState
} from '../utils';


export const MenuItem = defineName(React.memo(({ type, checked, disabled, index,
    children, onMouseEnter, value, onClick }) => {
    // console.log(`render MenuItem: ${children}`)

    const itemRef = useRef(null);
    const isActive = useContext(ActiveIndexContext) === index;
    const eventHandlers = useContext(EventHandlersContext);
    const radioGroup = useContext(RadioGroupContext);
    const { active, onKeyUp, ...activeStateHandlers } = useActiveState();

    const handleClick = (isKeyboardEvent) => {
        if (disabled) return;

        let isStopPropagation = false;
        const event = { value };
        if (type === 'checkbox') {
            event.checked = !checked;
        }

        if (type === 'radio') {
            isStopPropagation = true;
            radioGroup.onChange && radioGroup.onChange(event);
        } else if (onClick) {
            isStopPropagation = onClick(event) === false;
        }

        eventHandlers.handleClick(event, isStopPropagation, isKeyboardEvent);
    }

    const handleKeyUp = e => {
        // Check 'active' to skip KeyUp when corresponding KeyDown was initiated in another menu item
        if (!active) return;
        
        onKeyUp(e);
        switch (e.keyCode) {
            case keyCodes.SPACE:
            case keyCodes.RETURN:
                handleClick(true);
                break;
        }
    }

    const handleMouseEnter = e => {
        if (disabled) return;
        onMouseEnter(index, e);
    }

    useEffect(() => {
        if (isActive) {
            itemRef.current.focus();
        }
    }, [isActive]);

    return (
        <li className={bem(menuClass, menuItemClass,
            ['hover', isActive],
            ['active', active && !disabled],
            ['type', type],
            ['checked', type === 'radio' ? radioGroup.value === value : checked],
            ['disabled', disabled])}
            role="menuitem"
            tabIndex={isActive ? 0 : -1}
            ref={itemRef}
            onMouseEnter={handleMouseEnter}
            onClick={() => handleClick(false)}
            onKeyUp={handleKeyUp}
            {...activeStateHandlers}>
            {children}
        </li>
    );
}), 'MenuItem');
