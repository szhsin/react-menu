'use strict';

var react = require('react');
var propTypes = require('prop-types');
var jsxRuntime = require('react/jsx-runtime');
var reactDom = require('react-dom');
var reactTransitionState = require('react-transition-state');

var useBEM = function useBEM(_ref) {
  var block = _ref.block,
    element = _ref.element,
    modifiers = _ref.modifiers,
    className = _ref.className;
  return react.useMemo(function () {
    var blockElement = element ? block + "__" + element : block;
    var classString = blockElement;
    modifiers && Object.keys(modifiers).forEach(function (name) {
      var value = modifiers[name];
      if (value) classString += " " + blockElement + "--" + (value === true ? name : name + "-" + value);
    });
    var expandedClassName = typeof className === 'function' ? className(modifiers) : className;
    if (typeof expandedClassName === 'string') {
      expandedClassName = expandedClassName.trim();
      if (expandedClassName) classString += " " + expandedClassName;
    }
    return classString;
  }, [block, element, modifiers, className]);
};

function setRef(ref, instance) {
  typeof ref === 'function' ? ref(instance) : ref.current = instance;
}
var useCombinedRef = function useCombinedRef(refA, refB) {
  return react.useMemo(function () {
    if (!refA) return refB;
    if (!refB) return refA;
    return function (instance) {
      setRef(refA, instance);
      setRef(refB, instance);
    };
  }, [refA, refB]);
};

var useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? react.useLayoutEffect : react.useEffect;

var menuContainerClass = 'szh-menu-container';
var menuClass = 'szh-menu';
var menuButtonClass = 'szh-menu-button';
var menuArrowClass = 'arrow';
var menuItemClass = 'item';
var menuDividerClass = 'divider';
var menuHeaderClass = 'header';
var menuGroupClass = 'group';
var subMenuClass = 'submenu';
var radioGroupClass = 'radio-group';
var HoverItemContext = /*#__PURE__*/react.createContext();
var MenuListItemContext = /*#__PURE__*/react.createContext({});
var MenuListContext = /*#__PURE__*/react.createContext({});
var EventHandlersContext = /*#__PURE__*/react.createContext({});
var RadioGroupContext = /*#__PURE__*/react.createContext({});
var SettingsContext = /*#__PURE__*/react.createContext({});
var ItemSettingsContext = /*#__PURE__*/react.createContext({});
var Keys = /*#__PURE__*/Object.freeze({
  ENTER: 'Enter',
  ESC: 'Escape',
  SPACE: ' ',
  HOME: 'Home',
  END: 'End',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown'
});
var HoverActionTypes = /*#__PURE__*/Object.freeze({
  RESET: 0,
  SET: 1,
  UNSET: 2,
  INCREASE: 3,
  DECREASE: 4,
  FIRST: 5,
  LAST: 6,
  SET_INDEX: 7
});
var CloseReason = /*#__PURE__*/Object.freeze({
  CLICK: 'click',
  CANCEL: 'cancel',
  BLUR: 'blur',
  SCROLL: 'scroll'
});
var FocusPositions = /*#__PURE__*/Object.freeze({
  FIRST: 'first',
  LAST: 'last'
});
var MenuStateMap = /*#__PURE__*/Object.freeze({
  entering: 'opening',
  entered: 'open',
  exiting: 'closing',
  exited: 'closed'
});

var isMenuOpen = function isMenuOpen(state) {
  return !!state && state[0] === 'o';
};
var batchedUpdates = reactDom.unstable_batchedUpdates || function (callback) {
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
var mergeProps = function mergeProps(target, source) {
  source && Object.keys(source).forEach(function (key) {
    var targetProp = target[key];
    var sourceProp = source[key];
    if (typeof sourceProp === 'function' && targetProp) {
      target[key] = function () {
        sourceProp.apply(void 0, arguments);
        targetProp.apply(void 0, arguments);
      };
    } else {
      target[key] = sourceProp;
    }
  });
  return target;
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
    tabIndex: isHovering ? 0 : -1
  };
}
function indexOfNode(nodeList, node) {
  for (var i = 0; i < nodeList.length; i++) {
    if (nodeList[i] === node) return i;
  }
  return -1;
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var stylePropTypes = function stylePropTypes(name) {
  var _ref;
  return _ref = {}, _ref[name ? name + "ClassName" : 'className'] = propTypes.oneOfType([propTypes.string, propTypes.func]), _ref;
};

var menuPropTypes = /*#__PURE__*/_extends({
  className: propTypes.string
}, /*#__PURE__*/stylePropTypes('menu'), /*#__PURE__*/stylePropTypes('arrow'), {
  menuStyle: propTypes.object,
  arrowStyle: propTypes.object,
  arrow: propTypes.bool,
  setDownOverflow: propTypes.bool,
  offsetX: propTypes.number,
  offsetY: propTypes.number,
  align: /*#__PURE__*/propTypes.oneOf(['start', 'center', 'end']),
  direction: /*#__PURE__*/propTypes.oneOf(['left', 'right', 'top', 'bottom']),
  position: /*#__PURE__*/propTypes.oneOf(['auto', 'anchor', 'initial']),
  overflow: /*#__PURE__*/propTypes.oneOf(['auto', 'visible', 'hidden'])
});

var rootMenuPropTypes = /*#__PURE__*/_extends({}, menuPropTypes, {
  containerProps: propTypes.object,
  initialMounted: propTypes.bool,
  unmountOnClose: propTypes.bool,
  transition: /*#__PURE__*/propTypes.oneOfType([propTypes.bool, /*#__PURE__*/propTypes.exact({
    open: propTypes.bool,
    close: propTypes.bool,
    item: propTypes.bool
  })]),
  transitionTimeout: propTypes.number,
  boundingBoxRef: propTypes.object,
  boundingBoxPadding: propTypes.string,
  reposition: /*#__PURE__*/propTypes.oneOf(['auto', 'initial']),
  repositionFlag: /*#__PURE__*/propTypes.oneOfType([propTypes.string, propTypes.number]),
  viewScroll: /*#__PURE__*/propTypes.oneOf(['auto', 'close', 'initial']),
  submenuOpenDelay: propTypes.number,
  submenuCloseDelay: propTypes.number,
  portal: /*#__PURE__*/propTypes.oneOfType([propTypes.bool, /*#__PURE__*/propTypes.exact({
    target: propTypes.object,
    stablePosition: propTypes.bool
  })]),
  theming: propTypes.string,
  onItemClick: propTypes.func
});

var uncontrolledMenuPropTypes = {
  instanceRef: /*#__PURE__*/propTypes.oneOfType([propTypes.object, propTypes.func]),
  onMenuChange: propTypes.func
};

var withHovering = function withHovering(name, WrappedComponent) {
  var Component = /*#__PURE__*/react.memo(WrappedComponent);
  var WithHovering = /*#__PURE__*/react.forwardRef(function (props, ref) {
    var itemRef = react.useRef(null);
    return /*#__PURE__*/jsxRuntime.jsx(Component, _extends({}, props, {
      itemRef: itemRef,
      externalRef: ref,
      isHovering: react.useContext(HoverItemContext) === itemRef.current
    }));
  });
  WithHovering.displayName = "WithHovering(" + name + ")";
  return WithHovering;
};

var useItems = function useItems(menuRef, focusRef) {
  var _useState = react.useState(),
    hoverItem = _useState[0],
    setHoverItem = _useState[1];
  var stateRef = react.useRef({
    items: [],
    hoverIndex: -1,
    sorted: false
  });
  var mutableState = stateRef.current;
  var updateItems = react.useCallback(function (item, isMounted) {
    var items = mutableState.items;
    if (!item) {
      mutableState.items = [];
    } else if (isMounted) {
      items.push(item);
    } else {
      var index = items.indexOf(item);
      if (index > -1) {
        items.splice(index, 1);
        if (item.contains(document.activeElement)) {
          focusRef.current.focus();
          setHoverItem();
        }
      }
    }
    mutableState.hoverIndex = -1;
    mutableState.sorted = false;
  }, [mutableState, focusRef]);
  var dispatch = react.useCallback(function (actionType, item, nextIndex) {
    var items = mutableState.items,
      hoverIndex = mutableState.hoverIndex;
    var sortItems = function sortItems() {
      if (mutableState.sorted) return;
      var orderedNodes = menuRef.current.querySelectorAll('.szh-menu__item');
      items.sort(function (a, b) {
        return indexOfNode(orderedNodes, a) - indexOfNode(orderedNodes, b);
      });
      mutableState.sorted = true;
    };
    var index = -1,
      newItem = undefined;
    switch (actionType) {
      case HoverActionTypes.RESET:
        break;
      case HoverActionTypes.SET:
        newItem = item;
        break;
      case HoverActionTypes.UNSET:
        newItem = function newItem(prevItem) {
          return prevItem === item ? undefined : prevItem;
        };
        break;
      case HoverActionTypes.FIRST:
        sortItems();
        index = 0;
        newItem = items[index];
        break;
      case HoverActionTypes.LAST:
        sortItems();
        index = items.length - 1;
        newItem = items[index];
        break;
      case HoverActionTypes.SET_INDEX:
        sortItems();
        index = nextIndex;
        newItem = items[index];
        break;
      case HoverActionTypes.INCREASE:
        sortItems();
        index = hoverIndex;
        if (index < 0) index = items.indexOf(item);
        index++;
        if (index >= items.length) index = 0;
        newItem = items[index];
        break;
      case HoverActionTypes.DECREASE:
        sortItems();
        index = hoverIndex;
        if (index < 0) index = items.indexOf(item);
        index--;
        if (index < 0) index = items.length - 1;
        newItem = items[index];
        break;
      default:
        if (process.env.NODE_ENV !== 'production') throw new Error("[React-Menu] Unknown hover action type: " + actionType);
    }
    if (!newItem) index = -1;
    setHoverItem(newItem);
    mutableState.hoverIndex = index;
  }, [menuRef, mutableState]);
  return {
    hoverItem: hoverItem,
    dispatch: dispatch,
    updateItems: updateItems
  };
};

var useItemEffect = function useItemEffect(isDisabled, itemRef, updateItems) {
  useIsomorphicLayoutEffect(function () {
    if (process.env.NODE_ENV !== 'production' && !updateItems) {
      throw new Error("[React-Menu] This menu item or submenu should be rendered under a menu: " + itemRef.current.outerHTML);
    }
    if (isDisabled) return;
    var item = itemRef.current;
    updateItems(item, true);
    return function () {
      updateItems(item);
    };
  }, [isDisabled, itemRef, updateItems]);
};

var useItemState = function useItemState(itemRef, focusRef, isHovering, isDisabled) {
  var _useContext = react.useContext(ItemSettingsContext),
    submenuCloseDelay = _useContext.submenuCloseDelay;
  var _useContext2 = react.useContext(MenuListItemContext),
    isParentOpen = _useContext2.isParentOpen,
    isSubmenuOpen = _useContext2.isSubmenuOpen,
    dispatch = _useContext2.dispatch,
    updateItems = _useContext2.updateItems;
  var timeoutId = react.useRef(0);
  var setHover = function setHover() {
    !isHovering && !isDisabled && dispatch(HoverActionTypes.SET, itemRef.current);
  };
  var unsetHover = function unsetHover() {
    !isDisabled && dispatch(HoverActionTypes.UNSET, itemRef.current);
  };
  var onBlur = function onBlur(e) {
    if (isHovering && !e.currentTarget.contains(e.relatedTarget)) unsetHover();
  };
  var onPointerMove = function onPointerMove() {
    if (isSubmenuOpen) {
      if (!timeoutId.current) timeoutId.current = setTimeout(function () {
        timeoutId.current = 0;
        setHover();
      }, submenuCloseDelay);
    } else {
      setHover();
    }
  };
  var onPointerLeave = function onPointerLeave(_, keepHover) {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = 0;
    }
    !keepHover && unsetHover();
  };
  useItemEffect(isDisabled, itemRef, updateItems);
  react.useEffect(function () {
    return function () {
      return clearTimeout(timeoutId.current);
    };
  }, []);
  react.useEffect(function () {
    if (isHovering && isParentOpen) {
      focusRef.current && focusRef.current.focus();
    }
  }, [focusRef, isHovering, isParentOpen]);
  return {
    setHover: setHover,
    onBlur: onBlur,
    onPointerMove: onPointerMove,
    onPointerLeave: onPointerLeave
  };
};

