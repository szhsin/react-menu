'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var propTypes = require('prop-types');
var reactDom = require('react-dom');
var reactTransitionState = require('react-transition-state');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
var initialHoverIndex = -1;
var HoverIndexContext = /*#__PURE__*/React.createContext(initialHoverIndex);
var MenuListItemContext = /*#__PURE__*/React.createContext({});
var MenuListContext = /*#__PURE__*/React.createContext({});
var EventHandlersContext = /*#__PURE__*/React.createContext({});
var RadioGroupContext = /*#__PURE__*/React.createContext({});
var SettingsContext = /*#__PURE__*/React.createContext({});
var ItemSettingsContext = /*#__PURE__*/React.createContext({});
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
var HoverIndexActionTypes = /*#__PURE__*/Object.freeze({
  RESET: 'HOVER_RESET',
  SET: 'HOVER_SET',
  UNSET: 'HOVER_UNSET',
  INCREASE: 'HOVER_INCREASE',
  DECREASE: 'HOVER_DECREASE',
  FIRST: 'HOVER_FIRST',
  LAST: 'HOVER_LAST'
});
var SubmenuActionTypes = /*#__PURE__*/Object.freeze({
  OPEN: 'SUBMENU_OPEN',
  CLOSE: 'SUBMENU_CLOSE'
});
var CloseReason = /*#__PURE__*/Object.freeze({
  CLICK: 'click',
  CANCEL: 'cancel',
  BLUR: 'blur',
  SCROLL: 'scroll'
});
var FocusPositions = /*#__PURE__*/Object.freeze({
  INITIAL: 'initial',
  FIRST: 'first',
  LAST: 'last'
});
var MenuStateMap = /*#__PURE__*/Object.freeze({
  entering: 'opening',
  entered: 'open',
  exiting: 'closing',
  exited: 'closed'
});

var isProd = process.env.NODE_ENV === 'production';
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

function _extends() {
  _extends = Object.assign || function (target) {
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

  return _ref = {}, _ref[name ? name + "ClassName" : 'className'] = propTypes.oneOfType([propTypes.string, propTypes.func]), _ref[name ? name + "Styles" : 'styles'] = propTypes.oneOfType([propTypes.object, propTypes.func]), _ref;
};
var menuPropTypes = /*#__PURE__*/_extends({
  className: propTypes.string
}, /*#__PURE__*/stylePropTypes('menu'), /*#__PURE__*/stylePropTypes('arrow'), {
  arrow: propTypes.bool,
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
  portal: propTypes.bool,
  theming: propTypes.string,
  onItemClick: propTypes.func
});
var uncontrolledMenuPropTypes = {
  instanceRef: /*#__PURE__*/propTypes.oneOfType([propTypes.object, propTypes.func]),
  onMenuChange: propTypes.func
};
var menuDefaultProps = {
  offsetX: 0,
  offsetY: 0,
  align: 'start',
  direction: 'bottom',
  position: 'auto',
  overflow: 'visible'
};
var rootMenuDefaultProps = /*#__PURE__*/_extends({}, menuDefaultProps, {
  reposition: 'auto',
  viewScroll: 'initial',
  transitionTimeout: 200,
  submenuOpenDelay: 300,
  submenuCloseDelay: 150
});

var cloneChildren = function cloneChildren(children, startIndex, inRadioGroup) {
  if (startIndex === void 0) {
    startIndex = 0;
  }

  var index = startIndex;
  var descendOverflow = false;
  var items = React.Children.map(children, function (child) {
    if (child === undefined || child === null) return null;
    if (!child.type) return child;
    var name = getName(child.type);

    switch (name) {
      case 'MenuItem':
        {
          if (inRadioGroup) {
            var props = {
              type: 'radio'
            };
            if (!child.props.disabled) props.index = index++;
            return /*#__PURE__*/React.cloneElement(child, props);
          }
        }

      case 'SubMenu':
      case 'FocusableItem':
        return child.props.disabled ? child : /*#__PURE__*/React.cloneElement(child, {
          index: index++
        });

      default:
        {
          var innerChildren = child.props.children;
          if (innerChildren === null || typeof innerChildren !== 'object') return child;
          var desc = cloneChildren(innerChildren, index, inRadioGroup || name === 'MenuRadioGroup');
          index = desc.index;

          if (name === 'MenuGroup') {
            var takeOverflow = !!child.props.takeOverflow;
            var descOverflow = desc.descendOverflow;
            if (!isProd && (descendOverflow === descOverflow ? descOverflow : takeOverflow)) throw new Error('[React-Menu] Only one MenuGroup in a menu is allowed to have takeOverflow prop.');
            descendOverflow = descendOverflow || descOverflow || takeOverflow;
          }

          return /*#__PURE__*/React.cloneElement(child, {
            children: desc.items
          });
        }
    }
  });
  return {
    items: items,
    index: index,
    descendOverflow: descendOverflow
  };
};

var withHovering = function withHovering(WrapppedComponent, name) {
  var WithHovering = defineName( /*#__PURE__*/React.forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default["default"].createElement(WrapppedComponent, _extends({}, props, {
      externalRef: ref,
      isHovering: React.useContext(HoverIndexContext) === props.index
    }));
  }), name);
  WithHovering.displayName = "WithHovering(" + name + ")";
  return WithHovering;
};

var useActiveState = function useActiveState(isHovering, isDisabled, moreKeys) {
  var _useState = React.useState(false),
      active = _useState[0],
      setActive = _useState[1];

  var activeKeys = [Keys.ENTER, Keys.SPACE].concat(moreKeys);

  var cancelActive = function cancelActive() {
    return active && setActive(false);
  };

  return {
    isActive: active,
    onPointerDown: function onPointerDown() {
      if (!isDisabled) setActive(true);
    },
    onPointerUp: cancelActive,
    onPointerLeave: cancelActive,
    onKeyDown: function onKeyDown(e) {
      if (!active && isHovering && !isDisabled && activeKeys.indexOf(e.key) !== -1) {
        setActive(true);
      }
    },
    onKeyUp: function onKeyUp(e) {
      if (activeKeys.indexOf(e.key) !== -1) {
        setActive(false);
      }
    },
    onBlur: function onBlur(e) {
      if (active && !e.currentTarget.contains(e.relatedTarget)) {
        setActive(false);
      }
    }
  };
};

var useBEM = function useBEM(_ref) {
  var block = _ref.block,
      element = _ref.element,
      modifiers = _ref.modifiers,
      className = _ref.className;
  return React.useMemo(function () {
    var blockElement = element ? block + "__" + element : block;
    var classString = blockElement;

    for (var _i2 = 0, _Object$keys2 = Object.keys(modifiers || {}); _i2 < _Object$keys2.length; _i2++) {
      var name = _Object$keys2[_i2];
      var value = modifiers[name];

      if (value) {
        classString += " " + blockElement + "--";
        classString += value === true ? name : name + "-" + value;
      }
    }

    var expandedClassName = typeof className === 'function' ? className(modifiers) : className;

    if (typeof expandedClassName === 'string') {
      expandedClassName = expandedClassName.trim();
      if (expandedClassName) classString += " " + expandedClassName;
    }

    return classString;
  }, [block, element, modifiers, className]);
};

