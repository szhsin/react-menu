import { unstable_batchedUpdates } from 'react-dom';

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
  return transition === true || !!(transition && transition[name]);
};
var safeCall = function safeCall(fn, arg) {
  return typeof fn === 'function' ? fn(arg) : fn;
};
var internalKey = '_szhsinMenu';
var getName = function getName(component) {
  return component[internalKey];
};
var defineName = function defineName(name, component) {
  return Object.defineProperty(component, internalKey, {
    value: name
  });
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
  while (node) {
    node = node.parentNode;
    if (!node || node === document.body) return;

    var _getComputedStyle = getComputedStyle(node),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    if (/auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)) return node;
  }
};
function commonProps(isDisabled, isHovering) {
  return {
    'aria-disabled': isDisabled || undefined,
    tabIndex: isDisabled ? undefined : isHovering ? 0 : -1
  };
}
function indexOfNode(nodeList, node) {
  for (var i = 0; i < nodeList.length; i++) {
    if (nodeList[i] === node) return i;
  }

  return -1;
}

export { attachHandlerProps, batchedUpdates, commonProps, defineName, floatEqual, getName, getScrollAncestor, getTransition, indexOfNode, isMenuOpen, parsePadding, safeCall, values };
