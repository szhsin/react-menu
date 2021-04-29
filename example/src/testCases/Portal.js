import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu
} from '@szhsin/react-menu';
import { bem } from '../utils';

const Test1 = () => {

    return (
        <div className={bem('test-case', null, { portal1: true })}>
            <div className={bem('test-case', 'portal1')}>
                <Menu menuButton={<MenuButton>Portal</MenuButton>} direction="right"
                    portal position="anchor">
                    {new Array(10).fill(0).map(
                        (_, i) => <MenuItem key={i}>Item {i + 1}</MenuItem>)}
                    <SubMenu label="Submenu">
                        {new Array(10).fill(0).map(
                            (_, i) => <MenuItem key={i}>Subitem {i + 1}</MenuItem>)}
                    </SubMenu>
                </Menu >
            </div>
        </div>
    );
}

const Portal = () => {
    return (
        <Test1 />
    );
}

export default Portal;
