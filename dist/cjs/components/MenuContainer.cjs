'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var useBEM = require('../hooks/useBEM.cjs');
var utils = require('../utils/utils.cjs');
var constants = require('../utils/constants.cjs');

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
  const itemTransition = utils.getTransition(transition, 'item');
  const onKeyDown = ({
    key
  }) => {
    switch (key) {
      case constants.Keys.ESC:
        utils.safeCall(onClose, {
          key,
          reason: constants.CloseReason.CANCEL
        });
        break;
    }
  };
  const onBlur = e => {
    if (isOpen && !e.currentTarget.contains(e.relatedTarget)) {
      utils.safeCall(onClose, {
        reason: constants.CloseReason.BLUR
      });
    }
  };
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...utils.mergeProps({
      onKeyDown,
      onBlur
    }, containerProps),
    className: useBEM.useBEM({
      block: constants.menuContainerClass,
      modifiers: react.useMemo(() => ({
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

exports.MenuContainer = MenuContainer;
