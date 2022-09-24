import {
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
  mergeProps,
  safeCall,
  isMenuOpen,
  uncontrolledMenuPropTypes,
  rootMenuPropTypes,
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

  const onClick = (e) => {
    if (skipOpen.current) return;
    // Focus (hover) the first menu item when onClick event is trigger by keyboard
    openMenu(e.detail === 0 ? FocusPositions.FIRST : undefined);
  };

  const onKeyDown = (e) => {
    switch (e.key) {
      case Keys.UP:
        openMenu(FocusPositions.LAST);
        break;

      case Keys.DOWN:
        openMenu(FocusPositions.FIRST);
        break;

      default:
        return;
    }

    e.preventDefault();
  };

  const button = safeCall(menuButton, { open: isOpen });
  if (!button || !button.type) throw new Error('Menu requires a menuButton prop.');

  const buttonProps = {
    ref: useCombinedRef(button.ref, buttonRef),
    ...mergeProps({ onClick, onKeyDown }, button.props)
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

  return (
    <Fragment>
      {renderButton}
      <ControlledMenu
        {...restProps}
        {...stateProps}
        aria-label={
          ariaLabel || (typeof button.props.children === 'string' ? button.props.children : 'Menu')
        }
        anchorRef={buttonRef}
        ref={externalRef}
        onClose={handleClose}
        skipOpen={skipOpen}
      />
    </Fragment>
  );
});

Menu.propTypes = {
  ...rootMenuPropTypes,
  ...uncontrolledMenuPropTypes,
  menuButton: oneOfType([element, func]).isRequired
};