var useMenuChange = function useMenuChange(onMenuChange, isOpen) {
  var prevOpen = react.useRef(isOpen);
  react.useEffect(function () {
    if (prevOpen.current !== isOpen) safeCall(onMenuChange, {
      open: isOpen
    });
    prevOpen.current = isOpen;
  }, [onMenuChange, isOpen]);
};

var useMenuState = function useMenuState(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    initialOpen = _ref.initialOpen,
    initialMounted = _ref.initialMounted,
    unmountOnClose = _ref.unmountOnClose,
    transition = _ref.transition,
    _ref$transitionTimeou = _ref.transitionTimeout,
    transitionTimeout = _ref$transitionTimeou === void 0 ? 500 : _ref$transitionTimeou;
  var _useTransition = reactTransitionState.useTransition({
      initialEntered: initialOpen,
      mountOnEnter: !initialMounted,
      unmountOnExit: unmountOnClose,
      timeout: transitionTimeout,
      enter: getTransition(transition, 'open'),
      exit: getTransition(transition, 'close')
    }),
    state = _useTransition[0],
    toggleMenu = _useTransition[1],
    endTransition = _useTransition[2];
  return [{
    state: MenuStateMap[state],
    endTransition: endTransition
  }, toggleMenu];
};

var useMenuStateAndFocus = function useMenuStateAndFocus(options) {
  var _useMenuState = useMenuState(options),
    menuProps = _useMenuState[0],
    toggleMenu = _useMenuState[1];
  var _useState = react.useState(),
    menuItemFocus = _useState[0],
    setMenuItemFocus = _useState[1];
  var openMenu = function openMenu(position, alwaysUpdate) {
    setMenuItemFocus({
      position: position,
      alwaysUpdate: alwaysUpdate
    });
    toggleMenu(true);
  };
  return [_extends({
    menuItemFocus: menuItemFocus
  }, menuProps), toggleMenu, openMenu];
};

var _excluded$a = ["className", "isOpen", "disabled", "children"];
var MenuButton = /*#__PURE__*/defineName('MenuButton', /*#__PURE__*/react.forwardRef(function MenuButton(_ref, ref) {
  var className = _ref.className,
    isOpen = _ref.isOpen,
    disabled = _ref.disabled,
    children = _ref.children,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded$a);
  var modifiers = react.useMemo(function () {
    return {
      open: isOpen
    };
  }, [isOpen]);
  return /*#__PURE__*/jsxRuntime.jsx("button", _extends({
    "aria-haspopup": true,
    "aria-expanded": isOpen,
    "aria-disabled": disabled || undefined,
    type: "button",
    disabled: disabled
  }, restProps, {
    ref: ref,
    className: useBEM({
      block: menuButtonClass,
      modifiers: modifiers,
      className: className
    }),
    children: children
  }));
}));
process.env.NODE_ENV !== "production" ? MenuButton.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  isOpen: propTypes.bool,
  disabled: propTypes.bool
}) : void 0;

var MenuContainer = function MenuContainer(_ref) {
  var className = _ref.className,
    containerRef = _ref.containerRef,
    containerProps = _ref.containerProps,
    children = _ref.children,
    isOpen = _ref.isOpen,
    skipOpen = _ref.skipOpen,
    theming = _ref.theming,
    transition = _ref.transition,
    onClose = _ref.onClose;
  var itemTransition = getTransition(transition, 'item');
  var onKeyDown = function onKeyDown(_ref2) {
    var key = _ref2.key;
    switch (key) {
      case Keys.ESC:
        safeCall(onClose, {
          key: key,
          reason: CloseReason.CANCEL
        });
        break;
    }
  };
  var onBlur = function onBlur(e) {
    if (isOpen && !e.currentTarget.contains(e.relatedTarget || document.activeElement)) {
      safeCall(onClose, {
        reason: CloseReason.BLUR
      });

      if (skipOpen) {
        skipOpen.current = true;
        setTimeout(function () {
          return skipOpen.current = false;
        }, 300);
      }
    }
  };
  return /*#__PURE__*/jsxRuntime.jsx("div", _extends({}, mergeProps({
    onKeyDown: onKeyDown,
    onBlur: onBlur
  }, containerProps), {
    className: useBEM({
      block: menuContainerClass,
      modifiers: react.useMemo(function () {
        return {
          theme: theming,
          itemTransition: itemTransition
        };
      }, [theming, itemTransition]),
      className: className
    }),
    style: _extends({
      position: 'absolute'
    }, containerProps == null ? void 0 : containerProps.style),
    ref: containerRef,
    children: children
  }));
};

