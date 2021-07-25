import React, { memo, forwardRef, useContext, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useBEM, useFlatStyles, useItemState } from '../hooks';
import {
    attachHandlerProps,
    defineName,
    safeCall,
    menuClass,
    menuItemClass,
    stylePropTypes,
    EventHandlersContext
} from '../utils';


export const FocusableItem = defineName(memo(forwardRef(function FocusableItem({
    className,
    styles,
    disabled,
    index,
    children,
    ...restProps
}, externalRef) {

    const isDisabled = Boolean(disabled);
    const ref = useRef(null);
    const {
        isHovering,
        setHover,
        onBlur,
        onMouseEnter,
        onMouseLeave
    } = useItemState(ref, isDisabled, index);
    const { handleClose } = useContext(EventHandlersContext);

    const modifiers = useMemo(() => Object.freeze({
        disabled: isDisabled,
        hover: isHovering,
        focusable: true
    }), [isDisabled, isHovering]);

    const renderChildren = useMemo(() => safeCall(children, {
        ...modifiers,
        ref,
        closeMenu: handleClose
    }), [children, modifiers, handleClose]);

    const handlers = attachHandlerProps({
        onMouseEnter,
        onMouseLeave: e => onMouseLeave(e, true),
        onFocus: setHover,
        onBlur
    }, restProps);

    return (
        <li aria-disabled={isDisabled || undefined}
            role="menuitem"
            tabIndex="-1"
            {...restProps}
            {...handlers}
            ref={externalRef}
            className={useBEM({ block: menuClass, element: menuItemClass, modifiers, className })}
            style={useFlatStyles(styles, modifiers)}>
            {renderChildren}
        </li>
    );
})), 'FocusableItem');

FocusableItem.propTypes = {
    ...stylePropTypes(),
    disabled: PropTypes.bool,
    children: PropTypes.func.isRequired
};
