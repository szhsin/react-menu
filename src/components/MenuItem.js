import React, { useContext, useEffect, useRef } from 'react';
import {
    defineName, bem, menuClass, menuItemClass,
    HoverIndexContext, EventHandlersContext, RadioGroupContext,
    keyCodes, useActiveState
} from '../utils';


export const MenuItem = defineName(React.memo(({ className, type, checked, disabled, href, index,
    children, onMouseEnter, value, onClick, ...restProps }) => {
    // console.log(`render MenuItem: ${children}`)

    const itemRef = useRef(null);
    const isHovering = useContext(HoverIndexContext) === index;
    const eventHandlers = useContext(EventHandlersContext);
    const radioGroup = useContext(RadioGroupContext);
    const { active, onKeyUp, ...activeStateHandlers } = useActiveState();
    const isRadio = type === 'radio';
    const isCheckBox = type === 'checkbox';
    const isAnchor = href && !disabled && !isRadio && !isCheckBox;

    const handleClick = (isKeyboardEvent) => {
        if (disabled) return;

        let isStopPropagation = false;
        const event = { value };
        if (isCheckBox) {
            event.checked = !checked;
        }

        if (isRadio) {
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
                if (isAnchor) {
                    itemRef.current.click();
                } else {
                    handleClick(true);
                }
                break;
        }
    }

    const handleMouseEnter = e => {
        if (disabled) return;
        onMouseEnter(index, e);
    }

    useEffect(() => {
        if (isHovering) {
            itemRef.current.focus();
        }
    }, [isHovering]);

    const menuItemProps = {
        className: bem(menuClass, menuItemClass, {
            type,
            disabled,
            hover: isHovering,
            active: active && !disabled,
            checked: isRadio ? radioGroup.value === value : checked,
            anchor: isAnchor
        })(className),
        role: 'menuitem',
        tabIndex: isHovering ? 0 : -1,
        ref: itemRef,
        onMouseEnter: handleMouseEnter,
        onClick: () => handleClick(false),
        onKeyUp: handleKeyUp,
        ...activeStateHandlers
    };

    if (isAnchor) {
        return (
            <li role="presentation">
                <a {...restProps} href={href} {...menuItemProps} >
                    {children}
                </a>
            </li>
        );
    } else {
        return (
            <li {...menuItemProps}>
                {children}
            </li>
        );
    }
}), 'MenuItem');
