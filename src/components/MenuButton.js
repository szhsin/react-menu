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
    onClick,
    onKeyDown }, ref) {

    const modifiers = Object.freeze({ open: isOpen });

    return (
        <button className={bem(menuButtonClass, null, modifiers)(className)}
            style={flatStyles(styles, modifiers)}
            aria-haspopup="true"
            aria-expanded={isOpen}
            aria-disabled={disabled}
            ref={ref}
            disabled={disabled}
            onClick={onClick}
            onKeyDown={onKeyDown} >
            {children}
        </button>
    );
})), 'MenuButton');

MenuButton.propTypes = {
    ...stylePropTypes,
    isOpen: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func
};
