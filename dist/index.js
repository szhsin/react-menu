'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var reactDom = require('react-dom');
var reactTransitionState = require('react-transition-state');

const useBEM = ({
  block,
  element,
  modifiers,
  className
}) => react.useMemo(() => {
  const blockElement = element ? `${block}__${element}` : block;
  let classString = blockElement;
  modifiers && Object.keys(modifiers).forEach(name => {
    const value = modifiers[name];
    if (value) classString += ` ${blockElement}--${value === true ? name : `${name}-${value}`}`;
  });
  let expandedClassName = typeof className === 'function' ? className(modifiers) : className;
  if (typeof expandedClassName === 'string') {
    expandedClassName = expandedClassName.trim();
    if (expandedClassName) classString += ` ${expandedClassName}`;
  }
  return classString;
}, [block, element, modifiers, className]);

const useClick = (state, onToggle) => {
  if (process.env.NODE_ENV !== 'production' && typeof onToggle !== 'function') {
    throw new Error('[React-Menu] useClick/useHover requires a function in the second parameter.');
  }
  const [skipOpen] = react.useState({});
  return {
    onMouseDown: () => {
      skipOpen.v = state && state !== 'closed';
    },
    onClick: e => skipOpen.v ? skipOpen.v = false : onToggle(true, e)
  };
};

function setRef(ref, instance) {
  typeof ref === 'function' ? ref(instance) : ref.current = instance;
}
const useCombinedRef = (refA, refB) => react.useMemo(() => {
  if (!refA) return refB;
  if (!refB) return refA;
  return instance => {
    setRef(refA, instance);
    setRef(refB, instance);
  };
}, [refA, refB]);

