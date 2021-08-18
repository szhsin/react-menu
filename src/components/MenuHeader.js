import React, { memo, forwardRef } from 'react';
import { useBEM, useFlatStyles } from '../hooks';
import {
    defineName,
    menuClass,
    menuHeaderClass,
    stylePropTypes
} from '../utils';


export const MenuHeader = defineName(memo(forwardRef(function MenuHeader({
    className,
    styles,
    ...restProps
}, externalRef) {

    return (
        <li role="presentation"
            {...restProps}
            ref={externalRef}
            className={useBEM({ block: menuClass, element: menuHeaderClass, className })}
            style={useFlatStyles(styles)} />
    );
})), 'MenuHeader');

MenuHeader.propTypes = {
    ...stylePropTypes()
};
