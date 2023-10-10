import React = require('react');

//
// base types
// ----------------------------------------------------------------------
export type MenuState = 'opening' | 'open' | 'closing' | 'closed';
export type MenuAlign = 'start' | 'center' | 'end';
export type MenuDirection = 'left' | 'right' | 'top' | 'bottom';
export type MenuPosition = 'auto' | 'anchor' | 'initial';
export type MenuOverflow = 'auto' | 'visible' | 'hidden';
export type MenuReposition = 'auto' | 'initial';
export type MenuViewScroll = 'auto' | 'close' | 'initial';
export type MenuItemTypeProp = 'checkbox' | 'radio';
export type CloseReason = 'click' | 'cancel' | 'blur' | 'scroll';
/**
 * - `'first'` focus the first item in the menu.
 * - `'last'` focus the last item in the menu.
 * - `number` focus item at the specific position (zero-based).
 */
export type FocusPosition = 'first' | 'last' | number;

export type ClassNameProp<M = undefined> = string | ((modifiers: M) => string);

export type RenderProp<M, R = React.ReactNode> = R | ((modifiers: M) => R);

export interface BaseProps<M = undefined>
  extends Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'children'> {
  ref?: React.Ref<any>;
  /**
   * Can be a string or a function which receives a modifier object and returns a CSS `class` string.
   */
  className?: ClassNameProp<M>;
}

export interface Event {
  /**
   * The `value` prop passed to the `MenuItem` being clicked.
   * It's useful for identifying which menu item is clicked.
   */
  value?: any;
  /**
   *  Indicates the key if the event is triggered by keyboard. Can be 'Enter', ' '(Space) or 'Escape'.
   */
  key?: string;
}

export interface MenuCloseEvent extends Event {
  /**
   * The reason that causes the close event.
   */
  reason: CloseReason;
}

export interface RadioChangeEvent extends Event {
  /**
   * The `name` prop passed to the `MenuRadioGroup` when the menu item is in a radio group.
   */
  name?: string;
  /**
   * Set this property on event object to control whether to keep menu open after menu item is activated.
   * Leaving it `undefined` will behave in accordance with WAI-ARIA Authoring Practices.
   */
  keepOpen?: boolean;
  /**
   * Setting this property on event object to `true` will skip `onItemClick` event on root menu component.
   */
  stopPropagation?: boolean;
  /**
   * DOM event object (React synthetic event)
   */
  syntheticEvent: MouseEvent | KeyboardEvent;
}

export interface ClickEvent extends RadioChangeEvent {
  /**
   * Indicates if the menu item is checked, only for `MenuItem` type="checkbox".
   */
  checked?: boolean;
}

export interface MenuChangeEvent {
  /**
   * Indicates if the menu is open or closed.
   */
  open: boolean;
}

export interface EventHandler<E> {
  (event: E): void;
}

export interface RectElement {
  getBoundingClientRect(): {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
  };
}

//
// Menu common types
// ----------------------------------------------------------------------
export type MenuModifiers = Readonly<{
  /**
   * Indicates the state of menu.
   */
  state: MenuState;
  /**
   * Computed direction in which the menu expands.
   */
  dir: MenuDirection;
}>;

export type MenuArrowModifiers = Readonly<{
  /**
   * Computed direction in which the menu expands.
   *
   * *Please note arrow points to the opposite direction of this value.*
   */
  dir: MenuDirection;
}>;

export interface MenuStateOptions {
  /**
   * Enable menu to be mounted in the open state.
   */
  initialOpen?: boolean;
  /**
   * By default menu isn't mounted into DOM until it's opened for the first time.
   * Setting the prop to `true` will change this behaviour,
   * which also enables menu and its items to be server rendered.
   */
  initialMounted?: boolean;
  /**
   * By default menu remains in DOM when it's closed.
   * Setting the prop to `true` will change this behaviour.
   */
  unmountOnClose?: boolean;
  /**
   * Enable or disable transition effects in `Menu`, `MenuItem`, and any descendent `SubMenu`.
   *
   * You can set 'open', 'close' and 'item' at the same time with one boolean value or separately with an object.
   *
   * *If you enable transition on menu, make sure to add your own animation styles,
   * or import `'@szhsin/react-menu/dist/transitions/slide.css'`,
   * otherwise menu cannot be closed or have visible delay when closed.*
   *
   * @example [CodeSandbox Demo](https://codesandbox.io/s/react-menu-sass-i1wxo)
   */
  transition?:
    | boolean
    | {
        open?: boolean;
        close?: boolean;
        item?: boolean;
      };
  /**
   * A fallback timeout in `ms` to stop transition if `onAnimationEnd` events are not fired.
   *
   * *Note: this value should be greater than or equal to the duration of
   * transition animation applied on menu.*
   *
   * @default 500
   */
  transitionTimeout?: number;
}

