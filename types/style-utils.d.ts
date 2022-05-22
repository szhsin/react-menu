interface Base {
  /**
   * CSS selector for the element itself
   */
  name: string;
}

interface Directions {
  /**
   * Menu opens to the left
   */
  dirLeft: string;
  /**
   * Menu opens to the right
   */
  dirRight: string;
  /**
   * Menu opens to the top
   */
  dirTop: string;
  /**
   * Menu opens to the bottom
   */
  dirBottom: string;
}

export const menuSelector: Readonly<
  Base &
    Directions & {
      /**
       * Menu transitions from closed to open
       */
      stateOpening: string;
      /**
       * Menu is open
       */
      stateOpen: string;
      /**
       * Menu transitions from open to closed
       */
      stateClosing: string;
      /**
       * Menu is closed
       */
      stateClosed: string;
    }
>;

export const menuArrowSelector: Readonly<Base & Directions>;

export const menuItemSelector: Readonly<
  Base & {
    /**
     * Menu item is hovered and focused
     */
    hover: string;
    /**
     * Menu item is disabled
     */
    disabled: string;
    /**
     * Menu item is a URL link (when the `href` prop is set)
     */
    anchor: string;
    /**
     * Menu item is checked (only for a radio or checkbox item)
     */
    checked: string;
    /**
     * Present on a submenu item when it's submenu is open
     */
    open: string;
    /**
     * Present on a submenu item, which is set by the `label` prop on `SubMenu` component
     */
    submenu: string;
    /**
     * Present on a `FocusableItem`
     */
    focusable: string;
    /**
     * Menu item is a radio item
     */
    typeRadio: string;
    /**
     * Menu item is a checkbox item
     */
    typeCheckbox: string;
  }
>;

export const menuDividerSelector: Readonly<Base>;
export const menuHeaderSelector: Readonly<Base>;
export const menuGroupSelector: Readonly<Base>;
export const radioGroupSelector: Readonly<Base>;
export const submenuSelector: Readonly<Base>;

export const menuContainerSelector: Readonly<
  Base & {
    itemTransition: string;
  }
>;

export const menuButtonSelector: Readonly<
  Base & {
    open: string;
  }
>;

export {};
