
import { useMemo } from 'react';

/* 
Flatten up to two levels of nesting styles.
Modifier value can be one of the following types: boolean, string, undefined
For string type modifiers, go one level deeper than other types of modifiers.

Example style:
{
    color: 'green',
    active: {
        color: 'red'
    },
    theme: {
        color: 'gray',
        dark: {
            color: 'black'
        },
        light: {
            color: 'white'
        }
    }
}
*/

const isObject = obj => obj && typeof obj === 'object';
const sanitiseKey = key => key[0] === '$' ? key.slice(1) : key;

export const useFlatStyles = (styles, modifiers) => useMemo(() => {
    if (typeof styles === 'function') return styles(modifiers);
    if (!isObject(styles)) return undefined;
    if (!modifiers) return styles;

    let style = {};
    for (const prop of Object.keys(styles)) {
        const value = styles[prop];
        if (isObject(value)) {
            const modifierValue = modifiers[sanitiseKey(prop)];
            if (typeof modifierValue === 'string') {
                for (const nestedProp of Object.keys(value)) {
                    const nestedValue = value[nestedProp];
                    if (isObject(nestedValue)) {
                        if (sanitiseKey(nestedProp) === modifierValue) {
                            style = { ...style, ...nestedValue };
                        }
                    } else {
                        style[nestedProp] = nestedValue;
                    }
                }
            } else if (modifierValue) {
                style = { ...style, ...value };
            }
        } else {
            style[prop] = value;
        }
    }

    return style;
}, [styles, modifiers]);