var getPositionHelpers = function getPositionHelpers(containerRef, menuRef, menuScroll, boundingBoxPadding) {
  var menuRect = menuRef.current.getBoundingClientRect();
  var containerRect = containerRef.current.getBoundingClientRect();
  var boundingRect = menuScroll === window ? {
    left: 0,
    top: 0,
    right: document.documentElement.clientWidth,
    bottom: window.innerHeight
  } : menuScroll.getBoundingClientRect();
  var padding = parsePadding(boundingBoxPadding);

  var getLeftOverflow = function getLeftOverflow(x) {
    return x + containerRect.left - boundingRect.left - padding.left;
  };
  var getRightOverflow = function getRightOverflow(x) {
    return x + containerRect.left + menuRect.width - boundingRect.right + padding.right;
  };
  var getTopOverflow = function getTopOverflow(y) {
    return y + containerRect.top - boundingRect.top - padding.top;
  };
  var getBottomOverflow = function getBottomOverflow(y) {
    return y + containerRect.top + menuRect.height - boundingRect.bottom + padding.bottom;
  };
  var confineHorizontally = function confineHorizontally(x) {
    var leftOverflow = getLeftOverflow(x);
    if (leftOverflow < 0) {
      x -= leftOverflow;
    } else {
      var rightOverflow = getRightOverflow(x);
      if (rightOverflow > 0) {
        x -= rightOverflow;
        leftOverflow = getLeftOverflow(x);
        if (leftOverflow < 0) x -= leftOverflow;
      }
    }
    return x;
  };
  var confineVertically = function confineVertically(y) {
    var topOverflow = getTopOverflow(y);
    if (topOverflow < 0) {
      y -= topOverflow;
    } else {
      var bottomOverflow = getBottomOverflow(y);
      if (bottomOverflow > 0) {
        y -= bottomOverflow;
        topOverflow = getTopOverflow(y);
        if (topOverflow < 0) y -= topOverflow;
      }
    }
    return y;
  };
  return {
    menuRect: menuRect,
    containerRect: containerRect,
    getLeftOverflow: getLeftOverflow,
    getRightOverflow: getRightOverflow,
    getTopOverflow: getTopOverflow,
    getBottomOverflow: getBottomOverflow,
    confineHorizontally: confineHorizontally,
    confineVertically: confineVertically
  };
};

var placeArrowVertical = function placeArrowVertical(_ref) {
  var arrowRef = _ref.arrowRef,
    menuY = _ref.menuY,
    anchorRect = _ref.anchorRect,
    containerRect = _ref.containerRect,
    menuRect = _ref.menuRect;
  var y = anchorRect.top - containerRect.top - menuY + anchorRect.height / 2;
  var offset = arrowRef.current.offsetHeight * 1.25;
  y = Math.max(offset, y);
  y = Math.min(y, menuRect.height - offset);
  return y;
};

var placeLeftorRight = function placeLeftorRight(_ref) {
  var anchorRect = _ref.anchorRect,
    containerRect = _ref.containerRect,
    menuRect = _ref.menuRect,
    placeLeftorRightY = _ref.placeLeftorRightY,
    placeLeftX = _ref.placeLeftX,
    placeRightX = _ref.placeRightX,
    getLeftOverflow = _ref.getLeftOverflow,
    getRightOverflow = _ref.getRightOverflow,
    confineHorizontally = _ref.confineHorizontally,
    confineVertically = _ref.confineVertically,
    arrowRef = _ref.arrowRef,
    arrow = _ref.arrow,
    direction = _ref.direction,
    position = _ref.position;
  var computedDirection = direction;
  var y = placeLeftorRightY;
  if (position !== 'initial') {
    y = confineVertically(y);
    if (position === 'anchor') {
      y = Math.min(y, anchorRect.bottom - containerRect.top);
      y = Math.max(y, anchorRect.top - containerRect.top - menuRect.height);
    }
  }
  var x, leftOverflow, rightOverflow;
  if (computedDirection === 'left') {
    x = placeLeftX;
    if (position !== 'initial') {
      leftOverflow = getLeftOverflow(x);
      if (leftOverflow < 0) {
        rightOverflow = getRightOverflow(placeRightX);
        if (rightOverflow <= 0 || -leftOverflow > rightOverflow) {
          x = placeRightX;
          computedDirection = 'right';
        }
      }
    }
  } else {
    x = placeRightX;
    if (position !== 'initial') {
      rightOverflow = getRightOverflow(x);
      if (rightOverflow > 0) {
        leftOverflow = getLeftOverflow(placeLeftX);
        if (leftOverflow >= 0 || -leftOverflow < rightOverflow) {
          x = placeLeftX;
          computedDirection = 'left';
        }
      }
    }
  }
  if (position === 'auto') x = confineHorizontally(x);
  var arrowY = arrow ? placeArrowVertical({
    menuY: y,
    arrowRef: arrowRef,
    anchorRect: anchorRect,
    containerRect: containerRect,
    menuRect: menuRect
  }) : undefined;
  return {
    arrowY: arrowY,
    x: x,
    y: y,
    computedDirection: computedDirection
  };
};

var placeArrowHorizontal = function placeArrowHorizontal(_ref) {
  var arrowRef = _ref.arrowRef,
    menuX = _ref.menuX,
    anchorRect = _ref.anchorRect,
    containerRect = _ref.containerRect,
    menuRect = _ref.menuRect;
  var x = anchorRect.left - containerRect.left - menuX + anchorRect.width / 2;
  var offset = arrowRef.current.offsetWidth * 1.25;
  x = Math.max(offset, x);
  x = Math.min(x, menuRect.width - offset);
  return x;
};

var placeToporBottom = function placeToporBottom(_ref) {
  var anchorRect = _ref.anchorRect,
    containerRect = _ref.containerRect,
    menuRect = _ref.menuRect,
    placeToporBottomX = _ref.placeToporBottomX,
    placeTopY = _ref.placeTopY,
    placeBottomY = _ref.placeBottomY,
    getTopOverflow = _ref.getTopOverflow,
    getBottomOverflow = _ref.getBottomOverflow,
    confineHorizontally = _ref.confineHorizontally,
    confineVertically = _ref.confineVertically,
    arrowRef = _ref.arrowRef,
    arrow = _ref.arrow,
    direction = _ref.direction,
    position = _ref.position;
  var computedDirection = direction === 'top' ? 'top' : 'bottom';
  var x = placeToporBottomX;
  if (position !== 'initial') {
    x = confineHorizontally(x);
    if (position === 'anchor') {
      x = Math.min(x, anchorRect.right - containerRect.left);
      x = Math.max(x, anchorRect.left - containerRect.left - menuRect.width);
    }
  }
  var y, topOverflow, bottomOverflow;
  if (computedDirection === 'top') {
    y = placeTopY;
    if (position !== 'initial') {
      topOverflow = getTopOverflow(y);
      if (topOverflow < 0) {
        bottomOverflow = getBottomOverflow(placeBottomY);
        if (bottomOverflow <= 0 || -topOverflow > bottomOverflow) {
          y = placeBottomY;
          computedDirection = 'bottom';
        }
      }
    }
  } else {
    y = placeBottomY;
    if (position !== 'initial') {
      bottomOverflow = getBottomOverflow(y);
      if (bottomOverflow > 0) {
        topOverflow = getTopOverflow(placeTopY);
        if (topOverflow >= 0 || -topOverflow < bottomOverflow) {
          y = placeTopY;
          computedDirection = 'top';
        }
      }
    }
  }
  if (position === 'auto') y = confineVertically(y);
  var arrowX = arrow ? placeArrowHorizontal({
    menuX: x,
    arrowRef: arrowRef,
    anchorRect: anchorRect,
    containerRect: containerRect,
    menuRect: menuRect
  }) : undefined;
  return {
    arrowX: arrowX,
    x: x,
    y: y,
    computedDirection: computedDirection
  };
};

var positionMenu = function positionMenu(_ref) {
  var arrow = _ref.arrow,
    align = _ref.align,
    direction = _ref.direction,
    offsetX = _ref.offsetX,
    offsetY = _ref.offsetY,
    position = _ref.position,
    anchorRect = _ref.anchorRect,
    arrowRef = _ref.arrowRef,
    positionHelpers = _ref.positionHelpers;
  var menuRect = positionHelpers.menuRect,
    containerRect = positionHelpers.containerRect;
  var horizontalOffset = offsetX;
  var verticalOffset = offsetY;
  if (arrow) {
    if (direction === 'left' || direction === 'right') {
      horizontalOffset += arrowRef.current.offsetWidth;
    } else {
      verticalOffset += arrowRef.current.offsetHeight;
    }
  }
  var placeLeftX = anchorRect.left - containerRect.left - menuRect.width - horizontalOffset;
  var placeRightX = anchorRect.right - containerRect.left + horizontalOffset;
  var placeTopY = anchorRect.top - containerRect.top - menuRect.height - verticalOffset;
  var placeBottomY = anchorRect.bottom - containerRect.top + verticalOffset;
  var placeToporBottomX, placeLeftorRightY;
  if (align === 'end') {
    placeToporBottomX = anchorRect.right - containerRect.left - menuRect.width;
    placeLeftorRightY = anchorRect.bottom - containerRect.top - menuRect.height;
  } else if (align === 'center') {
    placeToporBottomX = anchorRect.left - containerRect.left - (menuRect.width - anchorRect.width) / 2;
    placeLeftorRightY = anchorRect.top - containerRect.top - (menuRect.height - anchorRect.height) / 2;
  } else {
    placeToporBottomX = anchorRect.left - containerRect.left;
    placeLeftorRightY = anchorRect.top - containerRect.top;
  }
  placeToporBottomX += horizontalOffset;
  placeLeftorRightY += verticalOffset;
  var options = _extends({}, positionHelpers, {
    anchorRect: anchorRect,
    placeLeftX: placeLeftX,
    placeRightX: placeRightX,
    placeLeftorRightY: placeLeftorRightY,
    placeTopY: placeTopY,
    placeBottomY: placeBottomY,
    placeToporBottomX: placeToporBottomX,
    arrowRef: arrowRef,
    arrow: arrow,
    direction: direction,
    position: position
  });
  switch (direction) {
    case 'left':
    case 'right':
      return placeLeftorRight(options);
    case 'top':
    case 'bottom':
    default:
      return placeToporBottom(options);
  }
};

