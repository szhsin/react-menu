
import { useMemo } from 'react';

// Generate className following BEM methodology: http://getbem.com/naming/
// Modifier value can be one of the following types: boolean, string, undefined
export const useBEM = ({
    block, element, modifiers, className, externalModifiers
}) => useMemo(() => {
    const blockElement = element ? `${block}__${element}` : block;
    let classString = blockElement;
    for (const name of Object.keys(modifiers || {})) {
        const value = modifiers[name];
        if (value) {
            classString += ` ${blockElement}--`;
            classString += (value === true ? name : `${name}-${value}`);
        }
    }

    let expandedClassName = typeof className === 'function'
        ? className(externalModifiers || modifiers)
        : className

    if (typeof expandedClassName === 'string') {
        expandedClassName = expandedClassName.trim();
        if (expandedClassName) classString += ` ${expandedClassName}`;
    }

    return classString;
}, [block, element, modifiers, className, externalModifiers]);
