import { extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { placeLeftorRight } from './placeLeftorRight.js';
import { placeToporBottom } from './placeToporBottom.js';

var positionMenu = function positionMenu(_ref) {
  var arrow = _ref.arrow,
    align = _ref.align,
    direction = _ref.direction,
    gap = _ref.gap,
    shift = _ref.shift,
    position = _ref.position,
    anchorRect = _ref.anchorRect,
    arrowRef = _ref.arrowRef,
    positionHelpers = _ref.positionHelpers;
  var menuRect = positionHelpers.menuRect,
    containerRect = positionHelpers.containerRect;
  var isHorizontal = direction === 'left' || direction === 'right';
  var horizontalOffset = isHorizontal ? gap : shift;
  var verticalOffset = isHorizontal ? shift : gap;
  if (arrow) {
    var arrowElt = arrowRef.current;
    if (isHorizontal) {
      horizontalOffset += arrowElt.offsetWidth;
    } else {
      verticalOffset += arrowElt.offsetHeight;
    }
  }
  var placeLeftX = anchorRect.left - containerRect.left - menuRect.width - horizontalOffset;
  var placeRightX = anchorRect.right - containerRect.left + horizontalOffset;
  var placeTopY = anchorRect.top - containerRect.top - menuRect.height - verticalOffset;
  var placeBottomY = anchorRect.bottom - containerRect.top + verticalOffset;
  var placeToporBottomX, placeLeftorRightY;
  if (align === 'end') {
    placeToporBottomX = anchorRect.right - containerRect.left - menuRect.width;
    placeLeftorRightY = anchorRect.bottom - containerRect.top - menuRect.height;
  } else if (align === 'center') {
    placeToporBottomX = anchorRect.left - containerRect.left - (menuRect.width - anchorRect.width) / 2;
    placeLeftorRightY = anchorRect.top - containerRect.top - (menuRect.height - anchorRect.height) / 2;
  } else {
    placeToporBottomX = anchorRect.left - containerRect.left;
    placeLeftorRightY = anchorRect.top - containerRect.top;
  }
  placeToporBottomX += horizontalOffset;
  placeLeftorRightY += verticalOffset;
  var options = _extends({}, positionHelpers, {
    anchorRect: anchorRect,
    placeLeftX: placeLeftX,
    placeRightX: placeRightX,
    placeLeftorRightY: placeLeftorRightY,
    placeTopY: placeTopY,
    placeBottomY: placeBottomY,
    placeToporBottomX: placeToporBottomX,
    arrowRef: arrowRef,
    arrow: arrow,
    direction: direction,
    position: position
  });
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

export { positionMenu };
