import { useMemo } from 'react';
import { jsx } from 'react/jsx-runtime';
import { useBEM } from '../hooks/useBEM.mjs';
import { menuContainerClass, CloseReason, Keys } from '../utils/constants.mjs';
import { mergeProps, getTransition, safeCall } from '../utils/utils.mjs';

const MenuContainer = ({
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
  const onKeyDown = ({
    key
  }) => {
    switch (key) {
      case Keys.ESC:
        safeCall(onClose, {
          key,
          reason: CloseReason.CANCEL
        });
        break;
    }
  };
  const onBlur = e => {
    if (isOpen && !e.currentTarget.contains(e.relatedTarget)) {
      safeCall(onClose, {
        reason: CloseReason.BLUR
      });
    }
  };
  return /*#__PURE__*/jsx("div", {
    ...mergeProps({
      onKeyDown,
      onBlur
    }, containerProps),
    className: useBEM({
      block: menuContainerClass,
      modifiers: useMemo(() => ({
        theme: theming,
        itemTransition
      }), [theming, itemTransition]),
      className
    }),
    style: {
      position: 'absolute',
      ...containerProps?.style
    },
    ref: containerRef,
    children: children
  });
};

export { MenuContainer };
