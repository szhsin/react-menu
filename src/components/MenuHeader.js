import React from 'react';
import {
    defineName,
    bem,
    flatStyles,
    menuClass,
    menuHeaderClass,
    stylePropTypes
} from '../utils';


export const MenuHeader = defineName(React.memo(function MenuHeader({
    className,
    styles,
    children }) {

    return (
        <li className={bem(menuClass, menuHeaderClass)(className)}
            style={flatStyles(styles)}
            role="presentation">
            {children}
        </li>
    );
}), 'MenuHeader');

MenuHeader.propTypes = {
    ...stylePropTypes
};
