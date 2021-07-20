import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
    defineName,
    useBEM,
    useFlatStyles,
    menuClass,
    menuGroupClass,
    stylePropTypes,
    MenuListContext,
    useLayoutEffect
} from '../utils';


export const MenuGroup = defineName(React.memo(function MenuGroup({
    className,
    styles,
    takeOverflow,
    ...restProps }) {

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
        <div ref={ref}
            {...restProps}
            className={useBEM({ block: menuClass, element: menuGroupClass, className })}
            style={{ ...useFlatStyles(styles), ...overflowStyles }} />
    );
}), 'MenuGroup');

MenuGroup.propTypes = {
    ...stylePropTypes(),
    takeOverflow: PropTypes.bool
};
