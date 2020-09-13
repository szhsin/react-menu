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
    onChange }) {

    const contextValue = useMemo(() => ({ name, value, onChange }),
        [name, value, onChange]);

    return (
        <li role="presentation">
            <ul className={bem(menuClass, radioGroupClass)(className)}
                style={flatStyles(styles)}
                role="group"
                aria-label={ariaLabel || name || 'Radio group'}>
                <RadioGroupContext.Provider value={contextValue}>
                    {children}
                </RadioGroupContext.Provider>
            </ul>
        </li>
    );
}), 'MenuRadioGroup');

MenuRadioGroup.propTypes = {
    ...stylePropTypes,
    'aria-label': PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
};
