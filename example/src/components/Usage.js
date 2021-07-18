import React, {
    useRef,
    useState,
    useLayoutEffect,
    useContext,
    useEffect
} from 'react';
import {
    Menu as ReactMenu,
    ControlledMenu as ReactControlledMenu,
    MenuItem,
    MenuButton,
    FocusableItem,
    SubMenu,
    MenuGroup,
    MenuRadioGroup,
    MenuHeader,
    MenuDivider,
    useMenuState
} from '@szhsin/react-menu';
import { SettingContext, DomInfoContext, ToastContext, withTheme } from '../utils';
import { TableContents } from './TableContents';
import { Example } from './Example';
import { HashHeading } from './HashHeading';
import data, * as codeExamples from '../data/codeExamples';

const Menu = withTheme(ReactMenu);
const ControlledMenu = withTheme(ReactControlledMenu);

export const Usage = React.memo(function Usage() {

    return (
        <React.Fragment>
            <TableContents>
                {data}
            </TableContents>

            <main id="usage">
                <GroupingSection heading="h1" data={codeExamples.features} />
                <GroupingSection heading="h1" data={codeExamples.installation} />
                <GroupingSection heading="h1" data={codeExamples.usageExamples} />

                <GroupingSection data={codeExamples.menu} />
                <BasicMenuExample />
                <SubmenuExample />
                <EventHandlingExample />
                <RadioGroupExample />
                <CheckBoxExample />
                <HeaderAndDividerExample />
                <CombinedExample />

                <GroupingSection data={codeExamples.menuItem} />
                <LinkAndDisabledExample />
                <IconAndImageExample />
                <HoverAndActiveExample />
                <FocusableItemExample />

                <GroupingSection data={codeExamples.menuOptions} />
                <MenuPlacementExample />
                <MenuOverflowExample />
                <BoundingBoxExample />

                <GroupingSection data={codeExamples.menuButton} />
                <OpenStateExample />
                <CustomisedButtonExample />

                <GroupingSection data={codeExamples.controlledMenu} />
                <ManagingStateExample />
                <ContextMenuExample />
                <MenuStateHookExample />

                <GroupingSection data={codeExamples.customisedStyle} />
                <StylesPropExample />
                <ClassNamePropExample />
            </main >

            <div className="place-holder" role="presentation" />
        </React.Fragment>
    );
});

function GroupingSection({ heading, data: { id, title, desc } }) {
    return (
        <>
            <HashHeading id={id} title={title} heading={heading || 'h2'} />
            {desc}
        </>
    );
}

function BasicMenuExample() {

    return (
        <Example initialFullSource={true} data={codeExamples.basicMenu} >
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem>Close Window</MenuItem>
            </Menu>
        </Example>
    );
}

function SubmenuExample() {

    return (
        <Example data={codeExamples.subMenu} >
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                <MenuItem>New File</MenuItem>
                <SubMenu label="Open">
                    <MenuItem>index.html</MenuItem>
                    <MenuItem>example.js</MenuItem>
                    <SubMenu label="Styles">
                        <MenuItem>about.css</MenuItem>
                        <MenuItem>home.css</MenuItem>
                        <MenuItem>index.css</MenuItem>
                    </SubMenu>
                </SubMenu>
                <MenuItem>Save</MenuItem>
            </Menu>
        </Example>
    );
}


function EventHandlingExample() {
    const ref = useRef(null);
    const lineNum = useRef(1);
    const [output, setOutput] = useState([]);

    const addLine = line => {
        return setOutput(o => [...o, <li key={lineNum.current++}>{line}</li>]);
    }

    const handleMenuClick = e => {
        addLine(`[Menu] ${e.value} clicked`);
        addLine('------');
    };

    const handleFileClick = e => {
        addLine(`[MenuItem] ${e.value} clicked`);
    };

    const handleSaveClick = e => {
        addLine(`[MenuItem] ${e.value} clicked`);
        addLine('------');
        return false;
    };

    useLayoutEffect(() => {
        ref.current.scrollTop = ref.current.scrollHeight;
    }, [output]);

    return (
        <Example data={codeExamples.eventHandling} >
            <div className="buttons">
                <Menu menuButton={<MenuButton>Open menu</MenuButton>}
                    onItemClick={handleMenuClick}>

                    <MenuItem value="File" onClick={handleFileClick}>
                        New File
                    </MenuItem>

                    <MenuItem value="Save" onClick={handleSaveClick}>
                        Save
                    </MenuItem>

                    <MenuItem value="Close">Close Window</MenuItem>
                </Menu>

                <button className="btn"
                    onClick={() => setOutput([])}>
                    Clear
                </button>
            </div>

            <ul className="output" ref={ref}>
                {output}
            </ul>
        </Example>
    );
}

