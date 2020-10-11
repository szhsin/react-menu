import React from 'react';
import PropTypes from 'prop-types';
import {
    menuPropTypesBase,
    menuDefaultPropsBase,
    offsetPropTypes,
    offsetDefaultProps,
    FocusPositions
} from '../utils';
import { useMenuList } from './useMenuList';


export const ControlledMenu = React.memo(function ControlledMenu({
    'aria-label': ariaLabel,
    id,
    className,
    styles,
    animation,
    debugging,
    anchorPoint,
    anchorRef,
    arrow,
    align,
    direction,
    isOpen,
    isMounted,
    menuItemFocus,
    offsetX,
    offsetY,
    children,
    onClick,
    onClose,
    ...restProps }) {

    return useMenuList(
        {
            ...restProps, // restProps for passing through client code defined event handlers
            ariaLabel: ariaLabel || 'Menu',
            className,
            styles,
            anchorPoint,
            anchorRef,
            arrow,
            align,
            direction,
            isOpen,
            isMounted,
            menuItemFocus,
            offsetX,
            offsetY
        },
        id,
        animation,
        debugging,
        children,
        onClick,
        onClose);
});

ControlledMenu.propTypes = {
    ...menuPropTypesBase,
    ...offsetPropTypes,
    anchorPoint: PropTypes.exact({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    anchorRef: PropTypes.object,
    isOpen: PropTypes.bool,
    isMounted: PropTypes.bool,
    menuItemFocus: PropTypes.exact({
        position: PropTypes.string
    }),
    onClose: PropTypes.func
};

ControlledMenu.defaultProps = {
    ...menuDefaultPropsBase,
    ...offsetDefaultProps,
    isMounted: true,
    menuItemFocus: { position: FocusPositions.INITIAL }
};
