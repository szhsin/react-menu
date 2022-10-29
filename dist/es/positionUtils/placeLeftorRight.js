import { placeArrowVertical } from './placeArrowVertical.js';

var placeLeftorRight = function placeLeftorRight(_ref) {
  var anchorRect = _ref.anchorRect,
    containerRect = _ref.containerRect,
    menuRect = _ref.menuRect,
    placeLeftorRightY = _ref.placeLeftorRightY,
    placeLeftX = _ref.placeLeftX,
    placeRightX = _ref.placeRightX,
    getLeftOverflow = _ref.getLeftOverflow,
    getRightOverflow = _ref.getRightOverflow,
    confineHorizontally = _ref.confineHorizontally,
    confineVertically = _ref.confineVertically,
    arrowRef = _ref.arrowRef,
    arrow = _ref.arrow,
    direction = _ref.direction,
    position = _ref.position;
  var computedDirection = direction;
  var y = placeLeftorRightY;
  if (position !== 'initial') {
    y = confineVertically(y);
    if (position === 'anchor') {
      y = Math.min(y, anchorRect.bottom - containerRect.top);
      y = Math.max(y, anchorRect.top - containerRect.top - menuRect.height);
    }
  }
  var x, leftOverflow, rightOverflow;
  if (computedDirection === 'left') {
    x = placeLeftX;
    if (position !== 'initial') {
      leftOverflow = getLeftOverflow(x);
      if (leftOverflow < 0) {
        rightOverflow = getRightOverflow(placeRightX);
        if (rightOverflow <= 0 || -leftOverflow > rightOverflow) {
          x = placeRightX;
          computedDirection = 'right';
        }
      }
    }
  } else {
    x = placeRightX;
    if (position !== 'initial') {
      rightOverflow = getRightOverflow(x);
      if (rightOverflow > 0) {
        leftOverflow = getLeftOverflow(placeLeftX);
        if (leftOverflow >= 0 || -leftOverflow < rightOverflow) {
          x = placeLeftX;
          computedDirection = 'left';
        }
      }
    }
  }
  if (position === 'auto') x = confineHorizontally(x);
  var arrowY = arrow ? placeArrowVertical({
    menuY: y,
    arrowRef: arrowRef,
    anchorRect: anchorRect,
    containerRect: containerRect,
    menuRect: menuRect
  }) : undefined;
  return {
    arrowY: arrowY,
    x: x,
    y: y,
    computedDirection: computedDirection
  };
};

export { placeLeftorRight };
