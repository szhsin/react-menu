import React from 'react';
import './styles/index.scss';
import { bem, menuClass, radioGroupClass } from '../utils';


export const MenuRadioGroup = React.memo(({ children, name }) => {

    return (
        <li role="presentation">
            <ul className={bem(menuClass, radioGroupClass)}
                role="group"
                aria-label={name}>
                {children}
            </ul>
        </li>
    );
});