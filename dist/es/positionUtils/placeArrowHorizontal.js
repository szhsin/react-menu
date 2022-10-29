var placeArrowHorizontal = function placeArrowHorizontal(_ref) {
  var arrowRef = _ref.arrowRef,
    menuX = _ref.menuX,
    anchorRect = _ref.anchorRect,
    containerRect = _ref.containerRect,
    menuRect = _ref.menuRect;
  var x = anchorRect.left - containerRect.left - menuX + anchorRect.width / 2;
  var offset = arrowRef.current.offsetWidth * 1.25;
  x = Math.max(offset, x);
  x = Math.min(x, menuRect.width - offset);
  return x;
};

export { placeArrowHorizontal };
