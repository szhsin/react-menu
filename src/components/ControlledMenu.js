import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useMenuList } from './useMenuList';
import {
    menuPropTypesBase,
    menuDefaultPropsBase,
    FocusPositions
} from '../utils';


export const ControlledMenu = memo(forwardRef(function ControlledMenu({
    'aria-label': ariaLabel,
    id,
    animation,
    boundingBoxRef,
    boundingBoxPadding,
    debugging,
    reposition,
    submenuOpenDelay,
    submenuCloseDelay,
    viewScroll,
    portal,
    theming,
    isMounted,
    onItemClick,
    onClick,
    onClose,
    ...restProps
}, externalRef) {

    return useMenuList({
        ...restProps,
        externalRef,
        ariaLabel: ariaLabel || 'Menu'
    }, {
        id,
        animation,
        boundingBoxRef,
        boundingBoxPadding,
        debugging,
        reposition,
        submenuOpenDelay,
        submenuCloseDelay,
        viewScroll,
        portal,
        theming,
        isMounted,
        onItemClick,
        onClick,
        onClose
    });
}));

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