var _excluded$9 = ["ariaLabel", "menuClassName", "menuStyle", "arrowClassName", "arrowStyle", "anchorPoint", "anchorRef", "containerRef", "containerProps", "externalRef", "parentScrollingRef", "arrow", "align", "direction", "position", "overflow", "setDownOverflow", "repositionFlag", "captureFocus", "state", "endTransition", "isDisabled", "menuItemFocus", "offsetX", "offsetY", "children", "onClose"];
var MenuList = function MenuList(_ref) {
  var ariaLabel = _ref.ariaLabel,
    menuClassName = _ref.menuClassName,
    menuStyle = _ref.menuStyle,
    arrowClassName = _ref.arrowClassName,
    arrowStyle = _ref.arrowStyle,
    anchorPoint = _ref.anchorPoint,
    anchorRef = _ref.anchorRef,
    containerRef = _ref.containerRef,
    containerProps = _ref.containerProps,
    externalRef = _ref.externalRef,
    parentScrollingRef = _ref.parentScrollingRef,
    arrow = _ref.arrow,
    _ref$align = _ref.align,
    align = _ref$align === void 0 ? 'start' : _ref$align,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'bottom' : _ref$direction,
    _ref$position = _ref.position,
    position = _ref$position === void 0 ? 'auto' : _ref$position,
    _ref$overflow = _ref.overflow,
    overflow = _ref$overflow === void 0 ? 'visible' : _ref$overflow,
    setDownOverflow = _ref.setDownOverflow,
    repositionFlag = _ref.repositionFlag,
    _ref$captureFocus = _ref.captureFocus,
    captureFocus = _ref$captureFocus === void 0 ? true : _ref$captureFocus,
    state = _ref.state,
    endTransition = _ref.endTransition,
    isDisabled = _ref.isDisabled,
    menuItemFocus = _ref.menuItemFocus,
    _ref$offsetX = _ref.offsetX,
    offsetX = _ref$offsetX === void 0 ? 0 : _ref$offsetX,
    _ref$offsetY = _ref.offsetY,
    offsetY = _ref$offsetY === void 0 ? 0 : _ref$offsetY,
    children = _ref.children,
    onClose = _ref.onClose,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded$9);
  var _useState = react.useState({
      x: 0,
      y: 0
    }),
    menuPosition = _useState[0],
    setMenuPosition = _useState[1];
  var _useState2 = react.useState({}),
    arrowPosition = _useState2[0],
    setArrowPosition = _useState2[1];
  var _useState3 = react.useState(),
    overflowData = _useState3[0],
    setOverflowData = _useState3[1];
  var _useState4 = react.useState(direction),
    expandedDirection = _useState4[0],
    setExpandedDirection = _useState4[1];
  var _useState5 = react.useState(0),
    openSubmenuCount = _useState5[0],
    setOpenSubmenuCount = _useState5[1];
  var _useReducer = react.useReducer(function (c) {
      return c + 1;
    }, 1),
    reposSubmenu = _useReducer[0],
    forceReposSubmenu = _useReducer[1];
  var _useContext = react.useContext(SettingsContext),
    transition = _useContext.transition,
    boundingBoxRef = _useContext.boundingBoxRef,
    boundingBoxPadding = _useContext.boundingBoxPadding,
    rootMenuRef = _useContext.rootMenuRef,
    rootAnchorRef = _useContext.rootAnchorRef,
    scrollNodesRef = _useContext.scrollNodesRef,
    reposition = _useContext.reposition,
    viewScroll = _useContext.viewScroll;
  var reposFlag = react.useContext(MenuListContext).reposSubmenu || repositionFlag;
  var menuRef = react.useRef(null);
  var focusRef = react.useRef();
  var arrowRef = react.useRef();
  var prevOpen = react.useRef(false);
  var latestMenuSize = react.useRef({
    width: 0,
    height: 0
  });
  var latestHandlePosition = react.useRef(function () {});
  var _useItems = useItems(menuRef, focusRef),
    hoverItem = _useItems.hoverItem,
    dispatch = _useItems.dispatch,
    updateItems = _useItems.updateItems;
  var isOpen = isMenuOpen(state);
  var openTransition = getTransition(transition, 'open');
  var closeTransition = getTransition(transition, 'close');
  var scrollNodes = scrollNodesRef.current;
  var onKeyDown = function onKeyDown(e) {
    switch (e.key) {
      case Keys.HOME:
        dispatch(HoverActionTypes.FIRST);
        break;
      case Keys.END:
        dispatch(HoverActionTypes.LAST);
        break;
      case Keys.UP:
        dispatch(HoverActionTypes.DECREASE, hoverItem);
        break;
      case Keys.DOWN:
        dispatch(HoverActionTypes.INCREASE, hoverItem);
        break;

      case Keys.SPACE:
        if (e.target && e.target.className.indexOf(menuClass) !== -1) {
          e.preventDefault();
        }
        return;
      default:
        return;
    }
    e.preventDefault();
    e.stopPropagation();
  };
  var onAnimationEnd = function onAnimationEnd() {
    if (state === 'closing') {
      setOverflowData();
    }

    safeCall(endTransition);
  };
  var handlePosition = react.useCallback(function (noOverflowCheck) {
    var _anchorRef$current;
    var anchorRect = anchorRef ? (_anchorRef$current = anchorRef.current) == null ? void 0 : _anchorRef$current.getBoundingClientRect() : anchorPoint ? {
      left: anchorPoint.x,
      right: anchorPoint.x,
      top: anchorPoint.y,
      bottom: anchorPoint.y,
      width: 0,
      height: 0
    } : null;
    if (!anchorRect) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[React-Menu] Menu might not be positioned properly as one of the anchorRef or anchorPoint prop should be provided. If `anchorRef` is provided, the anchor must be mounted before menu is open.');
      }
      return;
    }
    if (!scrollNodes.menu) {
      scrollNodes.menu = (boundingBoxRef ? boundingBoxRef.current : getScrollAncestor(rootMenuRef.current)) || window;
    }

    var positionHelpers = getPositionHelpers(containerRef, menuRef, scrollNodes.menu, boundingBoxPadding);
    var _positionMenu = positionMenu({
        arrow: arrow,
        align: align,
        direction: direction,
        offsetX: offsetX,
        offsetY: offsetY,
        position: position,
        anchorRect: anchorRect,
        arrowRef: arrowRef,
        positionHelpers: positionHelpers
      }),
      arrowX = _positionMenu.arrowX,
      arrowY = _positionMenu.arrowY,
      x = _positionMenu.x,
      y = _positionMenu.y,
      computedDirection = _positionMenu.computedDirection;
    var menuRect = positionHelpers.menuRect;
    var menuHeight = menuRect.height;
    if (!noOverflowCheck && overflow !== 'visible') {
      var getTopOverflow = positionHelpers.getTopOverflow,
        getBottomOverflow = positionHelpers.getBottomOverflow;
      var height, _overflowAmt;
      var prevHeight = latestMenuSize.current.height;
      var bottomOverflow = getBottomOverflow(y);
      if (bottomOverflow > 0 || floatEqual(bottomOverflow, 0) && floatEqual(menuHeight, prevHeight)) {
        height = menuHeight - bottomOverflow;
        _overflowAmt = bottomOverflow;
      } else {
        var topOverflow = getTopOverflow(y);
        if (topOverflow < 0 || floatEqual(topOverflow, 0) && floatEqual(menuHeight, prevHeight)) {
          height = menuHeight + topOverflow;
          _overflowAmt = 0 - topOverflow;
          if (height >= 0) y -= topOverflow;
        }
      }
      if (height >= 0) {
        menuHeight = height;
        setOverflowData({
          height: height,
          overflowAmt: _overflowAmt
        });
      } else {
        setOverflowData();
      }
    }
    if (arrow) setArrowPosition({
      x: arrowX,
      y: arrowY
    });
    setMenuPosition({
      x: x,
      y: y
    });
    setExpandedDirection(computedDirection);
    latestMenuSize.current = {
      width: menuRect.width,
      height: menuHeight
    };
  }, [arrow, align, boundingBoxPadding, direction, offsetX, offsetY, position, overflow, anchorPoint, anchorRef, containerRef, boundingBoxRef, rootMenuRef, scrollNodes]);
  useIsomorphicLayoutEffect(function () {
    if (isOpen) {
      handlePosition();
      if (prevOpen.current) forceReposSubmenu();
    }
    prevOpen.current = isOpen;
    latestHandlePosition.current = handlePosition;
  }, [isOpen, handlePosition, reposFlag]);
  useIsomorphicLayoutEffect(function () {
    if (overflowData && !setDownOverflow) menuRef.current.scrollTop = 0;
  }, [overflowData, setDownOverflow]);
  useIsomorphicLayoutEffect(function () {
    return updateItems;
  }, [updateItems]);
  react.useEffect(function () {
    var menuScroll = scrollNodes.menu;
    if (!isOpen || !menuScroll) return;
    menuScroll = menuScroll.addEventListener ? menuScroll : window;
    if (!scrollNodes.anchors) {
      scrollNodes.anchors = [];
      var anchorScroll = getScrollAncestor(rootAnchorRef && rootAnchorRef.current);
      while (anchorScroll && anchorScroll !== menuScroll) {
        scrollNodes.anchors.push(anchorScroll);
        anchorScroll = getScrollAncestor(anchorScroll);
      }
    }
    var scroll = viewScroll;
    if (scrollNodes.anchors.length && scroll === 'initial') scroll = 'auto';
    if (scroll === 'initial') return;
    var handleScroll = function handleScroll() {
      if (scroll === 'auto') {
        batchedUpdates(function () {
          return handlePosition(true);
        });
      } else {
        safeCall(onClose, {
          reason: CloseReason.SCROLL
        });
      }
    };
    var scrollObservers = scrollNodes.anchors.concat(viewScroll !== 'initial' ? menuScroll : []);
    scrollObservers.forEach(function (o) {
      return o.addEventListener('scroll', handleScroll);
    });
    return function () {
      return scrollObservers.forEach(function (o) {
        return o.removeEventListener('scroll', handleScroll);
      });
    };
  }, [rootAnchorRef, scrollNodes, isOpen, onClose, viewScroll, handlePosition]);
  var hasOverflow = !!overflowData && overflowData.overflowAmt > 0;
  react.useEffect(function () {
    if (hasOverflow || !isOpen || !parentScrollingRef) return;
    var handleScroll = function handleScroll() {
      return batchedUpdates(handlePosition);
    };
    var parentScroll = parentScrollingRef.current;
    parentScroll.addEventListener('scroll', handleScroll);
    return function () {
      return parentScroll.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, hasOverflow, parentScrollingRef, handlePosition]);
  react.useEffect(function () {
    if (typeof ResizeObserver !== 'function' || reposition === 'initial') return;
    var resizeObserver = new ResizeObserver(function (_ref2) {
      var entry = _ref2[0];
      var borderBoxSize = entry.borderBoxSize,
        target = entry.target;
      var width, height;
      if (borderBoxSize) {
        var _ref3 = borderBoxSize[0] || borderBoxSize,
          inlineSize = _ref3.inlineSize,
          blockSize = _ref3.blockSize;
        width = inlineSize;
        height = blockSize;
      } else {
        var borderRect = target.getBoundingClientRect();
        width = borderRect.width;
        height = borderRect.height;
      }
      if (width === 0 || height === 0) return;
      if (floatEqual(width, latestMenuSize.current.width, 1) && floatEqual(height, latestMenuSize.current.height, 1)) return;
      reactDom.flushSync(function () {
        latestHandlePosition.current();
        forceReposSubmenu();
      });
    });
    var observeTarget = menuRef.current;
    resizeObserver.observe(observeTarget, {
      box: 'border-box'
    });
    return function () {
      return resizeObserver.unobserve(observeTarget);
    };
  }, [reposition]);
  react.useEffect(function () {
    if (!isOpen) {
      dispatch(HoverActionTypes.RESET);
      if (!closeTransition) setOverflowData();
      return;
    }
    var _ref4 = menuItemFocus || {},
      position = _ref4.position,
      alwaysUpdate = _ref4.alwaysUpdate;
    var setItemFocus = function setItemFocus() {
      if (position === FocusPositions.FIRST) {
        dispatch(HoverActionTypes.FIRST);
      } else if (position === FocusPositions.LAST) {
        dispatch(HoverActionTypes.LAST);
      } else if (position >= -1) {
        dispatch(HoverActionTypes.SET_INDEX, undefined, position);
      }
    };
    if (alwaysUpdate) {
      setItemFocus();
    } else if (captureFocus) {
      var id = setTimeout(function () {
        if (!menuRef.current.contains(document.activeElement)) {
          focusRef.current.focus();
          setItemFocus();
        }
      }, openTransition ? 170 : 100);
      return function () {
        return clearTimeout(id);
      };
    }
  }, [isOpen, openTransition, closeTransition, captureFocus, menuItemFocus, dispatch]);
  var isSubmenuOpen = openSubmenuCount > 0;
  var itemContext = react.useMemo(function () {
    return {
      isParentOpen: isOpen,
      isSubmenuOpen: isSubmenuOpen,
      setOpenSubmenuCount: setOpenSubmenuCount,
      dispatch: dispatch,
      updateItems: updateItems
    };
  }, [isOpen, isSubmenuOpen, dispatch, updateItems]);
  var maxHeight, overflowAmt;
  if (overflowData) {
    setDownOverflow ? overflowAmt = overflowData.overflowAmt : maxHeight = overflowData.height;
  }
  var listContext = react.useMemo(function () {
    return {
      reposSubmenu: reposSubmenu,
      overflow: overflow,
      overflowAmt: overflowAmt,
      parentMenuRef: menuRef,
      parentDir: expandedDirection
    };
  }, [reposSubmenu, overflow, overflowAmt, expandedDirection]);
  var overflowStyle = maxHeight >= 0 ? {
    maxHeight: maxHeight,
    overflow: overflow
  } : undefined;
  var modifiers = react.useMemo(function () {
    return {
      state: state,
      dir: expandedDirection
    };
  }, [state, expandedDirection]);
  var arrowModifiers = react.useMemo(function () {
    return {
      dir: expandedDirection
    };
  }, [expandedDirection]);
  var _arrowClass = useBEM({
    block: menuClass,
    element: menuArrowClass,
    modifiers: arrowModifiers,
    className: arrowClassName
  });
  var menu = /*#__PURE__*/jsxRuntime.jsxs("ul", _extends({
    role: "menu",
    "aria-label": ariaLabel
  }, mergeProps({
    onKeyDown: onKeyDown,
    onAnimationEnd: onAnimationEnd
  }, restProps), commonProps(isDisabled), {
    ref: useCombinedRef(externalRef, menuRef),
    className: useBEM({
      block: menuClass,
      modifiers: modifiers,
      className: menuClassName
    }),
    style: _extends({}, menuStyle, overflowStyle, {
      margin: 0,
      display: state === 'closed' ? 'none' : undefined,
      position: 'absolute',
      left: menuPosition.x,
      top: menuPosition.y
    }),
    children: [/*#__PURE__*/jsxRuntime.jsx("div", {
      ref: focusRef,
      tabIndex: -1,
      style: {
        position: 'absolute',
        left: 0,
        top: 0
      }
    }), arrow && /*#__PURE__*/jsxRuntime.jsx("div", {
      className: _arrowClass,
      style: _extends({}, arrowStyle, {
        position: 'absolute',
        left: arrowPosition.x,
        top: arrowPosition.y
      }),
      ref: arrowRef
    }), /*#__PURE__*/jsxRuntime.jsx(MenuListContext.Provider, {
      value: listContext,
      children: /*#__PURE__*/jsxRuntime.jsx(MenuListItemContext.Provider, {
        value: itemContext,
        children: /*#__PURE__*/jsxRuntime.jsx(HoverItemContext.Provider, {
          value: hoverItem,
          children: children
        })
      })
    })]
  }));
  return containerProps ? /*#__PURE__*/jsxRuntime.jsx(MenuContainer, _extends({}, containerProps, {
    isOpen: isOpen,
    children: menu
  })) : menu;
};

