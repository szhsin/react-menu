import { placeArrowHorizontal } from './placeArrowHorizontal.mjs';

const placeToporBottom = ({
  anchorRect,
  containerRect,
  menuRect,
  placeToporBottomX,
  placeTopY,
  placeBottomY,
  getTopOverflow,
  getBottomOverflow,
  confineHorizontally,
  confineVertically,
  arrowRef,
  arrow,
  direction,
  position
}) => {
  let computedDirection = direction === 'top' ? 'top' : 'bottom';
  let x = placeToporBottomX;
  if (position !== 'initial') {
    x = confineHorizontally(x);
    if (position === 'anchor') {
      x = Math.min(x, anchorRect.right - containerRect.left);
      x = Math.max(x, anchorRect.left - containerRect.left - menuRect.width);
    }
  }
  let y, topOverflow, bottomOverflow;
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
  const arrowX = arrow ? placeArrowHorizontal({
    menuX: x,
    arrowRef,
    anchorRect,
    containerRect,
    menuRect
  }) : undefined;
  return {
    arrowX,
    x,
    y,
    computedDirection
  };
};

export { placeToporBottom };