var setRef = function setRef(ref, element) {
  if (typeof ref === 'function') {
    ref(element);
  } else if (ref) {
    ref.current = element;
  }
};

var useCombinedRef = function useCombinedRef(refA, refB) {
  return React.useMemo(function () {
    if (!refA) return refB;
    if (!refB) return refA;
    return function (element) {
      setRef(refA, element);
      setRef(refB, element);
    };
  }, [refA, refB]);
};

var isObject = function isObject(obj) {
  return obj && typeof obj === 'object';
};

var sanitiseKey = function sanitiseKey(key) {
  return key[0] === '$' ? key.slice(1) : key;
};

var useFlatStyles = function useFlatStyles(styles, modifiers) {
  return React.useMemo(function () {
    if (typeof styles === 'function') return styles(modifiers);
    if (!isObject(styles)) return undefined;
    if (!modifiers) return styles;
    var style = {};

    for (var _i2 = 0, _Object$keys2 = Object.keys(styles); _i2 < _Object$keys2.length; _i2++) {
      var prop = _Object$keys2[_i2];
      var value = styles[prop];

      if (isObject(value)) {
        var modifierValue = modifiers[sanitiseKey(prop)];

        if (typeof modifierValue === 'string') {
          for (var _i4 = 0, _Object$keys4 = Object.keys(value); _i4 < _Object$keys4.length; _i4++) {
            var nestedProp = _Object$keys4[_i4];
            var nestedValue = value[nestedProp];

            if (isObject(nestedValue)) {
              if (sanitiseKey(nestedProp) === modifierValue) {
                style = _extends({}, style, nestedValue);
              }
            } else {
              style[nestedProp] = nestedValue;
            }
          }
        } else if (modifierValue) {
          style = _extends({}, style, value);
        }
      } else {
        style[prop] = value;
      }
    }

    return style;
  }, [styles, modifiers]);
};

var useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? React.useLayoutEffect : React.useEffect;

var useItemState = function useItemState(ref, index, isHovering, isDisabled) {
  var _useContext = React.useContext(ItemSettingsContext),
      submenuCloseDelay = _useContext.submenuCloseDelay;

  var _useContext2 = React.useContext(MenuListItemContext),
      isParentOpen = _useContext2.isParentOpen,
      isSubmenuOpen = _useContext2.isSubmenuOpen,
      dispatch = _useContext2.dispatch;

  var timeoutId = React.useRef();

  var setHover = function setHover() {
    if (!isDisabled) dispatch({
      type: HoverIndexActionTypes.SET,
      index: index
    });
  };

  var onBlur = function onBlur(e) {
    if (isHovering && !e.currentTarget.contains(e.relatedTarget)) {
      dispatch({
        type: HoverIndexActionTypes.UNSET,
        index: index
      });
    }
  };

  var onMouseEnter = function onMouseEnter() {
    if (isSubmenuOpen) {
      timeoutId.current = setTimeout(setHover, submenuCloseDelay);
    } else {
      setHover();
    }
  };

  var onMouseLeave = function onMouseLeave(_, keepHover) {
    timeoutId.current && clearTimeout(timeoutId.current);
    if (!keepHover) dispatch({
      type: HoverIndexActionTypes.UNSET,
      index: index
    });
  };

  React.useEffect(function () {
    return function () {
      return clearTimeout(timeoutId.current);
    };
  }, []);
  React.useEffect(function () {
    if (isHovering && isParentOpen) {
      ref.current && ref.current.focus();
    }
  }, [ref, isHovering, isParentOpen]);
  return {
    setHover: setHover,
    onBlur: onBlur,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  };
};

var useMenuChange = function useMenuChange(onMenuChange, isOpen) {
  var prevOpen = React.useRef(isOpen);
  React.useEffect(function () {
    if (prevOpen.current !== isOpen) safeCall(onMenuChange, {
      open: isOpen
    });
    prevOpen.current = isOpen;
  }, [onMenuChange, isOpen]);
};

var useMenuState = function useMenuState(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      initialMounted = _ref.initialMounted,
      unmountOnClose = _ref.unmountOnClose,
      transition = _ref.transition,
      transitionTimeout = _ref.transitionTimeout;

  var _useTransition = reactTransitionState.useTransition({
    mountOnEnter: !initialMounted,
    unmountOnExit: unmountOnClose,
    timeout: transitionTimeout,
    enter: getTransition(transition, 'open'),
    exit: getTransition(transition, 'close')
  }),
      state = _useTransition[0],
      toggleMenu = _useTransition[1],
      endTransition = _useTransition[2];

  return {
    state: MenuStateMap[state],
    toggleMenu: toggleMenu,
    endTransition: endTransition
  };
};

var useMenuStateAndFocus = function useMenuStateAndFocus(options) {
  var menuState = useMenuState(options);

  var _useState = React.useState({}),
      menuItemFocus = _useState[0],
      setMenuItemFocus = _useState[1];

  var openMenu = function openMenu(position, alwaysUpdate) {
    setMenuItemFocus({
      position: position,
      alwaysUpdate: alwaysUpdate
    });
    menuState.toggleMenu(true);
  };

  return _extends({}, menuState, {
    openMenu: openMenu,
    menuItemFocus: menuItemFocus
  });
};

var _excluded$a = ["className", "styles", "isOpen", "disabled", "children"];
var MenuButton = /*#__PURE__*/defineName( /*#__PURE__*/React.forwardRef(function MenuButton(_ref, ref) {
  var className = _ref.className,
      styles = _ref.styles,
      isOpen = _ref.isOpen,
      disabled = _ref.disabled,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded$a);

  var modifiers = React.useMemo(function () {
    return Object.freeze({
      open: isOpen
    });
  }, [isOpen]);
  return /*#__PURE__*/React__default["default"].createElement("button", _extends({
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
    style: useFlatStyles(styles, modifiers)
  }), children);
}), 'MenuButton');
MenuButton.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  isOpen: propTypes.bool,
  disabled: propTypes.bool
});