var _excluded$8 = ["aria-label", "className", "containerProps", "initialMounted", "unmountOnClose", "transition", "transitionTimeout", "boundingBoxRef", "boundingBoxPadding", "reposition", "submenuOpenDelay", "submenuCloseDelay", "skipOpen", "viewScroll", "portal", "theming", "onItemClick"];
var ControlledMenu = /*#__PURE__*/react.forwardRef(function ControlledMenu(_ref, externalRef) {
  var ariaLabel = _ref['aria-label'],
    className = _ref.className,
    containerProps = _ref.containerProps,
    initialMounted = _ref.initialMounted,
    unmountOnClose = _ref.unmountOnClose,
    transition = _ref.transition,
    transitionTimeout = _ref.transitionTimeout,
    boundingBoxRef = _ref.boundingBoxRef,
    boundingBoxPadding = _ref.boundingBoxPadding,
    _ref$reposition = _ref.reposition,
    reposition = _ref$reposition === void 0 ? 'auto' : _ref$reposition,
    _ref$submenuOpenDelay = _ref.submenuOpenDelay,
    submenuOpenDelay = _ref$submenuOpenDelay === void 0 ? 300 : _ref$submenuOpenDelay,
    _ref$submenuCloseDela = _ref.submenuCloseDelay,
    submenuCloseDelay = _ref$submenuCloseDela === void 0 ? 150 : _ref$submenuCloseDela,
    skipOpen = _ref.skipOpen,
    _ref$viewScroll = _ref.viewScroll,
    viewScroll = _ref$viewScroll === void 0 ? 'initial' : _ref$viewScroll,
    portal = _ref.portal,
    theming = _ref.theming,
    onItemClick = _ref.onItemClick,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded$8);
  var containerRef = react.useRef(null);
  var scrollNodesRef = react.useRef({});
  var anchorRef = restProps.anchorRef,
    state = restProps.state,
    onClose = restProps.onClose;
  var settings = react.useMemo(function () {
    return {
      initialMounted: initialMounted,
      unmountOnClose: unmountOnClose,
      transition: transition,
      transitionTimeout: transitionTimeout,
      boundingBoxRef: boundingBoxRef,
      boundingBoxPadding: boundingBoxPadding,
      rootMenuRef: containerRef,
      rootAnchorRef: anchorRef,
      scrollNodesRef: scrollNodesRef,
      reposition: reposition,
      viewScroll: viewScroll
    };
  }, [initialMounted, unmountOnClose, transition, transitionTimeout, anchorRef, boundingBoxRef, boundingBoxPadding, reposition, viewScroll]);
  var itemSettings = react.useMemo(function () {
    return {
      submenuOpenDelay: submenuOpenDelay,
      submenuCloseDelay: submenuCloseDelay
    };
  }, [submenuOpenDelay, submenuCloseDelay]);
  var eventHandlers = react.useMemo(function () {
    return {
      handleClick: function handleClick(event, isCheckorRadio) {
        if (!event.stopPropagation) safeCall(onItemClick, event);
        var keepOpen = event.keepOpen;
        if (keepOpen === undefined) {
          keepOpen = isCheckorRadio && event.key === Keys.SPACE;
        }
        if (!keepOpen) {
          safeCall(onClose, {
            value: event.value,
            key: event.key,
            reason: CloseReason.CLICK
          });
        }
      },
      handleClose: function handleClose(key) {
        safeCall(onClose, {
          key: key,
          reason: CloseReason.CLICK
        });
      }
    };
  }, [onItemClick, onClose]);
  if (!state) return null;
  var menuList = /*#__PURE__*/jsxRuntime.jsx(SettingsContext.Provider, {
    value: settings,
    children: /*#__PURE__*/jsxRuntime.jsx(ItemSettingsContext.Provider, {
      value: itemSettings,
      children: /*#__PURE__*/jsxRuntime.jsx(EventHandlersContext.Provider, {
        value: eventHandlers,
        children: /*#__PURE__*/jsxRuntime.jsx(MenuList, _extends({}, restProps, {
          ariaLabel: ariaLabel || 'Menu',
          externalRef: externalRef,
          containerRef: containerRef,
          containerProps: {
            className: className,
            containerRef: containerRef,
            containerProps: containerProps,
            skipOpen: skipOpen,
            theming: theming,
            transition: transition,
            onClose: onClose
          }
        }))
      })
    })
  });
  if (portal === true && typeof document !== 'undefined') {
    return /*#__PURE__*/reactDom.createPortal(menuList, document.body);
  } else if (portal) {
    return portal.target ? /*#__PURE__*/reactDom.createPortal(menuList, portal.target) : portal.stablePosition ? null : menuList;
  }
  return menuList;
});
process.env.NODE_ENV !== "production" ? ControlledMenu.propTypes = /*#__PURE__*/_extends({}, rootMenuPropTypes, {
  state: /*#__PURE__*/propTypes.oneOf( /*#__PURE__*/values(MenuStateMap)),
  anchorPoint: /*#__PURE__*/propTypes.exact({
    x: propTypes.number,
    y: propTypes.number
  }),
  anchorRef: propTypes.object,
  skipOpen: propTypes.object,
  captureFocus: propTypes.bool,
  menuItemFocus: /*#__PURE__*/propTypes.exact({
    position: /*#__PURE__*/propTypes.oneOfType([propTypes.string, propTypes.number]),
    alwaysUpdate: propTypes.bool
  }),
  onClose: propTypes.func
}) : void 0;

