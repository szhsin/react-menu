import { extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { oneOfType, string, func, object, bool, number, oneOf, exact } from 'prop-types';

var stylePropTypes = function stylePropTypes(name) {
  var _ref;

  return _ref = {}, _ref[name ? name + "ClassName" : 'className'] = oneOfType([string, func]), _ref[name ? name + "Styles" : 'styles'] = oneOfType([object, func]), _ref;
};
var menuPropTypes = /*#__PURE__*/_extends({
  className: string
}, /*#__PURE__*/stylePropTypes('menu'), /*#__PURE__*/stylePropTypes('arrow'), {
  arrow: bool,
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
  portal: bool,
  theming: string,
  onItemClick: func
});
var uncontrolledMenuPropTypes = {
  instanceRef: /*#__PURE__*/oneOfType([object, func]),
  onMenuChange: func
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
  transitionTimeout: 500,
  submenuOpenDelay: 300,
  submenuCloseDelay: 150
});

export { menuDefaultProps, menuPropTypes, rootMenuDefaultProps, rootMenuPropTypes, stylePropTypes, uncontrolledMenuPropTypes };
