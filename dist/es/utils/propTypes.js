import { extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { oneOfType, string, func, object, bool, number, oneOf, exact } from 'prop-types';

var stylePropTypes = function stylePropTypes(name) {
  var _ref;
  return _ref = {}, _ref[name ? name + "ClassName" : 'className'] = oneOfType([string, func]), _ref;
};
var menuPropTypes = /*#__PURE__*/_extends({
  className: string
}, /*#__PURE__*/stylePropTypes('menu'), /*#__PURE__*/stylePropTypes('arrow'), {
  menuStyle: object,
  arrowStyle: object,
  arrow: bool,
  setDownOverflow: bool,
  offsetX: number,
  offsetY: number,
  align: /*#__PURE__*/oneOf(['start', 'center', 'end']),
  direction: /*#__PURE__*/oneOf(['left', 'right', 'top', 'bottom']),
  position: /*#__PURE__*/oneOf(['auto', 'anchor', 'initial']),
  overflow: /*#__PURE__*/oneOf(['auto', 'visible', 'hidden'])
});
var rootMenuPropTypes = /*#__PURE__*/_extends({}, menuPropTypes, {
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
});
var uncontrolledMenuPropTypes = {
  instanceRef: /*#__PURE__*/oneOfType([object, func]),
  onMenuChange: func
};

export { menuPropTypes, rootMenuPropTypes, stylePropTypes, uncontrolledMenuPropTypes };
