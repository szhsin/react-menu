import PropTypes from 'prop-types';

export const stylePropTypes = (name) => ({
    [name ? `${name}ClassName` : 'className']: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]),
    [name ? `${name}Styles` : 'styles']: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ])
});

// Menu, SubMenu and ControlledMenu
export const sharedMenuPropTypes = {
    className: PropTypes.string,
    ...stylePropTypes('menu'),
    ...stylePropTypes('arrow'),
    arrow: PropTypes.bool,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    align: PropTypes.oneOf(['start', 'center', 'end']),
    direction: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    position: PropTypes.oneOf(['auto', 'anchor', 'initial']),
    overflow: PropTypes.oneOf(['auto', 'visible', 'hidden']),
    children: PropTypes.node.isRequired
}

// Menu and ControlledMenu
export const menuPropTypesBase = {
    ...sharedMenuPropTypes,
    containerProps: PropTypes.object,
    initialMounted: PropTypes.bool,
    unmountOnClose: PropTypes.bool,
    transition: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.exact({
            open: PropTypes.bool,
            close: PropTypes.bool,
            item: PropTypes.bool
        })
    ]),
    transitionTimeout: PropTypes.number,
    boundingBoxRef: PropTypes.object,
    boundingBoxPadding: PropTypes.string,
    reposition: PropTypes.oneOf(['auto', 'initial']),
    repositionFlag: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    viewScroll: PropTypes.oneOf(['auto', 'close', 'initial']),
    submenuOpenDelay: PropTypes.number,
    submenuCloseDelay: PropTypes.number,
    portal: PropTypes.bool,
    theming: PropTypes.string,
    onItemClick: PropTypes.func
};

export const sharedMenuDefaultProp = {
    offsetX: 0,
    offsetY: 0,
    align: 'start',
    direction: 'bottom',
    position: 'auto',
    overflow: 'visible'
};

export const menuDefaultPropsBase = {
    ...sharedMenuDefaultProp,
    reposition: 'auto',
    viewScroll: 'initial',
    transitionTimeout: 200,
    submenuOpenDelay: 300,
    submenuCloseDelay: 150
};
