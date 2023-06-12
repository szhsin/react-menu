import { parsePadding } from '../utils/utils.js';

const getPositionHelpers = (containerRef, menuRef, menuScroll, boundingBoxPadding) => {
  const menuRect = menuRef.current.getBoundingClientRect();
  const containerRect = containerRef.current.getBoundingClientRect();
  const boundingRect = menuScroll === window ? {
    left: 0,
    top: 0,
    right: document.documentElement.clientWidth,
    bottom: window.innerHeight
  } : menuScroll.getBoundingClientRect();
  const padding = parsePadding(boundingBoxPadding);
  const getLeftOverflow = x => x + containerRect.left - boundingRect.left - padding.left;
  const getRightOverflow = x => x + containerRect.left + menuRect.width - boundingRect.right + padding.right;
  const getTopOverflow = y => y + containerRect.top - boundingRect.top - padding.top;
  const getBottomOverflow = y => y + containerRect.top + menuRect.height - boundingRect.bottom + padding.bottom;
  const confineHorizontally = x => {
    let leftOverflow = getLeftOverflow(x);
    if (leftOverflow < 0) {
      x -= leftOverflow;
    } else {
      const rightOverflow = getRightOverflow(x);
      if (rightOverflow > 0) {
        x -= rightOverflow;
        leftOverflow = getLeftOverflow(x);
        if (leftOverflow < 0) x -= leftOverflow;
      }
    }
    return x;
  };
  const confineVertically = y => {
    let topOverflow = getTopOverflow(y);
    if (topOverflow < 0) {
      y -= topOverflow;
    } else {
      const bottomOverflow = getBottomOverflow(y);
      if (bottomOverflow > 0) {
        y -= bottomOverflow;
        topOverflow = getTopOverflow(y);
        if (topOverflow < 0) y -= topOverflow;
      }
    }
    return y;
  };
  return {
    menuRect,
    containerRect,
    getLeftOverflow,
    getRightOverflow,
    getTopOverflow,
    getBottomOverflow,
    confineHorizontally,
    confineVertically
  };
};

export { getPositionHelpers };
