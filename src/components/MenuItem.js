import React, { useContext, useEffect, useRef } from 'react';
import {
    defineName, bem, flatStyles, menuClass, menuItemClass,
    MenuListContext, EventHandlersContext, RadioGroupContext,
    KeyCodes, HoverIndexActionTypes, useActiveState
} from '../utils';


export const MenuItem = defineName(React.memo(({
    className,
    styles,
    type,
    checked,
    disabled,
    href,
    index,
    value,
    children,
    onClick,
    ...restProps }) => {
    // console.log(`render MenuItem: ${children}`)

    const itemRef = useRef(null);
    const { isParentOpen, hoverIndex, hoverIndexDispatch } = useContext(MenuListContext);
    const isHovering = hoverIndex === index;
    const eventHandlers = useContext(EventHandlersContext);
    const radioGroup = useContext(RadioGroupContext);
    const { active, onKeyUp, onBlur, ...activeStateHandlers } = useActiveState();
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
            case KeyCodes.SPACE:
            case KeyCodes.RETURN:
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
        hoverIndexDispatch({ type: HoverIndexActionTypes.SET, index });
    }

    const handleBlur = e => {
        onBlur(e);
        // It handles situation such as clicking on a sibling disabled menu item
        hoverIndexDispatch({ type: HoverIndexActionTypes.UNSET, index });
    }

    useEffect(() => {
        // Don't set focus when parent menu is closed, otherwise focus will be lost
        // and onBlur event will be fired with relatedTarget setting as null.
        if (isHovering && isParentOpen) {
            itemRef.current.focus();
        }
    }, [isHovering, isParentOpen]);

    const modifiers = {
        type,
        disabled,
        hover: isHovering,
        active: active && !disabled,
        checked: isRadio ? radioGroup.value === value : checked,
        anchor: isAnchor
    };

    const menuItemProps = {
        className: bem(menuClass, menuItemClass, modifiers)(className),
        style: flatStyles(styles, modifiers),
        role: 'menuitem',
        tabIndex: isHovering ? 0 : -1,
        ref: itemRef,
        onMouseEnter: handleMouseEnter,
        onClick: () => handleClick(false),
        onKeyUp: handleKeyUp,
        onBlur: handleBlur,
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