export interface Hoverable {
  disabled?: boolean;
}

/**
 * Common props for `Menu`, `SubMenu` and `ControlledMenu`
 */
export interface BaseMenuProps extends Omit<BaseProps, 'style'> {
  /**
   * Can be a string or a function which receives a modifier object and returns a CSS `class` string.
   */
  menuClassName?: ClassNameProp<MenuModifiers>;
  /**
   * This prop is forwarded to the `style` prop of menu DOM element.
   */
  menuStyle?: React.CSSProperties;
  /**
   * Set `true` to display an arrow pointing to its anchor element.
   */
  arrow?: boolean;
  /**
   * Properties of this object are spread to the menu arrow DOM element.
   */
  arrowProps?: Omit<BaseProps<MenuArrowModifiers>, 'ref'>;
  /**
   * Properties of this object are spread to a DOM element which captures focus for the menu.
   */
  focusProps?: React.HTMLAttributes<HTMLElement>;
  /**
   * Add a gap (gutter) between menu and its anchor element.
   * The value (in pixels) can be negative.
   * @default 0
   */
  gap?: number;
  /**
   * Shift menu's position away from its anchor element.
   * The value (in pixels) can be negative.
   * @default 0
   */
  shift?: number;
  /**
   * Set alignment of menu with anchor element.
   * @default 'start'
   */
  align?: MenuAlign;
  /**
   * Set direction in which menu expands against anchor element.
   * @default 'bottom'
   */
  direction?: MenuDirection;
  /**
   * Set the position of menu related to its anchor element:
   *
   * - 'auto' menu position is adjusted to have it contained within the viewport,
   * even if it will be detached from the anchor element.
   * This option allows to display menu in the viewport as much as possible.
   *
   * - 'anchor' menu position is adjusted to have it contained within the viewport,
   * but it will be kept attached to the edges of anchor element.
   *
   * - 'initial' menu always stays at its initial position.
   * @default 'auto'
   */
  position?: MenuPosition;
  /**
   * Make the menu list scrollable or hidden when there is not enough viewport space to
   * display all menu items. The prop is similar to the CSS `overflow` property.
   * @default 'visible'
   */
  overflow?: MenuOverflow;
  /**
   * Set computed overflow amount down to a child `MenuGroup`.
   * The `MenuGroup` should have `takeOverflow` prop set as `true` accordingly.
   */
  setDownOverflow?: boolean;
  /**
   * Any valid React node or a render function that returns one.
   */
  children?: RenderProp<MenuModifiers>;
}

/**
 * Common props for `Menu` and `ControlledMenu`
 */
