import React, { useMemo } from 'react';
import { defineName, bem, flatStyles, menuClass, radioGroupClass, RadioGroupContext } from '../utils';


export const MenuRadioGroup = defineName(React.memo(({
    className,
    styles,
    children,
    name,
    value,
    onChange }) => {

    const contextValue = useMemo(() => ({ value, onChange }), [value, onChange]);

    return (
        <li role="presentation">
            <ul className={bem(menuClass, radioGroupClass)(className)}
                style={flatStyles(styles)}
                role="group"
                aria-label={name}>
                <RadioGroupContext.Provider value={contextValue}>
                    {children}
                </RadioGroupContext.Provider>
            </ul>
        </li>
    );
}), 'MenuRadioGroup');
