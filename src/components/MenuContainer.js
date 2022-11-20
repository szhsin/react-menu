import { useMemo } from 'react';
import { useBEM } from '../hooks';
import {
  menuContainerClass,
  mergeProps,
  safeCall,
  getTransition,
  CloseReason,
  Keys
} from '../utils';

export const MenuContainer = ({
  className,
  containerRef,
  containerProps,
  children,
  isOpen,
  skipOpen,
  theming,
  transition,
  onClose
}) => {
  const itemTransition = getTransition(transition, 'item');

  const onKeyDown = ({ key }) => {
    switch (key) {
      case Keys.ESC:
        safeCall(onClose, { key, reason: CloseReason.CANCEL });
        break;
    }
  };

  const onBlur = (e) => {
    if (isOpen && !e.currentTarget.contains(e.relatedTarget || document.activeElement)) {
      safeCall(onClose, { reason: CloseReason.BLUR });

      // If a user clicks on the menu button when a menu is open, we need to close the menu.
      // However, a blur event will be fired prior to the click event on menu button,
      // which makes the menu first close and then open again.
      // If this happen, e.relatedTarget is incorrectly set to null instead of the button in Safari and Firefox,
      // and makes it difficult to determine whether onBlur is fired because of clicking on menu button.
      // This is a workaround approach which sets a flag to skip a following click event.
      if (skipOpen) {
        skipOpen.current = true;
        setTimeout(() => (skipOpen.current = false), 300);
      }
    }
  };

  return (
    <div
      {...mergeProps({ onKeyDown, onBlur }, containerProps)}
      className={useBEM({
        block: menuContainerClass,
        modifiers: useMemo(() => ({ theme: theming, itemTransition }), [theming, itemTransition]),
        className
      })}
      style={{ position: 'absolute', ...containerProps?.style }}
      ref={containerRef}
    >
      {children}
    </div>
  );
};
