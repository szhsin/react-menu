import { placeLeftorRight } from './placeLeftorRight';
import { placeToporBottom } from './placeToporBottom';

export const positionMenu = ({
  arrow,
  align,
  direction,
  gap,
  shift,
  position,
  anchorRect,
  arrowRef,
  positionHelpers
}) => {
  const { menuRect, containerRect } = positionHelpers;

  const isHorizontal = direction === 'left' || direction === 'right';
  let horizontalOffset = isHorizontal ? gap : shift;
  let verticalOffset = isHorizontal ? shift : gap;
  if (arrow) {
    const arrowElt = arrowRef.current;
    if (isHorizontal) {
      horizontalOffset += arrowElt.offsetWidth;
    } else {
      verticalOffset += arrowElt.offsetHeight;
    }
  }

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
