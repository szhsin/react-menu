import { useState } from 'react';
import { Keys } from '../utils/constants.js';

var useActiveState = function useActiveState(isHovering, isDisabled, moreKeys) {
  var _useState = useState(false),
      active = _useState[0],
      setActive = _useState[1];

  var activeKeys = [Keys.ENTER, Keys.SPACE].concat(moreKeys);

  var cancelActive = function cancelActive() {
    return active && setActive(false);
  };

  return {
    isActive: active,
    onPointerDown: function onPointerDown() {
      if (!isDisabled) setActive(true);
    },
    onPointerUp: cancelActive,
    onPointerLeave: cancelActive,
    onKeyDown: function onKeyDown(e) {
      if (!active && isHovering && !isDisabled && activeKeys.indexOf(e.key) !== -1) {
        setActive(true);
      }
    },
    onKeyUp: function onKeyUp(e) {
      if (activeKeys.indexOf(e.key) !== -1) {
        setActive(false);
      }
    },
    onBlur: function onBlur(e) {
      if (active && !e.currentTarget.contains(e.relatedTarget)) {
        setActive(false);
      }
    }
  };
};

export { useActiveState };
