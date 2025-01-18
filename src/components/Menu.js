import {
  cloneElement,
  Fragment,
  forwardRef,
  useRef,
  useCallback,
  useImperativeHandle,
  version as REACT_VERSION
} from 'react';
import { ControlledMenu } from './ControlledMenu';
import { useMenuChange, useMenuStateAndFocus, useCombinedRef, useClick } from '../hooks';
import { getName, mergeProps, safeCall, isMenuOpen, Keys, FocusPositions } from '../utils';

const isLegacyReact = parseInt(REACT_VERSION) < 19;

export const Menu = forwardRef(function Menu(
  {
    'aria-label': ariaLabel,
    captureFocus: _,
    initialOpen: _1,
    menuButton,
    instanceRef,
    onMenuChange,
    ...restProps
  },
  externalRef
) {
  const [stateProps, toggleMenu, openMenu] = useMenuStateAndFocus(restProps);
  const { state } = stateProps;
  const isOpen = isMenuOpen(state);
  const buttonRef = useRef(null);

  // Focus (hover) the first menu item when onClick event is trigger by keyboard
  const anchorProps = useClick(state, (_, e) =>
    openMenu(!e.detail ? FocusPositions.FIRST : undefined)
  );

  const handleClose = useCallback(
    (e) => {
      toggleMenu(false);
      if (e.key) buttonRef.current.focus();
    },
    [toggleMenu]
  );

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
    ...mergeProps({ onKeyDown, ...anchorProps }, button.props),
    ref: useCombinedRef(isLegacyReact ? button.ref : button.props.ref, buttonRef)
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
      />
    </Fragment>
  );
});