var _excluded$7 = ["aria-label", "captureFocus", "initialOpen", "menuButton", "instanceRef", "onMenuChange"];
var Menu = /*#__PURE__*/react.forwardRef(function Menu(_ref, externalRef) {
  var ariaLabel = _ref['aria-label'],
    menuButton = _ref.menuButton,
    instanceRef = _ref.instanceRef,
    onMenuChange = _ref.onMenuChange,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded$7);
  var _useMenuStateAndFocus = useMenuStateAndFocus(restProps),
    stateProps = _useMenuStateAndFocus[0],
    toggleMenu = _useMenuStateAndFocus[1],
    openMenu = _useMenuStateAndFocus[2];
  var isOpen = isMenuOpen(stateProps.state);
  var skipOpen = react.useRef(false);
  var buttonRef = react.useRef(null);
  var handleClose = react.useCallback(function (e) {
    toggleMenu(false);
    if (e.key) buttonRef.current.focus();
  }, [toggleMenu]);
  var onClick = function onClick(e) {
    if (skipOpen.current) return;
    openMenu(e.detail === 0 ? FocusPositions.FIRST : undefined);
  };
  var onKeyDown = function onKeyDown(e) {
    switch (e.key) {
      case Keys.UP:
        openMenu(FocusPositions.LAST);
        break;
      case Keys.DOWN:
        openMenu(FocusPositions.FIRST);
        break;
      default:
        return;
    }
    e.preventDefault();
  };
  var button = safeCall(menuButton, {
    open: isOpen
  });
  if (!button || !button.type) throw new Error('Menu requires a menuButton prop.');
  var buttonProps = _extends({
    ref: useCombinedRef(button.ref, buttonRef)
  }, mergeProps({
    onClick: onClick,
    onKeyDown: onKeyDown
  }, button.props));
  if (getName(button.type) === 'MenuButton') {
    buttonProps.isOpen = isOpen;
  }
  var renderButton = /*#__PURE__*/react.cloneElement(button, buttonProps);
  useMenuChange(onMenuChange, isOpen);
  react.useImperativeHandle(instanceRef, function () {
    return {
      openMenu: openMenu,
      closeMenu: function closeMenu() {
        return toggleMenu(false);
      }
    };
  });
  return /*#__PURE__*/jsxRuntime.jsxs(react.Fragment, {
    children: [renderButton, /*#__PURE__*/jsxRuntime.jsx(ControlledMenu, _extends({}, restProps, stateProps, {
      "aria-label": ariaLabel || (typeof button.props.children === 'string' ? button.props.children : 'Menu'),
      anchorRef: buttonRef,
      ref: externalRef,
      onClose: handleClose,
      skipOpen: skipOpen
    }))]
  });
});
process.env.NODE_ENV !== "production" ? Menu.propTypes = /*#__PURE__*/_extends({}, rootMenuPropTypes, uncontrolledMenuPropTypes, {
  menuButton: propTypes.oneOfType([propTypes.element, propTypes.func]).isRequired
}) : void 0;

var _excluded$6 = ["aria-label", "className", "disabled", "direction", "label", "openTrigger", "onMenuChange", "isHovering", "instanceRef", "itemRef", "captureFocus", "repositionFlag", "itemProps"],
  _excluded2$2 = ["ref", "className"];
