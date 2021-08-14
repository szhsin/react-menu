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
export type FocusPosition = 'initial' | 'first' | 'last';
export type CloseReason = 'click' | 'cancel' | 'blur' | 'scroll';
type DirStyleKey = '$left' | '$right' | '$top' | '$bottom';

type StringStyles<T extends string> = React.CSSProperties & {
    [K in T]?: React.CSSProperties;
};

type Styles<S> = React.CSSProperties & {
    [K in keyof S]?: (S[K] extends string ? StringStyles<S[K]> : React.CSSProperties);
};

type ClassNameProp<M = undefined> = string | ((modifiers: M) => string);

type StylesProp<M, S = M> = Styles<S> | ((modifiers: M) => React.CSSProperties);

type RenderProp<M, R = React.ReactNode> = R | ((modifiers: M) => R);

interface BaseProps<M = undefined, S = M> extends Omit<React.HTMLAttributes<HTMLElement>, 'className'> {
    ref?: React.Ref<any>;
    className?: ClassNameProp<M>;
    styles?: StylesProp<M, S>;
}

interface Event {
    value?: any;
    key?: string;
}

export interface MenuCloseEvent extends Event {
    reason: CloseReason;
}

export interface RadioChangeEvent extends Event {
    name?: string;
    keepOpen?: boolean;
    syntheticEvent: MouseEvent | KeyboardEvent;
}

export interface ClickEvent extends RadioChangeEvent {
    checked?: boolean;
}

export interface MenuChangeEvent {
    open: boolean;
}

interface EventHandler<E, R = void> {
    (event: E): R;
}

interface RectElement {
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
interface MenuStyleKeys {
    state: MenuState;
    dir: DirStyleKey;
}

export type MenuModifiers = Readonly<{
    state: MenuState;
    dir: MenuDirection;
}>;

interface MenuArrowStyleKeys {
    dir: DirStyleKey;
}

export type MenuArrowModifiers = Readonly<{
    dir: MenuDirection;
}>;

export interface MenuStateOptions {
    initialMounted?: boolean;
    unmountOnClose?: boolean;
    transition?: boolean | {
        open?: boolean;
        close?: boolean;
        item?: boolean;
    };
    transitionTimeout?: number;
}

// Menu, SubMenu and ControlledMenu
interface SharedMenuProps extends BaseProps<MenuModifiers, MenuStyleKeys> {
    arrowClassName?: ClassNameProp<MenuArrowModifiers>;
    arrowStyles?: StylesProp<MenuArrowModifiers, MenuArrowStyleKeys>;
    arrow?: boolean;
    offsetX?: number;
    offsetY?: number;
    align?: MenuAlign;
    direction?: MenuDirection;
    position?: MenuPosition;
    overflow?: MenuOverflow;
    children?: React.ReactNode;
}

// Menu and ControlledMenu
interface BaseMenuProps extends MenuStateOptions, Omit<SharedMenuProps, 'onClick'> {
    containerProps?: React.HTMLAttributes<HTMLElement>;
    boundingBoxRef?: React.RefObject<Element | RectElement>;
    boundingBoxPadding?: string;
    viewScroll?: MenuViewScroll;
    portal?: boolean;
    reposition?: MenuReposition;
    repositionFlag?: number | string;
    submenuOpenDelay?: number;
    submenuCloseDelay?: number;
    theming?: string;
    onItemClick?: EventHandler<ClickEvent>;
}

//
// MenuButton
// ----------------------------------------------------------------------
export type MenuButtonModifiers = Readonly<{
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
export interface MenuProps extends Omit<BaseMenuProps, 'onChange'> {
    menuButton: RenderProp<MenuButtonModifiers, React.ReactElement>;
    onChange?: EventHandler<MenuChangeEvent>;
}

export const Menu: React.NamedExoticComponent<MenuProps>;

//
// ControlledMenu
// ----------------------------------------------------------------------
export interface ControlledMenuProps extends BaseMenuProps {
    anchorPoint?: {
        x: number;
        y: number;
    };
    anchorRef?: React.RefObject<Element | RectElement>;
    captureFocus?: boolean;
    state?: MenuState;
    menuItemFocus?: {
        position: FocusPosition
    };
    onClose?: EventHandler<MenuCloseEvent>;
}

export const ControlledMenu: React.NamedExoticComponent<ControlledMenuProps>;

//
// SubMenu
// ----------------------------------------------------------------------
export type SubMenuItemModifiers = Readonly<{
    open: boolean;
    hover: boolean;
    active: boolean;
    disabled: boolean;
}>;

export interface SubMenuProps extends Omit<SharedMenuProps, 'className' | 'onChange'> {
    className?: ClassNameProp;
    menuClassName?: ClassNameProp<MenuModifiers>;
    menuStyles?: StylesProp<MenuModifiers, MenuStyleKeys>;
    itemProps?: BaseProps<SubMenuItemModifiers>;
    label?: RenderProp<SubMenuItemModifiers>;
    disabled?: boolean;
    onChange?: EventHandler<MenuChangeEvent>;
}

export const SubMenu: React.NamedExoticComponent<SubMenuProps>;

//
// MenuItem
// ----------------------------------------------------------------------
export type MenuItemModifiers = Readonly<{
    type: MenuItemTypeProp;
    disabled: boolean;
    hover: boolean;
    active: boolean;
    checked: boolean;
    anchor: boolean;
}>;

export interface MenuItemProps extends Omit<BaseProps<MenuItemModifiers>, 'onClick'> {
    value?: any;
    href?: string;
    rel?: string;
    target?: string;
    type?: MenuItemTypeProp;
    checked?: boolean;
    disabled?: boolean;
    onClick?: EventHandler<ClickEvent, boolean | void | Promise<void>>;
    children?: RenderProp<MenuItemModifiers>;
}

export const MenuItem: React.NamedExoticComponent<MenuItemProps>;

//
// FocusableItem
// ----------------------------------------------------------------------
export type FocusableItemModifiers = Readonly<{
    disabled: boolean;
    hover: boolean;
    focusable: true;
}>;

export interface FocusableItemProps extends BaseProps<FocusableItemModifiers> {
    disabled?: boolean;
    children: (modifiers: {
        disabled: boolean;
        hover: boolean;
        ref: React.RefObject<any>;
        closeMenu: (key?: string) => void;
    }) => React.ReactNode;
}

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
    takeOverflow?: boolean;
}

export const MenuGroup: React.NamedExoticComponent<MenuGroupProps>;

//
// MenuRadioGroup
// ----------------------------------------------------------------------
export interface MenuRadioGroupProps extends Omit<BaseProps, 'onChange'> {
    name?: string;
    value?: any;
    children?: React.ReactNode;
    onChange?: EventHandler<RadioChangeEvent>;
}

export const MenuRadioGroup: React.NamedExoticComponent<MenuRadioGroupProps>;

//
// useMenuState
// ----------------------------------------------------------------------
export function useMenuState(options?: MenuStateOptions): {
    state?: MenuState;
    toggleMenu: (open?: boolean) => void;
    endTransition: () => void;
};

//
// utils
// ----------------------------------------------------------------------
export function applyHOC<H>(hoc: H): H;
export function applyStatics<W>(sourceComponent: React.NamedExoticComponent): (w: W) => W;

export { };
