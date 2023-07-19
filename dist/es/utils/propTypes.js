import { oneOfType, string, func, object, bool, number, oneOf, exact } from 'prop-types';

const stylePropTypes = name => ({
  [name ? `${name}ClassName` : 'className']: oneOfType([string, func])
});
const menuPropTypes = {
  className: string,
  ...stylePropTypes('menu'),
  arrowProps: object,
  focusProps: object,
  menuStyle: object,
  arrow: bool,
  setDownOverflow: bool,
  gap: number,
  shift: number,
  align: /*#__PURE__*/oneOf(['start', 'center', 'end']),
  direction: /*#__PURE__*/oneOf(['left', 'right', 'top', 'bottom']),
  position: /*#__PURE__*/oneOf(['auto', 'anchor', 'initial']),
  overflow: /*#__PURE__*/oneOf(['auto', 'visible', 'hidden'])
};
const rootMenuPropTypes = {
  ...menuPropTypes,
  containerProps: object,
  initialMounted: bool,
  unmountOnClose: bool,
  transition: /*#__PURE__*/oneOfType([bool, /*#__PURE__*/exact({
    open: bool,
    close: bool,
    item: bool
  })]),
  transitionTimeout: number,
  boundingBoxRef: object,
  boundingBoxPadding: string,
  reposition: /*#__PURE__*/oneOf(['auto', 'initial']),
  repositionFlag: /*#__PURE__*/oneOfType([string, number]),
  viewScroll: /*#__PURE__*/oneOf(['auto', 'close', 'initial']),
  submenuOpenDelay: number,
  submenuCloseDelay: number,
  portal: /*#__PURE__*/oneOfType([bool, /*#__PURE__*/exact({
    target: object,
    stablePosition: bool
  })]),
  theming: string,
  onItemClick: func
};
const uncontrolledMenuPropTypes = {
  instanceRef: /*#__PURE__*/oneOfType([object, func]),
  onMenuChange: func
};

export { menuPropTypes, rootMenuPropTypes, stylePropTypes, uncontrolledMenuPropTypes };
