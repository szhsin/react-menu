export const placeArrowVertical = ({
    arrowRef,
    menuY,
    anchorRect,
    containerRect,
    menuRect
}) => {
    let y = anchorRect.top - containerRect.top - menuY + anchorRect.height / 2;
    const offset = arrowRef.current.offsetHeight * 1.25;
    y = Math.max(offset, y);
    y = Math.min(y, menuRect.height - offset);
    return y;
}
