import { extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { useState } from 'react';
import { useClick } from './useClick.js';

var useHover = function useHover(isOpen, onToggle, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    _ref$openDelay = _ref.openDelay,
    openDelay = _ref$openDelay === void 0 ? 100 : _ref$openDelay,
    _ref$closeDelay = _ref.closeDelay,
    closeDelay = _ref$closeDelay === void 0 ? 300 : _ref$closeDelay;
  var _useState = useState({}),
    config = _useState[0];
  var clearTimer = function clearTimer() {
    return clearTimeout(config.t);
  };
  var delayAction = function delayAction(toOpen) {
    return function (e) {
      clearTimer();
      config.t = setTimeout(function () {
        return onToggle(toOpen, e);
      }, toOpen ? openDelay : closeDelay);
    };
  };
  var props = {
    onMouseEnter: delayAction(true),
    onMouseLeave: delayAction(false)
  };
  return {
    anchorProps: _extends({}, props, useClick(isOpen, onToggle)),
    hoverProps: _extends({}, props, {
      onMouseEnter: clearTimer
    })
  };
};

export { useHover };