var getPositionHelpers = function getPositionHelpers(_ref) {
  var menuRef = _ref.menuRef,
      containerRef = _ref.containerRef,
      scrollingRef = _ref.scrollingRef,
      boundingBoxPadding = _ref.boundingBoxPadding;
  var menuRect = menuRef.current.getBoundingClientRect();
  var containerRect = containerRef.current.getBoundingClientRect();
  var boundingRect = scrollingRef.current === window ? {
    left: 0,
    top: 0,
    right: document.documentElement.clientWidth,
    bottom: window.innerHeight
  } : scrollingRef.current.getBoundingClientRect();
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

var positionContextMenu = function positionContextMenu(_ref) {
  var positionHelpers = _ref.positionHelpers,
      anchorPoint = _ref.anchorPoint;
  var menuRect = positionHelpers.menuRect,
      containerRect = positionHelpers.containerRect,
      getLeftOverflow = positionHelpers.getLeftOverflow,
      getRightOverflow = positionHelpers.getRightOverflow,
      getTopOverflow = positionHelpers.getTopOverflow,
      getBottomOverflow = positionHelpers.getBottomOverflow,
      confineHorizontally = positionHelpers.confineHorizontally,
      confineVertically = positionHelpers.confineVertically;
  var x, y;
  x = anchorPoint.x - containerRect.left;
  y = anchorPoint.y - containerRect.top;
  var rightOverflow = getRightOverflow(x);

  if (rightOverflow > 0) {
    var adjustedX = x - menuRect.width;
    var leftOverflow = getLeftOverflow(adjustedX);

    if (leftOverflow >= 0 || -leftOverflow < rightOverflow) {
      x = adjustedX;
    }

    x = confineHorizontally(x);
  }

  var computedDirection = 'bottom';
  var bottomOverflow = getBottomOverflow(y);

  if (bottomOverflow > 0) {
    var adjustedY = y - menuRect.height;
    var topOverflow = getTopOverflow(adjustedY);

    if (topOverflow >= 0 || -topOverflow < bottomOverflow) {
      y = adjustedY;
      computedDirection = 'top';
    }

    y = confineVertically(y);
  }

  return {
    x: x,
    y: y,
    computedDirection: computedDirection
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
      anchorRef = _ref.anchorRef,
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

  var anchorRect = anchorRef.current.getBoundingClientRect();
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

var _excluded$9 = ["ariaLabel", "menuClassName", "menuStyles", "arrowClassName", "arrowStyles", "anchorPoint", "anchorRef", "containerRef", "externalRef", "parentScrollingRef", "arrow", "align", "direction", "position", "overflow", "repositionFlag", "captureFocus", "state", "endTransition", "isDisabled", "menuItemFocus", "offsetX", "offsetY", "children", "onClose"];
var MenuList = function MenuList(_ref) {
  var ariaLabel = _ref.ariaLabel,
      menuClassName = _ref.menuClassName,
      menuStyles = _ref.menuStyles,
      arrowClassName = _ref.arrowClassName,
      arrowStyles = _ref.arrowStyles,
      anchorPoint = _ref.anchorPoint,
      anchorRef = _ref.anchorRef,
      containerRef = _ref.containerRef,
      externalRef = _ref.externalRef,
      parentScrollingRef = _ref.parentScrollingRef,
      arrow = _ref.arrow,
      align = _ref.align,
      direction = _ref.direction,
      position = _ref.position,
      overflow = _ref.overflow,
      repositionFlag = _ref.repositionFlag,
      _ref$captureFocus = _ref.captureFocus,
      captureFocus = _ref$captureFocus === void 0 ? true : _ref$captureFocus,
      menuState = _ref.state,
      endTransition = _ref.endTransition,
      isDisabled = _ref.isDisabled,
      menuItemFocus = _ref.menuItemFocus,
      offsetX = _ref.offsetX,
      offsetY = _ref.offsetY,
      children = _ref.children,
      onClose = _ref.onClose,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded$9);

  var isOpen = isMenuOpen(menuState);

  var _useState = React.useState({
    x: 0,
    y: 0
  }),
      menuPosition = _useState[0],
      setMenuPosition = _useState[1];

  var _useState2 = React.useState({}),
      arrowPosition = _useState2[0],
      setArrowPosition = _useState2[1];

  var _useState3 = React.useState(),
      overflowData = _useState3[0],
      setOverflowData = _useState3[1];

  var _useState4 = React.useState(direction),
      expandedDirection = _useState4[0],
      setExpandedDirection = _useState4[1];

  var _useContext = React.useContext(SettingsContext),
      transition = _useContext.transition,
      boundingBoxRef = _useContext.boundingBoxRef,
      boundingBoxPadding = _useContext.boundingBoxPadding,
      rootMenuRef = _useContext.rootMenuRef,
      rootAnchorRef = _useContext.rootAnchorRef,
      scrollingRef = _useContext.scrollingRef,
      anchorScrollingRef = _useContext.anchorScrollingRef,
      reposition = _useContext.reposition,
      viewScroll = _useContext.viewScroll;

  var menuRef = React.useRef(null);
  var arrowRef = React.useRef(null);
  var menuItemsCount = React.useRef(0);
  var prevOpen = React.useRef(isOpen);
  var latestMenuSize = React.useRef({
    width: 0,
    height: 0
  });
  var latestHandlePosition = React.useRef(function () {});
  var descendOverflowRef = React.useRef(false);
  var reposFlag = React.useContext(MenuListContext).reposSubmenu || repositionFlag;

  var _useReducer = React.useReducer(function (c) {
    return c + 1;
  }, 1),
      reposSubmenu = _useReducer[0],
      forceReposSubmenu = _useReducer[1];

  var _useReducer2 = React.useReducer(reducer, {
    hoverIndex: initialHoverIndex,
    openSubmenuCount: 0
  }),
      _useReducer2$ = _useReducer2[0],
      hoverIndex = _useReducer2$.hoverIndex,
      openSubmenuCount = _useReducer2$.openSubmenuCount,
      dispatch = _useReducer2[1];

  var openTransition = getTransition(transition, 'open');
  var closeTransition = getTransition(transition, 'close');

  function reducer(_ref2, action) {
    var hoverIndex = _ref2.hoverIndex,
        openSubmenuCount = _ref2.openSubmenuCount;
    return {
      hoverIndex: hoverIndexReducer(hoverIndex, action),
      openSubmenuCount: submenuCountReducer(openSubmenuCount, action)
    };
  }

  function hoverIndexReducer(state, _ref3) {
    var type = _ref3.type,
        index = _ref3.index;

    switch (type) {
      case HoverIndexActionTypes.RESET:
        return initialHoverIndex;

      case HoverIndexActionTypes.SET:
        return index;

      case HoverIndexActionTypes.UNSET:
        return state === index ? initialHoverIndex : state;

      case HoverIndexActionTypes.DECREASE:
        {
          var i = state;
          i--;
          if (i < 0) i = menuItemsCount.current - 1;
          return i;
        }

      case HoverIndexActionTypes.INCREASE:
        {
          var _i = state;
          _i++;
          if (_i >= menuItemsCount.current) _i = 0;
          return _i;
        }

      case HoverIndexActionTypes.FIRST:
        return menuItemsCount.current > 0 ? 0 : initialHoverIndex;

      case HoverIndexActionTypes.LAST:
        return menuItemsCount.current > 0 ? menuItemsCount.current - 1 : initialHoverIndex;

      default:
        return state;
    }
  }

  var menuItems = React.useMemo(function () {
    var _cloneChildren = cloneChildren(children),
        items = _cloneChildren.items,
        index = _cloneChildren.index,
        descendOverflow = _cloneChildren.descendOverflow;

    menuItemsCount.current = index;
    descendOverflowRef.current = descendOverflow;
    return items;
  }, [children]);

  var handleKeyDown = function handleKeyDown(e) {
    var handled = false;

    switch (e.key) {
      case Keys.HOME:
        dispatch({
          type: HoverIndexActionTypes.FIRST
        });
        handled = true;
        break;

      case Keys.END:
        dispatch({
          type: HoverIndexActionTypes.LAST
        });
        handled = true;
        break;

      case Keys.UP:
        dispatch({
          type: HoverIndexActionTypes.DECREASE
        });
        handled = true;
        break;

      case Keys.DOWN:
        dispatch({
          type: HoverIndexActionTypes.INCREASE
        });
        handled = true;
        break;

      case Keys.SPACE:
        if (e.target && e.target.className.indexOf(menuClass) !== -1) {
          e.preventDefault();
        }

        break;
    }

    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  var handleAnimationEnd = function handleAnimationEnd() {
    if (menuState === 'closing') {
      setOverflowData();
    }

    safeCall(endTransition);
  };

  var handlePosition = React.useCallback(function () {
    if (!containerRef.current) {
      if (!isProd) throw new Error('[React-Menu] Menu cannot be positioned properly as container ref is null. If you initialise isOpen prop to true for ControlledMenu, please see this link for a solution: https://github.com/szhsin/react-menu/issues/2#issuecomment-719166062');
      return;
    }

    if (!scrollingRef.current) {
      scrollingRef.current = boundingBoxRef ? boundingBoxRef.current : getScrollAncestor(rootMenuRef.current);
    }

    var positionHelpers = getPositionHelpers({
      menuRef: menuRef,
      containerRef: containerRef,
      scrollingRef: scrollingRef,
      boundingBoxPadding: boundingBoxPadding
    });
    var menuRect = positionHelpers.menuRect;
    var results = {
      computedDirection: 'bottom'
    };

    if (anchorPoint) {
      results = positionContextMenu({
        positionHelpers: positionHelpers,
        anchorPoint: anchorPoint
      });
    } else if (anchorRef) {
      results = positionMenu({
        arrow: arrow,
        align: align,
        direction: direction,
        offsetX: offsetX,
        offsetY: offsetY,
        position: position,
        anchorRef: anchorRef,
        arrowRef: arrowRef,
        positionHelpers: positionHelpers
      });
    }

    var _results = results,
        arrowX = _results.arrowX,
        arrowY = _results.arrowY,
        x = _results.x,
        y = _results.y,
        computedDirection = _results.computedDirection;
    var menuHeight = menuRect.height;

    if (overflow !== 'visible') {
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
  }, [arrow, align, boundingBoxPadding, direction, offsetX, offsetY, position, overflow, anchorPoint, anchorRef, containerRef, boundingBoxRef, rootMenuRef, scrollingRef]);
  useIsomorphicLayoutEffect(function () {
    if (isOpen) {
      handlePosition();
      if (prevOpen.current) forceReposSubmenu();
    }

    prevOpen.current = isOpen;
    latestHandlePosition.current = handlePosition;
  }, [isOpen, handlePosition, reposFlag]);
  useIsomorphicLayoutEffect(function () {
    if (overflowData && !descendOverflowRef.current) menuRef.current.scrollTop = 0;
  }, [overflowData]);
  React.useEffect(function () {
    if (!isOpen) return;

    if (!anchorScrollingRef.current && rootAnchorRef && rootAnchorRef.current.tagName) {
      anchorScrollingRef.current = getScrollAncestor(rootAnchorRef.current);
    }

    var scrollCurrent = scrollingRef.current;
    var menuScroll = scrollCurrent && scrollCurrent.addEventListener ? scrollCurrent : window;
    var anchorScroll = anchorScrollingRef.current || menuScroll;
    var scroll = viewScroll;
    if (anchorScroll !== menuScroll && scroll === 'initial') scroll = 'auto';
    if (scroll === 'initial') return;
    if (scroll === 'auto' && overflow !== 'visible') scroll = 'close';

    var handleScroll = function handleScroll() {
      if (scroll === 'auto') {
        batchedUpdates(handlePosition);
      } else {
        safeCall(onClose, {
          reason: CloseReason.SCROLL
        });
      }
    };

    var scrollObservers = anchorScroll !== menuScroll && viewScroll !== 'initial' ? [anchorScroll, menuScroll] : [anchorScroll];
    scrollObservers.forEach(function (o) {
      return o.addEventListener('scroll', handleScroll);
    });
    return function () {
      return scrollObservers.forEach(function (o) {
        return o.removeEventListener('scroll', handleScroll);
      });
    };
  }, [rootAnchorRef, anchorScrollingRef, scrollingRef, isOpen, overflow, onClose, viewScroll, handlePosition]);
  var hasOverflow = !!overflowData && overflowData.overflowAmt > 0;
  React.useEffect(function () {
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
  React.useEffect(function () {
    if (typeof ResizeObserver !== 'function' || reposition === 'initial') return;
    var resizeObserver = new ResizeObserver(function (_ref4) {
      var entry = _ref4[0];
      var borderBoxSize = entry.borderBoxSize,
          target = entry.target;
      var width, height;

      if (borderBoxSize) {
        var _ref5 = borderBoxSize[0] || borderBoxSize,
            inlineSize = _ref5.inlineSize,
            blockSize = _ref5.blockSize;

        width = inlineSize;
        height = blockSize;
      } else {
        var borderRect = target.getBoundingClientRect();
        width = borderRect.width;
        height = borderRect.height;
      }

      if (width === 0 || height === 0) return;
      if (floatEqual(width, latestMenuSize.current.width, 1) && floatEqual(height, latestMenuSize.current.height, 1)) return;
      batchedUpdates(function () {
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
  React.useEffect(function () {
    if (!isOpen) {
      dispatch({
        type: HoverIndexActionTypes.RESET
      });
      if (!closeTransition) setOverflowData();
      return;
    }

    var id = setTimeout(function () {
      if (!menuRef.current) return;

      var _ref6 = menuItemFocus || {},
          position = _ref6.position,
          alwaysUpdate = _ref6.alwaysUpdate;

      if (!alwaysUpdate && menuRef.current.contains(document.activeElement)) return;
      if (captureFocus) menuRef.current.focus();

      if (position === FocusPositions.FIRST) {
        dispatch({
          type: HoverIndexActionTypes.FIRST
        });
      } else if (position === FocusPositions.LAST) {
        dispatch({
          type: HoverIndexActionTypes.LAST
        });
      } else if (position >= 0 && position < menuItemsCount.current) {
        dispatch({
          type: HoverIndexActionTypes.SET,
          index: position
        });
      }
    }, openTransition ? 170 : 100);
    return function () {
      return clearTimeout(id);
    };
  }, [openTransition, closeTransition, captureFocus, isOpen, menuItemFocus]);
  var isSubmenuOpen = openSubmenuCount > 0;
  var itemContext = React.useMemo(function () {
    return {
      parentMenuRef: menuRef,
      parentOverflow: overflow,
      isParentOpen: isOpen,
      isSubmenuOpen: isSubmenuOpen,
      dispatch: dispatch
    };
  }, [isOpen, isSubmenuOpen, overflow]);
  var maxHeight, overflowAmt;

  if (overflowData) {
    descendOverflowRef.current ? overflowAmt = overflowData.overflowAmt : maxHeight = overflowData.height;
  }

  var listContext = React.useMemo(function () {
    return {
      reposSubmenu: reposSubmenu,
      overflow: overflow,
      overflowAmt: overflowAmt
    };
  }, [reposSubmenu, overflow, overflowAmt]);
  var overflowStyles = maxHeight >= 0 ? {
    maxHeight: maxHeight,
    overflow: overflow
  } : undefined;
  var modifiers = React.useMemo(function () {
    return {
      state: menuState,
      dir: expandedDirection
    };
  }, [menuState, expandedDirection]);
  var arrowModifiers = React.useMemo(function () {
    return Object.freeze({
      dir: expandedDirection
    });
  }, [expandedDirection]);

  var _arrowClass = useBEM({
    block: menuClass,
    element: menuArrowClass,
    modifiers: arrowModifiers,
    className: arrowClassName
  });

  var _arrowStyles = useFlatStyles(arrowStyles, arrowModifiers);

  var handlers = attachHandlerProps({
    onKeyDown: handleKeyDown,
    onAnimationEnd: handleAnimationEnd
  }, restProps);
  return /*#__PURE__*/React__default["default"].createElement("ul", _extends({
    role: "menu",
    tabIndex: "-1",
    "aria-disabled": isDisabled || undefined,
    "aria-label": ariaLabel
  }, restProps, handlers, {
    ref: useCombinedRef(externalRef, menuRef),
    className: useBEM({
      block: menuClass,
      modifiers: modifiers,
      className: menuClassName
    }),
    style: _extends({}, useFlatStyles(menuStyles, modifiers), overflowStyles, {
      left: menuPosition.x + "px",
      top: menuPosition.y + "px"
    })
  }), arrow && /*#__PURE__*/React__default["default"].createElement("div", {
    className: _arrowClass,
    style: _extends({}, _arrowStyles, {
      left: arrowPosition.x && arrowPosition.x + "px",
      top: arrowPosition.y && arrowPosition.y + "px"
    }),
    ref: arrowRef
  }), /*#__PURE__*/React__default["default"].createElement(MenuListContext.Provider, {
    value: listContext
  }, /*#__PURE__*/React__default["default"].createElement(MenuListItemContext.Provider, {
    value: itemContext
  }, /*#__PURE__*/React__default["default"].createElement(HoverIndexContext.Provider, {
    value: hoverIndex
  }, menuItems))));
};

function submenuCountReducer(state, _ref7) {
  var type = _ref7.type;

  switch (type) {
    case SubmenuActionTypes.OPEN:
      return state + 1;

    case SubmenuActionTypes.CLOSE:
      return Math.max(state - 1, 0);

    default:
      return state;
  }
}

var _excluded$8 = ["aria-label", "className", "containerProps", "initialMounted", "unmountOnClose", "transition", "transitionTimeout", "boundingBoxRef", "boundingBoxPadding", "reposition", "submenuOpenDelay", "submenuCloseDelay", "skipOpen", "viewScroll", "portal", "theming", "onItemClick", "onClose"];
var ControlledMenu = /*#__PURE__*/React.forwardRef(function ControlledMenu(_ref, externalRef) {
  var ariaLabel = _ref['aria-label'],
      className = _ref.className,
      containerProps = _ref.containerProps,
      initialMounted = _ref.initialMounted,
      unmountOnClose = _ref.unmountOnClose,
      transition = _ref.transition,
      transitionTimeout = _ref.transitionTimeout,
      boundingBoxRef = _ref.boundingBoxRef,
      boundingBoxPadding = _ref.boundingBoxPadding,
      reposition = _ref.reposition,
      submenuOpenDelay = _ref.submenuOpenDelay,
      submenuCloseDelay = _ref.submenuCloseDelay,
      skipOpen = _ref.skipOpen,
      viewScroll = _ref.viewScroll,
      portal = _ref.portal,
      theming = _ref.theming,
      onItemClick = _ref.onItemClick,
      onClose = _ref.onClose,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded$8);

  var containerRef = React.useRef(null);
  var scrollingRef = React.useRef(null);
  var anchorScrollingRef = React.useRef(null);
  var anchorRef = restProps.anchorRef,
      state = restProps.state;
  var settings = React.useMemo(function () {
    return {
      initialMounted: initialMounted,
      unmountOnClose: unmountOnClose,
      transition: transition,
      transitionTimeout: transitionTimeout,
      boundingBoxRef: boundingBoxRef,
      boundingBoxPadding: boundingBoxPadding,
      rootMenuRef: containerRef,
      rootAnchorRef: anchorRef,
      scrollingRef: scrollingRef,
      anchorScrollingRef: anchorScrollingRef,
      reposition: reposition,
      viewScroll: viewScroll
    };
  }, [initialMounted, unmountOnClose, transition, transitionTimeout, anchorRef, boundingBoxRef, boundingBoxPadding, reposition, viewScroll]);
  var itemSettings = React.useMemo(function () {
    return {
      submenuOpenDelay: submenuOpenDelay,
      submenuCloseDelay: submenuCloseDelay
    };
  }, [submenuOpenDelay, submenuCloseDelay]);
  var eventHandlers = React.useMemo(function () {
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

  var handleKeyDown = function handleKeyDown(_ref2) {
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

  var handleBlur = function handleBlur(e) {
    if (isMenuOpen(state) && !e.currentTarget.contains(e.relatedTarget || document.activeElement)) {
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

  var itemTransition = getTransition(transition, 'item');
  var modifiers = React.useMemo(function () {
    return {
      theme: theming,
      itemTransition: itemTransition
    };
  }, [theming, itemTransition]);
  var handlers = attachHandlerProps({
    onKeyDown: handleKeyDown,
    onBlur: handleBlur
  }, containerProps);
  var menuList = /*#__PURE__*/React__default["default"].createElement("div", _extends({}, containerProps, handlers, {
    className: useBEM({
      block: menuContainerClass,
      modifiers: modifiers,
      className: className
    }),
    ref: containerRef
  }), state && /*#__PURE__*/React__default["default"].createElement(SettingsContext.Provider, {
    value: settings
  }, /*#__PURE__*/React__default["default"].createElement(ItemSettingsContext.Provider, {
    value: itemSettings
  }, /*#__PURE__*/React__default["default"].createElement(EventHandlersContext.Provider, {
    value: eventHandlers
  }, /*#__PURE__*/React__default["default"].createElement(MenuList, _extends({}, restProps, {
    ariaLabel: ariaLabel || 'Menu',
    externalRef: externalRef,
    containerRef: containerRef,
    onClose: onClose
  }))))));

  if (portal) {
    return /*#__PURE__*/reactDom.createPortal(menuList, document.body);
  } else {
    return menuList;
  }
});
ControlledMenu.propTypes = /*#__PURE__*/_extends({}, rootMenuPropTypes, {
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
});
ControlledMenu.defaultProps = /*#__PURE__*/_extends({}, rootMenuDefaultProps, {
  menuItemFocus: {}
});

var _excluded$7 = ["aria-label", "captureFocus", "menuButton", "instanceRef", "onMenuChange"],
    _excluded2$2 = ["openMenu", "toggleMenu"];
var Menu = /*#__PURE__*/React.forwardRef(function Menu(_ref, externalRef) {
  var ariaLabel = _ref['aria-label'],
      menuButton = _ref.menuButton,
      instanceRef = _ref.instanceRef,
      onMenuChange = _ref.onMenuChange,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded$7);

  var _useMenuStateAndFocus = useMenuStateAndFocus(restProps),
      openMenu = _useMenuStateAndFocus.openMenu,
      toggleMenu = _useMenuStateAndFocus.toggleMenu,
      stateProps = _objectWithoutPropertiesLoose(_useMenuStateAndFocus, _excluded2$2);

  var isOpen = isMenuOpen(stateProps.state);
  var skipOpen = React.useRef(false);
  var buttonRef = React.useRef(null);
  var handleClose = React.useCallback(function (e) {
    toggleMenu(false);
    if (e.key) buttonRef.current.focus();
  }, [toggleMenu]);

  var handleClick = function handleClick(e) {
    if (skipOpen.current) return;
    openMenu(e.detail === 0 ? FocusPositions.FIRST : undefined);
  };

  var handleKeyDown = function handleKeyDown(e) {
    var handled = false;

    switch (e.key) {
      case Keys.UP:
        openMenu(FocusPositions.LAST);
        handled = true;
        break;

      case Keys.DOWN:
        openMenu(FocusPositions.FIRST);
        handled = true;
        break;
    }

    if (handled) e.preventDefault();
  };

  var button = safeCall(menuButton, {
    open: isOpen
  });
  if (!button) throw new Error('Menu requires a menuButton prop.');

  var buttonProps = _extends({
    ref: useCombinedRef(button.ref, buttonRef)
  }, attachHandlerProps({
    onClick: handleClick,
    onKeyDown: handleKeyDown
  }, button.props));

  if (getName(button.type) === 'MenuButton') {
    buttonProps.isOpen = isOpen;
  }

  var renderButton = /*#__PURE__*/React.cloneElement(button, buttonProps);
  useMenuChange(onMenuChange, isOpen);
  React.useImperativeHandle(instanceRef, function () {
    return {
      openMenu: openMenu,
      closeMenu: function closeMenu() {
        return toggleMenu(false);
      }
    };
  });

  var menuProps = _extends({}, restProps, stateProps, {
    'aria-label': ariaLabel || (typeof button.props.children === 'string' ? button.props.children : 'Menu'),
    anchorRef: buttonRef,
    ref: externalRef,
    onClose: handleClose,
    skipOpen: skipOpen
  });

  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, null, renderButton, /*#__PURE__*/React__default["default"].createElement(ControlledMenu, menuProps));
});
Menu.propTypes = /*#__PURE__*/_extends({}, rootMenuPropTypes, uncontrolledMenuPropTypes, {
  menuButton: propTypes.oneOfType([propTypes.element, propTypes.func]).isRequired
});
Menu.defaultProps = rootMenuDefaultProps;

var _excluded$6 = ["aria-label", "className", "disabled", "label", "index", "onMenuChange", "isHovering", "instanceRef", "captureFocus", "repositionFlag", "itemProps"],
    _excluded2$1 = ["openMenu", "toggleMenu", "state"],
    _excluded3 = ["isActive", "onKeyUp"],
    _excluded4 = ["ref", "className", "styles"];
var SubMenu = /*#__PURE__*/withHovering( /*#__PURE__*/React.memo(function SubMenu(_ref) {
  var ariaLabel = _ref['aria-label'],
      className = _ref.className,
      disabled = _ref.disabled,
      label = _ref.label,
      index = _ref.index,
      onMenuChange = _ref.onMenuChange,
      isHovering = _ref.isHovering,
      instanceRef = _ref.instanceRef,
      _ref$itemProps = _ref.itemProps,
      itemProps = _ref$itemProps === void 0 ? {} : _ref$itemProps,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded$6);

  var isDisabled = !!disabled;
  validateIndex(index, isDisabled, label);

  var _useContext = React.useContext(SettingsContext),
      initialMounted = _useContext.initialMounted,
      unmountOnClose = _useContext.unmountOnClose,
      transition = _useContext.transition,
      transitionTimeout = _useContext.transitionTimeout,
      rootMenuRef = _useContext.rootMenuRef;

  var _useContext2 = React.useContext(ItemSettingsContext),
      submenuOpenDelay = _useContext2.submenuOpenDelay,
      submenuCloseDelay = _useContext2.submenuCloseDelay;

  var _useContext3 = React.useContext(MenuListItemContext),
      parentMenuRef = _useContext3.parentMenuRef,
      parentOverflow = _useContext3.parentOverflow,
      isParentOpen = _useContext3.isParentOpen,
      isSubmenuOpen = _useContext3.isSubmenuOpen,
      dispatch = _useContext3.dispatch;

  var isPortal = parentOverflow !== 'visible';

  var _useMenuStateAndFocus = useMenuStateAndFocus({
    initialMounted: initialMounted,
    unmountOnClose: unmountOnClose,
    transition: transition,
    transitionTimeout: transitionTimeout
  }),
      _openMenu = _useMenuStateAndFocus.openMenu,
      toggleMenu = _useMenuStateAndFocus.toggleMenu,
      state = _useMenuStateAndFocus.state,
      otherStateProps = _objectWithoutPropertiesLoose(_useMenuStateAndFocus, _excluded2$1);

  var isOpen = isMenuOpen(state);

  var _useActiveState = useActiveState(isHovering, isDisabled, Keys.RIGHT),
      isActive = _useActiveState.isActive,
      onKeyUp = _useActiveState.onKeyUp,
      activeStateHandlers = _objectWithoutPropertiesLoose(_useActiveState, _excluded3);

  var containerRef = React.useRef(null);
  var itemRef = React.useRef(null);
  var timeoutId = React.useRef();

  var setHover = function setHover() {
    return !isHovering && dispatch({
      type: HoverIndexActionTypes.SET,
      index: index
    });
  };

  var delayOpen = function delayOpen(delay) {
    dispatch({
      type: HoverIndexActionTypes.SET,
      index: index
    });
    timeoutId.current = setTimeout(_openMenu, Math.max(delay, 0));
  };

  var handleMouseEnter = function handleMouseEnter() {
    if (isDisabled || isOpen) return;

    if (isSubmenuOpen) {
      timeoutId.current = setTimeout(function () {
        return delayOpen(submenuOpenDelay - submenuCloseDelay);
      }, submenuCloseDelay);
    } else {
      delayOpen(submenuOpenDelay);
    }
  };

  var handleMouseLeave = function handleMouseLeave() {
    clearTimeout(timeoutId.current);

    if (!isOpen) {
      dispatch({
        type: HoverIndexActionTypes.UNSET,
        index: index
      });
    }
  };

  var handleClick = function handleClick() {
    if (isDisabled) return;
    clearTimeout(timeoutId.current);

    _openMenu();
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

  var handleKeyUp = function handleKeyUp(e) {
    if (!isActive) return;
    onKeyUp(e);

    switch (e.key) {
      case Keys.ENTER:
      case Keys.SPACE:
      case Keys.RIGHT:
        _openMenu(FocusPositions.FIRST);

        break;
    }
  };

  React.useEffect(function () {
    return function () {
      return clearTimeout(timeoutId.current);
    };
  }, []);
  React.useEffect(function () {
    if (isHovering && isParentOpen) {
      itemRef.current.focus();
    } else {
      toggleMenu(false);
    }
  }, [isHovering, isParentOpen, toggleMenu]);
  React.useEffect(function () {
    dispatch({
      type: isOpen ? SubmenuActionTypes.OPEN : SubmenuActionTypes.CLOSE
    });
  }, [dispatch, isOpen]);
  useMenuChange(onMenuChange, isOpen);
  React.useImperativeHandle(instanceRef, function () {
    return {
      openMenu: function openMenu() {
        if (isParentOpen) {
          setHover();

          _openMenu.apply(void 0, arguments);
        }
      },
      closeMenu: function closeMenu() {
        if (isOpen) {
          itemRef.current.focus();
          toggleMenu(false);
        }
      }
    };
  });
  var modifiers = React.useMemo(function () {
    return Object.freeze({
      open: isOpen,
      hover: isHovering,
      active: isActive,
      disabled: isDisabled
    });
  }, [isOpen, isHovering, isActive, isDisabled]);

  var externaItemlRef = itemProps.ref,
      itemClassName = itemProps.className,
      itemStyles = itemProps.styles,
      restItemProps = _objectWithoutPropertiesLoose(itemProps, _excluded4);

  var itemHandlers = attachHandlerProps(_extends({}, activeStateHandlers, {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: setHover,
    onClick: handleClick,
    onKeyUp: handleKeyUp
  }), restItemProps);

  var getMenuList = function getMenuList() {
    var menuList = /*#__PURE__*/React__default["default"].createElement(MenuList, _extends({}, restProps, otherStateProps, {
      state: state,
      ariaLabel: ariaLabel || (typeof label === 'string' ? label : 'Submenu'),
      anchorRef: itemRef,
      containerRef: isPortal ? rootMenuRef : containerRef,
      parentScrollingRef: isPortal && parentMenuRef,
      isDisabled: isDisabled
    }));
    return isPortal ? /*#__PURE__*/reactDom.createPortal(menuList, rootMenuRef.current) : menuList;
  };

  return /*#__PURE__*/React__default["default"].createElement("li", {
    className: useBEM({
      block: menuClass,
      element: subMenuClass,
      className: className
    }),
    role: "presentation",
    ref: containerRef,
    onKeyDown: handleKeyDown
  }, /*#__PURE__*/React__default["default"].createElement("div", _extends({
    role: "menuitem",
    "aria-haspopup": true,
    "aria-expanded": isOpen,
    "aria-disabled": isDisabled || undefined,
    tabIndex: isHovering && !isOpen ? 0 : -1
  }, restItemProps, itemHandlers, {
    ref: useCombinedRef(externaItemlRef, itemRef),
    className: useBEM({
      block: menuClass,
      element: menuItemClass,
      modifiers: modifiers,
      className: itemClassName
    }),
    style: useFlatStyles(itemStyles, modifiers)
  }), React.useMemo(function () {
    return safeCall(label, modifiers);
  }, [label, modifiers])), state && getMenuList());
}), 'SubMenu');
SubMenu.propTypes = /*#__PURE__*/_extends({}, menuPropTypes, uncontrolledMenuPropTypes, {
  disabled: propTypes.bool,
  label: /*#__PURE__*/propTypes.oneOfType([propTypes.node, propTypes.func]),
  itemProps: /*#__PURE__*/propTypes.shape( /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes()))
});
SubMenu.defaultProps = /*#__PURE__*/_extends({}, menuDefaultProps, {
  direction: 'right'
});

var _excluded$5 = ["className", "styles", "value", "href", "type", "checked", "disabled", "index", "children", "onClick", "isHovering", "externalRef"],
    _excluded2 = ["isActive", "onKeyUp", "onBlur"];
var MenuItem = /*#__PURE__*/withHovering( /*#__PURE__*/React.memo(function MenuItem(_ref) {
  var className = _ref.className,
      styles = _ref.styles,
      value = _ref.value,
      href = _ref.href,
      type = _ref.type,
      checked = _ref.checked,
      disabled = _ref.disabled,
      index = _ref.index,
      children = _ref.children,
      onClick = _ref.onClick,
      isHovering = _ref.isHovering,
      externalRef = _ref.externalRef,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded$5);

  var isDisabled = !!disabled;
  validateIndex(index, isDisabled, children);
  var ref = React.useRef();

  var _useItemState = useItemState(ref, index, isHovering, isDisabled),
      setHover = _useItemState.setHover,
      onBlur = _useItemState.onBlur,
      onMouseEnter = _useItemState.onMouseEnter,
      onMouseLeave = _useItemState.onMouseLeave;

  var eventHandlers = React.useContext(EventHandlersContext);
  var radioGroup = React.useContext(RadioGroupContext);

  var _useActiveState = useActiveState(isHovering, isDisabled),
      isActive = _useActiveState.isActive,
      onKeyUp = _useActiveState.onKeyUp,
      activeStateBlur = _useActiveState.onBlur,
      activeStateHandlers = _objectWithoutPropertiesLoose(_useActiveState, _excluded2);

  var isRadio = type === 'radio';
  var isCheckBox = type === 'checkbox';
  var isAnchor = !!href && !isDisabled && !isRadio && !isCheckBox;
  var isChecked = isRadio ? radioGroup.value === value : isCheckBox ? !!checked : false;

  var handleClick = function handleClick(e) {
    if (isDisabled) return;
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

  var handleKeyUp = function handleKeyUp(e) {
    if (!isActive) return;
    onKeyUp(e);

    switch (e.key) {
      case Keys.ENTER:
      case Keys.SPACE:
        if (isAnchor) {
          ref.current.click();
        } else {
          handleClick(e);
        }

        break;
    }
  };

  var handleBlur = function handleBlur(e) {
    activeStateBlur(e);
    onBlur(e);
  };

  var modifiers = React.useMemo(function () {
    return Object.freeze({
      type: type,
      disabled: isDisabled,
      hover: isHovering,
      active: isActive,
      checked: isChecked,
      anchor: isAnchor
    });
  }, [type, isDisabled, isHovering, isActive, isChecked, isAnchor]);
  var handlers = attachHandlerProps(_extends({}, activeStateHandlers, {
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onMouseDown: setHover,
    onKeyUp: handleKeyUp,
    onBlur: handleBlur,
    onClick: handleClick
  }), restProps);

  var menuItemProps = _extends({
    role: isRadio ? 'menuitemradio' : isCheckBox ? 'menuitemcheckbox' : 'menuitem',
    'aria-checked': isRadio || isCheckBox ? isChecked : undefined,
    'aria-disabled': isDisabled || undefined,
    tabIndex: isHovering ? 0 : -1
  }, restProps, handlers, {
    ref: useCombinedRef(externalRef, ref),
    className: useBEM({
      block: menuClass,
      element: menuItemClass,
      modifiers: modifiers,
      className: className
    }),
    style: useFlatStyles(styles, modifiers)
  });

  var renderChildren = React.useMemo(function () {
    return safeCall(children, modifiers);
  }, [children, modifiers]);

  if (isAnchor) {
    return /*#__PURE__*/React__default["default"].createElement("li", {
      role: "presentation"
    }, /*#__PURE__*/React__default["default"].createElement("a", _extends({}, menuItemProps, {
      href: href
    }), renderChildren));
  } else {
    return /*#__PURE__*/React__default["default"].createElement("li", menuItemProps, renderChildren);
  }
}), 'MenuItem');
MenuItem.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  value: propTypes.any,
  href: propTypes.string,
  type: /*#__PURE__*/propTypes.oneOf(['checkbox', 'radio']),
  checked: propTypes.bool,
  disabled: propTypes.bool,
  children: /*#__PURE__*/propTypes.oneOfType([propTypes.node, propTypes.func]),
  onClick: propTypes.func
});

var _excluded$4 = ["className", "styles", "disabled", "index", "children", "isHovering", "externalRef"];
var FocusableItem = /*#__PURE__*/withHovering( /*#__PURE__*/React.memo(function FocusableItem(_ref) {
  var className = _ref.className,
      styles = _ref.styles,
      disabled = _ref.disabled,
      index = _ref.index,
      children = _ref.children,
      isHovering = _ref.isHovering,
      externalRef = _ref.externalRef,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded$4);

  var isDisabled = !!disabled;
  validateIndex(index, isDisabled, children);
  var ref = React.useRef(null);

  var _useItemState = useItemState(ref, index, isHovering, isDisabled),
      setHover = _useItemState.setHover,
      onBlur = _useItemState.onBlur,
      onMouseEnter = _useItemState.onMouseEnter,
      _onMouseLeave = _useItemState.onMouseLeave;

  var _useContext = React.useContext(EventHandlersContext),
      handleClose = _useContext.handleClose;

  var modifiers = React.useMemo(function () {
    return Object.freeze({
      disabled: isDisabled,
      hover: isHovering,
      focusable: true
    });
  }, [isDisabled, isHovering]);
  var renderChildren = React.useMemo(function () {
    return safeCall(children, _extends({}, modifiers, {
      ref: ref,
      closeMenu: handleClose
    }));
  }, [children, modifiers, handleClose]);
  var handlers = attachHandlerProps({
    onMouseEnter: onMouseEnter,
    onMouseLeave: function onMouseLeave(e) {
      return _onMouseLeave(e, true);
    },
    onFocus: setHover,
    onBlur: onBlur
  }, restProps);
  return /*#__PURE__*/React__default["default"].createElement("li", _extends({
    "aria-disabled": isDisabled || undefined,
    role: "menuitem",
    tabIndex: "-1"
  }, restProps, handlers, {
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: menuItemClass,
      modifiers: modifiers,
      className: className
    }),
    style: useFlatStyles(styles, modifiers)
  }), renderChildren);
}), 'FocusableItem');
FocusableItem.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  disabled: propTypes.bool,
  children: propTypes.func
});

var _excluded$3 = ["className", "styles"];
var MenuDivider = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function MenuDivider(_ref, externalRef) {
  var className = _ref.className,
      styles = _ref.styles,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded$3);

  return /*#__PURE__*/React__default["default"].createElement("li", _extends({
    role: "separator"
  }, restProps, {
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: menuDividerClass,
      className: className
    }),
    style: useFlatStyles(styles)
  }));
}));
MenuDivider.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes());

