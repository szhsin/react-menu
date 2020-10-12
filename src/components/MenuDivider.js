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
    styles }) {

    return (
        <li className={bem(menuClass, menuDividerClass)(className)}
            style={flatStyles(styles)}
            role="separator" />
    );
}), 'MenuDivider');

MenuDivider.propTypes = {
    ...stylePropTypes()
};