function RadioGroupExample() {
    const [textColor, setTextColor] = useState('red');
    const { isDark } = useContext(SettingContext);

    return (
        <Example data={codeExamples.radioGroup} >
            <Menu menuButton={<MenuButton>Text color</MenuButton>}>
                <MenuRadioGroup value={textColor}
                    onChange={e => setTextColor(e.value)}>
                    <MenuItem value="red">Red</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                    <MenuItem value={isDark ? '#69a6f8' : 'blue'}>Blue</MenuItem>
                </MenuRadioGroup>
            </Menu>

            <div className="sample-text" style={{ color: textColor }}>
                Sample text
            </div>
        </Example>
    );
}

function CheckBoxExample() {
    const [isBold, setBold] = useState(true);
    const [isItalic, setItalic] = useState(true);
    const [isUnderline, setUnderline] = useState(false);

    return (
        <Example data={codeExamples.checkBox} >
            <Menu menuButton={<MenuButton>Text style</MenuButton>}>
                <MenuItem type="checkbox" checked={isBold}
                    onClick={e => setBold(e.checked)}>
                    Bold
                </MenuItem>
                <MenuItem type="checkbox" checked={isItalic}
                    onClick={e => setItalic(e.checked)}>
                    Italic
                </MenuItem>
                <MenuItem type="checkbox" checked={isUnderline}
                    onClick={e => setUnderline(e.checked)}>
                    Underline
                </MenuItem>
            </Menu>

            <div className="sample-text" style={{
                fontWeight: isBold ? 'bold' : 'initial',
                fontStyle: isItalic ? 'italic' : 'initial',
                textDecoration: isUnderline ? 'underline' : 'initial'
            }}>Sample text</div>
        </Example>
    );
}

function HeaderAndDividerExample() {

    return (
        <Example data={codeExamples.headerAndDivider} >
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}
                boundingBoxPadding={`${useContext(DomInfoContext).navbarHeight} 0 0 0`}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem>Close Window</MenuItem>
                <MenuDivider />
                <MenuHeader>Edit</MenuHeader>
                <MenuItem>Cut</MenuItem>
                <MenuItem>Copy</MenuItem>
                <MenuItem>Paste</MenuItem>
                <MenuDivider />
                <MenuItem>Print</MenuItem>
            </Menu>
        </Example>
    );
}

function CombinedExample() {
    const [textColor, setTextColor] = useState('red');
    const [isBold, setBold] = useState(true);
    const [isItalic, setItalic] = useState(true);
    const [isUnderline, setUnderline] = useState(false);
    const { isDark } = useContext(SettingContext);

    return (
        <Example data={codeExamples.combined} >
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuDivider />
                <MenuHeader>Text settings</MenuHeader>

                <SubMenu label="Text color">
                    <MenuRadioGroup
                        value={textColor}
                        onChange={e => setTextColor(e.value)}>
                        <MenuItem value={'red'}>Red</MenuItem>
                        <MenuItem value={'green'}>Green</MenuItem>
                        <MenuItem value={isDark ? '#69a6f8' : 'blue'}>Blue</MenuItem>
                    </MenuRadioGroup>
                </SubMenu>

                <SubMenu label="Text style">
                    <MenuItem type="checkbox" checked={isBold}
                        onClick={e => setBold(e.checked)}>
                        Bold
                    </MenuItem>
                    <MenuItem type="checkbox" checked={isItalic}
                        onClick={e => setItalic(e.checked)}>
                        Italic
                    </MenuItem>
                    <MenuItem type="checkbox" checked={isUnderline}
                        onClick={e => setUnderline(e.checked)}>
                        Underline
                    </MenuItem>
                </SubMenu>
            </Menu>

            <div className="sample-text" style={{
                color: textColor,
                fontWeight: isBold ? 'bold' : 'initial',
                fontStyle: isItalic ? 'italic' : 'initial',
                textDecoration: isUnderline ? 'underline' : 'initial'
            }}>Sample text</div>
        </Example>
    );
}