const useHover = (isOpen, onToggle, {
  openDelay = 100,
  closeDelay = 300
} = {}) => {
  const [config] = react.useState({});
  const clearTimer = () => clearTimeout(config.t);
  const delayAction = toOpen => e => {
    clearTimer();
    config.t = setTimeout(() => onToggle(toOpen, e), toOpen ? openDelay : closeDelay);
  };
  const props = {
    onMouseEnter: delayAction(true),
    onMouseLeave: delayAction(false)
  };
  return {
    anchorProps: {
      ...props,
      ...useClick(isOpen, onToggle)
    },
    hoverProps: {
      ...props,
      onMouseEnter: clearTimer
    }
  };
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? react.useLayoutEffect : react.useEffect;

const menuContainerClass = 'szh-menu-container';
const menuClass = 'szh-menu';
const menuButtonClass = 'szh-menu-button';
const menuArrowClass = 'arrow';
const menuItemClass = 'item';
const menuDividerClass = 'divider';
const menuHeaderClass = 'header';
const menuGroupClass = 'group';
const subMenuClass = 'submenu';
const radioGroupClass = 'radio-group';
const HoverItemContext = /*#__PURE__*/react.createContext();
const MenuListItemContext = /*#__PURE__*/react.createContext({});
const MenuListContext = /*#__PURE__*/react.createContext({});
const EventHandlersContext = /*#__PURE__*/react.createContext({});
const RadioGroupContext = /*#__PURE__*/react.createContext({});
const SettingsContext = /*#__PURE__*/react.createContext({});
const Keys = /*#__PURE__*/Object.freeze({
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
const HoverActionTypes = /*#__PURE__*/Object.freeze({
  RESET: 0,
  SET: 1,
  UNSET: 2,
  INCREASE: 3,
  DECREASE: 4,
  FIRST: 5,
  LAST: 6,
  SET_INDEX: 7
});
const CloseReason = /*#__PURE__*/Object.freeze({
  CLICK: 'click',
  CANCEL: 'cancel',
  BLUR: 'blur',
  SCROLL: 'scroll'
});
const FocusPositions = /*#__PURE__*/Object.freeze({
  FIRST: 'first',
  LAST: 'last'
});
const MenuStateMap = /*#__PURE__*/Object.freeze({
  entering: 'opening',
  entered: 'open',
  exiting: 'closing',
  exited: 'closed'
});
const positionAbsolute = 'absolute';
const roleNone = 'none';
const roleMenuitem = 'menuitem';
const noScrollFocus = {
  preventScroll: true
};

const isMenuOpen = state => !!state && state[0] === 'o';
const batchedUpdates = reactDom.unstable_batchedUpdates;
const getTransition = (transition, name) => transition === true || !!(transition && transition[name]);
const safeCall = (fn, arg) => typeof fn === 'function' ? fn(arg) : fn;
const internalKey = '_szhsinMenu';
const getName = component => component[internalKey];
const defineName = (name, component) => Object.defineProperty(component, internalKey, {
  value: name
});
const mergeProps = (target, source) => {
  source && Object.keys(source).forEach(key => {
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
const parsePadding = paddingStr => {
  if (typeof paddingStr !== 'string') return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
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
const getScrollAncestor = node => {
  while (node) {
    node = node.parentNode;
    if (!node || node === document.body || !node.parentNode) return;
    const {
      overflow,
      overflowX,
      overflowY
    } = getComputedStyle(node);
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
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i] === node) return i;
  }
  return -1;
}

const createSubmenuCtx = () => {
  let timer,
    count = 0;
  return {
    toggle: isOpen => {
      isOpen ? count++ : count--;
      count = Math.max(count, 0);
    },
    on: (closeDelay, pending, settled) => {
      if (count) {
        if (!timer) timer = setTimeout(() => {
          timer = 0;
          pending();
        }, closeDelay);
      } else {
        settled?.();
      }
    },
    off: () => {
      if (timer) {
        clearTimeout(timer);
        timer = 0;
      }
    }
  };
};

const withHovering = (name, WrappedComponent) => {
  const Component = /*#__PURE__*/react.memo(WrappedComponent);
  const WithHovering = /*#__PURE__*/react.forwardRef((props, ref) => {
    const itemRef = react.useRef(null);
    return /*#__PURE__*/jsxRuntime.jsx(Component, {
      ...props,
      itemRef: itemRef,
      externalRef: ref,
      isHovering: react.useContext(HoverItemContext) === itemRef.current
    });
  });
  WithHovering.displayName = `WithHovering(${name})`;
  return WithHovering;
};

const useItems = menuRef => {
  const [hoverItem, setHoverItem] = react.useState();
  const stateRef = react.useRef({
    items: [],
    hoverIndex: -1,
    sorted: false
  });
  const mutableState = stateRef.current;
  const updateItems = react.useCallback((item, isMounted) => {
    const {
      items
    } = mutableState;
    if (!item) {
      mutableState.items = [];
    } else if (isMounted) {
      items.push(item);
    } else {
      const index = items.indexOf(item);
      if (index > -1) {
        items.splice(index, 1);
        if (item.contains(document.activeElement)) {
          menuRef.current.focus(noScrollFocus);
          setHoverItem();
        }
      }
    }
    mutableState.hoverIndex = -1;
    mutableState.sorted = false;
  }, [mutableState, menuRef]);
  const dispatch = react.useCallback((actionType, item, nextIndex) => {
    const {
      items,
      hoverIndex
    } = mutableState;
    const sortItems = () => {
      if (mutableState.sorted) return;
      const orderedNodes = menuRef.current.querySelectorAll('.szh-menu__item');
      items.sort((a, b) => indexOfNode(orderedNodes, a) - indexOfNode(orderedNodes, b));
      mutableState.sorted = true;
    };
    let index = -1,
      newItem = undefined;
    switch (actionType) {
      case HoverActionTypes.RESET:
        break;
      case HoverActionTypes.SET:
        newItem = item;
        break;
      case HoverActionTypes.UNSET:
        newItem = prevItem => prevItem === item ? undefined : prevItem;
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
        if (process.env.NODE_ENV !== 'production') throw new Error(`[React-Menu] Unknown hover action type: ${actionType}`);
    }
    if (!newItem) index = -1;
    setHoverItem(newItem);
    mutableState.hoverIndex = index;
  }, [menuRef, mutableState]);
  return {
    hoverItem,
    dispatch,
    updateItems
  };
};

const useItemEffect = (isDisabled, itemRef, updateItems) => {
  useIsomorphicLayoutEffect(() => {
    if (process.env.NODE_ENV !== 'production' && !updateItems) {
      throw new Error(`[React-Menu] This menu item or submenu should be rendered under a menu: ${itemRef.current.outerHTML}`);
    }
    if (isDisabled) return;
    const item = itemRef.current;
    updateItems(item, true);
    return () => {
      updateItems(item);
    };
  }, [isDisabled, itemRef, updateItems]);
};

const useItemState = (itemRef, focusRef, isHovering, isDisabled) => {
  const {
    submenuCloseDelay
  } = react.useContext(SettingsContext);
  const {
    isParentOpen,
    submenuCtx,
    dispatch,
    updateItems
  } = react.useContext(MenuListItemContext);
  const setHover = () => {
    !isHovering && !isDisabled && dispatch(HoverActionTypes.SET, itemRef.current);
  };
  const unsetHover = () => {
    !isDisabled && dispatch(HoverActionTypes.UNSET, itemRef.current);
  };
  const onBlur = e => {
    if (isHovering && !e.currentTarget.contains(e.relatedTarget)) unsetHover();
  };
  const onPointerMove = e => {
    if (!isDisabled) {
      e.stopPropagation();
      submenuCtx.on(submenuCloseDelay, setHover, setHover);
    }
  };
  const onPointerLeave = (_, keepHover) => {
    submenuCtx.off();
    !keepHover && unsetHover();
  };
  useItemEffect(isDisabled, itemRef, updateItems);
  react.useEffect(() => {
    if (isHovering && isParentOpen) {
      focusRef.current && focusRef.current.focus();
    }
  }, [focusRef, isHovering, isParentOpen]);
  return {
    setHover,
    onBlur,
    onPointerMove,
    onPointerLeave
  };
};

const useMenuChange = (onMenuChange, isOpen) => {
  const prevOpen = react.useRef(isOpen);
  react.useEffect(() => {
    if (prevOpen.current !== isOpen) safeCall(onMenuChange, {
      open: isOpen
    });
    prevOpen.current = isOpen;
  }, [onMenuChange, isOpen]);
};

const useMenuState = ({
  initialOpen,
  initialMounted,
  unmountOnClose,
  transition,
  transitionTimeout = 500
} = {}) => {
  const [{
    status
  }, toggleMenu, endTransition] = reactTransitionState.useTransition({
    initialEntered: initialOpen,
    mountOnEnter: !initialMounted,
    unmountOnExit: unmountOnClose,
    timeout: transitionTimeout,
    enter: getTransition(transition, 'open'),
    exit: getTransition(transition, 'close')
  });
  return [{
    state: MenuStateMap[status],
    endTransition
  }, toggleMenu];
};

const useMenuStateAndFocus = options => {
  const [menuProps, toggleMenu] = useMenuState(options);
  const [menuItemFocus, setMenuItemFocus] = react.useState();
  const openMenu = (position, alwaysUpdate) => {
    setMenuItemFocus({
      position,
      alwaysUpdate
    });
    toggleMenu(true);
  };
  return [{
    menuItemFocus,
    ...menuProps
  }, toggleMenu, openMenu];
};

const MenuButton = /*#__PURE__*/defineName('MenuButton', /*#__PURE__*/react.forwardRef(function MenuButton({
  className,
  isOpen,
  disabled,
  children,
  ...restProps
}, ref) {
  const modifiers = react.useMemo(() => ({
    open: isOpen
  }), [isOpen]);
  return /*#__PURE__*/jsxRuntime.jsx("button", {
    "aria-haspopup": true,
    "aria-expanded": isOpen,
    "aria-disabled": disabled || undefined,
    type: "button",
    disabled: disabled,
    ...restProps,
    ref: ref,
    className: useBEM({
      block: menuButtonClass,
      modifiers,
      className
    }),
    children: children
  });
}));

const MenuContainer = ({
  className,
  containerRef,
  containerProps,
  children,
  isOpen,
  theming,
  transition,
  onClose
}) => {
  const itemTransition = getTransition(transition, 'item');
  const onKeyDown = ({
    key
  }) => {
    switch (key) {
      case Keys.ESC:
        safeCall(onClose, {
          key,
          reason: CloseReason.CANCEL
        });
        break;
    }
  };
  const onBlur = e => {
    if (isOpen && !e.currentTarget.contains(e.relatedTarget)) {
      safeCall(onClose, {
        reason: CloseReason.BLUR
      });
    }
  };
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...mergeProps({
      onKeyDown,
      onBlur
    }, containerProps),
    className: useBEM({
      block: menuContainerClass,
      modifiers: react.useMemo(() => ({
        theme: theming,
        itemTransition
      }), [theming, itemTransition]),
      className
    }),
    style: {
      position: 'absolute',
      ...containerProps?.style
    },
    ref: containerRef,
    children: children
  });
};

const getNativeDimension = (transformed, untransformed) => Math.round(transformed) === untransformed ? transformed : untransformed;
const getNormalizedClientRect = element => {
  const rect = element.getBoundingClientRect();
  rect.width = getNativeDimension(rect.width, element.offsetWidth);
  rect.height = getNativeDimension(rect.height, element.offsetHeight);
  return rect;
};

const getPositionHelpers = (containerRef, menuRef, menuScroll, boundingBoxPadding) => {
  const menuRect = getNormalizedClientRect(menuRef.current);
  const containerRect = containerRef.current.getBoundingClientRect();
  const boundingRect = menuScroll === window ? {
    left: 0,
    top: 0,
    right: document.documentElement.clientWidth,
    bottom: window.innerHeight
  } : menuScroll.getBoundingClientRect();
  const padding = parsePadding(boundingBoxPadding);
  const getLeftOverflow = x => x + containerRect.left - boundingRect.left - padding.left;
  const getRightOverflow = x => x + containerRect.left + menuRect.width - boundingRect.right + padding.right;
  const getTopOverflow = y => y + containerRect.top - boundingRect.top - padding.top;
  const getBottomOverflow = y => y + containerRect.top + menuRect.height - boundingRect.bottom + padding.bottom;
  const confineHorizontally = x => {
    let leftOverflow = getLeftOverflow(x);
    if (leftOverflow < 0) {
      x -= leftOverflow;
    } else {
      const rightOverflow = getRightOverflow(x);
      if (rightOverflow > 0) {
        x -= rightOverflow;
        leftOverflow = getLeftOverflow(x);
        if (leftOverflow < 0) x -= leftOverflow;
      }
    }
    return x;
  };
  const confineVertically = y => {
    let topOverflow = getTopOverflow(y);
    if (topOverflow < 0) {
      y -= topOverflow;
    } else {
      const bottomOverflow = getBottomOverflow(y);
      if (bottomOverflow > 0) {
        y -= bottomOverflow;
        topOverflow = getTopOverflow(y);
        if (topOverflow < 0) y -= topOverflow;
      }
    }
    return y;
  };
  return {
    menuRect,
    containerRect,
    getLeftOverflow,
    getRightOverflow,
    getTopOverflow,
    getBottomOverflow,
    confineHorizontally,
    confineVertically
  };
};

const placeArrowVertical = ({
  arrowRef,
  menuY,
  anchorRect,
  containerRect,
  menuRect
}) => {
  let y = anchorRect.top - containerRect.top - menuY + anchorRect.height / 2;
  const offset = arrowRef.current.offsetHeight * 1.25;
  y = Math.max(offset, y);
  y = Math.min(y, menuRect.height - offset);
  return y;
};

const placeLeftorRight = ({
  anchorRect,
  containerRect,
  menuRect,
  placeLeftorRightY,
  placeLeftX,
  placeRightX,
  getLeftOverflow,
  getRightOverflow,
  confineHorizontally,
  confineVertically,
  arrowRef,
  arrow,
  direction,
  position
}) => {
  let computedDirection = direction;
  let y = placeLeftorRightY;
  if (position !== 'initial') {
    y = confineVertically(y);
    if (position === 'anchor') {
      y = Math.min(y, anchorRect.bottom - containerRect.top);
      y = Math.max(y, anchorRect.top - containerRect.top - menuRect.height);
    }
  }
  let x, leftOverflow, rightOverflow;
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
  const arrowY = arrow ? placeArrowVertical({
    menuY: y,
    arrowRef,
    anchorRect,
    containerRect,
    menuRect
  }) : undefined;
  return {
    arrowY,
    x,
    y,
    computedDirection
  };
};

const placeArrowHorizontal = ({
  arrowRef,
  menuX,
  anchorRect,
  containerRect,
  menuRect
}) => {
  let x = anchorRect.left - containerRect.left - menuX + anchorRect.width / 2;
  const offset = arrowRef.current.offsetWidth * 1.25;
  x = Math.max(offset, x);
  x = Math.min(x, menuRect.width - offset);
  return x;
};

const placeToporBottom = ({
  anchorRect,
  containerRect,
  menuRect,
  placeToporBottomX,
  placeTopY,
  placeBottomY,
  getTopOverflow,
  getBottomOverflow,
  confineHorizontally,
  confineVertically,
  arrowRef,
  arrow,
  direction,
  position
}) => {
  let computedDirection = direction === 'top' ? 'top' : 'bottom';
  let x = placeToporBottomX;
  if (position !== 'initial') {
    x = confineHorizontally(x);
    if (position === 'anchor') {
      x = Math.min(x, anchorRect.right - containerRect.left);
      x = Math.max(x, anchorRect.left - containerRect.left - menuRect.width);
    }
  }
  let y, topOverflow, bottomOverflow;
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
  const arrowX = arrow ? placeArrowHorizontal({
    menuX: x,
    arrowRef,
    anchorRect,
    containerRect,
    menuRect
  }) : undefined;
  return {
    arrowX,
    x,
    y,
    computedDirection
  };
};

const positionMenu = ({
  arrow,
  align,
  direction,
  gap,
  shift,
  position,
  anchorRect,
  arrowRef,
  positionHelpers
}) => {
  const {
    menuRect,
    containerRect
  } = positionHelpers;
  const isHorizontal = direction === 'left' || direction === 'right';
  let horizontalOffset = isHorizontal ? gap : shift;
  let verticalOffset = isHorizontal ? shift : gap;
  if (arrow) {
    const arrowElt = arrowRef.current;
    if (isHorizontal) {
      horizontalOffset += arrowElt.offsetWidth;
    } else {
      verticalOffset += arrowElt.offsetHeight;
    }
  }
  const placeLeftX = anchorRect.left - containerRect.left - menuRect.width - horizontalOffset;
  const placeRightX = anchorRect.right - containerRect.left + horizontalOffset;
  const placeTopY = anchorRect.top - containerRect.top - menuRect.height - verticalOffset;
  const placeBottomY = anchorRect.bottom - containerRect.top + verticalOffset;
  let placeToporBottomX, placeLeftorRightY;
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
  const options = {
    ...positionHelpers,
    anchorRect,
    placeLeftX,
    placeRightX,
    placeLeftorRightY,
    placeTopY,
    placeBottomY,
    placeToporBottomX,
    arrowRef,
    arrow,
    direction,
    position
  };
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

const offScreen = -9999;
const MenuList = ({
  ariaLabel,
  menuClassName,
  menuStyle,
  arrow,
  arrowProps = {},
  anchorPoint,
  anchorRef,
  containerRef,
  containerProps,
  externalRef,
  parentScrollingRef,
  align = 'start',
  direction = 'bottom',
  position = 'auto',
  overflow = 'visible',
  setDownOverflow,
  repositionFlag,
  captureFocus = true,
  state,
  endTransition,
  isDisabled,
  menuItemFocus,
  gap = 0,
  shift = 0,
  children,
  onClose,
  focusProps: _1,
  ...restProps
}) => {
  const [menuPosition, setMenuPosition] = react.useState({
    x: offScreen,
    y: offScreen
  });
  const [arrowPosition, setArrowPosition] = react.useState({});
  const [overflowData, setOverflowData] = react.useState();
  const [expandedDirection, setExpandedDirection] = react.useState(direction);
  const [submenuCtx] = react.useState(createSubmenuCtx);
  const [reposSubmenu, forceReposSubmenu] = react.useReducer(c => c + 1, 1);
  const {
    transition,
    boundingBoxRef,
    boundingBoxPadding,
    rootMenuRef,
    rootAnchorRef,
    scrollNodesRef,
    reposition,
    viewScroll,
    submenuCloseDelay
  } = react.useContext(SettingsContext);
  const {
    submenuCtx: parentSubmenuCtx,
    reposSubmenu: reposFlag = repositionFlag
  } = react.useContext(MenuListContext);
  const menuRef = react.useRef();
  const arrowRef = react.useRef();
  const prevOpen = react.useRef(false);
  const {
    hoverItem,
    dispatch,
    updateItems
  } = useItems(menuRef);
  const isOpen = isMenuOpen(state);
  const openTransition = getTransition(transition, 'open');
  const closeTransition = getTransition(transition, 'close');
  const scrollNodes = scrollNodesRef.current;
  const onKeyDown = e => {
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
  const onAnimationEnd = () => {
    if (state === 'closing') {
      setOverflowData();
    }
    safeCall(endTransition);
  };
  const onPointerMove = e => {
    e.stopPropagation();
    submenuCtx.on(submenuCloseDelay, () => {
      dispatch(HoverActionTypes.RESET);
      menuRef.current.focus(noScrollFocus);
    });
  };
  const onPointerLeave = e => {
    if (e.target === e.currentTarget) submenuCtx.off();
  };
  const handlePosition = react.useCallback(noOverflowCheck => {
    const anchorRect = anchorRef ? anchorRef.current?.getBoundingClientRect() : anchorPoint ? {
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
    const positionHelpers = getPositionHelpers(containerRef, menuRef, scrollNodes.menu, boundingBoxPadding);
    let {
      arrowX,
      arrowY,
      x,
      y,
      computedDirection
    } = positionMenu({
      arrow,
      align,
      direction,
      gap,
      shift,
      position,
      anchorRect,
      arrowRef,
      positionHelpers
    });
    const {
      menuRect
    } = positionHelpers;
    const menuHeight = menuRect.height;
    if (!noOverflowCheck && overflow !== 'visible') {
      const {
        getTopOverflow,
        getBottomOverflow
      } = positionHelpers;
      let height, overflowAmt;
      const bottomOverflow = getBottomOverflow(y);
      if (bottomOverflow > 0) {
        height = menuHeight - bottomOverflow;
        overflowAmt = bottomOverflow;
      } else {
        const topOverflow = getTopOverflow(y);
        if (topOverflow < 0) {
          height = menuHeight + topOverflow;
          overflowAmt = 0 - topOverflow;
          if (height >= 0) y -= topOverflow;
        }
      }
      if (height >= 0) {
        setOverflowData({
          height,
          overflowAmt
        });
      }
    }
    if (arrow) setArrowPosition({
      x: arrowX,
      y: arrowY
    });
    setMenuPosition({
      x,
      y
    });
    setExpandedDirection(computedDirection);
  }, [arrow, align, boundingBoxPadding, direction, gap, shift, position, overflow, anchorPoint, anchorRef, containerRef, boundingBoxRef, rootMenuRef, scrollNodes]);
  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      handlePosition();
      if (prevOpen.current) forceReposSubmenu();
    }
    prevOpen.current = isOpen;
  }, [isOpen, handlePosition, reposFlag]);
  useIsomorphicLayoutEffect(() => {
    if (overflowData && !setDownOverflow) menuRef.current.scrollTop = 0;
  }, [overflowData, setDownOverflow]);
  useIsomorphicLayoutEffect(() => updateItems, [updateItems]);
  react.useEffect(() => {
    let {
      menu: menuScroll
    } = scrollNodes;
    if (!isOpen || !menuScroll) return;
    menuScroll = menuScroll.addEventListener ? menuScroll : window;
    if (!scrollNodes.anchors) {
      scrollNodes.anchors = [];
      let anchorScroll = getScrollAncestor(rootAnchorRef && rootAnchorRef.current);
      while (anchorScroll && anchorScroll !== menuScroll) {
        scrollNodes.anchors.push(anchorScroll);
        anchorScroll = getScrollAncestor(anchorScroll);
      }
    }
    let scroll = viewScroll;
    if (scrollNodes.anchors.length && scroll === 'initial') scroll = 'auto';
    if (scroll === 'initial') return;
    const handleScroll = () => {
      if (scroll === 'auto') {
        batchedUpdates(() => handlePosition(true));
      } else {
        safeCall(onClose, {
          reason: CloseReason.SCROLL
        });
      }
    };
    const scrollObservers = scrollNodes.anchors.concat(viewScroll !== 'initial' ? menuScroll : []);
    scrollObservers.forEach(o => o.addEventListener('scroll', handleScroll));
    return () => scrollObservers.forEach(o => o.removeEventListener('scroll', handleScroll));
  }, [rootAnchorRef, scrollNodes, isOpen, onClose, viewScroll, handlePosition]);
  const hasOverflow = !!overflowData && overflowData.overflowAmt > 0;
  react.useEffect(() => {
    if (hasOverflow || !isOpen || !parentScrollingRef) return;
    const handleScroll = () => batchedUpdates(handlePosition);
    const parentScroll = parentScrollingRef.current;
    parentScroll.addEventListener('scroll', handleScroll);
    return () => parentScroll.removeEventListener('scroll', handleScroll);
  }, [isOpen, hasOverflow, parentScrollingRef, handlePosition]);
  react.useEffect(() => {
    if (!isOpen || typeof ResizeObserver !== 'function' || reposition === 'initial') return;
    const targetList = [];
    const resizeObserver = new ResizeObserver(entries => entries.forEach(({
      target
    }) => {
      if (targetList.indexOf(target) < 0) {
        targetList.push(target);
      } else {
        reactDom.flushSync(() => {
          handlePosition();
          forceReposSubmenu();
        });
      }
    }));
    const resizeObserverOptions = {
      box: 'border-box'
    };
    resizeObserver.observe(menuRef.current, resizeObserverOptions);
    const anchor = anchorRef?.current;
    anchor && resizeObserver.observe(anchor, resizeObserverOptions);
    return () => resizeObserver.disconnect();
  }, [isOpen, reposition, anchorRef, handlePosition]);
  react.useEffect(() => {
    if (!isOpen) {
      dispatch(HoverActionTypes.RESET);
      if (!closeTransition) setOverflowData();
      return;
    }
    const {
      position,
      alwaysUpdate
    } = menuItemFocus || {};
    const setItemFocus = () => {
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
      const id = setTimeout(() => {
        const menuElt = menuRef.current;
        if (menuElt && !menuElt.contains(document.activeElement)) {
          menuElt.focus(noScrollFocus);
          setItemFocus();
        }
      }, openTransition ? 170 : 100);
      return () => clearTimeout(id);
    }
  }, [isOpen, openTransition, closeTransition, captureFocus, menuItemFocus, dispatch]);
  const itemContext = react.useMemo(() => ({
    isParentOpen: isOpen,
    submenuCtx,
    dispatch,
    updateItems
  }), [isOpen, submenuCtx, dispatch, updateItems]);
  let maxHeight, overflowAmt;
  if (overflowData) {
    setDownOverflow ? overflowAmt = overflowData.overflowAmt : maxHeight = overflowData.height;
  }
  const listContext = react.useMemo(() => ({
    reposSubmenu,
    submenuCtx,
    overflow,
    overflowAmt,
    parentMenuRef: menuRef,
    parentDir: expandedDirection
  }), [reposSubmenu, submenuCtx, overflow, overflowAmt, expandedDirection]);
  const overflowStyle = maxHeight >= 0 ? {
    maxHeight,
    overflow
  } : undefined;
  const modifiers = react.useMemo(() => ({
    state,
    align,
    dir: expandedDirection
  }), [state, align, expandedDirection]);
  const arrowModifiers = react.useMemo(() => ({
    dir: expandedDirection
  }), [expandedDirection]);
  const _arrowClassName = useBEM({
    block: menuClass,
    element: menuArrowClass,
    modifiers: arrowModifiers,
    className: arrowProps.className
  });
  const menu = /*#__PURE__*/jsxRuntime.jsxs("ul", {
    role: "menu",
    "aria-label": ariaLabel,
    ...commonProps(isDisabled),
    ...mergeProps({
      onPointerEnter: parentSubmenuCtx?.off,
      onPointerMove,
      onPointerLeave,
      onKeyDown,
      onAnimationEnd
    }, restProps),
    ref: useCombinedRef(externalRef, menuRef),
    className: useBEM({
      block: menuClass,
      modifiers,
      className: menuClassName
    }),
    style: {
      ...menuStyle,
      ...overflowStyle,
      margin: 0,
      display: state === 'closed' ? 'none' : undefined,
      position: positionAbsolute,
      left: menuPosition.x,
      top: menuPosition.y
    },
    children: [arrow && /*#__PURE__*/jsxRuntime.jsx("li", {
      "aria-hidden": true,
      ...arrowProps,
      className: _arrowClassName,
      style: {
        display: 'block',
        position: positionAbsolute,
        left: arrowPosition.x,
        top: arrowPosition.y,
        ...arrowProps.style
      },
      ref: arrowRef
    }), /*#__PURE__*/jsxRuntime.jsx(MenuListContext.Provider, {
      value: listContext,
      children: /*#__PURE__*/jsxRuntime.jsx(MenuListItemContext.Provider, {
        value: itemContext,
        children: /*#__PURE__*/jsxRuntime.jsx(HoverItemContext.Provider, {
          value: hoverItem,
          children: safeCall(children, modifiers)
        })
      })
    })]
  });
  return containerProps ? /*#__PURE__*/jsxRuntime.jsx(MenuContainer, {
    ...containerProps,
    isOpen: isOpen,
    children: menu
  }) : menu;
};

const ControlledMenu = /*#__PURE__*/react.forwardRef(function ControlledMenu({
  'aria-label': ariaLabel,
  className,
  containerProps,
  initialMounted,
  unmountOnClose,
  transition,
  transitionTimeout,
  boundingBoxRef,
  boundingBoxPadding,
  reposition = 'auto',
  submenuOpenDelay = 300,
  submenuCloseDelay = 150,
  viewScroll = 'initial',
  portal,
  theming,
  onItemClick,
  ...restProps
}, externalRef) {
  const containerRef = react.useRef(null);
  const scrollNodesRef = react.useRef({});
  const {
    anchorRef,
    state,
    onClose
  } = restProps;
  const settings = react.useMemo(() => ({
    initialMounted,
    unmountOnClose,
    transition,
    transitionTimeout,
    boundingBoxRef,
    boundingBoxPadding,
    rootMenuRef: containerRef,
    rootAnchorRef: anchorRef,
    scrollNodesRef,
    reposition,
    viewScroll,
    submenuOpenDelay,
    submenuCloseDelay
  }), [initialMounted, unmountOnClose, transition, transitionTimeout, anchorRef, boundingBoxRef, boundingBoxPadding, reposition, viewScroll, submenuOpenDelay, submenuCloseDelay]);
  const eventHandlers = react.useMemo(() => ({
    handleClick(event, isCheckorRadio) {
      if (!event.stopPropagation) safeCall(onItemClick, event);
      let keepOpen = event.keepOpen;
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
    handleClose(key) {
      safeCall(onClose, {
        key,
        reason: CloseReason.CLICK
      });
    }
  }), [onItemClick, onClose]);
  if (!state) return null;
  const menuList = /*#__PURE__*/jsxRuntime.jsx(SettingsContext.Provider, {
    value: settings,
    children: /*#__PURE__*/jsxRuntime.jsx(EventHandlersContext.Provider, {
      value: eventHandlers,
      children: /*#__PURE__*/jsxRuntime.jsx(MenuList, {
        ...restProps,
        ariaLabel: ariaLabel || 'Menu',
        externalRef: externalRef,
        containerRef: containerRef,
        containerProps: {
          className,
          containerRef,
          containerProps,
          theming,
          transition,
          onClose
        }
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

const Menu = /*#__PURE__*/react.forwardRef(function Menu({
  'aria-label': ariaLabel,
  captureFocus: _,
  initialOpen: _1,
  menuButton,
  instanceRef,
  onMenuChange,
  ...restProps
}, externalRef) {
  const [stateProps, toggleMenu, openMenu] = useMenuStateAndFocus(restProps);
  const {
    state
  } = stateProps;
  const isOpen = isMenuOpen(state);
  const buttonRef = react.useRef(null);
  const anchorProps = useClick(state, (_, e) => openMenu(!e.detail ? FocusPositions.FIRST : undefined));
  const handleClose = react.useCallback(e => {
    toggleMenu(false);
    if (e.key) buttonRef.current.focus();
  }, [toggleMenu]);
  const onKeyDown = e => {
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
  const button = safeCall(menuButton, {
    open: isOpen
  });
  if (!button || !button.type) throw new Error('Menu requires a menuButton prop.');
  const buttonProps = {
    ref: useCombinedRef(button.ref, buttonRef),
    ...mergeProps({
      onKeyDown,
      ...anchorProps
    }, button.props)
  };
  if (getName(button.type) === 'MenuButton') {
    buttonProps.isOpen = isOpen;
  }
  const renderButton = /*#__PURE__*/react.cloneElement(button, buttonProps);
  useMenuChange(onMenuChange, isOpen);
  react.useImperativeHandle(instanceRef, () => ({
    openMenu,
    closeMenu: () => toggleMenu(false)
  }));
  return /*#__PURE__*/jsxRuntime.jsxs(react.Fragment, {
    children: [renderButton, /*#__PURE__*/jsxRuntime.jsx(ControlledMenu, {
      ...restProps,
      ...stateProps,
      "aria-label": ariaLabel || (typeof button.props.children === 'string' ? button.props.children : 'Menu'),
      anchorRef: buttonRef,
      ref: externalRef,
      onClose: handleClose
    })]
  });
});

const SubMenu = /*#__PURE__*/withHovering('SubMenu', function SubMenu({
  'aria-label': ariaLabel,
  className,
  disabled,
  direction,
  label,
  openTrigger,
  onMenuChange,
  isHovering,
  instanceRef,
  itemRef,
  captureFocus: _1,
  repositionFlag: _2,
  itemProps = {},
  ...restProps
}) {
  const settings = react.useContext(SettingsContext);
  const {
    rootMenuRef,
    submenuOpenDelay,
    submenuCloseDelay
  } = settings;
  const {
    parentMenuRef,
    parentDir,
    overflow: parentOverflow
  } = react.useContext(MenuListContext);
  const {
    isParentOpen,
    submenuCtx,
    dispatch,
    updateItems
  } = react.useContext(MenuListItemContext);
  const isPortal = parentOverflow !== 'visible';
  const [stateProps, toggleMenu, _openMenu] = useMenuStateAndFocus(settings);
  const {
    state
  } = stateProps;
  const isDisabled = !!disabled;
  const isOpen = isMenuOpen(state);
  const containerRef = react.useRef(null);
  const [timerId] = react.useState({
    v: 0
  });
  const stopTimer = () => {
    submenuCtx.off();
    if (timerId.v) {
      clearTimeout(timerId.v);
      timerId.v = 0;
    }
  };
  const openMenu = (...args) => {
    stopTimer();
    setHover();
    !isDisabled && _openMenu(...args);
  };
  const setHover = () => !isHovering && !isDisabled && dispatch(HoverActionTypes.SET, itemRef.current);
  const delayOpen = delay => {
    setHover();
    if (!openTrigger) timerId.v = setTimeout(() => batchedUpdates(openMenu), Math.max(delay, 0));
  };
  const onPointerMove = e => {
    if (isDisabled) return;
    e.stopPropagation();
    if (timerId.v || isOpen) return;
    submenuCtx.on(submenuCloseDelay, () => delayOpen(submenuOpenDelay - submenuCloseDelay), () => delayOpen(submenuOpenDelay));
  };
  const onPointerLeave = () => {
    stopTimer();
    if (!isOpen) dispatch(HoverActionTypes.UNSET, itemRef.current);
  };
  const onKeyDown = e => {
    if (!isHovering) return;
    switch (e.key) {
      case Keys.ENTER:
        e.preventDefault();
      case Keys.SPACE:
      case Keys.RIGHT:
        openTrigger !== 'none' && openMenu(FocusPositions.FIRST);
    }
  };
  const onKeyDownOfRoot = e => {
    let handled = false;
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
  useItemEffect(isDisabled, itemRef, updateItems);
  useMenuChange(onMenuChange, isOpen);
  react.useEffect(() => submenuCtx.toggle(isOpen), [submenuCtx, isOpen]);
  react.useEffect(() => () => clearTimeout(timerId.v), [timerId]);
  react.useEffect(() => {
    if (isHovering && isParentOpen) {
      itemRef.current.focus();
    } else {
      toggleMenu(false);
    }
  }, [isHovering, isParentOpen, toggleMenu, itemRef]);
  react.useImperativeHandle(instanceRef, () => ({
    openMenu: (...args) => {
      isParentOpen && openMenu(...args);
    },
    closeMenu: () => {
      if (isOpen) {
        itemRef.current.focus();
        toggleMenu(false);
      }
    }
  }));
  const modifiers = react.useMemo(() => ({
    open: isOpen,
    hover: isHovering,
    disabled: isDisabled,
    submenu: true
  }), [isOpen, isHovering, isDisabled]);
  const {
    ref: externalItemRef,
    className: itemClassName,
    ...restItemProps
  } = itemProps;
  const mergedItemProps = mergeProps({
    onPointerEnter: submenuCtx.off,
    onPointerMove,
    onPointerLeave,
    onKeyDown,
    onClick: () => openTrigger !== 'none' && openMenu()
  }, restItemProps);
  const getMenuList = () => {
    const menuList = /*#__PURE__*/jsxRuntime.jsx(MenuList, {
      ...restProps,
      ...stateProps,
      ariaLabel: ariaLabel || (typeof label === 'string' ? label : 'Submenu'),
      anchorRef: itemRef,
      containerRef: isPortal ? rootMenuRef : containerRef,
      direction: direction || (parentDir === 'right' || parentDir === 'left' ? parentDir : 'right'),
      parentScrollingRef: isPortal && parentMenuRef,
      isDisabled: isDisabled
    });
    const container = rootMenuRef.current;
    return isPortal && container ? /*#__PURE__*/reactDom.createPortal(menuList, container) : menuList;
  };
  return /*#__PURE__*/jsxRuntime.jsxs("li", {
    className: useBEM({
      block: menuClass,
      element: subMenuClass,
      className
    }),
    style: {
      position: 'relative'
    },
    role: roleNone,
    ref: containerRef,
    onKeyDown: onKeyDownOfRoot,
    children: [/*#__PURE__*/jsxRuntime.jsx("div", {
      role: roleMenuitem,
      "aria-haspopup": true,
      "aria-expanded": isOpen,
      ...commonProps(isDisabled, isHovering),
      ...mergedItemProps,
      ref: useCombinedRef(externalItemRef, itemRef),
      className: useBEM({
        block: menuClass,
        element: menuItemClass,
        modifiers,
        className: itemClassName
      }),
      children: react.useMemo(() => safeCall(label, modifiers), [label, modifiers])
    }), state && getMenuList()]
  });
});

const MenuItem = /*#__PURE__*/withHovering('MenuItem', function MenuItem({
  className,
  value,
  href,
  type,
  checked,
  disabled,
  children,
  onClick,
  isHovering,
  itemRef,
  externalRef,
  ...restProps
}) {
  const isDisabled = !!disabled;
  const {
    setHover,
    ...restStateProps
  } = useItemState(itemRef, itemRef, isHovering, isDisabled);
  const eventHandlers = react.useContext(EventHandlersContext);
  const radioGroup = react.useContext(RadioGroupContext);
  const isRadio = type === 'radio';
  const isCheckBox = type === 'checkbox';
  const isAnchor = !!href && !isDisabled && !isRadio && !isCheckBox;
  const isChecked = isRadio ? radioGroup.value === value : isCheckBox ? !!checked : false;
  const handleClick = e => {
    if (isDisabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    const event = {
      value,
      syntheticEvent: e
    };
    if (e.key !== undefined) event.key = e.key;
    if (isCheckBox) event.checked = !isChecked;
    if (isRadio) event.name = radioGroup.name;
    safeCall(onClick, event);
    if (isRadio) safeCall(radioGroup.onRadioChange, event);
    eventHandlers.handleClick(event, isCheckBox || isRadio);
  };
  const handleKeyDown = e => {
    if (!isHovering) return;
    switch (e.key) {
      case Keys.ENTER:
        e.preventDefault();
      case Keys.SPACE:
        isAnchor ? itemRef.current.click() : handleClick(e);
    }
  };
  const modifiers = react.useMemo(() => ({
    type,
    disabled: isDisabled,
    hover: isHovering,
    checked: isChecked,
    anchor: isAnchor
  }), [type, isDisabled, isHovering, isChecked, isAnchor]);
  const mergedProps = mergeProps({
    ...restStateProps,
    onPointerDown: setHover,
    onKeyDown: handleKeyDown,
    onClick: handleClick
  }, restProps);
  const menuItemProps = {
    role: isRadio ? 'menuitemradio' : isCheckBox ? 'menuitemcheckbox' : roleMenuitem,
    'aria-checked': isRadio || isCheckBox ? isChecked : undefined,
    ...commonProps(isDisabled, isHovering),
    ...mergedProps,
    ref: useCombinedRef(externalRef, itemRef),
    className: useBEM({
      block: menuClass,
      element: menuItemClass,
      modifiers,
      className
    }),
    children: react.useMemo(() => safeCall(children, modifiers), [children, modifiers])
  };
  return isAnchor ? /*#__PURE__*/jsxRuntime.jsx("li", {
    role: roleNone,
    children: /*#__PURE__*/jsxRuntime.jsx("a", {
      href: href,
      ...menuItemProps
    })
  }) : /*#__PURE__*/jsxRuntime.jsx("li", {
    ...menuItemProps
  });
});

const FocusableItem = /*#__PURE__*/withHovering('FocusableItem', function FocusableItem({
  className,
  disabled,
  children,
  isHovering,
  itemRef,
  externalRef,
  ...restProps
}) {
  const isDisabled = !!disabled;
  const ref = react.useRef(null);
  const {
    setHover,
    onPointerLeave,
    ...restStateProps
  } = useItemState(itemRef, ref, isHovering, isDisabled);
  const {
    handleClose
  } = react.useContext(EventHandlersContext);
  const modifiers = react.useMemo(() => ({
    disabled: isDisabled,
    hover: isHovering,
    focusable: true
  }), [isDisabled, isHovering]);
  const renderChildren = react.useMemo(() => safeCall(children, {
    ...modifiers,
    ref,
    closeMenu: handleClose
  }), [children, modifiers, handleClose]);
  const mergedProps = mergeProps({
    ...restStateProps,
    onPointerLeave: e => onPointerLeave(e, true),
    onFocus: setHover
  }, restProps);
  return /*#__PURE__*/jsxRuntime.jsx("li", {
    role: roleMenuitem,
    ...commonProps(isDisabled),
    ...mergedProps,
    ref: useCombinedRef(externalRef, itemRef),
    className: useBEM({
      block: menuClass,
      element: menuItemClass,
      modifiers,
      className
    }),
    children: renderChildren
  });
});

const MenuDivider = /*#__PURE__*/react.memo(/*#__PURE__*/react.forwardRef(function MenuDivider({
  className,
  ...restProps
}, externalRef) {
  return /*#__PURE__*/jsxRuntime.jsx("li", {
    role: "separator",
    ...restProps,
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: menuDividerClass,
      className
    })
  });
}));

const MenuHeader = /*#__PURE__*/react.memo(/*#__PURE__*/react.forwardRef(function MenuHeader({
  className,
  ...restProps
}, externalRef) {
  return /*#__PURE__*/jsxRuntime.jsx("li", {
    role: roleNone,
    ...restProps,
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: menuHeaderClass,
      className
    })
  });
}));

const MenuGroup = /*#__PURE__*/react.forwardRef(function MenuGroup({
  className,
  style,
  takeOverflow,
  ...restProps
}, externalRef) {
  const ref = react.useRef(null);
  const [overflowStyle, setOverflowStyle] = react.useState();
  const {
    overflow,
    overflowAmt
  } = react.useContext(MenuListContext);
  useIsomorphicLayoutEffect(() => {
    let maxHeight;
    if (takeOverflow && overflowAmt >= 0) {
      maxHeight = getNormalizedClientRect(ref.current).height - overflowAmt;
      if (maxHeight < 0) maxHeight = 0;
    }
    setOverflowStyle(maxHeight >= 0 ? {
      maxHeight,
      overflow
    } : undefined);
  }, [takeOverflow, overflow, overflowAmt]);
  useIsomorphicLayoutEffect(() => {
    if (overflowStyle) ref.current.scrollTop = 0;
  }, [overflowStyle]);
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...restProps,
    ref: useCombinedRef(externalRef, ref),
    className: useBEM({
      block: menuClass,
      element: menuGroupClass,
      className
    }),
    style: {
      ...style,
      ...overflowStyle
    }
  });
});

const MenuRadioGroup = /*#__PURE__*/react.forwardRef(function MenuRadioGroup({
  'aria-label': ariaLabel,
  className,
  name,
  value,
  onRadioChange,
  ...restProps
}, externalRef) {
  const contextValue = react.useMemo(() => ({
    name,
    value,
    onRadioChange
  }), [name, value, onRadioChange]);
  return /*#__PURE__*/jsxRuntime.jsx(RadioGroupContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/jsxRuntime.jsx("li", {
      role: roleNone,
      children: /*#__PURE__*/jsxRuntime.jsx("ul", {
        role: "group",
        "aria-label": ariaLabel || name || 'Radio group',
        ...restProps,
        ref: externalRef,
        className: useBEM({
          block: menuClass,
          element: radioGroupClass,
          className
        })
      })
    })
  });
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
exports.useClick = useClick;
exports.useHover = useHover;
exports.useMenuState = useMenuState;
