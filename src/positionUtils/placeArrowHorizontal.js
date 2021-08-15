export const placeArrowHorizontal = ({
    arrowRef,
    menuX,
    anchorRect,
    containerRect,
    menuRect
}) => {
    let x = anchorRect.left - containerRect.left - menuX + anchorRect.width / 2;
    const offset = arrowRef.current.offsetWidth * 1.25;
    x = Math.max(offset, x);
    x = Math.min(x, menuRect.width - offset);
    return x;
}
