import { forwardRef, useRef, memo, useContext } from 'react';
import { HoverItemContext } from './constants.mjs';
import { jsx } from 'react/jsx-runtime';

const withHovering = (name, WrappedComponent) => {
  const Component = /*#__PURE__*/memo(WrappedComponent);
  const WithHovering = /*#__PURE__*/forwardRef((props, ref) => {
    const itemRef = useRef(null);
    return /*#__PURE__*/jsx(Component, {
      ...props,
      itemRef: itemRef,
      externalRef: ref,
      isHovering: useContext(HoverItemContext) === itemRef.current
    });
  });
  WithHovering.displayName = `WithHovering(${name})`;
  return WithHovering;
};

export { withHovering };
