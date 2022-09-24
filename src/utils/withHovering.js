import { memo, forwardRef, useContext, useRef } from 'react';
import { HoverItemContext } from './constants';

export const withHovering = (name, WrappedComponent) => {
  const Component = memo(WrappedComponent);
  const WithHovering = forwardRef((props, ref) => {
    const itemRef = useRef(null);
    return (
      <Component
        {...props}
        itemRef={itemRef}
        externalRef={ref}
        isHovering={useContext(HoverItemContext) === itemRef.current}
      />
    );
  });

  WithHovering.displayName = `WithHovering(${name})`;

  return WithHovering;
};
