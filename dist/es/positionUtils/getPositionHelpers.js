import { parsePadding } from '../utils/utils.js';

var getPositionHelpers = function getPositionHelpers(containerRef, menuRef, menuScroll, boundingBoxPadding) {
  var menuRect = menuRef.current.getBoundingClientRect();
  var containerRect = containerRef.current.getBoundingClientRect();
  var boundingRect = menuScroll === window ? {
    left: 0,
    top: 0,
    right: document.documentElement.clientWidth,
    bottom: window.innerHeight
  } : menuScroll.getBoundingClientRect();
  var padding = parsePadding(boundingBoxPadding);

  var getLeftOverflow = function getLeftOverflow(x) {
    return x + containerRect.left - boundingRect.left - padding.left;
  };
  var getRightOverflow = function getRightOverflow(x) {
    return x + containerRect.left + menuRect.width - boundingRect.right + padding.right;
  };
  var getTopOverflow = function getTopOverflow(y) {
    return y + containerRect.top - boundingRect.top - padding.top;
  };
  var getBottomOverflow = function getBottomOverflow(y) {
    return y + containerRect.top + menuRect.height - boundingRect.bottom + padding.bottom;
  };
  var confineHorizontally = function confineHorizontally(x) {
    var leftOverflow = getLeftOverflow(x);
    if (leftOverflow < 0) {
      x -= leftOverflow;
    } else {
      var rightOverflow = getRightOverflow(x);
      if (rightOverflow > 0) {
        x -= rightOverflow;
        leftOverflow = getLeftOverflow(x);
        if (leftOverflow < 0) x -= leftOverflow;
      }
    }
    return x;
  };
  var confineVertically = function confineVertically(y) {
    var topOverflow = getTopOverflow(y);
    if (topOverflow < 0) {
      y -= topOverflow;
    } else {
      var bottomOverflow = getBottomOverflow(y);
      if (bottomOverflow > 0) {
        y -= bottomOverflow;
        topOverflow = getTopOverflow(y);
        if (topOverflow < 0) y -= topOverflow;
      }
    }
    return y;
  };
  return {
    menuRect: menuRect,
    containerRect: containerRect,
    getLeftOverflow: getLeftOverflow,
    getRightOverflow: getRightOverflow,
    getTopOverflow: getTopOverflow,
    getBottomOverflow: getBottomOverflow,
    confineHorizontally: confineHorizontally,
    confineVertically: confineVertically
  };
};

export { getPositionHelpers };
