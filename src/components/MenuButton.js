import React from 'react';
import { bem, menuButtonClass } from '../utils';


export const MenuButton = React.memo(
    React.forwardRef(({ onClick, children }, ref) => {
        // console.log('render MenuButton');
        return (
            <button ref={ref} className={bem(menuButtonClass)}
                onClick={onClick} >
                {children}
            </button>
        );
    }));