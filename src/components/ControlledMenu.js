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
    portal,
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
        portal,
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
    captureFocus: PropTypes.bool,
    isOpen: PropTypes.bool,
    isMounted: PropTypes.bool,
    menuItemFocus: PropTypes.exact({
        position: PropTypes.string
    }),
    onClose: PropTypes.func
};

ControlledMenu.defaultProps = {
    ...menuDefaultPropsBase,
    captureFocus: true,
    isOpen: false,
    isMounted: true,
    menuItemFocus: { position: FocusPositions.INITIAL }
};
