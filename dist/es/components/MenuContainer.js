import { useMemo } from 'react';
import { jsx } from 'react/jsx-runtime';
import { mergeProps, getTransition, safeCall } from '../utils/utils.js';
import { useBEM } from '../hooks/useBEM.js';
import { menuContainerClass, Keys, CloseReason } from '../utils/constants.js';

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
      ...(containerProps == null ? void 0 : containerProps.style)
    },
    ref: containerRef,
    children: children
  });
};

export { MenuContainer };