function LinkAndDisabledExample() {

    return (
        <Example data={codeExamples.linkAndDisabled} >
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                <MenuItem href="https://www.google.com/">Google</MenuItem>
                <MenuItem href="https://github.com/szhsin/react-menu/"
                    target="_blank" rel="noopener noreferrer">
                    GitHub (new window)
                </MenuItem>
                <MenuItem>Regular item</MenuItem>
                <MenuItem disabled>Disabled item</MenuItem>
            </Menu>
        </Example>
    );
}

function IconAndImageExample() {

    return (
        <Example data={codeExamples.iconAndImage} >
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                <MenuItem>
                    <i className="material-icons">content_cut</i>Cut
                </MenuItem>
                <MenuItem>
                    <i className="material-icons">content_copy</i>Copy
                </MenuItem>
                <MenuItem>
                    <i className="material-icons">content_paste</i>Paste
                </MenuItem>
                <MenuDivider />
                <MenuItem href="https://github.com/szhsin/react-menu/">
                    <img src="octocat.png" alt="" role="presentation" />GitHub
                </MenuItem>
            </Menu>
        </Example>
    );
}

function HoverAndActiveExample() {

    return (
        <Example data={codeExamples.hoverAndActive} >
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                <MenuItem>
                    {({ hover, active }) =>
                        active ? 'Pressed' : hover ? 'Press me' : 'Hover me'
                    }
                </MenuItem>
                <MenuDivider />
                <MenuItem styles={{ justifyContent: 'center' }}>
                    {({ hover, active }) =>
                        <i className="material-icons md-48">
                            {active ? 'sentiment_very_satisfied'
                                : hover ? 'sentiment_satisfied_alt'
                                    : 'sentiment_very_dissatisfied'}
                        </i>
                    }
                </MenuItem>
            </Menu>
        </Example>
    );
}

function FocusableItemExample() {
    const [filter, setFilter] = useState('');
    const { vWidth, navbarHeight } = useContext(DomInfoContext);

    return (
        <Example data={codeExamples.focusableItem} >
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}
                direction={vWidth < 600 ? 'top' : 'bottom'}
                align="center" onChange={e => e.open && setFilter('')}
                boundingBoxPadding={`${navbarHeight} 0 0 0`}>
                <FocusableItem>
                    {({ ref }) => (
                        <input ref={ref} type="text" placeholder="Type to filter"
                            value={filter} onChange={e => setFilter(e.target.value)} />
                    )}
                </FocusableItem>
                {
                    ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Strawberry']
                        .filter(fruit => fruit.toUpperCase()
                            .includes(filter.trim().toUpperCase()))
                        .map(fruit => <MenuItem key={fruit}>{fruit}</MenuItem>)
                }
            </Menu>
        </Example>
    );
}

function OpenStateExample() {

    return (
        <Example data={codeExamples.openStateButton} >
            <Menu menuButton={
                ({ open }) =>
                    <MenuButton styles={{ minWidth: '5rem' }}>
                        {open ? 'Close' : 'Open'}
                    </MenuButton>
            }>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem>Close Window</MenuItem>
            </Menu>
        </Example>
    );
}

function CustomisedButtonExample() {

    return (
        <Example data={codeExamples.customisedButton} >
            <Menu menuButton={<button className="btn btn-primary">Open menu</button>}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem>Close Window</MenuItem>
            </Menu>
        </Example>
    );
}

const alginOptions = [
    ['start'],
    ['center'],
    ['end']
];
const displayOptions = [
    ['default'],
    ['arrow', 'display an arrow'],
    ['offset', 'display a gap']
];
const positionOptions = [
    ['auto', 'keep in viewport'],
    ['anchor', 'stick to the edges of anchor'],
    ['initial', 'fixed to initial position']
];
const viewScrollOptions = [
    ['initial', 'keep menu in place'],
    ['auto', 'reposition menu'],
    ['close', 'close menu']
];

