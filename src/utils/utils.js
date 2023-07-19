import { unstable_batchedUpdates } from 'react-dom';

export const isMenuOpen = (state) => !!state && state[0] === 'o';
export const batchedUpdates = unstable_batchedUpdates || ((callback) => callback());
export const values = Object.values || ((obj) => Object.keys(obj).map((key) => obj[key]));
export const floatEqual = (a, b, diff = 0.0001) => Math.abs(a - b) < diff;
export const getTransition = (transition, name) =>
  transition === true || !!(transition && transition[name]);
export const safeCall = (fn, arg) => (typeof fn === 'function' ? fn(arg) : fn);

const internalKey = '_szhsinMenu';
export const getName = (component) => component[internalKey];
export const defineName = (name, component) =>
  Object.defineProperty(component, internalKey, { value: name });

export const mergeProps = (target, source) => {
  source &&
    Object.keys(source).forEach((key) => {
      const targetProp = target[key];
      const sourceProp = source[key];
      if (typeof sourceProp === 'function' && targetProp) {
        target[key] = (...arg) => {
          sourceProp(...arg);
          targetProp(...arg);
        };
      } else {
        target[key] = sourceProp;
      }
    });

  return target;
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
  while (node) {
    node = node.parentNode;
    if (!node || node === document.body || !node.parentNode) return;
    const { overflow, overflowX, overflowY } = getComputedStyle(node);
    if (/auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)) return node;
  }
};

export function commonProps(isDisabled, isHovering) {
  return {
    'aria-disabled': isDisabled || undefined,
    tabIndex: isHovering ? 0 : -1
  };
}

export function indexOfNode(nodeList, node) {
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i] === node) return i;
  }
  return -1;
}