export interface RootMenuProps extends BaseMenuProps, Omit<MenuStateOptions, 'initialOpen'> {
  /**
   * Properties of this object are spread to the root DOM element containing the menu.
   */
  containerProps?: Omit<React.HTMLAttributes<HTMLElement>, 'className'>;
  /**
   * A ref object attached to a DOM element within which menu will be positioned.
   * If not provided, the nearest ancestor which has CSS `overflow` set to a value
   * other than 'visible' or the browser viewport will serve as the bounding box.
   */
  boundingBoxRef?: React.RefObject<Element | RectElement>;
  /**
   * Specify bounding box padding in pixels. Use a syntax similar to the CSS
   * `padding` property but sizing units are discarded.
   * @example '10', '5 10', '1 2 4', or '2 5 3 1'
   */
  boundingBoxPadding?: string;
  /**
   * Set the behaviour of menu and any of its descendent submenus when window is scrolling:
   * - 'initial' The window scroll event is ignored and has no effect on menu.
   * - 'auto' Menu will reposition itself based on the value of `position` prop when window is scrolling.
   * - 'close' menu will be closed when window is scrolled.
   * @default 'initial'
   */
  viewScroll?: MenuViewScroll;
  /**
   * - If `true`, menu is rendered as a direct child of `document.body`,
   * - or you can specify a target element in the DOM as menu container.
   *
   * Portal allows menu to visually “break out” of its container. Typical use cases may include:
   * - An ancestor container is positioned and CSS `overflow` is set to a value other than `visible`.
   * - You have a DOM structure that creates a complex hierarchy of stacking contexts,
   * and menu is overlapped regardless of `z-index` value.
   */
  portal?:
    | boolean
    | {
        /**
         * A DOM node under which menu will be rendered.
         */
        target?: Element | null;
        /**
         * When `target` is null, setting this value `true` prevents menu from rendering into the DOM hierarchy of its parent component.
         */
        stablePosition?: boolean;
      };
  /**
   * Specify when menu is repositioned:
   * - 'initial' Don't automatically reposition menu. Set to this value when you want
   * to explicitly reposition menu using the `repositionFlag` prop.
   * - 'auto' Reposition menu whenever its size has changed, using the `ResizeObserver` API.
   * @default 'auto'
   */
  reposition?: MenuReposition;
  /**
   * Use this prop to explicitly reposition menu. Whenever the prop has a new value,
   * menu position will be recalculated and updated.
   * You might use a counter and increase it every time.
   *
   * *Warning: don't update this prop in rapid succession,
   * which is inefficient and might cause infinite rendering of component.
   * E.g., don't change the value of this prop in `window` scroll event.*
   */
  repositionFlag?: number | string;
  /**
   * Set a delay in `ms` before opening a submenu when mouse moves over it.
   * @default 300
   */
  submenuOpenDelay?: number;
  /**
   * Set a delay in `ms` before closing a submenu when it's open and mouse is
   * moving over other items in the parent menu list.
   * @default 150
   */
  submenuCloseDelay?: number;
  /**
   * Set a CSS `class` on the container element of menu for theming purpose.
   */
  theming?: string;
  /**
   * Event fired when descendent menu items are clicked.
   */
  onItemClick?: EventHandler<ClickEvent>;
}

export interface MenuInstance {
  /**
   * Open menu and optionally request which menu item will be hovered.
   */
  openMenu: (position?: FocusPosition, alwaysUpdate?: boolean) => void;
  /**
   * Close menu
   */
  closeMenu: () => void;
}

/**
 * Common props for `Menu` and `SubMenu`
 */
export interface UncontrolledMenuProps {
  /**
   * Menu component ref which can be used to programmatically open or close menu.
   */
  instanceRef?: React.Ref<MenuInstance>;
  /**
   * Event fired after menu is open or closed.
   */
  onMenuChange?: EventHandler<MenuChangeEvent>;
}

//
// MenuButton
// ----------------------------------------------------------------------
export type MenuButtonModifiers = Readonly<{
  /**
   * Indicates if the associated menu is open.
   */
  open: boolean;
}>;

export interface MenuButtonProps extends BaseProps<MenuButtonModifiers> {
  disabled?: boolean;
  children?: React.ReactNode;
}

export const MenuButton: React.NamedExoticComponent<MenuButtonProps>;

//
// Menu
// ----------------------------------------------------------------------
export interface MenuProps extends RootMenuProps, UncontrolledMenuProps {
  /**
   * Can be a `MenuButton`, a `button` element, or a React component.
   * It also can be a render function that returns one.
   *
   * If a React component is provided, it needs to implement the following contracts:
   * - Accepts a `ref` prop that is forwarded to an element to which menu will be positioned.
   * The element should be able to receive focus.
   * - Accepts `onClick` and `onKeyDown` event props.
   */
  menuButton: RenderProp<MenuButtonModifiers, React.ReactElement>;
}

export const Menu: React.NamedExoticComponent<MenuProps>;

//
// ControlledMenu
// ----------------------------------------------------------------------
export interface ControlledMenuProps extends RootMenuProps {
  /**
   * Viewport coordinates to which context menu will be positioned.
   *
   * *Use this prop only for context menu*
   */
  anchorPoint?: {
    x: number;
    y: number;
  };
  /**
   * A ref object attached to a DOM element to which menu will be positioned.
   *
   * *Don't set this prop for context menu*
   */
  anchorRef?: React.RefObject<Element | RectElement>;
  /**
   * If `true`, the menu list element will gain focus after menu is open.
   * @default true
   */
  captureFocus?: boolean;
  /**
   * Controls the state of menu. When the prop is `undefined`, menu will be unmounted from DOM.
   */
  state?: MenuState;
  /**
   * Sets which menu item receives focus (hover) when menu opens.
   * You will usually set this prop when the menu is opened by keyboard events.
   *
   * *Note: If you don't intend to update focus (hover) position,
   * it's important to keep this prop's identity stable when your component re-renders.*
   */
  menuItemFocus?: {
    position?: FocusPosition;
    alwaysUpdate?: boolean;
  };
  /**
   * Set the return value of `useMenuState` to this prop.
   */
  endTransition?: () => void;
  /**
   * Event fired when menu is about to close.
   */
  onClose?: EventHandler<MenuCloseEvent>;
}

