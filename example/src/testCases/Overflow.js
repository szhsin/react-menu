import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  MenuButton,
  MenuGroup,
  MenuRadioGroup,
  MenuHeader,
  MenuDivider,
  SubMenu,
  ControlledMenu,
  useMenuState
} from '@szhsin/react-menu';
import { bem } from '../utils';

const Test1 = () => {
  const [take1, setTake1] = useState(false);
  const [take2, setTake2] = useState(false);
  const [enableSubmenu, setEnableSubmenu] = useState(false);
  return (
    <div className={bem('test-case')}>
      <label>
        Group 1
        <input
          type="checkbox"
          checked={take1}
          onChange={({ target }) => setTake1(target.checked)}
        />
      </label>
      <label>
        Group 2
        <input
          type="checkbox"
          checked={take2}
          onChange={({ target }) => setTake2(target.checked)}
        />
      </label>
      <Menu
        menuButton={<MenuButton>Overflow</MenuButton>}
        align="end"
        overflow="auto"
        position="anchor"
        transition={false}
        setDownOverflow={take1 || take2}
      >
        <MenuItem disabled>Disabled 1</MenuItem>
        <MenuItem>Two</MenuItem>
        <MenuGroup style={{ border: '3px solid' }} takeOverflow={take1}>
          <MenuHeader>Group</MenuHeader>
          {new Array(2).fill(0).map((_, i) => (
            <MenuItem key={i}>Item {i + 1}</MenuItem>
          ))}
          <MenuDivider />

          <MenuRadioGroup value="green">
            <MenuItem type="radio" value="red">
              Red
            </MenuItem>
            <MenuItem type="radio" value="green">
              Green
            </MenuItem>
            <MenuItem type="radio" value="blue" disabled>
              Blue
            </MenuItem>
          </MenuRadioGroup>
          <MenuDivider />

          <MenuGroup style={{ border: '4px solid green' }} takeOverflow={take2}>
            <MenuHeader>Group</MenuHeader>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem checked type="checkbox">
              Checked
            </MenuItem>
            <MenuDivider />
            {!enableSubmenu &&
              new Array(15).fill(0).map((_, i) => <MenuItem key={i}>Item {i + 1}</MenuItem>)}
          </MenuGroup>

          <SubMenu
            disabled={!enableSubmenu}
            label="Submenu"
            overflow="auto"
            position="initial"
            align="end"
            setDownOverflow
          >
            <MenuHeader>Submenu</MenuHeader>
            <MenuItem>First</MenuItem>
            <MenuDivider />
            <MenuGroup takeOverflow>
              {new Array(35).fill(0).map((_, i) => (
                <MenuItem key={i}>Item {i + 1}</MenuItem>
              ))}
            </MenuGroup>
            <MenuDivider />
            <MenuItem>Last</MenuItem>
          </SubMenu>
        </MenuGroup>
        <MenuItem>Last</MenuItem>
      </Menu>

      <label>
        Submenu
        <input
          type="checkbox"
          checked={enableSubmenu}
          onChange={({ target }) => setEnableSubmenu(target.checked)}
        />
      </label>
    </div>
  );
};

const Test2 = () => {
  const [menuProps, toggleMenu] = useMenuState({ transition: true });
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [isLeft, setLeft] = useState(false);

  return (
    <div
      className={bem('test-case')}
      onContextMenu={(e) => {
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        toggleMenu(true);
      }}
    >
      <div className={bem('test-case', 'hover')} onMouseEnter={() => setLeft((d) => !d)}>
        Direction
      </div>
      context menu
      <ControlledMenu
        anchorPoint={anchorPoint}
        {...menuProps}
        onClose={() => toggleMenu(false)}
        overflow="auto"
        setDownOverflow
      >
        <MenuItem>TOP</MenuItem>
        <MenuGroup takeOverflow className="a1">
          {new Array(40).fill(0).map((_, i) => (
            <MenuItem key={i}>Item {i + 1}</MenuItem>
          ))}
        </MenuGroup>
      </ControlledMenu>
      <Menu
        menuButton={<MenuButton>Overflow</MenuButton>}
        overflow="auto"
        position="initial"
        transition={true}
        align="end"
        direction={isLeft ? 'left' : 'right'}
      >
        {new Array(40).fill(0).map((_, i) => (
          <MenuItem key={i}>Item {i + 1}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};

const Test3 = () => {
  return (
    <div className={bem('test-case')}>
      <Menu
        menuButton={<MenuButton>Submenu Overflow</MenuButton>}
        overflow="auto"
        position="anchor"
        transition
      >
        {new Array(20).fill(0).map((_, i) => (
          <MenuItem key={i}>Item {i + 1}</MenuItem>
        ))}

        <SubMenu label="submenu 1" overflow="auto" offsetX={15}>
          {new Array(20).fill(0).map((_, i) => (
            <MenuItem key={i}>Item {i + 1}</MenuItem>
          ))}

          <SubMenu label="submenu 2" offsetX={15}>
            {new Array(5).fill(0).map((_, i) => (
              <MenuItem key={i}>Item {i + 1}</MenuItem>
            ))}
          </SubMenu>

          {new Array(20).fill(0).map((_, i) => (
            <MenuItem key={i}>Item {i + 1}</MenuItem>
          ))}
        </SubMenu>

        {new Array(20).fill(0).map((_, i) => (
          <MenuItem key={i}>Item {i + 1}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};

const items = new Array(50).fill(0).map((_, i) => `Item ${i + 1}`);

const Test4 = () => {
  const [portal, setPortal] = useState(true);
  return (
    <div className={bem('test-case')} style={{ flexDirection: 'column' }}>
      <label>
        Portal
        <input
          type="checkbox"
          checked={portal}
          onChange={({ target }) => setPortal(target.checked)}
        />
      </label>
      <div
        style={{
          border: '2px solid #007bff',
          padding: 10,
          height: 600,
          overflow: 'auto'
        }}
      >
        <div
          style={{
            border: '2px solid green',
            width: 600,
            height: 400,
            marginTop: 400,
            marginBottom: 500,
            overflow: 'auto',
            position: 'relative'
          }}
        >
          <div style={{ width: 1000, paddingTop: 100 }}>
            <Menu
              menuButton={
                <MenuButton style={{ display: 'block', marginRight: '80%', marginLeft: 'auto' }}>
                  Open menu
                </MenuButton>
              }
              overflow="auto"
              position="anchor"
              boundingBoxPadding="20"
              portal={portal}
              align="end"
              key={portal.toString()}
            >
              {items.map((item) => (
                <MenuItem key={item}>{item}</MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

const Overflow = () => {
  return (
    <>
      <h2>Overflow</h2>
      <Test1 />
      <Test2 />
      <Test3 />
      <Test4 />
    </>
  );
};

export default Overflow;
