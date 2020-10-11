import PropTypes from 'prop-types';

export const stylePropTypes = {
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]),
    styles: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]),
};

export const menuPropTypesBase = {
    ...stylePropTypes,
    'aria-label': PropTypes.string,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    animation: PropTypes.bool,
    debugging: PropTypes.bool,
    arrow: PropTypes.bool,
    align: PropTypes.oneOf(['start', 'center', 'end']),
    direction: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
};

export const menuDefaultPropsBase = {
    animation: true,
    align: 'start',
    direction: 'bottom'
};

export const offsetPropTypes = {
    offsetX: PropTypes.number,
    offsetY: PropTypes.number
}

export const offsetDefaultProps = {
    offsetX: 0,
    offsetY: 0
}