export const ControlledMenu: React.NamedExoticComponent<ControlledMenuProps>;

//
// SubMenu
// ----------------------------------------------------------------------
export type SubMenuItemModifiers = Readonly<{
  /**
   * Indicates if the submenu is open.
   */
  open: boolean;
  /**
   * Indicates if the submenu item is being hovered and has focus.
   */
  hover: boolean;
  /**
   * Indicates if the submenu and item are disabled.
   */
  disabled: boolean;
}>;

export interface SubMenuProps extends BaseMenuProps, Hoverable, UncontrolledMenuProps {
  /**
   * Properties of this object are spread to the submenu item DOM element.
   */
  itemProps?: BaseProps<SubMenuItemModifiers>;
  /**
   * The submenu `label` can be a `string` or JSX element, or a render function that returns one.
   */
  label?: RenderProp<SubMenuItemModifiers>;
  /**
   * - `undefined` submenu opens when the label item is hovered or clicked. This is the default behaviour.
   * - 'clickOnly' submenu opens when the label item is clicked.
   * - 'none' submenu doesn't open with mouse or keyboard events;
   * you can call the `openMenu` function on `instanceRef` to open submenu programmatically.
   */
  openTrigger?: 'none' | 'clickOnly';
}

export const SubMenu: React.NamedExoticComponent<SubMenuProps>;

//
// MenuItem
// ----------------------------------------------------------------------
export type MenuItemModifiers = Readonly<{
  /**
   * 'radio' for radio item, 'checkbox' for checkbox item, or `undefined` for other items.
   */
  type?: MenuItemTypeProp;
  /**
   * Indicates if the menu item is disabled.
   */
  disabled: boolean;
  /**
   * Indicates if the menu item is being hovered and has focus.
   */
  hover: boolean;
  /**
   * Indicates if the menu item is checked when it's a radio or checkbox item.
   */
  checked: boolean;
  /**
   * Indicates if the menu item has a URL link.
   */
  anchor: boolean;
}>;

export interface MenuItemProps extends Omit<BaseProps<MenuItemModifiers>, 'onClick'>, Hoverable {
  /**
   * Any value provided to this prop will be available in the event object of click events.
   *
   * It's useful for helping identify which menu item is clicked when you
   * listen on `onItemClick` event on root menu component.
   */
  value?: any;
  /**
   * If provided, menu item renders an HTML `<a>` element with this `href` attribute.
   */
  href?: string;
  rel?: string;
  target?: string;
  /**
   * Set this prop to make the item a checkbox or radio menu item.
   */
  type?: MenuItemTypeProp;
  /**
   * Set `true` if a checkbox menu item is checked.
   *
   * *Please note radio menu item doesn't use this prop.*
   */
  checked?: boolean;
  /**
   * Event fired when the menu item is clicked.
   */
  onClick?: EventHandler<ClickEvent>;
  /**
   * Any valid React node or a render function that returns one.
   */
  children?: RenderProp<MenuItemModifiers>;
}

export const MenuItem: React.NamedExoticComponent<MenuItemProps>;

//
// FocusableItem
// ----------------------------------------------------------------------
export type FocusableItemModifiers = Readonly<{
  /**
   * Indicates if the focusable item is disabled.
   */
  disabled: boolean;
  /**
   * Indicates if the focusable item is being hovered.
   */
  hover: boolean;
  /**
   * Always `true` for a focusable item.
   */
  focusable: true;
}>;

export interface FocusableItemProps extends BaseProps<FocusableItemModifiers>, Hoverable {
  /**
   * A render function that returns a React node.
   */
  children: (modifiers: {
    /**
     * Indicates if the focusable item is disabled.
     */
    disabled: boolean;
    /**
     * Indicates if the focusable item is being hovered.
     */
    hover: boolean;
    /**
     * A ref to be attached to the element which should receive focus when this focusable item is hovered.
     *
     * If you render a React component, it needs to expose a `focus` method or implement ref forwarding.
     */
    ref: React.RefObject<any>;
    /**
     * A function that requests to close the root menu.
     * @param {string} key Indicate which key initiates the close request.
     */
    closeMenu: (key?: string) => void;
  }) => React.ReactNode;
}