function MenuPlacementExample() {
    const [display, setDisplay] = useState('arrow');
    const [align, setAlign] = useState('center');
    const [position, setPosition] = useState('anchor');
    const [viewScroll, setViewScroll] = useState('auto');
    const { navbarHeight } = useContext(DomInfoContext);

    const menus = ['right', 'top', 'bottom', 'left'].map(direction => (
        <Menu menuButton={<MenuButton>{direction}</MenuButton>}
            key={direction} direction={direction}
            boundingBoxPadding={`${navbarHeight} 0 0 0`}
            align={align} position={position} viewScroll={viewScroll}
            arrow={display === 'arrow'}
            offsetX={display === 'offset' &&
                (direction === 'left' || direction === 'right')
                ? 12 : 0}
            offsetY={display === 'offset' &&
                (direction === 'top' || direction === 'bottom')
                ? 12 : 0}>

            {['Apple', 'Banana', 'Blueberry', 'Cherry', 'Strawberry']
                .map(fruit => <MenuItem key={fruit}>{fruit}</MenuItem>)}
        </Menu>
    ));

    return (
        <Example data={codeExamples.placement} >
            <form className="option-form">
                <MenuOptions name="alignGroup"
                    title="Align with anchor" data={alginOptions}
                    option={align} onOptionChange={setAlign} />
                <MenuOptions name="displayGroup"
                    title="Menu to anchor" data={displayOptions}
                    option={display} onOptionChange={setDisplay} />
                <MenuOptions name="viewScrollGroup"
                    title="When window scrolls" data={viewScrollOptions}
                    option={viewScroll} onOptionChange={setViewScroll} />
                <MenuOptions name="positionGroup"
                    title="Menu position" data={positionOptions}
                    option={position} onOptionChange={setPosition} />
            </form>
            <p className="alert-warning"><i className="material-icons">info</i> Try to select
            different option combinations and scroll page up and down to see the behaviour.</p>
            <div className="menus">
                {menus}
            </div>
        </Example>
    );
}

const overflowOptions = [
    ['visible'],
    ['auto'],
    ['hidden']
];

function MenuOverflowExample() {
    const [overflow, setOverflow] = useState('auto');
    const [position, setPosition] = useState('auto');
    const [filter, setFilter] = useState('');
    const setToast = useContext(ToastContext);

    return (
        <Example data={codeExamples.overflow} >
            <form className="option-form">
                <MenuOptions name="overflowGroup"
                    title="Overflow" data={overflowOptions}
                    option={overflow} onOptionChange={setOverflow} />
                <MenuOptions name="positionGroup"
                    title="Menu position" data={positionOptions}
                    option={position} onOptionChange={setPosition} />
            </form>

            <div>
                <Menu menuButton={<MenuButton>Overflow</MenuButton>}
                    overflow={overflow} position={position} align="end">
                    {new Array(40).fill(0).map(
                        (_, i) => {
                            const item = `Item ${i + 1}`;
                            return (
                                <MenuItem key={i} onClick={() => setToast(item + ' clicked')}>
                                    {item}
                                </MenuItem>
                            );
                        })}
                </Menu>
                <Menu menuButton={<MenuButton styles={{ marginTop: '2rem' }}>Grouping</MenuButton>}
                    overflow={overflow} position={position} boundingBoxPadding="10"
                    onChange={e => e.open && setFilter('')} align="end">
                    <FocusableItem styles={{ padding: '0.375rem 1rem' }}>
                        {({ ref }) => (
                            <input ref={ref} type="text" placeholder="Type a number"
                                value={filter} onChange={e => setFilter(e.target.value)} />
                        )}
                    </FocusableItem>
                    <MenuGroup takeOverflow>
                        {new Array(40).fill(0)
                            .map((_, i) => `Item ${i + 1}`)
                            .filter(item => item.includes(filter.trim()))
                            .map((item, i) =>
                                <MenuItem key={i} onClick={() => setToast(item + ' clicked')}>
                                    {item}
                                </MenuItem>)}
                    </MenuGroup>
                    <MenuItem onClick={() => setToast('Last item clicked')}>Last (fixed)</MenuItem>
                </Menu>
            </div>
        </Example>
    );
}

