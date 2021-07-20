import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    attachHandlerProps,
    defineName,
    safeCall,
    useBEM,
    useFlatStyles,
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
        onBlur,
        onMouseEnter,
        onMouseLeave
    } = useItemState(isDisabled, index);
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
    }), [ref, children, modifiers, handleClose]);

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
            className={useBEM({ block: menuClass, element: menuItemClass, modifiers, className })}
            style={useFlatStyles(styles, modifiers)}>
            {renderChildren}
        </li>
    );
}), 'FocusableItem');

FocusableItem.propTypes = {
    ...stylePropTypes(),
    disabled: PropTypes.bool,
    children: PropTypes.func.isRequired
};
