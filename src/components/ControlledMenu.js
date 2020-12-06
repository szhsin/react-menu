import React from 'react';
import PropTypes from 'prop-types';
import {
    menuPropTypesBase,
    menuDefaultPropsBase,
    FocusPositions
} from '../utils';
import { useMenuList } from './useMenuList';


export const ControlledMenu = React.memo(function ControlledMenu({
    'aria-label': ariaLabel,
    id,
    animation,
    debugging,
    viewScroll,
    onClick,
    onClose,
    ...restProps }) {

    return useMenuList(
        {
            ...restProps,
            ariaLabel: ariaLabel || 'Menu'
        },
        id,
        animation,
        debugging,
        viewScroll,
        onClick,
        onClose);
});

ControlledMenu.propTypes = {
    ...menuPropTypesBase,
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
    isMounted: true,
    menuItemFocus: { position: FocusPositions.INITIAL }
};
