import { unstable_batchedUpdates } from 'react-dom';

export const batchedUpdates = unstable_batchedUpdates || (callback => callback());

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

// Adapted from https://github.com/popperjs/popper-core/tree/v2.9.1/src/dom-utils
export const getScrollAncestor = node => {
    while (node && node !== document.body) {
        const { overflow, overflowX, overflowY } = getComputedStyle(node);
        if (/auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)) return node;
        node = node.parentNode;
    }
    return window;
}

export const floatEqual = (a, b, diff = 0.0001) => Math.abs(a - b) < diff;
export const isProd = process.env.NODE_ENV === 'production';
