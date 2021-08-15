import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useBEM, useFlatStyles } from '../hooks';
import {
    defineName,
    stylePropTypes,
    menuClass,
    radioGroupClass,
    RadioGroupContext
} from '../utils';


export const MenuRadioGroup = defineName(forwardRef(function MenuRadioGroup({
    'aria-label': ariaLabel,
    className,
    styles,
    name,
    value,
    children,
    onRadioChange,
    ...restProps
}, externalRef) {

    const contextValue = useMemo(() => ({ name, value, onRadioChange }),
        [name, value, onRadioChange]);

    return (
        <li role="presentation">
            <ul role="group"
                aria-label={ariaLabel || name || 'Radio group'}
                {...restProps}
                ref={externalRef}
                className={useBEM({ block: menuClass, element: radioGroupClass, className })}
                style={useFlatStyles(styles)}>
                <RadioGroupContext.Provider value={contextValue}>
                    {children}
                </RadioGroupContext.Provider>
            </ul>
        </li>
    );
}), 'MenuRadioGroup');

MenuRadioGroup.propTypes = {
    ...stylePropTypes(),
    name: PropTypes.string,
    value: PropTypes.any,
    children: PropTypes.node.isRequired,
    onRadioChange: PropTypes.func
};
