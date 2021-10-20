import { extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import React, { forwardRef, useContext } from 'react';
import { HoverIndexContext } from './constants.js';
import { defineName } from './utils.js';

var withHovering = function withHovering(WrapppedComponent, name) {
  var WithHovering = defineName( /*#__PURE__*/forwardRef(function (props, ref) {
    return /*#__PURE__*/React.createElement(WrapppedComponent, _extends({}, props, {
      externalRef: ref,
      isHovering: useContext(HoverIndexContext) === props.index
    }));
  }), name);
  WithHovering.displayName = "WithHovering(" + name + ")";
  return WithHovering;
};

export { withHovering };