var _excluded$2 = ["className", "styles"];
var MenuHeader = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function MenuHeader(_ref, externalRef) {
  var className = _ref.className,
      styles = _ref.styles,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded$2);

  return /*#__PURE__*/React__default["default"].createElement("li", _extends({
    role: "presentation"
  }, restProps, {
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: menuHeaderClass,
      className: className
    }),
    style: useFlatStyles(styles)
  }));
}));
MenuHeader.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes());

var _excluded$1 = ["className", "styles", "takeOverflow"];
var MenuGroup = /*#__PURE__*/defineName( /*#__PURE__*/React.forwardRef(function MenuGroup(_ref, externalRef) {
  var className = _ref.className,
      styles = _ref.styles,
      takeOverflow = _ref.takeOverflow,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  var ref = React.useRef(null);

  var _useState = React.useState(),
      overflowStyles = _useState[0],
      setOverflowStyles = _useState[1];

  var _useContext = React.useContext(MenuListContext),
      overflow = _useContext.overflow,
      overflowAmt = _useContext.overflowAmt;

  useIsomorphicLayoutEffect(function () {
    var maxHeight;

    if (takeOverflow && overflowAmt >= 0) {
      maxHeight = ref.current.getBoundingClientRect().height - overflowAmt;
      if (maxHeight < 0) maxHeight = 0;
    }

    setOverflowStyles(maxHeight >= 0 ? {
      maxHeight: maxHeight,
      overflow: overflow
    } : undefined);
  }, [takeOverflow, overflow, overflowAmt]);
  useIsomorphicLayoutEffect(function () {
    if (overflowStyles) ref.current.scrollTop = 0;
  }, [overflowStyles]);
  return /*#__PURE__*/React__default["default"].createElement("div", _extends({}, restProps, {
    ref: useCombinedRef(externalRef, ref),
    className: useBEM({
      block: menuClass,
      element: menuGroupClass,
      className: className
    }),
    style: _extends({}, useFlatStyles(styles), overflowStyles)
  }));
}), 'MenuGroup');
MenuGroup.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  takeOverflow: propTypes.bool
});