var SubMenu = /*#__PURE__*/withHovering('SubMenu', function SubMenu(_ref) {
  var ariaLabel = _ref['aria-label'],
    className = _ref.className,
    disabled = _ref.disabled,
    direction = _ref.direction,
    label = _ref.label,
    openTrigger = _ref.openTrigger,
    onMenuChange = _ref.onMenuChange,
    isHovering = _ref.isHovering,
    instanceRef = _ref.instanceRef,
    itemRef = _ref.itemRef,
    _ref$itemProps = _ref.itemProps,
    itemProps = _ref$itemProps === void 0 ? {} : _ref$itemProps,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded$6);
  var settings = react.useContext(SettingsContext);
  var rootMenuRef = settings.rootMenuRef;
  var _useContext = react.useContext(ItemSettingsContext),
    submenuOpenDelay = _useContext.submenuOpenDelay,
    submenuCloseDelay = _useContext.submenuCloseDelay;
  var _useContext2 = react.useContext(MenuListContext),
    parentMenuRef = _useContext2.parentMenuRef,
    parentDir = _useContext2.parentDir,
    parentOverflow = _useContext2.overflow;
  var _useContext3 = react.useContext(MenuListItemContext),
    isParentOpen = _useContext3.isParentOpen,
    isSubmenuOpen = _useContext3.isSubmenuOpen,
    setOpenSubmenuCount = _useContext3.setOpenSubmenuCount,
    dispatch = _useContext3.dispatch,
    updateItems = _useContext3.updateItems;
  var isPortal = parentOverflow !== 'visible';
  var _useMenuStateAndFocus = useMenuStateAndFocus(settings),
    stateProps = _useMenuStateAndFocus[0],
    toggleMenu = _useMenuStateAndFocus[1],
    _openMenu = _useMenuStateAndFocus[2];
  var state = stateProps.state;
  var isDisabled = !!disabled;
  var isOpen = isMenuOpen(state);
  var containerRef = react.useRef(null);
  var timeoutId = react.useRef(0);
  var stopTimer = function stopTimer() {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = 0;
    }
  };
  var _openMenu2 = function openMenu() {
    stopTimer();
    setHover();
    !isDisabled && _openMenu.apply(void 0, arguments);
  };
  var setHover = function setHover() {
    return !isHovering && !isDisabled && dispatch(HoverActionTypes.SET, itemRef.current);
  };
  var delayOpen = function delayOpen(delay) {
    setHover();
    if (!openTrigger) timeoutId.current = setTimeout(function () {
      return batchedUpdates(_openMenu2);
    }, Math.max(delay, 0));
  };
  var handlePointerMove = function handlePointerMove() {
    if (timeoutId.current || isOpen || isDisabled) return;
    if (isSubmenuOpen) {
      timeoutId.current = setTimeout(function () {
        return delayOpen(submenuOpenDelay - submenuCloseDelay);
      }, submenuCloseDelay);
    } else {
      delayOpen(submenuOpenDelay);
    }
  };
  var handlePointerLeave = function handlePointerLeave() {
    stopTimer();
    if (!isOpen) dispatch(HoverActionTypes.UNSET, itemRef.current);
  };
  var handleKeyDown = function handleKeyDown(e) {
    var handled = false;
    switch (e.key) {
      case Keys.LEFT:
        if (isOpen) {
          itemRef.current.focus();
          toggleMenu(false);
          handled = true;
        }
        break;

      case Keys.RIGHT:
        if (!isOpen) handled = true;
        break;
    }
    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  var handleItemKeyDown = function handleItemKeyDown(e) {
    if (!isHovering) return;
    switch (e.key) {
      case Keys.ENTER:
      case Keys.SPACE:
      case Keys.RIGHT:
        openTrigger !== 'none' && _openMenu2(FocusPositions.FIRST);
        break;
    }
  };
  useItemEffect(isDisabled, itemRef, updateItems);
  useMenuChange(onMenuChange, isOpen);
  react.useEffect(function () {
    return function () {
      return clearTimeout(timeoutId.current);
    };
  }, []);
  react.useEffect(function () {
    if (isHovering && isParentOpen) {
      itemRef.current.focus();
    } else {
      toggleMenu(false);
    }
  }, [isHovering, isParentOpen, toggleMenu, itemRef]);
  react.useEffect(function () {
    setOpenSubmenuCount(function (count) {
      return isOpen ? count + 1 : Math.max(count - 1, 0);
    });
  }, [setOpenSubmenuCount, isOpen]);
  react.useImperativeHandle(instanceRef, function () {
    return {
      openMenu: function openMenu() {
        isParentOpen && _openMenu2.apply(void 0, arguments);
      },
      closeMenu: function closeMenu() {
        if (isOpen) {
          itemRef.current.focus();
          toggleMenu(false);
        }
      }
    };
  });
  var modifiers = react.useMemo(function () {
    return {
      open: isOpen,
      hover: isHovering,
      disabled: isDisabled,
      submenu: true
    };
  }, [isOpen, isHovering, isDisabled]);
  var externalItemRef = itemProps.ref,
    itemClassName = itemProps.className,
    restItemProps = _objectWithoutPropertiesLoose(itemProps, _excluded2$2);
  var mergedItemProps = mergeProps({
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    onKeyDown: handleItemKeyDown,
    onClick: function onClick() {
      return openTrigger !== 'none' && _openMenu2();
    }
  }, restItemProps);
  var getMenuList = function getMenuList() {
    var menuList = /*#__PURE__*/jsxRuntime.jsx(MenuList, _extends({}, restProps, stateProps, {
      ariaLabel: ariaLabel || (typeof label === 'string' ? label : 'Submenu'),
      anchorRef: itemRef,
      containerRef: isPortal ? rootMenuRef : containerRef,
      direction: direction || (parentDir === 'right' || parentDir === 'left' ? parentDir : 'right'),
      parentScrollingRef: isPortal && parentMenuRef,
      isDisabled: isDisabled
    }));
    var container = rootMenuRef.current;
    return isPortal && container ? /*#__PURE__*/reactDom.createPortal(menuList, container) : menuList;
  };
  return /*#__PURE__*/jsxRuntime.jsxs("li", {
    className: useBEM({
      block: menuClass,
      element: subMenuClass,
      className: className
    }),
    style: {
      position: 'relative'
    },
    role: "presentation",
    ref: containerRef,
    onKeyDown: handleKeyDown,
    children: [/*#__PURE__*/jsxRuntime.jsx("div", _extends({
      role: "menuitem",
      "aria-haspopup": true,
      "aria-expanded": isOpen
    }, mergedItemProps, commonProps(isDisabled, isHovering), {
      ref: useCombinedRef(externalItemRef, itemRef),
      className: useBEM({
        block: menuClass,
        element: menuItemClass,
        modifiers: modifiers,
        className: itemClassName
      }),
      children: react.useMemo(function () {
        return safeCall(label, modifiers);
      }, [label, modifiers])
    })), state && getMenuList()]
  });
});
process.env.NODE_ENV !== "production" ? SubMenu.propTypes = /*#__PURE__*/_extends({}, menuPropTypes, uncontrolledMenuPropTypes, {
  disabled: propTypes.bool,
  openTrigger: /*#__PURE__*/propTypes.oneOf(['none', 'clickOnly']),
  label: /*#__PURE__*/propTypes.oneOfType([propTypes.node, propTypes.func]),
  itemProps: /*#__PURE__*/propTypes.shape( /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes()))
}) : void 0;

var _excluded$5 = ["className", "value", "href", "type", "checked", "disabled", "children", "onClick", "isHovering", "itemRef", "externalRef"],
  _excluded2$1 = ["setHover"];
