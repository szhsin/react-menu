import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
    defineName,
    bem,
    flatStyles,
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
        const maxHeight = takeOverflow && overflowAmt >= 0
            ? ref.current.getBoundingClientRect().height - overflowAmt : -1;
        setOverflowStyles(maxHeight >= 0 ? { maxHeight, overflow } : undefined);
    }, [takeOverflow, overflow, overflowAmt]);

    useLayoutEffect(() => {
        if (overflowStyles) ref.current.scrollTop = 0;
    }, [overflowStyles]);

    return (
        <div ref={ref}
            {...restProps}
            className={bem(menuClass, menuGroupClass)(className)}
            style={{ ...flatStyles(styles), ...overflowStyles }} />
    );
}), 'MenuGroup');

MenuGroup.propTypes = {
    ...stylePropTypes(),
    takeOverflow: PropTypes.bool
};
