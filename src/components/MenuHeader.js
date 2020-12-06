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
    children,
    ...restProps }) {

    return (
        <li role="presentation"
            {...restProps}
            className={bem(menuClass, menuHeaderClass)(className)}
            style={flatStyles(styles)}>
            {children}
        </li>
    );
}), 'MenuHeader');

MenuHeader.propTypes = {
    ...stylePropTypes()
};
