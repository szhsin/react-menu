import { unstable_batchedUpdates } from 'react-dom';

var isProd = process.env.NODE_ENV === 'production';
var isMenuOpen = function isMenuOpen(state) {
  return !!state && state[0] === 'o';
};
var batchedUpdates = unstable_batchedUpdates || function (callback) {
  return callback();
};
var values = Object.values || function (obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
};
var floatEqual = function floatEqual(a, b, diff) {
  if (diff === void 0) {
    diff = 0.0001;
  }

  return Math.abs(a - b) < diff;
};
var getTransition = function getTransition(transition, name) {
  return !!(transition && transition[name]) || transition === true;
};
var safeCall = function safeCall(fn, arg) {
  return typeof fn === 'function' ? fn(arg) : fn;
};
var getName = function getName(component) {
  return component && component['_szhsinMenu'];
};
var defineName = function defineName(component, name) {
  return name ? Object.defineProperty(component, '_szhsinMenu', {
    value: name,
    writable: false
  }) : component;
};
var applyHOC = function applyHOC(HOC) {
  return function () {
    return defineName(HOC.apply(void 0, arguments), getName(arguments.length <= 0 ? undefined : arguments[0]));
  };
};
var applyStatics = function applyStatics(sourceComponent) {
  return function (wrappedComponent) {
    return defineName(wrappedComponent, getName(sourceComponent));
  };
};
var attachHandlerProps = function attachHandlerProps(handlers, props) {
  if (!props) return handlers;
  var result = {};

  var _loop = function _loop(_i2, _Object$keys2) {
    var handlerName = _Object$keys2[_i2];
    var handler = handlers[handlerName];
    var propHandler = props[handlerName];
    var attachedHandler = void 0;

    if (typeof propHandler === 'function') {
      attachedHandler = function attachedHandler(e) {
        propHandler(e);
        handler(e);
      };
    } else {
      attachedHandler = handler;
    }

    result[handlerName] = attachedHandler;
  };

  for (var _i2 = 0, _Object$keys2 = Object.keys(handlers); _i2 < _Object$keys2.length; _i2++) {
    _loop(_i2, _Object$keys2);
  }

  return result;
};
var parsePadding = function parsePadding(paddingStr) {
  if (typeof paddingStr !== 'string') return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  var padding = paddingStr.trim().split(/\s+/, 4).map(parseFloat);
  var top = !isNaN(padding[0]) ? padding[0] : 0;
  var right = !isNaN(padding[1]) ? padding[1] : top;
  return {
    top: top,
    right: right,
    bottom: !isNaN(padding[2]) ? padding[2] : top,
    left: !isNaN(padding[3]) ? padding[3] : right
  };
};
var getScrollAncestor = function getScrollAncestor(node) {
  while (node && node !== document.body) {
    var _getComputedStyle = getComputedStyle(node),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    if (/auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)) return node;
    node = node.parentNode;
  }

  return window;
};
var validateIndex = function validateIndex(index, isDisabled, node) {
  if (!isProd && index === undefined && !isDisabled) {
    var error = "[React-Menu] Validate item '" + (node && node.toString()) + "' failed.\nYou're probably creating wrapping components or HOC over MenuItem, SubMenu or FocusableItem.\nTo create wrapping components, see: https://codesandbox.io/s/react-menu-wrapping-q0b59\nTo create HOCs, see: https://codesandbox.io/s/react-menu-hoc-0bipn";
    throw new Error(error);
  }
};

export { applyHOC, applyStatics, attachHandlerProps, batchedUpdates, defineName, floatEqual, getName, getScrollAncestor, getTransition, isMenuOpen, isProd, parsePadding, safeCall, validateIndex, values };
