var positionContextMenu = function positionContextMenu(_ref) {
  var positionHelpers = _ref.positionHelpers,
      anchorPoint = _ref.anchorPoint;
  var menuRect = positionHelpers.menuRect,
      containerRect = positionHelpers.containerRect,
      getLeftOverflow = positionHelpers.getLeftOverflow,
      getRightOverflow = positionHelpers.getRightOverflow,
      getTopOverflow = positionHelpers.getTopOverflow,
      getBottomOverflow = positionHelpers.getBottomOverflow,
      confineHorizontally = positionHelpers.confineHorizontally,
      confineVertically = positionHelpers.confineVertically;
  var x, y;
  x = anchorPoint.x - containerRect.left;
  y = anchorPoint.y - containerRect.top;
  var rightOverflow = getRightOverflow(x);

  if (rightOverflow > 0) {
    var adjustedX = x - menuRect.width;
    var leftOverflow = getLeftOverflow(adjustedX);

    if (leftOverflow >= 0 || -leftOverflow < rightOverflow) {
      x = adjustedX;
    }

    x = confineHorizontally(x);
  }

  var computedDirection = 'bottom';
  var bottomOverflow = getBottomOverflow(y);

  if (bottomOverflow > 0) {
    var adjustedY = y - menuRect.height;
    var topOverflow = getTopOverflow(adjustedY);

    if (topOverflow >= 0 || -topOverflow < bottomOverflow) {
      y = adjustedY;
      computedDirection = 'top';
    }

    y = confineVertically(y);
  }

  return {
    x: x,
    y: y,
    computedDirection: computedDirection
  };
};

export { positionContextMenu };
