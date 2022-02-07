import { unstable_batchedUpdates } from 'react-dom';

export const isMenuOpen = (state) => !!state && state[0] === 'o';
export const batchedUpdates = unstable_batchedUpdates || ((callback) => callback());
export const values = Object.values || ((obj) => Object.keys(obj).map((key) => obj[key]));
export const floatEqual = (a, b, diff = 0.0001) => Math.abs(a - b) < diff;
export const getTransition = (transition, name) =>
  !!(transition && transition[name]) || transition === true;
export const safeCall = (fn, arg) => (typeof fn === 'function' ? fn(arg) : fn);

export const getName = (component) => component && component['_szhsinMenu'];
export const defineName = (component, name) =>
  name ? Object.defineProperty(component, '_szhsinMenu', { value: name }) : component;

export const applyHOC =
  (HOC) =>
  (...args) =>
    defineName(HOC(...args), getName(args[0]));
export const applyStatics = (sourceComponent) => (wrappedComponent) =>
  defineName(wrappedComponent, getName(sourceComponent));

export const attachHandlerProps = (handlers, props) => {
  if (!props) return handlers;

  const result = {};
  for (const handlerName of Object.keys(handlers)) {
    const handler = handlers[handlerName];
    const propHandler = props[handlerName];
    let attachedHandler;
    if (typeof propHandler === 'function') {
      attachedHandler = (e) => {
        propHandler(e);
        handler(e);
      };
    } else {
      attachedHandler = handler;
    }
    result[handlerName] = attachedHandler;
  }

  return result;
};

export const parsePadding = (paddingStr) => {
  if (typeof paddingStr !== 'string') return { top: 0, right: 0, bottom: 0, left: 0 };

  const padding = paddingStr.trim().split(/\s+/, 4).map(parseFloat);
  const top = !isNaN(padding[0]) ? padding[0] : 0;
  const right = !isNaN(padding[1]) ? padding[1] : top;
  return {
    top,
    right,
    bottom: !isNaN(padding[2]) ? padding[2] : top,
    left: !isNaN(padding[3]) ? padding[3] : right
  };
};

// Adapted from https://github.com/popperjs/popper-core/tree/v2.9.1/src/dom-utils
export const getScrollAncestor = (node) => {
  while (node && node !== document.body) {
    const { overflow, overflowX, overflowY } = getComputedStyle(node);
    if (/auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)) return node;
    node = node.parentNode;
  }
  return window;
};

export const validateIndex = (index, isDisabled, node) => {
  if (process.env.NODE_ENV !== 'production' && index === undefined && !isDisabled) {
    const error = `[React-Menu] Validate item '${node && node.toString()}' failed.
You're probably creating wrapping components or HOC over MenuItem, SubMenu or FocusableItem.
To create wrapping components, see: https://codesandbox.io/s/react-menu-wrapping-q0b59
To create HOCs, see: https://codesandbox.io/s/react-menu-hoc-0bipn`;
    throw new Error(error);
  }
};

export function commonProps(isDisabled, isHovering) {
  return {
    'aria-disabled': isDisabled || undefined,
    tabIndex: isDisabled ? undefined : isHovering ? 0 : -1
  };
}
