# FAQs

## How do I server-side render a menu and its items?

By default a menu and its items don't get mounted into DOM until the menu has been opened for the first time. This means if you render a menu on the server side, there won't be any HTML string output. You can set the `initialMounted` prop to render a menu and all of its descendants before being opened.

```jsx
<Menu initialMounted />
```

Or, when using `ControlledMenu` along with `useMenuState`

```js
useMenuState({ initialMounted: true });
```

## How do I add icons/images to a submenu label?

The `label` prop of a submenu accepts not only a plain string but any valid JSX element as well.

```jsx
<SubMenu
  label={
    <>
      <img src="edit.png" alt="edit" />
      Edit
      <ArrowIcon />
    </>
  }
/>
```

## How do I set additional attributes or event handlers to a submenu label?

You can use the `itemProps` to pass additional props to a submenu label.

```jsx
<SubMenu
  itemProps={{
    className: 'submenu-label',
    style: { backgroundColor: 'lightblue' },
    onClick: () => console.log('Clicked!')
  }}
/>
```
