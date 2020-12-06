import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    defineName,
    bem,
    flatStyles,
    stylePropTypes,
    menuClass,
    radioGroupClass,
    RadioGroupContext
} from '../utils';


export const MenuRadioGroup = defineName(React.memo(function MenuRadioGroup({
    'aria-label': ariaLabel,
    className,
    styles,
    name,
    value,
    children,
    onChange,
    ...restProps }) {

    const contextValue = useMemo(() => ({ name, value, onChange }),
        [name, value, onChange]);

    return (
        <li role="presentation">
            <ul role="group"
                aria-label={ariaLabel || name || 'Radio group'}
                {...restProps}
                className={bem(menuClass, radioGroupClass)(className)}
                style={flatStyles(styles)}>
                <RadioGroupContext.Provider value={contextValue}>
                    {children}
                </RadioGroupContext.Provider>
            </ul>
        </li>
    );
}), 'MenuRadioGroup');

MenuRadioGroup.propTypes = {
    ...stylePropTypes(),
    'aria-label': PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func
};