var MenuItem = /*#__PURE__*/withHovering('MenuItem', function MenuItem(_ref) {
  var className = _ref.className,
    value = _ref.value,
    href = _ref.href,
    type = _ref.type,
    checked = _ref.checked,
    disabled = _ref.disabled,
    children = _ref.children,
    onClick = _ref.onClick,
    isHovering = _ref.isHovering,
    itemRef = _ref.itemRef,
    externalRef = _ref.externalRef,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded$5);
  var isDisabled = !!disabled;
  var _useItemState = useItemState(itemRef, itemRef, isHovering, isDisabled),
    setHover = _useItemState.setHover,
    restStateProps = _objectWithoutPropertiesLoose(_useItemState, _excluded2$1);
  var eventHandlers = react.useContext(EventHandlersContext);
  var radioGroup = react.useContext(RadioGroupContext);
  var isRadio = type === 'radio';
  var isCheckBox = type === 'checkbox';
  var isAnchor = !!href && !isDisabled && !isRadio && !isCheckBox;
  var isChecked = isRadio ? radioGroup.value === value : isCheckBox ? !!checked : false;
  var handleClick = function handleClick(e) {
    if (isDisabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    var event = {
      value: value,
      syntheticEvent: e
    };
    if (e.key !== undefined) event.key = e.key;
    if (isCheckBox) event.checked = !isChecked;
    if (isRadio) event.name = radioGroup.name;
    safeCall(onClick, event);
    if (isRadio) safeCall(radioGroup.onRadioChange, event);
    eventHandlers.handleClick(event, isCheckBox || isRadio);
  };
  var handleKeyDown = function handleKeyDown(e) {
    if (!isHovering) return;
    switch (e.key) {
      case Keys.ENTER:
      case Keys.SPACE:
        if (isAnchor) {
          itemRef.current.click();
        } else {
          handleClick(e);
        }
        break;
    }
  };
  var modifiers = react.useMemo(function () {
    return {
      type: type,
      disabled: isDisabled,
      hover: isHovering,
      checked: isChecked,
      anchor: isAnchor
    };
  }, [type, isDisabled, isHovering, isChecked, isAnchor]);
  var mergedProps = mergeProps(_extends({}, restStateProps, {
    onPointerDown: setHover,
    onKeyDown: handleKeyDown,
    onClick: handleClick
  }), restProps);

  var menuItemProps = _extends({
    role: isRadio ? 'menuitemradio' : isCheckBox ? 'menuitemcheckbox' : 'menuitem',
    'aria-checked': isRadio || isCheckBox ? isChecked : undefined
  }, mergedProps, commonProps(isDisabled, isHovering), {
    ref: useCombinedRef(externalRef, itemRef),
    className: useBEM({
      block: menuClass,
      element: menuItemClass,
      modifiers: modifiers,
      className: className
    }),
    children: react.useMemo(function () {
      return safeCall(children, modifiers);
    }, [children, modifiers])
  });
  if (isAnchor) {
    return /*#__PURE__*/jsxRuntime.jsx("li", {
      role: "presentation",
      children: /*#__PURE__*/jsxRuntime.jsx("a", _extends({
        href: href
      }, menuItemProps))
    });
  } else {
    return /*#__PURE__*/jsxRuntime.jsx("li", _extends({}, menuItemProps));
  }
});
process.env.NODE_ENV !== "production" ? MenuItem.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  value: propTypes.any,
  href: propTypes.string,
  type: /*#__PURE__*/propTypes.oneOf(['checkbox', 'radio']),
  checked: propTypes.bool,
  disabled: propTypes.bool,
  children: /*#__PURE__*/propTypes.oneOfType([propTypes.node, propTypes.func]),
  onClick: propTypes.func
}) : void 0;

var _excluded$4 = ["className", "disabled", "children", "isHovering", "itemRef", "externalRef"],
  _excluded2 = ["setHover", "onPointerLeave"];
var FocusableItem = /*#__PURE__*/withHovering('FocusableItem', function FocusableItem(_ref) {
  var className = _ref.className,
    disabled = _ref.disabled,
    children = _ref.children,
    isHovering = _ref.isHovering,
    itemRef = _ref.itemRef,
    externalRef = _ref.externalRef,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded$4);
  var isDisabled = !!disabled;
  var ref = react.useRef(null);
  var _useItemState = useItemState(itemRef, ref, isHovering, isDisabled),
    setHover = _useItemState.setHover,
    _onPointerLeave = _useItemState.onPointerLeave,
    restStateProps = _objectWithoutPropertiesLoose(_useItemState, _excluded2);
  var _useContext = react.useContext(EventHandlersContext),
    handleClose = _useContext.handleClose;
  var modifiers = react.useMemo(function () {
    return {
      disabled: isDisabled,
      hover: isHovering,
      focusable: true
    };
  }, [isDisabled, isHovering]);
  var renderChildren = react.useMemo(function () {
    return safeCall(children, _extends({}, modifiers, {
      ref: ref,
      closeMenu: handleClose
    }));
  }, [children, modifiers, handleClose]);
  var mergedProps = mergeProps(_extends({}, restStateProps, {
    onPointerLeave: function onPointerLeave(e) {
      return _onPointerLeave(e, true);
    },
    onFocus: setHover
  }), restProps);
  return /*#__PURE__*/jsxRuntime.jsx("li", _extends({
    role: "menuitem"
  }, mergedProps, commonProps(isDisabled), {
    ref: useCombinedRef(externalRef, itemRef),
    className: useBEM({
      block: menuClass,
      element: menuItemClass,
      modifiers: modifiers,
      className: className
    }),
    children: renderChildren
  }));
});
process.env.NODE_ENV !== "production" ? FocusableItem.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  disabled: propTypes.bool,
  children: propTypes.func
}) : void 0;

var _excluded$3 = ["className"];
var MenuDivider = /*#__PURE__*/react.memo( /*#__PURE__*/react.forwardRef(function MenuDivider(_ref, externalRef) {
  var className = _ref.className,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded$3);
  return /*#__PURE__*/jsxRuntime.jsx("li", _extends({
    role: "separator"
  }, restProps, {
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: menuDividerClass,
      className: className
    })
  }));
}));
process.env.NODE_ENV !== "production" ? MenuDivider.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes()) : void 0;

var _excluded$2 = ["className"];
var MenuHeader = /*#__PURE__*/react.memo( /*#__PURE__*/react.forwardRef(function MenuHeader(_ref, externalRef) {
  var className = _ref.className,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  return /*#__PURE__*/jsxRuntime.jsx("li", _extends({
    role: "presentation"
  }, restProps, {
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: menuHeaderClass,
      className: className
    })
  }));
}));
process.env.NODE_ENV !== "production" ? MenuHeader.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes()) : void 0;

var _excluded$1 = ["className", "style", "takeOverflow"];
var MenuGroup = /*#__PURE__*/react.forwardRef(function MenuGroup(_ref, externalRef) {
  var className = _ref.className,
    style = _ref.style,
    takeOverflow = _ref.takeOverflow,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  var ref = react.useRef(null);
  var _useState = react.useState(),
    overflowStyle = _useState[0],
    setOverflowStyle = _useState[1];
  var _useContext = react.useContext(MenuListContext),
    overflow = _useContext.overflow,
    overflowAmt = _useContext.overflowAmt;
  useIsomorphicLayoutEffect(function () {
    var maxHeight;
    if (takeOverflow && overflowAmt >= 0) {
      maxHeight = ref.current.getBoundingClientRect().height - overflowAmt;
      if (maxHeight < 0) maxHeight = 0;
    }
    setOverflowStyle(maxHeight >= 0 ? {
      maxHeight: maxHeight,
      overflow: overflow
    } : undefined);
  }, [takeOverflow, overflow, overflowAmt]);
  useIsomorphicLayoutEffect(function () {
    if (overflowStyle) ref.current.scrollTop = 0;
  }, [overflowStyle]);
  return /*#__PURE__*/jsxRuntime.jsx("div", _extends({}, restProps, {
    ref: useCombinedRef(externalRef, ref),
    className: useBEM({
      block: menuClass,
      element: menuGroupClass,
      className: className
    }),
    style: _extends({}, style, overflowStyle)
  }));
});
process.env.NODE_ENV !== "production" ? MenuGroup.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  takeOverflow: propTypes.bool
}) : void 0;

var _excluded = ["aria-label", "className", "name", "value", "onRadioChange"];
var MenuRadioGroup = /*#__PURE__*/react.forwardRef(function MenuRadioGroup(_ref, externalRef) {
  var ariaLabel = _ref['aria-label'],
    className = _ref.className,
    name = _ref.name,
    value = _ref.value,
    onRadioChange = _ref.onRadioChange,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var contextValue = react.useMemo(function () {
    return {
      name: name,
      value: value,
      onRadioChange: onRadioChange
    };
  }, [name, value, onRadioChange]);
  return /*#__PURE__*/jsxRuntime.jsx(RadioGroupContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/jsxRuntime.jsx("li", {
      role: "presentation",
      children: /*#__PURE__*/jsxRuntime.jsx("ul", _extends({
        role: "group",
        "aria-label": ariaLabel || name || 'Radio group'
      }, restProps, {
        ref: externalRef,
        className: useBEM({
          block: menuClass,
          element: radioGroupClass,
          className: className
        })
      }))
    })
  });
});
process.env.NODE_ENV !== "production" ? MenuRadioGroup.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  name: propTypes.string,
  value: propTypes.any,
  onRadioChange: propTypes.func
}) : void 0;

exports.ControlledMenu = ControlledMenu;
exports.FocusableItem = FocusableItem;
exports.Menu = Menu;
exports.MenuButton = MenuButton;
exports.MenuDivider = MenuDivider;
exports.MenuGroup = MenuGroup;
exports.MenuHeader = MenuHeader;
exports.MenuItem = MenuItem;
exports.MenuRadioGroup = MenuRadioGroup;
exports.SubMenu = SubMenu;
exports.useMenuState = useMenuState;
