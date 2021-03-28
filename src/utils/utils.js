export const defineName = (component, name) => name
    ? Object.defineProperty(component, '_reactMenu', { value: name, writable: false })
    : component;

export const getName = component => component && component['_reactMenu'];

export const applyHOC = HOC => (...args) => defineName(HOC(...args), getName(args[0]));

export const applyStatics = sourceComponent => wrappedComponent =>
    defineName(wrappedComponent, getName(sourceComponent));

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

export const parsePadding = paddingStr => {
    if (typeof paddingStr !== 'string') return { top: 0, right: 0, bottom: 0, left: 0 };

    const padding = paddingStr.trim().split(/\s+/, 4).map(parseFloat);
    const top = !isNaN(padding[0]) ? padding[0] : 0;
    const right = !isNaN(padding[1]) ? padding[1] : top;
    return {
        top,
        right,
        bottom: !isNaN(padding[2]) ? padding[2] : top,
        left: !isNaN(padding[3]) ? padding[3] : right,
    };
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
const sanitiseKey = key => key.charAt(0) === '$' ? key.slice(1) : key;

export const flatStyles = (styles, modifiers) => {
    if (typeof styles === 'function') return styles(modifiers);
    if (!isObject(styles)) return undefined;
    if (!modifiers) return styles;

    const style = {};
    for (const prop of Object.keys(styles)) {
        const value = styles[prop];
        if (isObject(value)) {
            const modifierValue = modifiers[sanitiseKey(prop)];
            if (typeof modifierValue === 'string') {
                for (const nestedProp of Object.keys(value)) {
                    const nestedValue = value[nestedProp];
                    if (isObject(nestedValue)) {
                        if (sanitiseKey(nestedProp) === modifierValue) {
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

// Adapted from https://github.com/popperjs/popper-core/tree/v2.9.1/src/dom-utils
export const getScrollAncestor = node => {
    while (node && node !== document.body) {
        const { overflow, overflowX, overflowY } = getComputedStyle(node);
        if (/auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)) return node;
        node = node.parentNode;
    }
    return window;
}

export const floatEqual = (a, b) => Math.abs(a - b) < 0.001;
export const isProd = process && process.env && process.env.NODE_ENV === 'production';
