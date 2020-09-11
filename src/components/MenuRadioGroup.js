import React, { useMemo } from 'react';
import { defineName, bem, flatStyles, menuClass, radioGroupClass, RadioGroupContext } from '../utils';


export const MenuRadioGroup = defineName(React.memo(({
    'aria-label': ariaLabel,
    className,
    styles,
    children,
    name,
    value,
    onChange }) => {

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