function BoundingBoxExample() {
    const ref = useRef(null);
    const leftAnchor = useRef(null);
    const rightAnchor = useRef(null);
    const [isOpen, setOpen] = useState(false);
    useEffect(() => {
        setOpen(true);
    }, []);

    const tooltipProps = {
        isOpen,
        captureFocus: false,
        animation: false,
        arrow: true,
        role: 'tooltip',
        align: 'center',
        viewScroll: 'auto',
        position: 'anchor',
        boundingBoxPadding: '1 8 1 1'
    };

    return (
        <Example data={codeExamples.boundingBox} ref={ref}>
            <div className="bounding-box">
                <div className="anchor" ref={leftAnchor} />
                <ControlledMenu {...tooltipProps}
                    anchorRef={leftAnchor} direction="top">
                    <MenuHeader>I can flip if you scroll this block</MenuHeader>
                </ControlledMenu>

                <div className="anchor" ref={rightAnchor} />
                {/* explicitly set bounding box with the boundingBoxRef prop */}
                <ControlledMenu {...tooltipProps} boundingBoxRef={ref}
                    anchorRef={rightAnchor} direction="right">
                    <MenuHeader>I'm a tooltip built with React-Menu</MenuHeader>
                </ControlledMenu>
            </div>
        </Example>
    )
}

function ManagingStateExample() {

    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);

    return (
        <Example data={codeExamples.managingState}>
            <button ref={ref} className="btn"
                onClick={() => setOpen(true)}>
                Open menu
            </button>

            <ControlledMenu anchorRef={ref} isOpen={isOpen}
                onClose={() => setOpen(false)}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem>Close Window</MenuItem>
            </ControlledMenu>
        </Example>
    );
}

function ContextMenuExample() {

    const [isOpen, setOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    return (
        <Example data={codeExamples.contextMenu}
            onContextMenu={e => {
                e.preventDefault();
                setAnchorPoint({ x: e.clientX, y: e.clientY });
                setOpen(true);
            }}>

            Right click to open context menu

            <ControlledMenu anchorPoint={anchorPoint} isOpen={isOpen}
                onClose={() => setOpen(false)} animation={false}>
                <MenuItem>Cut</MenuItem>
                <MenuItem>Copy</MenuItem>
                <MenuItem>Paste</MenuItem>
            </ControlledMenu>
        </Example >
    );
}

function MenuStateHookExample() {

    const { openMenu, closeMenu, toggleMenu,
        ...menuProps } = useMenuState();
    const ref = useRef(null);

    return (
        <Example data={codeExamples.menuStateHook}>
            <button ref={ref} className="btn"
                onClick={() => openMenu()}>
                Open menu
            </button>

            <ControlledMenu {...menuProps} anchorRef={ref}
                onClose={() => closeMenu()}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem>Close Window</MenuItem>
            </ControlledMenu>
        </Example>
    );
}

function StylesPropExample() {

    return (
        <Example data={codeExamples.stylesProp} >
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}
                align="center"
                styles={{
                    border: '2px dashed green',
                    boxShadow: 'none'
                }}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem styles={{
                    color: 'blue',
                    backgroundColor: '#ee1',
                    hover: {
                        color: '#ee1',
                        backgroundColor: '#bf4080'
                    },
                    active: {
                        backgroundColor: '#333'
                    }
                }}>
                    I'm special
                </MenuItem>
            </Menu>
        </Example>
    );
}

function ClassNamePropExample() {

    return (
        <Example data={codeExamples.classNameProp} >
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}
                className="my-menu" align="center">
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem className={
                    ({ hover, active }) =>
                        active ? 'my-menuitem-active'
                            : hover ? 'my-menuitem-hover'
                                : 'my-menuitem'
                }>
                    I'm special
                </MenuItem>
            </Menu>
        </Example>
    );
}

function MenuOptions({ title, name, data, option, onOptionChange }) {

    return (
        <fieldset className="options">
            <legend>{title}</legend>
            {data.map(([value, desc]) =>
                <label key={value}
                    className={option === value ? 'checked' : undefined}>
                    <input type="radio"
                        name={name}
                        value={value}
                        checked={option === value}
                        onChange={({ target }) =>
                            (target.checked && onOptionChange(target.value))
                        } />
                    {value}{desc && ` (${desc})`}
                </label>)}
        </fieldset>
    );
}
