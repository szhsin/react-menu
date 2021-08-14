import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useMenuList } from './useMenuList';
import {
    menuPropTypesBase,
    menuDefaultPropsBase,
    FocusPositions,
    MenuStateMap,
    values
} from '../utils';


export const ControlledMenu = memo(forwardRef(function ControlledMenu({
    'aria-label': ariaLabel,
    containerProps,
    initialMounted,
    unmountOnClose,
    transition,
    transitionTimeout,
    boundingBoxRef,
    boundingBoxPadding,
    reposition,
    submenuOpenDelay,
    submenuCloseDelay,
    viewScroll,
    portal,
    theming,
    onItemClick,
    onClose,
    ...restProps
}, externalRef) {

    return useMenuList({
        ...restProps,
        externalRef,
        ariaLabel: ariaLabel || 'Menu'
    }, {
        containerProps,
        initialMounted,
        unmountOnClose,
        transition,
        transitionTimeout,
        boundingBoxRef,
        boundingBoxPadding,
        reposition,
        submenuOpenDelay,
        submenuCloseDelay,
        viewScroll,
        portal,
        theming,
        onItemClick,
        onClose
    });
}));

ControlledMenu.propTypes = {
    ...menuPropTypesBase,
    state: PropTypes.oneOf(values(MenuStateMap)),
    anchorPoint: PropTypes.exact({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    anchorRef: PropTypes.object,
    captureFocus: PropTypes.bool,
    menuItemFocus: PropTypes.exact({
        position: PropTypes.string
    }),
    onClose: PropTypes.func
};

ControlledMenu.defaultProps = {
    ...menuDefaultPropsBase,
    captureFocus: true,
    menuItemFocus: { position: FocusPositions.INITIAL }
};
