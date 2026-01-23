'use strict';

var react = require('react');
var reactTransitionState = require('react-transition-state');
var constants = require('../utils/constants.cjs');
var utils = require('../utils/utils.cjs');

const useMenuState = ({
  initialOpen,
  initialMounted,
  unmountOnClose,
  transition,
  transitionTimeout = 500,
  onMenuChange
} = {}) => {
  const enter = utils.getTransition(transition, 'open');
  const exit = utils.getTransition(transition, 'close');
  const [{
    status
  }, toggleMenu, endTransition] = reactTransitionState.useTransitionState({
    initialEntered: initialOpen,
    mountOnEnter: !initialMounted,
    unmountOnExit: unmountOnClose,
    timeout: transitionTimeout,
    enter,
    exit,
    onStateChange: react.useCallback(({
      current: {
        isEnter,
        isResolved
      }
    }) => {
      if (!onMenuChange || isEnter && enter && isResolved || !isEnter && exit && isResolved) {
        return;
      }
      onMenuChange({
        open: isEnter
      });
    }, [onMenuChange, enter, exit])
  });
  return [{
    state: constants.MenuStateMap[status],
    endTransition
  }, toggleMenu];
};

exports.useMenuState = useMenuState;
