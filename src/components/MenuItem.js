import React, { memo, forwardRef, useContext, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    useBEM,
    useFlatStyles,
    useActiveState,
    useItemState,
    useCombinedRef
} from '../hooks';
import {
    attachHandlerProps,
    defineName,
    safeCall,
    stylePropTypes,
    menuClass,
    menuItemClass,
    EventHandlersContext,
    RadioGroupContext,
    Keys
} from '../utils';


export const MenuItem = defineName(memo(forwardRef(function MenuItem({
    className,
    styles,
    value,
    href,
    type,
    checked,
    disabled,
    index,
    children,
    onClick,
    ...restProps
}, externalRef) {

    const isDisabled = Boolean(disabled);
    const ref = useRef();
    const {
        isHovering,
        setHover,
        onBlur,
        onMouseEnter,
        onMouseLeave
    } = useItemState(ref, isDisabled, index);
    const eventHandlers = useContext(EventHandlersContext);
    const radioGroup = useContext(RadioGroupContext);
    const {
        isActive, onKeyUp, onBlur: activeStateBlur,
        ...activeStateHandlers
    } = useActiveState(isHovering, isDisabled);
    const isRadio = type === 'radio';
    const isCheckBox = type === 'checkbox';
    const isAnchor = Boolean(href) && !isDisabled && !isRadio && !isCheckBox;
    const isChecked = isRadio
        ? radioGroup.value === value
        : (isCheckBox ? Boolean(checked) : false);

    const handleClick = e => {
        if (isDisabled) return;

        const event = { value, syntheticEvent: e };
        if (e.key !== undefined) event.key = e.key;
        if (isCheckBox) event.checked = !isChecked;
        
        if (isRadio) {
            event.name = radioGroup.name;
            safeCall(radioGroup.onRadioChange, event);
        }

        if (!event.stopPropagation) safeCall(onClick, event);
        eventHandlers.handleClick(event, isCheckBox || isRadio);
    }

    const handleKeyUp = e => {
        // Check 'isActive' to skip KeyUp when corresponding KeyDown was initiated in another menu item
        if (!isActive) return;

        onKeyUp(e);
        switch (e.key) {
            case Keys.SPACE:
            case Keys.ENTER:
                if (isAnchor) {
                    ref.current.click();
                } else {
                    handleClick(e);
                }
                break;
        }
    }

    const handleBlur = e => {
        activeStateBlur(e);
        onBlur(e);
    }

    const modifiers = useMemo(() => Object.freeze({
        type,
        disabled: isDisabled,
        hover: isHovering,
        active: isActive,
        checked: isChecked,
        anchor: isAnchor
    }), [type, isDisabled, isHovering, isActive, isChecked, isAnchor]);

    const handlers = attachHandlerProps({
        ...activeStateHandlers,
        onMouseEnter,
        onMouseLeave,
        onMouseDown: setHover,
        onKeyUp: handleKeyUp,
        onBlur: handleBlur,
        onClick: handleClick
    }, restProps);

    // Order of props overriding (same in all components):
    // 1. Preset props adhering to WAI-ARIA Authoring Practices.
    // 2. restProps(consuming code overriding)
    // 3. handlers (with consuming code handlers hooked)
    // 4. ref, className, and styles (style prop is overriden, consuming code should 
    //    use the styles prop instead)
    const menuItemProps = {
        role: isRadio ? 'menuitemradio' : (isCheckBox ? 'menuitemcheckbox' : 'menuitem'),
        'aria-checked': (isRadio || isCheckBox) ? isChecked : undefined,
        'aria-disabled': isDisabled || undefined,
        tabIndex: isHovering ? 0 : -1,
        ...restProps,
        ...handlers,
        ref: useCombinedRef(externalRef, ref),
        className: useBEM({ block: menuClass, element: menuItemClass, modifiers, className }),
        style: useFlatStyles(styles, modifiers),
    };

    const renderChildren = useMemo(() => safeCall(children, modifiers), [children, modifiers]);

    if (isAnchor) {
        return (
            <li role="presentation">
                <a {...menuItemProps} href={href}>
                    {renderChildren}
                </a>
            </li>
        );
    } else {
        return (
            <li {...menuItemProps}>
                {renderChildren}
            </li>
        );
    }
})), 'MenuItem');

MenuItem.propTypes = {
    ...stylePropTypes(),
    value: PropTypes.any,
    href: PropTypes.string,
    type: PropTypes.oneOf(['checkbox', 'radio']),
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]).isRequired,
    onClick: PropTypes.func
};
