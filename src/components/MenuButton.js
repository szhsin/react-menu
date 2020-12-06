import React from 'react';
import PropTypes from 'prop-types';
import {
    defineName,
    bem,
    flatStyles,
    menuButtonClass,
    stylePropTypes
} from '../utils';


export const MenuButton = defineName(React.memo(React.forwardRef(function MenuButton({
    className,
    styles,
    isOpen,
    disabled,
    children,
    ...restProps }, ref) {

    const modifiers = Object.freeze({ open: isOpen });

    return (
        <button
            aria-haspopup="true"
            aria-expanded={isOpen}
            aria-disabled={disabled}
            disabled={disabled}
            {...restProps}
            ref={ref}
            className={bem(menuButtonClass, null, modifiers)(className)}
            style={flatStyles(styles, modifiers)}>
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
