import React from 'react';
import {
    defineName,
    useBEM,
    useFlatStyles,
    menuClass,
    menuDividerClass,
    stylePropTypes
} from '../utils';


export const MenuDivider = defineName(React.memo(function MenuDivider({
    className,
    styles,
    ...restProps }) {

    return (
        <li role="separator"
            {...restProps}
            className={useBEM({ block: menuClass, element: menuDividerClass, className })}
            style={useFlatStyles(styles)} />
    );
}), 'MenuDivider');

MenuDivider.propTypes = {
    ...stylePropTypes()
};
