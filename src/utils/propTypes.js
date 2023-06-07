import { string, number, bool, func, object, oneOf, oneOfType, exact } from 'prop-types';

export const stylePropTypes = (name) => ({
  [name ? `${name}ClassName` : 'className']: oneOfType([string, func])
});

// Menu, SubMenu and ControlledMenu
export const menuPropTypes = {
  className: string,
  ...stylePropTypes('menu'),
  arrowProps: object,
  focusProps: object,
  menuStyle: object,
  arrow: bool,
  setDownOverflow: bool,
  gap: number,
  shift: number,
  align: oneOf(['start', 'center', 'end']),
  direction: oneOf(['left', 'right', 'top', 'bottom']),
  position: oneOf(['auto', 'anchor', 'initial']),
  overflow: oneOf(['auto', 'visible', 'hidden'])
};

// Menu and ControlledMenu
export const rootMenuPropTypes = {
  ...menuPropTypes,
  containerProps: object,
  initialMounted: bool,
  unmountOnClose: bool,
  transition: oneOfType([
    bool,
    exact({
      open: bool,
      close: bool,
      item: bool
    })
  ]),
  transitionTimeout: number,
  boundingBoxRef: object,
  boundingBoxPadding: string,
  reposition: oneOf(['auto', 'initial']),
  repositionFlag: oneOfType([string, number]),
  viewScroll: oneOf(['auto', 'close', 'initial']),
  submenuOpenDelay: number,
  submenuCloseDelay: number,
  portal: oneOfType([
    bool,
    exact({
      target: object,
      stablePosition: bool
    })
  ]),
  theming: string,
  onItemClick: func
};

// Menu and SubMenu
export const uncontrolledMenuPropTypes = {
  instanceRef: oneOfType([object, func]),
  onMenuChange: func
};
