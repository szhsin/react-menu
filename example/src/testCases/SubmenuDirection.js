import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import { bem } from '../utils';

const SubmenuDirection = () => {
  return (
    <>
      <h2>Submenu direction</h2>
      <div className={bem('test-case')}>
        <Menu menuButton={<MenuButton>Open menu</MenuButton>} transition>
          <MenuItem>First</MenuItem>
          <SubMenu label="Lv1">
            <MenuItem>item 1</MenuItem>
            <MenuItem>item 2</MenuItem>
            <SubMenu label="Lv2">
              <MenuItem>item 1</MenuItem>
              <MenuItem>item 2</MenuItem>
              <SubMenu label="Lv3">
                <MenuItem>item 1</MenuItem>
                <MenuItem>item 2</MenuItem>
                <SubMenu label="Lv4">
                  <MenuItem>item 1</MenuItem>
                  <MenuItem>item 2</MenuItem>
                  <SubMenu label="Lv5">
                    <MenuItem>item 1</MenuItem>
                    <MenuItem>item 2</MenuItem>
                    <SubMenu label="Lv6">
                      <MenuItem>item 1</MenuItem>
                      <MenuItem>item 2</MenuItem>
                      <SubMenu label="Lv7">
                        <MenuItem>item 1</MenuItem>
                        <MenuItem>item 2</MenuItem>
                        <SubMenu label="Lv8">
                          <MenuItem>item 1</MenuItem>
                          <MenuItem>item 2</MenuItem>
                          <SubMenu label="Lv9">
                            <MenuItem>item 1</MenuItem>
                            <MenuItem>item 2</MenuItem>
                            <SubMenu label="Lv10">
                              <MenuItem>item 1</MenuItem>
                              <MenuItem>item 2</MenuItem>
                              <SubMenu label="Lv11">
                                <MenuItem>item 1</MenuItem>
                                <MenuItem>item 2</MenuItem>
                                <SubMenu label="Lv12">
                                  <MenuItem>item 1</MenuItem>
                                  <MenuItem>item 2</MenuItem>
                                </SubMenu>
                              </SubMenu>
                            </SubMenu>
                          </SubMenu>
                        </SubMenu>
                      </SubMenu>
                    </SubMenu>
                  </SubMenu>
                </SubMenu>
              </SubMenu>
            </SubMenu>
          </SubMenu>
          <MenuItem>Last</MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default SubmenuDirection;
