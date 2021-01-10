import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
    attachHandlerProps,
    defineName,
    safeCall,
    bem,
    flatStyles,
    menuClass,
    menuItemClass,
    stylePropTypes,
    EventHandlersContext,
    useItemState
} from '../utils';


export const FocusableItem = defineName(React.memo(function FocusableItem({
    className,
    styles,
    disabled,
    index,
    children,
    ...restProps }) {

    const isDisabled = Boolean(disabled);
    const {
        ref,
        isHovering,
        setHover,
        unsetHover
    } = useItemState(isDisabled, index);
    const { handleClose } = useContext(EventHandlersContext);

    const baseParams = {
        disabled: isDisabled,
        hover: isHovering
    };

    const modifiers = Object.freeze({
        ...baseParams,
        focusable: true
    });

    const renderChildren = safeCall(children, {
        ...baseParams,
        ref,
        closeMenu: handleClose
    });

    const handleBlur = e => {
        // Focus has moved out of the entire FocusableItem
        // It handles situation such as clicking on a sibling disabled menu item
        if (!e.currentTarget.contains(e.relatedTarget)) {
            unsetHover(e);
        }
    }

    const handlers = attachHandlerProps({
        onMouseEnter: setHover,
        onFocus: setHover,
        onBlur: handleBlur
    }, restProps);

    return (
        <li aria-disabled={isDisabled || undefined}
            role="menuitem"
            tabIndex="-1"
            {...restProps}
            {...handlers}
            className={bem(menuClass, menuItemClass, modifiers)(className)}
            style={flatStyles(styles, modifiers)}>
            {renderChildren}
        </li>
    );
}), 'FocusableItem');

FocusableItem.propTypes = {
    ...stylePropTypes(),
    disabled: PropTypes.bool,
    children: PropTypes.func.isRequired
};
