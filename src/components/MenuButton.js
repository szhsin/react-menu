import React from 'react';
import { bem, flatStyles, menuButtonClass } from '../utils';


export const MenuButton = React.memo(
    React.forwardRef(({ className, styles, onClick, children }, ref) => {
        // console.log('render MenuButton');
        return (
            <button className={bem(menuButtonClass)(className)}
                style={flatStyles(styles)}
                ref={ref}
                onClick={onClick} >
                {children}
            </button>
        );
    }));