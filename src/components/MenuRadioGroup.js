import React, { useMemo } from 'react';
import { defineName, bem, menuClass, radioGroupClass, RadioGroupContext } from '../utils';


export const MenuRadioGroup = defineName(React.memo(({ children, name, value, onChange }) => {

    const contextValue = useMemo(() => ({ value, onChange }), [value, onChange]);

    return (
        <li role="presentation">
            <ul className={bem(menuClass, radioGroupClass)}
                role="group"
                aria-label={name}>
                <RadioGroupContext.Provider value={contextValue}>
                    {children}
                </RadioGroupContext.Provider>
            </ul>
        </li>
    );
}), 'MenuRadioGroup');
