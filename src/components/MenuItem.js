import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
    attachHandlerProps,
    defineName,
    safeCall,
    bem,
    flatStyles,
    stylePropTypes,
    menuClass,
    menuItemClass,
    EventHandlersContext,
    RadioGroupContext,
    Keys,
    useActiveState,
    useItemState
} from '../utils';


export const MenuItem = defineName(React.memo(function MenuItem({
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
    ...restProps }) {

    const isDisabled = Boolean(disabled);
    const {
        ref,
        isHovering,
        onBlur,
        onMouseEnter,
        onMouseLeave
    } = useItemState(isDisabled, index);
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

    const handleClick = (key) => {
        if (isDisabled) return;

        let isStopPropagation = false;
        const event = { value, key };

        if (isRadio) {
            event.name = radioGroup.name;
            safeCall(radioGroup.onChange, event);
        }

        event.checked = isCheckBox ? !isChecked : false;
        isStopPropagation = safeCall(onClick, event) === false;

        eventHandlers.handleClick(
            event,
            isStopPropagation,
            isCheckBox || isRadio);
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
                    handleClick(e.key);
                }
                break;
        }
    }

    const handleBlur = e => {
        activeStateBlur(e);
        onBlur(e);
    }

    const modifiers = Object.freeze({
        type,
        disabled: isDisabled,
        hover: isHovering,
        active: isActive,
        checked: isChecked,
        anchor: isAnchor
    });

    const handlers = attachHandlerProps({
        ...activeStateHandlers,
        onMouseEnter,
        onMouseLeave,
        onKeyUp: handleKeyUp,
        onBlur: handleBlur,
        onClick: () => handleClick()
    }, restProps);

    // Order of props overriding (same in all components):
    // 1. Preset props adhering to WAI-ARIA Authoring Practices.
    // 2. restProps(client code overriding)
    // 3. handlers (with client code handlers hooked)
    // 4. ref, className, and styles (style prop is overriden, client code should 
    //    use the styles prop instead)
    const menuItemProps = {
        role: isRadio ? 'menuitemradio' : (isCheckBox ? 'menuitemcheckbox' : 'menuitem'),
        'aria-checked': (isRadio || isCheckBox) ? isChecked : undefined,
        'aria-disabled': isDisabled || undefined,
        tabIndex: isHovering ? 0 : -1,
        ...restProps,
        ...handlers,
        ref,
        className: bem(menuClass, menuItemClass, modifiers)(className),
        style: flatStyles(styles, modifiers),
    };

    const renderChildren = safeCall(children, modifiers);

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
}), 'MenuItem');

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
