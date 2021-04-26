import React from 'react';
import { Menu, MenuItem, MenuGroup, MenuButton, MenuDivider } from '../';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as utils from './utils';

test('MenuGroup should allow keyboard navigation to go thru its children', () => {
    render(
        <Menu menuButton={<MenuButton>Menu Group</MenuButton>}>
            <MenuItem>One</MenuItem>
            <MenuGroup takeOverflow>
                <MenuItem>Two</MenuItem>
                <MenuDivider />
                <MenuItem disabled>Skip</MenuItem>
                <MenuGroup>
                    <MenuItem>Three</MenuItem>
                </MenuGroup>
            </MenuGroup >
            <MenuItem>Four</MenuItem>
        </Menu >
    );
    utils.clickMenuButton();
    const menu = utils.queryMenu();

    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(utils.queryMenuItem('One')).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(utils.queryMenuItem('Two')).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(utils.queryMenuItem('Three')).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(utils.queryMenuItem('Four')).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(utils.queryMenuItem('One')).toHaveFocus();
});
