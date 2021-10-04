import React, { forwardRef, useContext, useRef, useState } from 'react';
import { bool } from 'prop-types';
import { useBEM, useFlatStyles, useLayoutEffect, useCombinedRef } from '../hooks';
import {
    defineName,
    menuClass,
    menuGroupClass,
    stylePropTypes,
    MenuListContext
} from '../utils';


export const MenuGroup = defineName(forwardRef(function MenuGroup({
    className,
    styles,
    takeOverflow,
    ...restProps
}, externalRef) {

    const ref = useRef(null);
    const [overflowStyles, setOverflowStyles] = useState();
    const { overflow, overflowAmt } = useContext(MenuListContext);

    useLayoutEffect(() => {
        let maxHeight;
        if (takeOverflow && overflowAmt >= 0) {
            maxHeight = ref.current.getBoundingClientRect().height - overflowAmt;
            if (maxHeight < 0) maxHeight = 0;
        }
        setOverflowStyles(maxHeight >= 0 ? { maxHeight, overflow } : undefined);
    }, [takeOverflow, overflow, overflowAmt]);

    useLayoutEffect(() => {
        if (overflowStyles) ref.current.scrollTop = 0;
    }, [overflowStyles]);

    return (
        <div {...restProps}
            ref={useCombinedRef(externalRef, ref)}
            className={useBEM({ block: menuClass, element: menuGroupClass, className })}
            style={{ ...useFlatStyles(styles), ...overflowStyles }} />
    );
}), 'MenuGroup');

MenuGroup.propTypes = {
    ...stylePropTypes(),
    takeOverflow: bool
};
