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
    if (isOpen && !e.currentTarget.contains(e.relatedTarget)) {
      safeCall(onClose, { reason: CloseReason.BLUR });
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
