export const positionContextMenu = ({ positionHelpers, anchorPoint }) => {
  const {
    menuRect,
    containerRect,
    getLeftOverflow,
    getRightOverflow,
    getTopOverflow,
    getBottomOverflow,
    confineHorizontally,
    confineVertically
  } = positionHelpers;

  let x, y;

  // position the menu with cursor pointing to its top-left corner
  x = anchorPoint.x - containerRect.left;
  y = anchorPoint.y - containerRect.top;

  // If menu overflows to the right of viewport,
  // try to reposition it on the left side of cursor.
  // If menu overflows to the left of viewport after repositioning,
  // choose a side which has less overflow
  // and adjust x to have it contained within the viewport.
  const rightOverflow = getRightOverflow(x);
  if (rightOverflow > 0) {
    const adjustedX = x - menuRect.width;
    const leftOverflow = getLeftOverflow(adjustedX);
    if (leftOverflow >= 0 || -leftOverflow < rightOverflow) {
      x = adjustedX;
    }
    x = confineHorizontally(x);
  }

  // Similar logic to the left and right side above.
  let computedDirection = 'bottom';
  const bottomOverflow = getBottomOverflow(y);
  if (bottomOverflow > 0) {
    const adjustedY = y - menuRect.height;
    const topOverflow = getTopOverflow(adjustedY);
    if (topOverflow >= 0 || -topOverflow < bottomOverflow) {
      y = adjustedY;
      computedDirection = 'top';
    }
    y = confineVertically(y);
  }

  return { x, y, computedDirection };
};
