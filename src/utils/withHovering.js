import React, { forwardRef, useContext } from 'react';
import { HoverIndexContext } from './constants';
import { defineName } from './utils';

export const withHovering = (WrapppedComponent, name) => {
    const WithHovering = defineName(forwardRef((props, ref) => {
        return (
            <WrapppedComponent
                {...props}
                externalRef={ref}
                isHovering={useContext(HoverIndexContext) === props.index}
            />
        );
    }), name);

    WithHovering.displayName = `WithHovering(${name})`;

    return WithHovering;
};
