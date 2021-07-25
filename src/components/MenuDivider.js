import React, { memo, forwardRef } from 'react';
import { useBEM, useFlatStyles } from '../hooks';
import {
    defineName,
    menuClass,
    menuDividerClass,
    stylePropTypes
} from '../utils';


export const MenuDivider = defineName(memo(forwardRef(function MenuDivider({
    className,
    styles,
    ...restProps
}, externalRef) {

    return (
        <li role="separator"
            {...restProps}
            ref={externalRef}
            className={useBEM({ block: menuClass, element: menuDividerClass, className })}
            style={useFlatStyles(styles)} />
    );
})), 'MenuDivider');

MenuDivider.propTypes = {
    ...stylePropTypes()
};
