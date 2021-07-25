import React, { memo, forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useBEM, useFlatStyles } from '../hooks';
import { defineName, menuButtonClass, stylePropTypes } from '../utils';


export const MenuButton = defineName(memo(forwardRef(function MenuButton({
    className,
    styles,
    isOpen,
    disabled,
    children,
    ...restProps }, ref) {

    const modifiers = useMemo(() => Object.freeze({ open: isOpen }), [isOpen]);

    return (
        <button
            aria-haspopup="true"
            aria-expanded={isOpen}
            aria-disabled={disabled || undefined}
            disabled={disabled}
            {...restProps}
            ref={ref}
            className={useBEM({ block: menuButtonClass, modifiers, className })}
            style={useFlatStyles(styles, modifiers)} >
            {children}
        </button>
    );
})), 'MenuButton');

MenuButton.propTypes = {
    ...stylePropTypes(),
    isOpen: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func
};