/**
 * A component to wrap focusable element (input, button) in a menu item.
 * It manages focus automatically among other menu items during mouse and keyboard interactions.
 *
 * @example https://szhsin.github.io/react-menu/#focusable-item
 */
export const FocusableItem: React.NamedExoticComponent<FocusableItemProps>;

//
// MenuDivider
// ----------------------------------------------------------------------
export const MenuDivider: React.NamedExoticComponent<BaseProps>;

//
// MenuHeader
// ----------------------------------------------------------------------
export interface MenuHeaderProps extends BaseProps {
  children?: React.ReactNode;
}

export const MenuHeader: React.NamedExoticComponent<MenuHeaderProps>;

//
// MenuGroup
// ----------------------------------------------------------------------
export interface MenuGroupProps extends BaseProps {
  children?: React.ReactNode;
  /**
   * Set `true` to apply overflow of the parent menu to the group.
   * Only one `MenuGroup` in a menu should set this prop as `true`.
   */
  takeOverflow?: boolean;
}

/**
 * A component to wrap a subset related menu items and make them scrollable.
 *
 * @example https://szhsin.github.io/react-menu/#menu-overflow
 */
export const MenuGroup: React.NamedExoticComponent<MenuGroupProps>;

//
// MenuRadioGroup
// ----------------------------------------------------------------------
export interface MenuRadioGroupProps extends BaseProps {
  /**
   * Optionally set the radio group name.
   *
   * The name will be passed to the `onRadioChange` event.
   * It's useful for identifying radio groups if you attach the same event handler to multiple groups.
   */
  name?: string;
  /**
   * Set value of the radio group.
   *
   * The child menu item which has the same value (strict equality ===) as the
   * radio group is marked as checked.
   */
  value?: any;
  children?: React.ReactNode;
  /**
   * Event fired when a child menu item is clicked (selected).
   */
  onRadioChange?: EventHandler<RadioChangeEvent>;
}

export const MenuRadioGroup: React.NamedExoticComponent<MenuRadioGroupProps>;

/**
 * A custom Hook which helps manage the states of `ControlledMenu`.
 */
export function useMenuState(options?: MenuStateOptions): [
  {
    /**
     * Menu state which should be forwarded to `ControlledMenu`.
     */
    state?: MenuState;
    /**
     * Stop transition animation. This function value should be forwarded to `ControlledMenu`.
     */
    endTransition: () => void;
  },

  /**
   * Open or close menu.
   *
   * - If no parameter is supplied, this function will toggle state between open and close phases.
   * - You can set a boolean parameter to explicitly switch into one of the two phases.
   */
  (open?: boolean) => void
];

export type ClickEventProps = Required<
  Pick<React.HTMLAttributes<Element>, 'onMouseDown' | 'onClick'>
>;

export type HoverEventProps = Required<
  Pick<React.HTMLAttributes<Element>, 'onMouseEnter' | 'onMouseLeave'>
>;

export type ToggleEvent = (open: boolean, event: Parameters<React.MouseEventHandler>[0]) => void;

/**
 * A Hook which works with `ControlledMenu` to create click (toggle) menu.
 *
 * @returns props which should be given to the anchor element.
 */
export function useClick(
  /**
   * Menu state can be a boolean or the state returned from `useMenuState`
   */
  state: boolean | MenuState | undefined,
  /**
   * A callback function that should open or close menu, receiving React synthetic event which triggered the callback.
   */
  onToggle: ToggleEvent
): ClickEventProps;

/**
 * A Hook which works with `ControlledMenu` to create hover menu.
 */
export function useHover(
  /**
   * Menu state can be a boolean or the state returned from `useMenuState`
   */
  state: boolean | MenuState | undefined,
  /**
   * A callback function that should open or close menu, receiving React synthetic event which triggered the callback.
   */
  onToggle: ToggleEvent,
  options?: {
    /**
     * Specify an open delay in `ms`.
     * @default 100
     */
    openDelay?: number;
    /**
     * Specify a close delay in `ms`.
     * @default 300
     */
    closeDelay?: number;
  }
): {
  /**
   * Props which should be given to the anchor element.
   */
  anchorProps: HoverEventProps & ClickEventProps;
  /**
   * Props which should be given to the menu.
   */
  hoverProps: HoverEventProps;
};

export {};