var _excluded = ["aria-label", "className", "styles", "name", "value", "onRadioChange"];
var MenuRadioGroup = /*#__PURE__*/defineName( /*#__PURE__*/React.forwardRef(function MenuRadioGroup(_ref, externalRef) {
  var ariaLabel = _ref['aria-label'],
      className = _ref.className,
      styles = _ref.styles,
      name = _ref.name,
      value = _ref.value,
      onRadioChange = _ref.onRadioChange,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  var contextValue = React.useMemo(function () {
    return {
      name: name,
      value: value,
      onRadioChange: onRadioChange
    };
  }, [name, value, onRadioChange]);
  return /*#__PURE__*/React__default["default"].createElement(RadioGroupContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React__default["default"].createElement("li", {
    role: "presentation"
  }, /*#__PURE__*/React__default["default"].createElement("ul", _extends({
    role: "group",
    "aria-label": ariaLabel || name || 'Radio group'
  }, restProps, {
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: radioGroupClass,
      className: className
    }),
    style: useFlatStyles(styles)
  }))));
}), 'MenuRadioGroup');
MenuRadioGroup.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  name: propTypes.string,
  value: propTypes.any,
  onRadioChange: propTypes.func
});

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
exports.applyHOC = applyHOC;
exports.applyStatics = applyStatics;
exports.useMenuState = useMenuState;
