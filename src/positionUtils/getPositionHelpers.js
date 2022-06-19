import { parsePadding } from '../utils';

export const getPositionHelpers = (containerRef, menuRef, menuScroll, boundingBoxPadding) => {
  const menuRect = menuRef.current.getBoundingClientRect();
  const containerRect = containerRef.current.getBoundingClientRect();
  const boundingRect =
    menuScroll === window
      ? {
          left: 0,
          top: 0,
          right: document.documentElement.clientWidth,
          bottom: window.innerHeight
        }
      : menuScroll.getBoundingClientRect();
  const padding = parsePadding(boundingBoxPadding);

  // For left and top, overflows are negative value.
  // For right and bottom, overflows are positive value.
  const getLeftOverflow = (x) => x + containerRect.left - boundingRect.left - padding.left;
  const getRightOverflow = (x) =>
    x + containerRect.left + menuRect.width - boundingRect.right + padding.right;
  const getTopOverflow = (y) => y + containerRect.top - boundingRect.top - padding.top;
  const getBottomOverflow = (y) =>
    y + containerRect.top + menuRect.height - boundingRect.bottom + padding.bottom;

  const confineHorizontally = (x) => {
    // If menu overflows to the left side, adjust x to have the menu contained within the viewport
    // and there is no need to check the right side;
    // if it doesn't overflow to the left, then check the right side
    let leftOverflow = getLeftOverflow(x);
    if (leftOverflow < 0) {
      x -= leftOverflow;
    } else {
      const rightOverflow = getRightOverflow(x);
      if (rightOverflow > 0) {
        x -= rightOverflow;
        // Check again to make sure menu doesn't overflow to the left
        // because it may go off screen and cannot be scroll into view.
        leftOverflow = getLeftOverflow(x);
        if (leftOverflow < 0) x -= leftOverflow;
      }
    }

    return x;
  };

  const confineVertically = (y) => {
    // Similar logic to confineHorizontally above
    let topOverflow = getTopOverflow(y);
    if (topOverflow < 0) {
      y -= topOverflow;
    } else {
      const bottomOverflow = getBottomOverflow(y);
      if (bottomOverflow > 0) {
        y -= bottomOverflow;
        // Check again to make sure menu doesn't overflow to the bottom
        // because it may go off screen and cannot be scroll into view.
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
