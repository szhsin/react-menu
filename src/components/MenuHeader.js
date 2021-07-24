import React from 'react';
import { useBEM, useFlatStyles } from '../hooks';
import {
    defineName,
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
            className={useBEM({ block: menuClass, element: menuHeaderClass, className })}
            style={useFlatStyles(styles)} />
    );
}), 'MenuHeader');

MenuHeader.propTypes = {
    ...stylePropTypes()
};
