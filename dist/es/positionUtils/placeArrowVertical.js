var placeArrowVertical = function placeArrowVertical(_ref) {
  var arrowRef = _ref.arrowRef,
    menuY = _ref.menuY,
    anchorRect = _ref.anchorRect,
    containerRect = _ref.containerRect,
    menuRect = _ref.menuRect;
  var y = anchorRect.top - containerRect.top - menuY + anchorRect.height / 2;
  var offset = arrowRef.current.offsetHeight * 1.25;
  y = Math.max(offset, y);
  y = Math.min(y, menuRect.height - offset);
  return y;
};

export { placeArrowVertical };
