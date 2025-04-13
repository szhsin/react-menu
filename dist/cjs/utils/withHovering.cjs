'use strict';

var react = require('react');
var constants = require('./constants.cjs');
var jsxRuntime = require('react/jsx-runtime');

const withHovering = (name, WrappedComponent) => {
  const Component = /*#__PURE__*/react.memo(WrappedComponent);
  const WithHovering = /*#__PURE__*/react.forwardRef((props, ref) => {
    const itemRef = react.useRef(null);
    return /*#__PURE__*/jsxRuntime.jsx(Component, {
      ...props,
      itemRef: itemRef,
      externalRef: ref,
      isHovering: react.useContext(constants.HoverItemContext) === itemRef.current
    });
  });
  WithHovering.displayName = `WithHovering(${name})`;
  return WithHovering;
};

exports.withHovering = withHovering;
