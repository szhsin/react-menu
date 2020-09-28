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
    id,
    className,
    styles,
    isOpen,
    disabled,
    children,
    onClick,
    onKeyDown }, ref) {

    const modifiers = Object.freeze({ open: isOpen });

    return (
        <button id={id} className={bem(menuButtonClass, null, modifiers)(className)}
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
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    isOpen: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func
};
