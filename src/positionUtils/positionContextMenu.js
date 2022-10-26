import { placeLeftorRight } from './placeLeftorRight';
import { placeToporBottom } from './placeToporBottom';

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

// This function is reusing the positionMenu logic but instead of
// getting anchorRect with getBoundingClientRect, it generates
// the anchorRect using the anchorPoint
export const enhancedPositionContextMenu = ({
  arrow,
  arrowRef,
  align,
  direction,
  offsetX,
  offsetY,
  position,
  positionHelpers,
  anchorPoint
}) => {
  const { menuRect, containerRect } = positionHelpers;

  let horizontalOffset = offsetX;
  let verticalOffset = offsetY;
  if (arrow) {
    if (direction === 'left' || direction === 'right') {
      horizontalOffset += arrowRef.current.offsetWidth;
    } else {
      verticalOffset += arrowRef.current.offsetHeight;
    }
  }

  const anchorRect = {
    top: anchorPoint.y,
    right: anchorPoint.x,
    bottom: anchorPoint.y,
    left: anchorPoint.x,
    width: 0,
    height: 0
  };
  const placeLeftX = anchorRect.left - containerRect.left - menuRect.width - horizontalOffset;
  const placeRightX = anchorRect.right - containerRect.left + horizontalOffset;
  const placeTopY = anchorRect.top - containerRect.top - menuRect.height - verticalOffset;
  const placeBottomY = anchorRect.bottom - containerRect.top + verticalOffset;

  let placeToporBottomX, placeLeftorRightY;
  if (align === 'end') {
    placeToporBottomX = anchorRect.right - containerRect.left - menuRect.width;
    placeLeftorRightY = anchorRect.bottom - containerRect.top - menuRect.height;
  } else if (align === 'center') {
    placeToporBottomX =
      anchorRect.left - containerRect.left - (menuRect.width - anchorRect.width) / 2;
    placeLeftorRightY =
      anchorRect.top - containerRect.top - (menuRect.height - anchorRect.height) / 2;
  } else {
    placeToporBottomX = anchorRect.left - containerRect.left;
    placeLeftorRightY = anchorRect.top - containerRect.top;
  }
  placeToporBottomX += horizontalOffset;
  placeLeftorRightY += verticalOffset;

  const options = {
    ...positionHelpers,
    anchorRect,
    placeLeftX,
    placeRightX,
    placeLeftorRightY,
    placeTopY,
    placeBottomY,
    placeToporBottomX,
    arrowRef,
    arrow,
    direction,
    position
  };

  switch (direction) {
    case 'left':
    case 'right':
      return placeLeftorRight(options);

    case 'top':
    case 'bottom':
    default:
      return placeToporBottom(options);
  }
};
