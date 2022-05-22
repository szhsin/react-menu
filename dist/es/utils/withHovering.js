import { extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { forwardRef, useRef, useContext, memo } from 'react';
import { HoverItemContext } from './constants.js';
import { jsx } from 'react/jsx-runtime';

var withHovering = function withHovering(name, WrapppedComponent) {
  var Component = /*#__PURE__*/memo(WrapppedComponent);
  var WithHovering = /*#__PURE__*/forwardRef(function (props, ref) {
    var itemRef = useRef(null);
    return /*#__PURE__*/jsx(Component, _extends({}, props, {
      itemRef: itemRef,
      externalRef: ref,
      isHovering: useContext(HoverItemContext) === itemRef.current
    }));
  });
  WithHovering.displayName = "WithHovering(" + name + ")";
  return WithHovering;
};

export { withHovering };
