import React, { useReducer, useState } from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu
} from '@szhsin/react-menu';
import { bem } from '../utils';

const Test1 = () => {
    const [repos, forceRepos] = useReducer(c => c + 1, 1);
    const [height, setHeight] = useState(0);
    return (
        <div className={bem('test-case', null, { repos1: true })}>
            <div>Reposition</div>
            <div className={bem('test-case', 'hover')} onMouseEnter={forceRepos}>Reposition</div>
            <div className={bem('test-case', 'hover')}
                onMouseEnter={() => setHeight(h => h + 60)}>
                Resize
            </div>
            <Menu menuButton={< MenuButton >Menu1</MenuButton>}
                repositionFlag={repos} animation={false}
                onChange={({ open }) => open && setHeight(0)}>
                <MenuItem styles={{ minHeight: height }}>New File</MenuItem>
                <SubMenu label="Menu2">
                    <MenuItem>index.html</MenuItem>
                    <MenuItem>example.js</MenuItem>
                    <SubMenu label="Menu3">
                        <MenuItem>about.css</MenuItem>
                        <MenuItem>home.css</MenuItem>
                        <MenuItem>index.css</MenuItem>
                    </SubMenu>
                </SubMenu>
                <MenuItem>Save</MenuItem>
            </Menu >
        </div>
    );
}

const Reposition = () => {
    return (
        <Test1 />
    );
}

export default Reposition;
