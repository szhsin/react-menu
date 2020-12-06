
export const defineName = (component, name) =>
    Object.defineProperty(component, '__name__', { value: name, writable: false });

export const safeCall = (fn, ...args) => typeof fn === 'function' ? fn(...args) : fn;

export const attachHandlerProps = (handlers, props) => {
    const result = {};

    for (const handlerName of Object.keys(handlers)) {
        const handler = handlers[handlerName];
        const propHandler = props[handlerName];
        let attachedHandler;
        if (typeof propHandler === 'function') {
            attachedHandler = e => {
                propHandler(e);
                handler(e);
            }
        } else {
            attachedHandler = handler;
        }
        result[handlerName] = attachedHandler;
    }

    return result;
}

// Generate className following BEM methodology: http://getbem.com/naming/
// Modifier value can be one of the following types: boolean, string, undefined
export const bem = (block, element, modifiers = {}) => (userClassName, userModifiers) => {
    let blockElement = element ? `${block}__${element}` : block;
    let className = blockElement;
    for (const name of Object.keys(modifiers)) {
        const value = modifiers[name];
        if (value) {
            className += ` ${blockElement}--`;
            className += (value === true ? name : `${name}-${value}`);
        }
    }

    if (typeof userClassName === 'function') {
        userClassName = userClassName(userModifiers || modifiers);
    }

    if (typeof userClassName === 'string') {
        userClassName = userClassName.trim();
        if (userClassName) className += ` ${userClassName}`;
    }

    return className;
}


const isObject = obj => obj && typeof obj === 'object';

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

export const flatStyles = (styles, modifiers) => {
    if (typeof styles === 'function') return styles(modifiers);
    if (!isObject(styles)) return undefined;
    if (!modifiers) return styles;

    const style = {};
    for (const prop of Object.keys(styles)) {
        const value = styles[prop];
        if (isObject(value)) {
            const modifierValue = modifiers[prop];
            if (typeof modifierValue === 'string') {
                for (const nestedProp of Object.keys(value)) {
                    const nestedValue = value[nestedProp];
                    if (isObject(nestedValue)) {
                        if (nestedProp === modifierValue) {
                            Object.assign(style, nestedValue);
                        }
                    } else {
                        style[nestedProp] = nestedValue;
                    }
                }
            } else if (modifierValue) {
                Object.assign(style, value);
            }
        } else {
            style[prop] = value;
        }
    }

    return style;
}
