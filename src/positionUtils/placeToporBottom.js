import { placeArrowHorizontal } from './placeArrowHorizontal';

export const placeToporBottom = ({
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
  // make sure invalid direction is treated as 'bottom'
  let computedDirection = direction === 'top' ? 'top' : 'bottom';
  let x = placeToporBottomX;
  if (position !== 'initial') {
    x = confineHorizontally(x);
    if (position === 'anchor') {
      // restrict menu to the edge of anchor element
      x = Math.min(x, anchorRect.right - containerRect.left);
      x = Math.max(x, anchorRect.left - containerRect.left - menuRect.width);
    }
  }

  let y, topOverflow, bottomOverflow;
  if (computedDirection === 'top') {
    y = placeTopY;

    if (position !== 'initial') {
      // if menu overflows to the top,
      // try to reposition it to the bottom of the anchor.
      topOverflow = getTopOverflow(y);
      if (topOverflow < 0) {
        // if menu overflows to the bottom after repositioning,
        // choose a side which has less overflow
        bottomOverflow = getBottomOverflow(placeBottomY);
        if (bottomOverflow <= 0 || -topOverflow > bottomOverflow) {
          y = placeBottomY;
          computedDirection = 'bottom';
        }
      }
    }
  } else {
    // Opposite logic to the 'top' direction above
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
  const arrowX = arrow
    ? placeArrowHorizontal({
        menuX: x,
        arrowRef,
        anchorRect,
        containerRect,
        menuRect
      })
    : undefined;
  return { arrowX, x, y, computedDirection };
};
