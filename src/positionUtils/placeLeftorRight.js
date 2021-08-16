import { placeArrowVertical } from './placeArrowVertical';

export const placeLeftorRight = ({
    anchorRect,
    containerRect,
    menuRect,
    placeLeftorRightY,
    placeLeftX,
    placeRightX,
    getLeftOverflow,
    getRightOverflow,
    confineHorizontally,
    confineVertically,
    arrowRef,
    arrow,
    direction,
    position
}) => {
    let computedDirection = direction;
    let y = placeLeftorRightY;
    if (position !== 'initial') {
        y = confineVertically(y);
        if (position === 'anchor') {
            // restrict menu to the edge of anchor element
            y = Math.min(y, anchorRect.bottom - containerRect.top);
            y = Math.max(y, anchorRect.top - containerRect.top - menuRect.height);
        }
    }

    let x, leftOverflow, rightOverflow;
    if (computedDirection === 'left') {
        x = placeLeftX;

        if (position !== 'initial') {
            // if menu overflows to the left, 
            // try to reposition it to the right of the anchor.
            leftOverflow = getLeftOverflow(x);
            if (leftOverflow < 0) {
                // if menu overflows to the right after repositioning,
                // choose a side which has less overflow
                rightOverflow = getRightOverflow(placeRightX);
                if (rightOverflow <= 0 || -leftOverflow > rightOverflow) {
                    x = placeRightX;
                    computedDirection = 'right';
                }
            }
        }
    } else {
        // Opposite logic to the 'left' direction above
        x = placeRightX;

        if (position !== 'initial') {
            rightOverflow = getRightOverflow(x);
            if (rightOverflow > 0) {
                leftOverflow = getLeftOverflow(placeLeftX);
                if (leftOverflow >= 0 || -leftOverflow < rightOverflow) {
                    x = placeLeftX;
                    computedDirection = 'left';
                }
            }
        }
    }

    if (position === 'auto') x = confineHorizontally(x);
    const arrowY = arrow ? placeArrowVertical({
        menuY: y, arrowRef, anchorRect, containerRect, menuRect
    }) : undefined;
    return { arrowY, x, y, computedDirection };
}
