import React, {
  cloneElement,
  Fragment,
  forwardRef,
  useRef,
  useCallback,
  useImperativeHandle
} from 'react';
import { element, func, oneOfType } from 'prop-types';
import { ControlledMenu } from './ControlledMenu';
import { useMenuChange, useMenuStateAndFocus, useCombinedRef } from '../hooks';
import {
  getName,
  attachHandlerProps,
  safeCall,
  isMenuOpen,
  uncontrolledMenuPropTypes,
  rootMenuPropTypes,
  rootMenuDefaultProps,
  Keys,
  FocusPositions
} from '../utils';

export const Menu = forwardRef(function Menu(
  { 'aria-label': ariaLabel, captureFocus: _, menuButton, instanceRef, onMenuChange, ...restProps },
  externalRef
) {
  const [stateProps, toggleMenu, openMenu] = useMenuStateAndFocus(restProps);
  const isOpen = isMenuOpen(stateProps.state);
  const skipOpen = useRef(false);
  const buttonRef = useRef(null);

  const handleClose = useCallback(
    (e) => {
      toggleMenu(false);
      if (e.key) buttonRef.current.focus();
    },
    [toggleMenu]
  );

  const handleClick = (e) => {
    if (skipOpen.current) return;
    // Focus (hover) the first menu item when onClick event is trigger by keyboard
    openMenu(e.detail === 0 ? FocusPositions.FIRST : undefined);
  };

  const handleKeyDown = (e) => {
    let handled = false;

    switch (e.key) {
      case Keys.UP:
        openMenu(FocusPositions.LAST);
        handled = true;
        break;

      case Keys.DOWN:
        openMenu(FocusPositions.FIRST);
        handled = true;
        break;
    }

    if (handled) e.preventDefault();
  };

  const button = safeCall(menuButton, { open: isOpen });
  if (!button || !button.type) throw new Error('Menu requires a menuButton prop.');

  const buttonProps = {
    ref: useCombinedRef(button.ref, buttonRef),
    ...attachHandlerProps(
      {
        onClick: handleClick,
        onKeyDown: handleKeyDown
      },
      button.props
    )
  };
  if (getName(button.type) === 'MenuButton') {
    buttonProps.isOpen = isOpen;
  }
  const renderButton = cloneElement(button, buttonProps);

  useMenuChange(onMenuChange, isOpen);

  useImperativeHandle(instanceRef, () => ({
    openMenu,
    closeMenu: () => toggleMenu(false)
  }));

  const menuProps = {
    ...restProps,
    ...stateProps,
    'aria-label':
      ariaLabel || (typeof button.props.children === 'string' ? button.props.children : 'Menu'),
    anchorRef: buttonRef,
    ref: externalRef,
    onClose: handleClose,
    skipOpen
  };

  return (
    <Fragment>
      {renderButton}
      <ControlledMenu {...menuProps} />
    </Fragment>
  );
});

Menu.propTypes = {
  ...rootMenuPropTypes,
  ...uncontrolledMenuPropTypes,
  menuButton: oneOfType([element, func]).isRequired
};

Menu.defaultProps = rootMenuDefaultProps;
