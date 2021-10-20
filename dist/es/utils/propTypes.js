import { extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { oneOfType, string, func, object, bool, number, oneOf, exact } from 'prop-types';

var stylePropTypes = function stylePropTypes(name) {
  var _ref;

  return _ref = {}, _ref[name ? name + "ClassName" : 'className'] = oneOfType([string, func]), _ref[name ? name + "Styles" : 'styles'] = oneOfType([object, func]), _ref;
};
var menuPropTypes = _extends({
  className: string
}, stylePropTypes('menu'), stylePropTypes('arrow'), {
  arrow: bool,
  offsetX: number,
  offsetY: number,
  align: oneOf(['start', 'center', 'end']),
  direction: oneOf(['left', 'right', 'top', 'bottom']),
  position: oneOf(['auto', 'anchor', 'initial']),
  overflow: oneOf(['auto', 'visible', 'hidden'])
});
var rootMenuPropTypes = _extends({}, menuPropTypes, {
  containerProps: object,
  initialMounted: bool,
  unmountOnClose: bool,
  transition: oneOfType([bool, exact({
    open: bool,
    close: bool,
    item: bool
  })]),
  transitionTimeout: number,
  boundingBoxRef: object,
  boundingBoxPadding: string,
  reposition: oneOf(['auto', 'initial']),
  repositionFlag: oneOfType([string, number]),
  viewScroll: oneOf(['auto', 'close', 'initial']),
  submenuOpenDelay: number,
  submenuCloseDelay: number,
  portal: bool,
  theming: string,
  onItemClick: func
});
var uncontrolledMenuPropTypes = {
  instanceRef: oneOfType([object, func]),
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
var rootMenuDefaultProps = _extends({}, menuDefaultProps, {
  reposition: 'auto',
  viewScroll: 'initial',
  transitionTimeout: 200,
  submenuOpenDelay: 300,
  submenuCloseDelay: 150
});

export { menuDefaultProps, menuPropTypes, rootMenuDefaultProps, rootMenuPropTypes, stylePropTypes, uncontrolledMenuPropTypes };
