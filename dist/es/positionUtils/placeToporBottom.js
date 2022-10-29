import { placeArrowHorizontal } from './placeArrowHorizontal.js';

var placeToporBottom = function placeToporBottom(_ref) {
  var anchorRect = _ref.anchorRect,
    containerRect = _ref.containerRect,
    menuRect = _ref.menuRect,
    placeToporBottomX = _ref.placeToporBottomX,
    placeTopY = _ref.placeTopY,
    placeBottomY = _ref.placeBottomY,
    getTopOverflow = _ref.getTopOverflow,
    getBottomOverflow = _ref.getBottomOverflow,
    confineHorizontally = _ref.confineHorizontally,
    confineVertically = _ref.confineVertically,
    arrowRef = _ref.arrowRef,
    arrow = _ref.arrow,
    direction = _ref.direction,
    position = _ref.position;
  var computedDirection = direction === 'top' ? 'top' : 'bottom';
  var x = placeToporBottomX;
  if (position !== 'initial') {
    x = confineHorizontally(x);
    if (position === 'anchor') {
      x = Math.min(x, anchorRect.right - containerRect.left);
      x = Math.max(x, anchorRect.left - containerRect.left - menuRect.width);
    }
  }
  var y, topOverflow, bottomOverflow;
  if (computedDirection === 'top') {
    y = placeTopY;
    if (position !== 'initial') {
      topOverflow = getTopOverflow(y);
      if (topOverflow < 0) {
        bottomOverflow = getBottomOverflow(placeBottomY);
        if (bottomOverflow <= 0 || -topOverflow > bottomOverflow) {
          y = placeBottomY;
          computedDirection = 'bottom';
        }
      }
    }
  } else {
    y = placeBottomY;
    if (position !== 'initial') {
      bottomOverflow = getBottomOverflow(y);
      if (bottomOverflow > 0) {
        topOverflow = getTopOverflow(placeTopY);
        if (topOverflow >= 0 || -topOverflow < bottomOverflow) {
          y = placeTopY;
          computedDirection = 'top';
        }
      }
    }
  }
  if (position === 'auto') y = confineVertically(y);
  var arrowX = arrow ? placeArrowHorizontal({
    menuX: x,
    arrowRef: arrowRef,
    anchorRect: anchorRect,
    containerRect: containerRect,
    menuRect: menuRect
  }) : undefined;
  return {
    arrowX: arrowX,
    x: x,
    y: y,
    computedDirection: computedDirection
  };
};

export { placeToporBottom };
