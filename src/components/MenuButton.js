import React from 'react';
import './styles/index.scss';
import { bem, menuButtonClass } from '../utils';

export const MenuButton = React.memo(React.forwardRef((props, ref) => {
    console.log('render MenuButton');
    return (
        <button ref={ref} className={bem(menuButtonClass)}
            onClick={props.onClick} >
            {props.children}
        </button>
    );
}));