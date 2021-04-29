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
    ...restProps }) {

    return (
        <li role="presentation"
            {...restProps}
            className={bem(menuClass, menuHeaderClass)(className)}
            style={flatStyles(styles)} />
    );
}), 'MenuHeader');

MenuHeader.propTypes = {
    ...stylePropTypes()
};
