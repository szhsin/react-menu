import React from 'react';
import { defineName, bem, flatStyles, menuButtonClass } from '../utils';


export const MenuButton = defineName(React.memo(React.forwardRef(({
    className,
    styles,
    isOpen,
    onClick,
    onKeyDown,
    children }, ref) => {
    // console.log('render MenuButton');
    return (
        <button className={bem(menuButtonClass)(className)}
            style={flatStyles(styles)}
            aria-haspopup="true"
            aria-expanded={isOpen}
            ref={ref}
            onClick={onClick}
            onKeyDown={onKeyDown} >
            {children}
        </button>
    );
})), 'MenuButton');
