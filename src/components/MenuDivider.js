import React from 'react';
import {
    defineName,
    bem,
    flatStyles,
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
            className={bem(menuClass, menuDividerClass)(className)}
            style={flatStyles(styles)} />
    );
}), 'MenuDivider');

MenuDivider.propTypes = {
    ...stylePropTypes()
};
