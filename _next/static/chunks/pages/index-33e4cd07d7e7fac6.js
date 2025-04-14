(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[332],{62:(e,n,t)=>{"use strict";t.d(n,{J:()=>f});var s=t(6514),o=t(5834),i=t(9066),r=t(7999),l=t(1948),u=t(5062),a=t.n(u),c=t(8230),d=t.n(c),h=t(9040);let m=o.memo(function e(n){let{list:t,level:o=1,maxHeight:i}=n,r=t.map(n=>{let t=null;return n.list&&(t=(0,s.jsx)(e,{list:n.list,level:o+1})),(0,s.jsxs)("li",{children:[(0,s.jsx)(d(),{href:`#${n.id}`,children:n.title}),t]},n.id)});return(0,s.jsxs)("ul",{className:`contents-list-lv${o}`,style:{maxHeight:i},children:[r,1===o&&(0,s.jsx)(h.E,{})]})});m.propTypes={list:a().array.isRequired,level:a().number};var p=t(4203),x=t(7273);let j="table-contents",f=o.memo(function(e){let{children:n}=e,t=(0,o.useRef)(null),u=(0,o.useRef)(null),a=(0,l.sl)(),{theme:c}=(0,l.DP)(),d=(0,i.s)(l.YI),[h,f]=(0,o.useState)(),[M,b]=(0,o.useState)();(0,o.useEffect)(()=>{d&&t.current.focus()},[d]),(0,o.useEffect)(()=>{if(!a.navbarHeight)return;let e=d?u.current.offsetHeight:a.navbarHeight;f(a.vHeight-e),b("sticky"===getComputedStyle(document.querySelector(".table-contents")).getPropertyValue("position")?a.navbarHeight:void 0)},[a,d]);let g=e=>{e.currentTarget===e.target&&l.YI.set(!1)};return(0,s.jsx)("aside",{className:(0,r.Tu)(j,null,{open:d,theme:c}),style:{top:M},onTouchStart:g,onClick:g,onKeyDown:e=>"Escape"===e.key&&l.YI.set(!1),children:(0,s.jsxs)("nav",{"aria-label":"Table of contents",tabIndex:"-1",ref:t,children:[(0,s.jsxs)("div",{className:(0,r.Tu)(j,"header"),ref:u,children:[(0,s.jsx)(p.g,{}),(0,s.jsx)(x.o,{})]}),(0,s.jsx)(m,{list:n,maxHeight:h})]})})})},112:(e,n,t)=>{"use strict";t.d(n,{x:()=>o});var s=t(6514);function o(){return(0,s.jsx)("span",{className:"lib-name",children:"React-Menu"})}},765:(e,n,t)=>{"use strict";t.d(n,{u:()=>l});var s=t(6514),o=t(5834),i=t(1948),r=t(9040);let l=(0,o.memo)(function(){return(0,s.jsx)("div",{className:"right-section",style:{top:((0,i.sl)().navbarHeight||0)+16},children:(0,s.jsx)(r.E,{})})})},2242:(e,n,t)=>{"use strict";t.d(n,{X:()=>l});var s=t(6514),o=t(5834),i=t(4835);let r=[{name:"CSS/SASS",link:"https://codesandbox.io/s/react-menu-sass-i1wxo"},{name:"CSS Module",link:"https://codesandbox.io/s/react-menu-css-module-q7zfp"},{name:"styled-components",link:"https://codesandbox.io/s/react-menu-styled-components-0jrzi"},{name:"@emotion/styled",link:"https://codesandbox.io/s/react-menu-emotion-styled-2l35s"},{name:"@emotion/react",link:"https://codesandbox.io/s/react-menu-emotion-react-ck63i"},{name:"@emotion/css",link:"https://codesandbox.io/s/react-menu-emotion-css-yl4sj"},{name:"styled-jsx",link:"https://codesandbox.io/s/react-menu-styled-jsx-lcm8z"},{name:"Tailwind CSS",link:"https://codesandbox.io/s/react-menu-tailwindcss-0r1rvf"}],l=(0,o.memo)(function(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("ul",{className:"style-examples",children:r.map(e=>{let{name:n,link:t}=e;return(0,s.jsx)("li",{children:(0,s.jsx)(i.G,{href:t,children:n})},n)})}),(0,s.jsx)("p",{children:(0,s.jsx)("i",{children:"All styles are locally scoped to the components except in the CSS/SASS example."})})]})})},2936:(e,n,t)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(4191)}])},4191:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>e7});var s=t(6514),o=t(5834),i=t(4205),r=t(4687),l=t(3734),u=t(2591),a=t(826);let c=(0,l.d8)("MenuButton",(0,o.forwardRef)(function({className:e,isOpen:n,disabled:t,children:i,...r},l){let c=(0,o.useMemo)(()=>({open:n}),[n]);return(0,s.jsx)("button",{"aria-haspopup":!0,"aria-expanded":n,"aria-disabled":t||void 0,type:"button",disabled:t,...r,ref:l,className:(0,u.K)({block:a.s_,modifiers:c,className:e}),children:i})}));var d=t(9436),h=t(851),m=t(2293),p=t(2047),x=t(7874),j=t(4705),f=t(2483);let M=(0,p.l)("SubMenu",function({"aria-label":e,className:n,disabled:t,direction:i,label:r,openTrigger:c,onMenuChange:d,isHovering:p,instanceRef:M,itemRef:b,captureFocus:g,repositionFlag:v,itemProps:I={},...y}){let C=(0,o.useContext)(a.lj),{rootMenuRef:w,submenuOpenDelay:k,submenuCloseDelay:S}=C,{parentMenuRef:B,parentDir:N,overflow:D}=(0,o.useContext)(a.VU),{isParentOpen:R,submenuCtx:P,dispatch:T,updateItems:F}=(0,o.useContext)(a.st),E="visible"!==D,[z,G,H]=(0,x.$)({...C,onMenuChange:d}),{state:O}=z,A=!!t,U=(0,l.KJ)(O),_=(0,o.useRef)(null),[$]=(0,o.useState)({v:0}),Y=()=>{P.off(),$.v&&(clearTimeout($.v),$.v=0)},W=(...e)=>{Y(),L(),A||H(...e)},L=()=>!p&&!A&&T(a.GY.SET,b.current),K=e=>{L(),c||($.v=setTimeout(()=>(0,l.iS)(W),Math.max(e,0)))};(0,j.Q)(A,b,F),(0,o.useEffect)(()=>P.toggle(U),[P,U]),(0,o.useEffect)(()=>()=>{clearTimeout($.v),P.toggle(!1)},[$,P]),(0,o.useEffect)(()=>{p&&R?b.current.focus():G(!1)},[p,R,G,b]),(0,o.useImperativeHandle)(M,()=>({openMenu:(...e)=>{R&&W(...e)},closeMenu:()=>{U&&(b.current.focus(),G(!1))}}));let q=(0,o.useMemo)(()=>({open:U,hover:p,disabled:A,submenu:!0}),[U,p,A]),{ref:X,className:J,...V}=I,Q=(0,l.v6)({onPointerEnter:P.off,onPointerMove:e=>{!A&&(e.stopPropagation(),$.v||U||P.on(S,()=>K(k-S),()=>K(k)))},onPointerLeave:()=>{Y(),U||T(a.GY.UNSET,b.current)},onKeyDown:e=>{if(p)switch(e.key){case a.D$.ENTER:e.preventDefault();case a.D$.SPACE:case a.D$.RIGHT:"none"!==c&&W(a.Pl.FIRST)}},onClick:()=>"none"!==c&&W()},V);return(0,s.jsxs)("li",{className:(0,u.K)({block:a.qD,element:a.gK,className:n}),style:{position:"relative"},role:a.RB,ref:_,onKeyDown:e=>{let n=!1;switch(e.key){case a.D$.LEFT:U&&(b.current.focus(),G(!1),n=!0);break;case a.D$.RIGHT:U||(n=!0)}n&&(e.preventDefault(),e.stopPropagation())},children:[(0,s.jsx)("div",{role:a.Nq,"aria-haspopup":!0,"aria-expanded":U,...(0,l.Wf)(A,p),...Q,ref:(0,f.U)(X,b),className:(0,u.K)({block:a.qD,element:a.hV,modifiers:q,className:J}),children:(0,o.useMemo)(()=>(0,l.UF)(r,q),[r,q])}),O&&(()=>{let n=(0,s.jsx)(m.c,{...y,...z,ariaLabel:e||("string"==typeof r?r:"Submenu"),anchorRef:b,containerRef:E?w:_,direction:i||("right"===N||"left"===N?N:"right"),parentScrollingRef:E&&B,isDisabled:A}),t=w.current;return E&&t?(0,h.createPortal)(n,t):n})()]})}),b=(0,o.forwardRef)(function({"aria-label":e,className:n,name:t,value:i,onRadioChange:r,...l},c){let d=(0,o.useMemo)(()=>({name:t,value:i,onRadioChange:r}),[t,i,r]);return(0,s.jsx)(a._5.Provider,{value:d,children:(0,s.jsx)("li",{role:a.RB,children:(0,s.jsx)("ul",{role:"group","aria-label":e||t||"Radio group",...l,ref:c,className:(0,u.K)({block:a.qD,element:a.Ry,className:n})})})})});var g=t(358),v=t(42),I=t(9347);let y=(0,p.l)("FocusableItem",function({className:e,disabled:n,children:t,isHovering:i,itemRef:r,externalRef:c,...d}){let h=!!n,m=(0,o.useRef)(null),{setHover:p,onPointerLeave:x,...j}=(0,I.G)(r,m,i,h),{handleClose:M}=(0,o.useContext)(a.pI),b=(0,o.useMemo)(()=>({disabled:h,hover:i,focusable:!0}),[h,i]),g=(0,o.useMemo)(()=>(0,l.UF)(t,{...b,ref:m,closeMenu:M}),[t,b,M]),v=(0,l.v6)({...j,onPointerLeave:e=>x(e,!0),onFocus:p},d);return(0,s.jsx)("li",{role:a.Nq,...(0,l.Wf)(h),...v,ref:(0,f.U)(c,r),className:(0,u.K)({block:a.qD,element:a.hV,modifiers:b,className:e}),children:g})});var C=t(3361),w=t(7610);let k=(0,o.forwardRef)(function({className:e,style:n,takeOverflow:t,...i},r){let l=(0,o.useRef)(null),[c,d]=(0,o.useState)(),{overflow:h,overflowAmt:m}=(0,o.useContext)(a.VU);return(0,C.N)(()=>{let e;t&&m>=0&&(e=(0,w.j)(l.current).height-m)<0&&(e=0),d(e>=0?{maxHeight:e,overflow:h}:void 0)},[t,h,m]),(0,C.N)(()=>{c&&(l.current.scrollTop=0)},[c]),(0,s.jsx)("div",{...i,ref:(0,f.U)(r,l),className:(0,u.K)({block:a.qD,element:a.jY,className:e}),style:{...n,...c}})});var S=t(5554),B=t(1539);let N=(e,n,{openDelay:t=100,closeDelay:s=300}={})=>{let[i]=(0,o.useState)({}),r=()=>clearTimeout(i.t),l=e=>o=>{r(),i.t=setTimeout(()=>n(e,o),e?t:s)},u={onMouseEnter:l(!0),onMouseLeave:l(!1)};return{anchorProps:{...u,...(0,B.k)(e,n)},hoverProps:{...u,onMouseEnter:r}}};var D=t(7999),R=t(1948),P=t(1167),T=t(62),F=t(1422),E=t(5862),z=t(7517);F.A.configure({ignoreUnescapedHTML:!0}),F.A.registerLanguage("javascript",E.A),F.A.registerLanguage("xml",z.A);let G=F.A;var H=t(9314),O=t(9654);let A="example",U=o.memo(o.forwardRef(function(e,n){let{showSourceOnMount:t=!0,data:{id:i,title:l,desc:u,note:a,source:c,fullSource:d,codeSandbox:h},children:m,...p}=e,x=(0,o.useRef)(null),[j,f]=(0,o.useState)(!1),[M,b]=(0,o.useState)(t),g=M&&((j?d:c)||d||c),v=`Show ${j?"brief":"full"} source code`,[{state:I},y]=(0,S.E)({unmountOnClose:!0}),C=(0,o.useRef)(null),w=(0,o.useRef)(null),k=(0,o.useRef)(null),[B,N]=(0,o.useState)(),[P,T]=(0,o.useState)(),{navbarHeight:F}=(0,R.sl)(),E=async()=>{try{await navigator.clipboard.writeText(g),T("Copied!")}catch{T("Something went wrong.")}},z=(e,n)=>({onMouseEnter(){N(e),T(n),y(!0)},onMouseLeave(){y(!1)}});return(0,o.useEffect)(()=>{T(v),x.current.querySelectorAll("pre code").forEach(e=>G.highlightElement(e))},[g,v]),(0,s.jsxs)("section",{className:(0,D.Tu)(A),ref:x,"aria-labelledby":i,children:[(0,s.jsx)(O.P,{id:i,title:l,heading:"h3"}),u,(0,s.jsx)("div",{...p,ref:n,className:(0,D.Tu)(A,"demo"),children:m}),(0,s.jsxs)("div",{className:(0,D.Tu)(A,"actions"),children:[(c&&d||!M)&&(0,s.jsx)("button",{ref:w,className:(0,D.Tu)(A,"action-btn")+" btn","aria-label":v,onClick:()=>{b(!0),f(e=>!e)},...z(w,v),children:(0,s.jsx)("i",{className:"material-icons",children:"code"})}),h&&(0,s.jsx)("a",{ref:k,href:h,target:"_blank",rel:"noopener noreferrer",className:(0,D.Tu)(A,"action-btn",{link:!0})+" btn",...z(k,"Edit on CodeSandbox"),children:(0,s.jsx)(H.E,{})}),g&&(0,s.jsx)("button",{ref:C,className:(0,D.Tu)(A,"action-btn")+" btn","aria-label":"Copy code",onClick:E,...z(C,"Copy code"),children:(0,s.jsx)("i",{className:"material-icons",children:"content_copy"})}),(0,s.jsx)(r.k,{theming:(0,R.DP)().theme,anchorRef:B,state:I,captureFocus:!1,role:"tooltip",arrow:!0,direction:"top",align:"center",boundingBoxPadding:`${F} 0 0 0`,children:P})]}),g&&(0,s.jsx)("pre",{className:(0,D.Tu)(A,"source"),children:(0,s.jsx)("code",{className:"lang-jsx",children:g})},g.length),a]})}));var _=t(765),$=t(8230),Y=t.n($),W=t(112),L=t(2242),K=t(4835);let q=(0,s.jsx)(Y(),{href:"/docs#menu-item",children:"MenuItem"}),X=(0,s.jsx)(Y(),{href:"/docs#menu-button",children:"MenuButton"}),J=(0,s.jsx)(Y(),{href:"/docs#use-menu-state",children:"useMenuState"}),V={id:"basic-menu",title:"Basic menu",desc:(0,s.jsxs)("p",{children:["The most basic menu consists of several ",(0,s.jsx)("code",{children:"MenuItem"}),"s wrapped in a ",(0,s.jsx)("code",{children:"Menu"}),", and is controlled by a ",(0,s.jsx)("code",{children:"MenuButton"}),"."]}),fullSource:`import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';

export default function Example() {
  return (
    <Menu menuButton={<MenuButton>Menu</MenuButton>} transition>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Paste</MenuItem>
    </Menu>
  );
}`},Q={id:"submenu",title:"Submenu",desc:(0,s.jsxs)("p",{children:[(0,s.jsx)("code",{children:"SubMenu"})," can be placed in a ",(0,s.jsx)("code",{children:"Menu"})," and has its own"," ",(0,s.jsx)("code",{children:"MenuItem"}),"s as children. You might also create nested submenus under a submenu."]}),note:(0,s.jsxs)("p",{children:["The ",(0,s.jsx)("code",{children:"label"})," prop of submenu accepts not only string type but any valid JSX. Thus, you can render images or icons in the label."]}),source:`<Menu menuButton={<MenuButton>Menu</MenuButton>}>
  <MenuItem>New File</MenuItem>
  <SubMenu label="Edit">
    <MenuItem>Cut</MenuItem>
    <MenuItem>Copy</MenuItem>
    <MenuItem>Paste</MenuItem>
    <SubMenu label="Find">
      <MenuItem>Find...</MenuItem>
      <MenuItem>Find Next</MenuItem>
      <MenuItem>Find Previous</MenuItem>
    </SubMenu>
  </SubMenu>
  <MenuItem>Print...</MenuItem>
</Menu>`,fullSource:`import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
  return (
    <Menu menuButton={<MenuButton>Menu</MenuButton>}>
      <MenuItem>New File</MenuItem>
      <SubMenu label="Edit">
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
        <SubMenu label="Find">
          <MenuItem>Find...</MenuItem>
          <MenuItem>Find Next</MenuItem>
          <MenuItem>Find Previous</MenuItem>
        </SubMenu>
      </SubMenu>
      <MenuItem>Print...</MenuItem>
    </Menu>
  );
}`},Z={id:"event-handling",title:"Event handling",desc:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{children:["When a menu item is activated, the ",(0,s.jsx)("code",{children:"onClick"})," event fires on menu item. Unless the"," ",(0,s.jsx)("code",{children:"stopPropagation"})," of event object is set ",(0,s.jsx)("code",{children:"true"}),", the"," ",(0,s.jsx)("code",{children:"onItemClick"})," of root menu component will fire afterwards. If the"," ",(0,s.jsx)("code",{children:"keepOpen"})," of event object is set ",(0,s.jsx)("code",{children:"true"}),", menu will be kept open after the menu item is clicked."]}),(0,s.jsxs)("p",{children:["For details of the event object, please see ",q,"."]})]}),codeSandbox:"https://codesandbox.io/s/react-menu-click-event-1p4604",source:`<Menu
  menuButton={<MenuButton>Menu</MenuButton>}
  onItemClick={(e) => console.log(\`[Menu] \${e.value} clicked\`)}
>
  <MenuItem value="Cut" onClick={(e) => console.log(\`[MenuItem] \${e.value} clicked\`)}>
    Cut
  </MenuItem>

  <MenuItem
    value="Copy"
    onClick={(e) => {
      console.log(\`[MenuItem] \${e.value} clicked\`);
      // Stop the \`onItemClick\` of root menu component from firing
      e.stopPropagation = true;
      // Keep the menu open after this menu item is clicked
      e.keepOpen = true;
    }}
  >
    Copy
  </MenuItem>

  <MenuItem value="Paste">Paste</MenuItem>
</Menu>`},ee={id:"radio-group",title:"Radio group",desc:(0,s.jsxs)("p",{children:["You could make menu items behave like radio buttons by setting ",(0,s.jsx)("code",{children:'type="radio"'})," and wrapping them in a ",(0,s.jsx)("code",{children:"MenuRadioGroup"}),". The child menu item which has the same value (strict equality ===) as the radio group is marked as checked."]}),source:`const [textColor, setTextColor] = useState('red');

<Menu menuButton={<MenuButton>Text color</MenuButton>}>
  <MenuRadioGroup
    value={textColor}
    onRadioChange={(e) => setTextColor(e.value)}
  >
    <MenuItem type="radio" value="red">
      Red
    </MenuItem>
    <MenuItem type="radio" value="green">
      Green
    </MenuItem>
    <MenuItem type="radio" value="blue">
      Blue
    </MenuItem>
  </MenuRadioGroup>
</Menu>`,fullSource:`import { useState } from 'react';
import { Menu, MenuItem, MenuButton, MenuRadioGroup } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
  const [textColor, setTextColor] = useState('red');

  return (
    <>
      <Menu menuButton={<MenuButton>Text color</MenuButton>}>
        <MenuRadioGroup
          value={textColor}
          onRadioChange={(e) => setTextColor(e.value)}
        >
          <MenuItem type="radio" value="red">
            Red
          </MenuItem>
          <MenuItem type="radio" value="green">
            Green
          </MenuItem>
          <MenuItem type="radio" value="blue">
            Blue
          </MenuItem>
        </MenuRadioGroup>
      </Menu>

      <div style={{ color: textColor }}>Sample text</div>
    </>
  );
}`},en={id:"checkbox",title:"Checkbox",desc:(0,s.jsxs)("p",{children:["You could make menu items behave like checkboxes by setting ",(0,s.jsx)("code",{children:'type="checkbox"'}),"."]}),source:`const [isBold, setBold] = useState(true);
const [isItalic, setItalic] = useState(true);
const [isUnderline, setUnderline] = useState(false);

<Menu menuButton={<MenuButton>Text style</MenuButton>}>
  <MenuItem
    type="checkbox"
    checked={isBold}
    onClick={(e) => setBold(e.checked)}
  >
    Bold
  </MenuItem>
  <MenuItem
    type="checkbox"
    checked={isItalic}
    onClick={(e) => setItalic(e.checked)}
  >
    Italic
  </MenuItem>
  <MenuItem
    type="checkbox"
    checked={isUnderline}
    onClick={(e) => setUnderline(e.checked)}
  >
    Underline
  </MenuItem>
</Menu>`,fullSource:`import { useState } from 'react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
  const [isBold, setBold] = useState(true);
  const [isItalic, setItalic] = useState(true);
  const [isUnderline, setUnderline] = useState(false);

  return (
    <>
      <Menu menuButton={<MenuButton>Text style</MenuButton>}>
        <MenuItem
          type="checkbox"
          checked={isBold}
          onClick={(e) => setBold(e.checked)}
        >
          Bold
        </MenuItem>
        <MenuItem
          type="checkbox"
          checked={isItalic}
          onClick={(e) => setItalic(e.checked)}
        >
          Italic
        </MenuItem>
        <MenuItem
          type="checkbox"
          checked={isUnderline}
          onClick={(e) => setUnderline(e.checked)}
        >
          Underline
        </MenuItem>
      </Menu>

      <div
        style={{
          fontWeight: isBold ? 'bold' : 'initial',
          fontStyle: isItalic ? 'italic' : 'initial',
          textDecoration: isUnderline ? 'underline' : 'initial'
        }}
      >
        Sample text
      </div>
    </>
  );
}
`},et={id:"header-divider",title:"Header and divider",desc:(0,s.jsxs)("p",{children:["You could use ",(0,s.jsx)("code",{children:"MenuHeader"})," and ",(0,s.jsx)("code",{children:"MenuDivider"})," to group related menu items."]}),note:(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"NOTE:"})," you can render any valid JSX into menu children."]}),source:`<Menu menuButton={<MenuButton>Menu</MenuButton>}>
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
</Menu>`,fullSource:`import {
  Menu,
  MenuItem,
  MenuButton,
  MenuHeader,
  MenuDivider
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
  return (
    <Menu menuButton={<MenuButton>Menu</MenuButton>}>
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
  );
}
`},es={id:"combined",title:"Combined example",desc:(0,s.jsx)("p",{children:"An example combines the usage of several components."}),codeSandbox:"https://codesandbox.io/s/react-menu-combined-93yfr1",fullSource:`import { useState } from 'react';
import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu,
  MenuHeader,
  MenuDivider,
  MenuRadioGroup
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
  const [textColor, setTextColor] = useState('red');
  const [isBold, setBold] = useState(true);
  const [isItalic, setItalic] = useState(true);
  const [isUnderline, setUnderline] = useState(false);

  return (
    <>
      <Menu menuButton={<MenuButton>Menu</MenuButton>}>
        <MenuItem>New File</MenuItem>
        <MenuItem>Save</MenuItem>
        <MenuDivider />
        <MenuHeader>Text settings</MenuHeader>

        <SubMenu label="Text color">
          <MenuRadioGroup
            value={textColor}
            onRadioChange={(e) => setTextColor(e.value)}
          >
            <MenuItem type="radio" value={'red'}>
              Red
            </MenuItem>
            <MenuItem type="radio" value={'green'}>
              Green
            </MenuItem>
            <MenuItem type="radio" value={'blue'}>
              Blue
            </MenuItem>
          </MenuRadioGroup>
        </SubMenu>

        <SubMenu label="Text style">
          <MenuItem
            type="checkbox"
            checked={isBold}
            onClick={(e) => setBold(e.checked)}
          >
            Bold
          </MenuItem>
          <MenuItem
            type="checkbox"
            checked={isItalic}
            onClick={(e) => setItalic(e.checked)}
          >
            Italic
          </MenuItem>
          <MenuItem
            type="checkbox"
            checked={isUnderline}
            onClick={(e) => setUnderline(e.checked)}
          >
            Underline
          </MenuItem>
        </SubMenu>
      </Menu>

      <div
        style={{
          color: textColor,
          fontWeight: isBold ? 'bold' : 'initial',
          fontStyle: isItalic ? 'italic' : 'initial',
          textDecoration: isUnderline ? 'underline' : 'initial'
        }}
      >
        Sample text
      </div>
    </>
  );
}`},eo={id:"link-disabled",title:"Link and disabled",desc:(0,s.jsxs)("p",{children:[(0,s.jsx)("code",{children:"MenuItem"})," can be made a hyperlink by giving it a ",(0,s.jsx)("code",{children:"href"})," prop. Even if it's a link, the ",(0,s.jsx)("code",{children:"onClick"})," event still fires as normal. You could also disable a menu item using the ",(0,s.jsx)("code",{children:"disabled"})," prop."]}),note:(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"NOTE:"})," the ",(0,s.jsx)("code",{children:"href"})," prop is meant to be a redirect which causes browser to reload the document at the URL specified. If you want to prevent the reload or work with ",(0,s.jsx)("strong",{children:"React Router"}),", please see"," ",(0,s.jsx)(K.G,{href:"https://codesandbox.io/s/react-menu-react-router-example-dw4ku",children:"this example"}),"."]}),source:`<Menu menuButton={<MenuButton>Menu</MenuButton>}>
  <MenuItem href="https://www.google.com/">Google</MenuItem>
  <MenuItem
    href="https://github.com/szhsin/react-menu/"
    target="_blank"
    rel="noopener noreferrer"
  >
    GitHub <ExternalLinkIcon />
  </MenuItem>
  <MenuItem>Regular item</MenuItem>
  <MenuItem disabled>Disabled item</MenuItem>
</Menu>`},ei={id:"icon-image",title:"Icon and image",desc:(0,s.jsxs)("p",{children:[(0,s.jsx)(W.x,{})," doesn't include any imagery. However, you are free to use your own or third-party icons and images, as you could wrap anything in a ",(0,s.jsx)("code",{children:"MenuItem"}),". This example uses Google's Material icons."]}),source:`<Menu menuButton={<MenuButton>Menu</MenuButton>}>
  <MenuItem href="https://github.com/szhsin/react-menu/">
    <img src="octocat.png" alt="octocat" role="presentation" />
    GitHub
  </MenuItem>

  <MenuDivider />

  <SubMenu
    label={
      <>
        <i className="material-icons">edit</i>Edit
      </>
    }
  >
    <MenuItem>
      <i className="material-icons">content_cut</i>Cut
    </MenuItem>
    <MenuItem>
      <i className="material-icons">content_copy</i>Copy
    </MenuItem>
    <MenuItem>
      <i className="material-icons">content_paste</i>Paste
    </MenuItem>
  </SubMenu>
</Menu>`},er={id:"focusable-item",title:"Focusable item",desc:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{children:[(0,s.jsx)("code",{children:"FocusableItem"})," is a special menu item. It's used to wrap elements which are able to receive focus, such as input or button."]}),(0,s.jsxs)("p",{children:["It receives a render prop as ",(0,s.jsx)("code",{children:"children"})," and passes down a ",(0,s.jsx)("code",{children:"ref"})," and several other states. This example demonstrates how to use an input element to filter menu items."]})]}),fullSource:`import { useState } from 'react';
import { Menu, MenuItem, FocusableItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
  const [filter, setFilter] = useState('');

  return (
    <Menu
      menuButton={<MenuButton>Menu</MenuButton>}
      onMenuChange={(e) => e.open && setFilter('')}
    >
      <FocusableItem>
        {({ ref }) => (
          <input
            ref={ref}
            type="text"
            placeholder="Type to filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        )}
      </FocusableItem>
      {['Apple', 'Banana', 'Blueberry', 'Cherry', 'Strawberry']
        .filter((fruit) =>
          fruit.toUpperCase().includes(filter.trim().toUpperCase())
        )
        .map((fruit) => (
          <MenuItem key={fruit}>{fruit}</MenuItem>
        ))}
    </Menu>
  );
}`},el={id:"item-render-prop",title:"Render prop",desc:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{children:[(0,s.jsx)("code",{children:"MenuItem"})," manages some internal states one of which indicates whether the item is hovered. If you need to render dynamic contents in response to state updates, you can use"," ",(0,s.jsx)("code",{children:"children"})," as a render prop and pass it a callback function."]}),(0,s.jsxs)("p",{children:["For more menu item states, please refer to ",q,"."]})]}),note:(0,s.jsxs)("p",{children:["The ",(0,s.jsx)("code",{children:"children"})," of menu also supports render prop pattern. When a function is provided to a menu's ",(0,s.jsx)("code",{children:"children"}),", it receives the menu's state and computed direction resulted from bounding box check."]}),source:`<Menu menuButton={<MenuButton>Menu</MenuButton>}>
  <MenuItem>{({ hover }) => (hover ? 'Hovered!' : 'Hover me')}</MenuItem>
  <MenuDivider />
  <MenuItem style={{ justifyContent: 'center' }}>
    {({ hover }) => (
      <i className="material-icons md-48">
        {hover ? 'sentiment_very_satisfied' : 'sentiment_very_dissatisfied'}
      </i>
    )}
  </MenuItem>
</Menu>`},eu={id:"button-render-prop",title:"Render prop",desc:(0,s.jsxs)("p",{children:["If you need to dynamically render menu button based on menu state, the ",(0,s.jsx)("code",{children:"menuButton"})," ","supports the render prop pattern."]}),source:`<Menu
  menuButton={({ open }) => <MenuButton>{open ? 'Close' : 'Open'}</MenuButton>}
>
  <MenuItem>Cut</MenuItem>
  <MenuItem>Copy</MenuItem>
  <MenuItem>Paste</MenuItem>
</Menu>`},ea={id:"customised-btn",title:"Using any button",desc:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{children:["You can use a native button element with ",(0,s.jsx)("code",{children:"Menu"}),", or use your own React button component which implements a forwarding ref and accepts ",(0,s.jsx)("code",{children:"onClick"})," and"," ",(0,s.jsx)("code",{children:"onKeyDown"})," event props."]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("code",{children:"Menu"})," also works well with popular React libraries, such as the"," ",(0,s.jsx)("b",{children:"Material-UI"}),". See"," ",(0,s.jsx)(K.G,{href:"https://codesandbox.io/s/react-menu-material-ui-example-wvzpc",children:"a CodeSandbox example"}),"."]}),(0,s.jsxs)("p",{children:["The benefit of using ",X," from this package is it has WAI-ARIA compliant attributes."]})]}),source:`<Menu menuButton={<button type="button">Menu</button>}>
  <MenuItem>Cut</MenuItem>
  <MenuItem>Copy</MenuItem>
  <MenuItem>Paste</MenuItem>
</Menu>`},ec={id:"menu-placement",title:"Placement",codeSandbox:"https://codesandbox.io/s/react-menu-placement-wrvcnt",desc:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{children:["You can control the position of menu and how it behaves in response to window scroll event with the ",(0,s.jsx)("code",{children:"align"}),", ",(0,s.jsx)("code",{children:"direction"}),", ",(0,s.jsx)("code",{children:"position"}),", and"," ",(0,s.jsx)("code",{children:"viewScroll"})," props."]}),(0,s.jsxs)("p",{children:["Menu can be set to display an arrow pointing to its anchor element with the"," ",(0,s.jsx)("code",{children:"arrow"})," prop. You can also adjust menu's position relating to its anchor using the ",(0,s.jsx)("code",{children:"gap"})," and ",(0,s.jsx)("code",{children:"shift"})," prop."]})]}),source:`const [align, setAlign] = useState('center');
const [position, setPosition] = useState('anchor');
const [viewScroll, setViewScroll] = useState('auto');

const menus = ['right', 'top', 'bottom', 'left'].map((direction) => (
  <Menu
    menuButton={<MenuButton>{direction}</MenuButton>}
    key={direction}
    direction={direction}
    align={align}
    position={position}
    viewScroll={viewScroll}
    arrow={hasArrow ? true : false}
    gap={hasGap ? 12 : 0}
    shift={hasShift ? 12 : 0}
  >
    {['Apple', 'Banana', 'Blueberry', 'Cherry', 'Strawberry'].map((fruit) => (
      <MenuItem key={fruit}>{fruit}</MenuItem>
    ))}
  </Menu>
))`},ed={id:"menu-overflow",title:"Overflow",codeSandbox:"https://codesandbox.io/s/react-menu-overflow-xxuugg",desc:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{children:["When there isn't enough space for all menu items, you could use the ",(0,s.jsx)("code",{children:"overflow"})," ","prop to make the menu list scrollable. The value of this prop is similar to the CSS overflow property."]}),(0,s.jsxs)("p",{children:["Setting the ",(0,s.jsx)("code",{children:"overflow"})," prop could make a menu touch screen edges. If this is visually unpleasant, you may use ",(0,s.jsx)("code",{children:"boundingBoxPadding"})," to add space around the menu."]}),(0,s.jsxs)("p",{children:["If you want to fix some items at the top or bottom, set ",(0,s.jsx)("code",{children:"setDownOverflow"})," prop on"," ",(0,s.jsx)("code",{children:"Menu"})," and ",(0,s.jsx)("code",{children:"takeOverflow"})," prop on a ",(0,s.jsx)("code",{children:"MenuGroup"})," which makes the group scrollable."]})]}),note:(0,s.jsxs)("p",{children:["A menu with overflowing items prevents arrow from displaying properly. To get around it, you can use a ",(0,s.jsx)("code",{children:"MenuGroup"}),", please see"," ",(0,s.jsx)(K.G,{href:"https://codesandbox.io/s/react-menu-arrow-overflow-qkvjz",children:"a CodeSandbox example"}),"."]}),source:`import {
  Menu,
  MenuItem,
  MenuButton,
  FocusableItem,
  MenuGroup
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

const [overflow, setOverflow] = useState('auto');
const [position, setPosition] = useState('auto');
const [filter, setFilter] = useState('');

<Menu
  menuButton={<MenuButton>Overflow</MenuButton>}
  overflow={overflow}
  position={position}
>
  {new Array(100).fill(0).map((_, i) => (
    <MenuItem key={i}>Item {i + 1}</MenuItem>
  ))}
</Menu>

<Menu
  menuButton={<MenuButton>Grouping</MenuButton>}
  overflow={overflow}
  setDownOverflow
  position={position}
  boundingBoxPadding="10"
  onMenuChange={(e) => e.open && setFilter('')}
>
  <FocusableItem>
    {({ ref }) => (
      <input
        ref={ref}
        type="text"
        placeholder="Type a number"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    )}
  </FocusableItem>
  <MenuGroup takeOverflow>
    {new Array(100)
      .fill(0)
      .map((_, i) => \`Item \${i + 1}\`)
      .filter((item) => item.includes(filter.trim()))
      .map((item, i) => (
        <MenuItem key={i}>{item}</MenuItem>
      ))}
  </MenuGroup>
  <MenuItem>Last (fixed)</MenuItem>
</Menu>`},eh={id:"bounding-box",title:"Bounding box",codeSandbox:"https://codesandbox.io/s/react-menu-boundingbox-sz0wmy",desc:(0,s.jsxs)("p",{children:["By default, menu positions itself within its nearest ancestor element which a CSS"," ",(0,s.jsx)("code",{children:"overflow"})," value other than ",(0,s.jsx)("code",{children:"visible"}),", or the browser viewport when such an element is not present. Alternalively, you can use the ",(0,s.jsx)("code",{children:"portal"})," prop to make menu visually “break out” of its scrollable container. Also, you can specify a container in the page as the bounding box for a menu using the ",(0,s.jsx)("code",{children:"boundingBoxRef"})," prop. Menu will try to position itself within that container."]}),note:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"NOTE"}),": when there is an ancestor element which has a CSS"," ",(0,s.jsx)("code",{children:"overflow"})," value other than ",(0,s.jsx)("code",{children:"visible"})," above menu, please ensure at least one element between that overflow element and menu has a CSS ",(0,s.jsx)("code",{children:"position"})," ","value other than ",(0,s.jsx)("code",{children:"static"}),". For example, you could add"," ",(0,s.jsx)("code",{children:"position: relative"})," to the ancestor element which has"," ",(0,s.jsx)("code",{children:"overflow: auto"}),"."]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"TIP"}),": you could render menu into a specified DOM node instead of"," ",(0,s.jsx)("code",{children:"document.body"})," using the ",(0,s.jsx)("code",{children:"portal"})," prop, please see"," ",(0,s.jsx)(K.G,{href:"https://codesandbox.io/s/react-menu-portal-target-boyxv9",children:"a CodeSandbox example"}),"."]})]}),source:`const boundingBoxRef = useRef(null);
const leftAnchor = useRef(null);
const rightAnchor = useRef(null);
const [{ state }, toggleMenu] = useMenuState();
const [portal, setPortal] = useState(false);

useEffect(() => {
    toggleMenu(true);
}, [toggleMenu]);

const tooltipProps = {
    state,
    captureFocus: false,
    arrow: true,
    role: 'tooltip',
    align: 'center',
    viewScroll: 'auto',
    position: 'anchor',
    boundingBoxPadding: '1 8 1 1'
};

<label>
  <input type="checkbox" checked={portal} 
    onChange={(e) => setPortal(e.target.checked)} />
  Render via portal
</label>

<div ref={boundingBoxRef} style={{ overflow: 'auto', position: 'relative' }}>
    <div ref={leftAnchor} />
    <ControlledMenu {...tooltipProps} portal={portal}
        anchorRef={leftAnchor} direction="top">
        I can flip over if you scroll this block
    </ControlledMenu>

    <div ref={rightAnchor} />
    {/* explicitly set bounding box with the boundingBoxRef prop */}
    <ControlledMenu {...tooltipProps} boundingBoxRef={boundingBoxRef}
        anchorRef={rightAnchor} direction="right">
        I'm a tooltip built with React-Menu
    </ControlledMenu>
</div>`},em={id:"controlling-state",title:"Controlling state",desc:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{children:["In some use cases you may need to access a menu's state and control how the menu is open or closed. This can be implemented using a ",(0,s.jsx)("code",{children:"ControlledMenu"}),"."]}),(0,s.jsxs)("p",{children:["You need to provide at least a ",(0,s.jsx)("code",{children:"state"})," prop, and a ",(0,s.jsx)("code",{children:"ref"})," of an element to which menu will be positioned. You also need to update ",(0,s.jsx)("code",{children:"state"})," in response to the ",(0,s.jsx)("code",{children:"onClose"})," event."]}),(0,s.jsxs)("p",{children:["You can optionally leverage a ",(0,s.jsx)("code",{children:"useClick"})," hook which helps create a similar toggle menu experience to the ",(0,s.jsx)("code",{children:"Menu"})," component."]})]}),fullSource:`import { useRef, useState } from 'react';
import { ControlledMenu, MenuItem, useClick } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function () {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const anchorProps = useClick(isOpen, setOpen);

  return (
    <>
      <button type="button" ref={ref} {...anchorProps}>
        Menu
      </button>

      <ControlledMenu
        state={isOpen ? 'open' : 'closed'}
        anchorRef={ref}
        onClose={() => setOpen(false)}
      >
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </ControlledMenu>
    </>
  );
}`},ep={id:"use-menu-state",title:"useMenuState",desc:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{children:[(0,s.jsx)("code",{children:"useMenuState"})," Hook works with ",(0,s.jsx)("code",{children:"ControlledMenu"})," and help you manage the state transition/animation when menu opens and closes."]}),(0,s.jsxs)("p",{children:["Please see ",J," for more details."]})]}),fullSource:`import { useRef } from 'react';
import { ControlledMenu, MenuItem, useClick, useMenuState } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';

export default function () {
  const ref = useRef(null);
  const [menuState, toggleMenu] = useMenuState({ transition: true });
  const anchorProps = useClick(menuState.state, toggleMenu);

  return (
    <>
      <button type="button" ref={ref} {...anchorProps}>
        Menu
      </button>

      <ControlledMenu {...menuState} anchorRef={ref} onClose={() => toggleMenu(false)}>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </ControlledMenu>
    </>
  );
}`},ex={id:"hover-menu",title:"Hover menu",codeSandbox:"https://codesandbox.io/s/react-hover-menu-boz9dd",desc:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{children:["You can create a hover menu with the ",(0,s.jsx)("code",{children:"useHover"})," hook and"," ",(0,s.jsx)("code",{children:"ControlledMenu"}),"."]}),(0,s.jsxs)("p",{children:["A hover menu created using the ",(0,s.jsx)("code",{children:"useHover"})," hook can work on both desktop and touch screens. Keyboard navigation is still supported."]}),(0,s.jsxs)("p",{children:["Similar to the click menu, you can create menu state using ",(0,s.jsx)("code",{children:"useState"})," (w/o transition), or ",(0,s.jsx)("code",{children:"useMenuState"})," hook (with transition)."]})]}),fullSource:`import { useRef, useState } from 'react';
import { ControlledMenu, MenuItem, useHover, useMenuState } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';

const HoverMenu = () => {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const { anchorProps, hoverProps } = useHover(isOpen, setOpen);

  return (
    <>
      <div ref={ref} {...anchorProps}>
        Hover
      </div>

      <ControlledMenu
        {...hoverProps}
        state={isOpen ? 'open' : 'closed'}
        anchorRef={ref}
        onClose={() => setOpen(false)}
      >
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </ControlledMenu>
    </>
  );
};

const HoverMenuWithTransition = () => {
  const ref = useRef(null);
  const [menuState, toggle] = useMenuState({ transition: true });
  const { anchorProps, hoverProps } = useHover(menuState.state, toggle);

  return (
    <>
      <div ref={ref} {...anchorProps}>
        Hover with transition
      </div>

      <ControlledMenu
        {...hoverProps}
        {...menuState}
        anchorRef={ref}
        onClose={() => toggle(false)}
      >
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </ControlledMenu>
    </>
  );
};`},ej={id:"context-menu",title:"Context menu",desc:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{children:["Context menu is implemented using a ",(0,s.jsx)("code",{children:"ControlledMenu"}),"."]}),(0,s.jsxs)("p",{children:["You need to provide an ",(0,s.jsx)("code",{children:"anchorPoint"})," of viewport coordinates to which menu will be positioned."]})]}),note:(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"TIP"}),": sometimes you may want to reuse one menu for both dropdown and context menu. In this case, you can provide ",(0,s.jsx)("code",{children:"ControlledMenu"})," with both the"," ",(0,s.jsx)("code",{children:"anchorRef"})," and ",(0,s.jsx)("code",{children:"anchorPoint"})," props and dynamically switch between them, please see"," ",(0,s.jsx)(K.G,{href:"https://codesandbox.io/s/usecontrolledmenu-9u7tol",children:"a CodeSandbox example"}),"."]}),fullSource:`import { useState } from 'react';
import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function () {
  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  return (
    <div
      onContextMenu={(e) => {
        if (typeof document.hasFocus === 'function' && !document.hasFocus()) return;
        
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        setOpen(true);
      }}
    >
      Right click to open context menu
      <ControlledMenu
        anchorPoint={anchorPoint}
        state={isOpen ? 'open' : 'closed'}
        direction="right"
        onClose={() => setOpen(false)}
      >
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </ControlledMenu>
    </div>
  );
}`},ef={id:"classname-prop",title:"className prop",desc:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{children:["You can provide components with CSS classes using the various ",(0,s.jsx)("code",{children:"*className"})," props. Optionally, you may pass a function to the props and return different CSS class names under different component states."]}),(0,s.jsxs)("p",{children:["For more details about available states, please refer to the ",(0,s.jsx)("code",{children:"*className"})," props under each ",(0,s.jsx)(Y(),{href:"/docs#menu-item",children:"component"}),"."]})]}),source:`// When using the functional form of className prop,
// it's advisable to put it outside React component scope.
const menuItemClassName = ({ hover }) =>
  hover ? 'my-menuitem-hover' : 'my-menuitem';

<Menu menuButton={<MenuButton>Menu</MenuButton>} menuClassName="my-menu">
  <MenuItem>New File</MenuItem>
  <MenuItem>Save</MenuItem>
  <MenuItem className={menuItemClassName}>I'm special</MenuItem>
</Menu>

/* CSS file */
.my-menu {
  border: 2px solid green;
}

.my-menuitem {
  color: blue;
  background-color: yellow;
}

.my-menuitem-hover {
  color: yellow;
  background-color: black;
}`},eM={id:"menu",title:"Menu",desc:(0,s.jsxs)("p",{children:["Common usage examples of ",(0,s.jsx)("code",{children:"Menu"}),", ",(0,s.jsx)("code",{children:"SubMenu"}),", and ",(0,s.jsx)("code",{children:"MenuItem"}),"."]}),list:[V,Q,Z,ee,en,et,es]},eb={id:"menu-item",title:"Menu item",desc:(0,s.jsx)("p",{children:"More examples with menu items."}),list:[eo,ei,el,er]},eg={id:"menu-button",title:"Menu button",desc:(0,s.jsx)("p",{children:"Customising the menu button."}),list:[eu,ea]},ev={id:"menu-options",title:"Menu options",desc:(0,s.jsx)("p",{children:"Control the display and position of menu related to menu button."}),list:[ec,ed,eh]},eI={id:"controlled-menu",title:"Controlled menu",desc:(0,s.jsxs)("p",{children:["Get control of menu's open or close state with ",(0,s.jsx)("code",{children:"ControlledMenu"}),"."]}),list:[em,ep,ex,ej]},ey={id:"styling",title:"Styling",desc:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{children:[(0,s.jsx)(W.x,{})," is unopinionated when it comes to styling. It doesn't depend on any particular CSS-in-JS runtime and works with all flavours of front-end stack. Please checkout the respective CodeSandbox example below:"]}),(0,s.jsx)(L.X,{}),(0,s.jsxs)("p",{children:["You may import the ",(0,s.jsx)("code",{children:"@szhsin/react-menu/dist/core.css"})," which contains minimal style and some reset. However, this is optional as you can define everything from scratch without importing any css files. There is a ",(0,s.jsx)("code",{children:"style-utils"})," which helps write selectors for CSS-in-JS. You can find a complete list of CSS selectors in the"," ",(0,s.jsx)(Y(),{href:"/style-guide#selectors",children:"styling guide"}),"."]}),(0,s.jsxs)("p",{children:["In addition, you can use ",(0,s.jsx)("code",{children:"*className"})," props."]})]}),list:[ef]},eC={id:"usage-examples",title:"Usage",desc:(0,s.jsx)("p",{children:"Each of the following sections includes a live example. They are grouped into related categories."}),list:[eM,eb,ev,eg,eI,ey]},ew={id:"features",title:"Features",desc:(0,s.jsxs)("ul",{className:"features",children:[(0,s.jsxs)("li",{children:["Unstyled and lightweight"," ",(0,s.jsx)("a",{href:"https://bundlephobia.com/package/@szhsin/react-menu",children:"(8kB)"})," React menu components."]}),(0,s.jsx)("li",{children:"Unlimited levels of submenu"}),(0,s.jsx)("li",{children:"Supports dropdown, hover, and context menu"}),(0,s.jsx)("li",{children:"Supports radio and checkbox menu items"}),(0,s.jsx)("li",{children:"Flexible menu positioning"}),(0,s.jsx)("li",{children:"Comprehensive keyboard interactions"}),(0,s.jsxs)("li",{children:["Customisable ",(0,s.jsx)(Y(),{href:"#styling",children:"styling"})]}),(0,s.jsxs)("li",{children:[(0,s.jsx)("a",{href:"https://github.com/reactwg/react-18/discussions/70",children:"Level 3 support"})," of React 18 concurrent rendering"]}),(0,s.jsx)("li",{children:"Supports server-side rendering"}),(0,s.jsxs)("li",{children:["Implements"," ",(0,s.jsx)(K.G,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/menu/",children:"WAI-ARIA menu"})," ","pattern"]})]})},ek={id:"install",title:"Install",desc:(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:"install-command",children:[(0,s.jsx)("p",{className:"comment",children:"# with npm"}),(0,s.jsx)("p",{children:"npm install @szhsin/react-menu"}),(0,s.jsx)("p",{className:"comment",children:"# with Yarn"}),(0,s.jsx)("p",{children:"yarn add @szhsin/react-menu"}),(0,s.jsx)("div",{className:"sandbox",children:(0,s.jsx)(K.G,{href:"https://codesandbox.io/s/react-menu-starter-3ez3c",children:"Try on CodeSandbox"})})]})})},eS=[ew,ek,eC],eB=(0,D.QH)(i.W),eN=(0,D.QH)(r.k),eD=o.memo(function(){return(0,s.jsxs)(o.Fragment,{children:[(0,s.jsx)(T.J,{children:eS}),(0,s.jsx)("div",{className:"main-wrap",children:(0,s.jsxs)("main",{id:"usage",children:[(0,s.jsx)(eR,{heading:"h1",data:ew}),(0,s.jsx)(eR,{heading:"h1",data:ek}),(0,s.jsx)(eR,{heading:"h1",data:eC}),(0,s.jsx)(eR,{data:eM}),(0,s.jsx)(eP,{}),(0,s.jsx)(eT,{}),(0,s.jsx)(eF,{}),(0,s.jsx)(eE,{}),(0,s.jsx)(ez,{}),(0,s.jsx)(eG,{}),(0,s.jsx)(eH,{}),(0,s.jsx)(eR,{data:eb}),(0,s.jsx)(eO,{}),(0,s.jsx)(eA,{}),(0,s.jsx)(eU,{}),(0,s.jsx)(e_,{}),(0,s.jsx)(eR,{data:ev}),(0,s.jsx)(eX,{}),(0,s.jsx)(eQ,{}),(0,s.jsx)(eZ,{}),(0,s.jsx)(eR,{data:eg}),(0,s.jsx)(e$,{}),(0,s.jsx)(eY,{}),(0,s.jsx)(eR,{data:eI}),(0,s.jsx)(e0,{}),(0,s.jsx)(e1,{}),(0,s.jsx)(e5,{}),(0,s.jsx)(e3,{}),(0,s.jsx)(eR,{data:ey}),(0,s.jsx)(e6,{})]})}),(0,s.jsx)(_.u,{})]})});function eR(e){let{heading:n,data:{id:t,title:o,desc:i}}=e;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(O.P,{id:t,title:o,heading:n||"h2"}),i]})}function eP(){return(0,s.jsx)(U,{data:V,children:(0,s.jsxs)(eB,{menuButton:(0,s.jsx)(c,{children:"Menu"}),children:[(0,s.jsx)(d.D,{children:"Cut"}),(0,s.jsx)(d.D,{children:"Copy"}),(0,s.jsx)(d.D,{children:"Paste"})]})})}function eT(){return(0,s.jsx)(U,{data:Q,children:(0,s.jsxs)(eB,{menuButton:(0,s.jsx)(c,{children:"Menu"}),transitionTimeout:200,children:[(0,s.jsx)(d.D,{children:"New File"}),(0,s.jsxs)(M,{label:"Edit",children:[(0,s.jsx)(d.D,{children:"Cut"}),(0,s.jsx)(d.D,{children:"Copy"}),(0,s.jsx)(d.D,{children:"Paste"}),(0,s.jsxs)(M,{label:"Find",children:[(0,s.jsx)(d.D,{children:"Find..."}),(0,s.jsx)(d.D,{children:"Find Next"}),(0,s.jsx)(d.D,{children:"Find Previous"})]})]}),(0,s.jsx)(d.D,{children:"Print..."})]})})}function eF(){let e=(0,o.useRef)(null),n=(0,o.useRef)(1),[t,i]=(0,o.useState)([]),r=e=>i(t=>[...t,(0,s.jsx)("li",{children:e},n.current++)]);return(0,D.Nf)(()=>{e.current.scrollTop=e.current.scrollHeight},[t]),(0,s.jsxs)(U,{data:Z,children:[(0,s.jsxs)("div",{className:"buttons",children:[(0,s.jsxs)(eB,{menuButton:(0,s.jsx)(c,{children:"Menu"}),onItemClick:e=>{r(`[Menu] ${e.value} clicked`),r("------")},children:[(0,s.jsx)(d.D,{value:"Cut",onClick:e=>{r(`[MenuItem] ${e.value} clicked`)},children:"Cut"}),(0,s.jsx)(d.D,{value:"Copy",onClick:e=>{r(`[MenuItem] ${e.value} clicked`),r("------"),e.stopPropagation=!0,e.keepOpen=!0},children:"Copy (Keep open when clicked)"}),(0,s.jsx)(d.D,{value:"Paste",children:"Paste"})]}),(0,s.jsx)("button",{className:"btn",onClick:()=>i([]),children:"Clear"})]}),(0,s.jsx)("ul",{className:"output",ref:e,children:t})]})}function eE(){let[e,n]=(0,o.useState)("red"),{isDark:t}=(0,R.DP)();return(0,s.jsxs)(U,{data:ee,children:[(0,s.jsx)(eB,{menuButton:(0,s.jsx)(c,{children:"Text color"}),children:(0,s.jsxs)(b,{value:e,onRadioChange:e=>n(e.value),children:[(0,s.jsx)(d.D,{type:"radio",value:"red",children:"Red"}),(0,s.jsx)(d.D,{type:"radio",value:"green",children:"Green"}),(0,s.jsx)(d.D,{type:"radio",value:t?"#69a6f8":"blue",children:"Blue"})]})}),(0,s.jsx)("div",{className:"sample-text",style:{color:e},children:"Sample text"})]})}function ez(){let[e,n]=(0,o.useState)(!0),[t,i]=(0,o.useState)(!0),[r,l]=(0,o.useState)(!1);return(0,s.jsxs)(U,{data:en,children:[(0,s.jsxs)(eB,{menuButton:(0,s.jsx)(c,{children:"Text style"}),children:[(0,s.jsx)(d.D,{type:"checkbox",checked:e,onClick:e=>n(e.checked),children:"Bold"}),(0,s.jsx)(d.D,{type:"checkbox",checked:t,onClick:e=>i(e.checked),children:"Italic"}),(0,s.jsx)(d.D,{type:"checkbox",checked:r,onClick:e=>l(e.checked),children:"Underline"})]}),(0,s.jsx)("div",{className:"sample-text",style:{fontWeight:e?"bold":"initial",fontStyle:t?"italic":"initial",textDecoration:r?"underline":"initial"},children:"Sample text"})]})}function eG(){return(0,s.jsx)(U,{data:et,children:(0,s.jsxs)(eB,{menuButton:(0,s.jsx)(c,{children:"Menu"}),boundingBoxPadding:`${(0,R.sl)().navbarHeight} 0 0 0`,children:[(0,s.jsx)(d.D,{children:"New File"}),(0,s.jsx)(d.D,{children:"Save"}),(0,s.jsx)(d.D,{children:"Close Window"}),(0,s.jsx)(g.N,{}),(0,s.jsx)(v.j,{children:"Edit"}),(0,s.jsx)(d.D,{children:"Cut"}),(0,s.jsx)(d.D,{children:"Copy"}),(0,s.jsx)(d.D,{children:"Paste"}),(0,s.jsx)(g.N,{}),(0,s.jsx)(d.D,{children:"Print"})]})})}function eH(){let[e,n]=(0,o.useState)("red"),[t,i]=(0,o.useState)(!0),[r,l]=(0,o.useState)(!0),[u,a]=(0,o.useState)(!1),{isDark:h}=(0,R.DP)();return(0,s.jsxs)(U,{data:es,showSourceOnMount:!1,children:[(0,s.jsxs)(eB,{menuButton:(0,s.jsx)(c,{children:"Menu"}),unmountOnClose:!0,children:[(0,s.jsx)(d.D,{children:"New File"}),(0,s.jsx)(d.D,{children:"Save"}),(0,s.jsx)(g.N,{}),(0,s.jsx)(v.j,{children:"Text settings"}),(0,s.jsx)(M,{label:"Text color",children:(0,s.jsxs)(b,{value:e,onRadioChange:e=>n(e.value),children:[(0,s.jsx)(d.D,{type:"radio",value:"red",children:"Red"}),(0,s.jsx)(d.D,{type:"radio",value:"green",children:"Green"}),(0,s.jsx)(d.D,{type:"radio",value:h?"#69a6f8":"blue",children:"Blue"})]})}),(0,s.jsxs)(M,{label:"Text style",children:[(0,s.jsx)(d.D,{type:"checkbox",checked:t,onClick:e=>i(e.checked),children:"Bold"}),(0,s.jsx)(d.D,{type:"checkbox",checked:r,onClick:e=>l(e.checked),children:"Italic"}),(0,s.jsx)(d.D,{type:"checkbox",checked:u,onClick:e=>a(e.checked),children:"Underline"})]})]}),(0,s.jsx)("div",{className:"sample-text",style:{color:e,fontWeight:t?"bold":"initial",fontStyle:r?"italic":"initial",textDecoration:u?"underline":"initial"},children:"Sample text"})]})}function eO(){return(0,s.jsx)(U,{data:eo,children:(0,s.jsxs)(eB,{menuButton:(0,s.jsx)(c,{children:"Menu"}),children:[(0,s.jsx)(d.D,{href:"https://www.google.com/",children:"Google"}),(0,s.jsxs)(d.D,{href:"https://github.com/szhsin/react-menu/",target:"_blank",rel:"noopener noreferrer",children:["GitHub ",(0,s.jsx)(H.p,{})]}),(0,s.jsx)(d.D,{children:"Regular item"}),(0,s.jsx)(d.D,{disabled:!0,children:"Disabled item"})]})})}function eA(){return(0,s.jsx)(U,{data:ei,children:(0,s.jsxs)(eB,{menuButton:(0,s.jsx)(c,{children:"Menu"}),children:[(0,s.jsxs)(d.D,{href:"https://github.com/szhsin/react-menu/",children:[(0,s.jsx)("img",{src:`${P.basePath}/octocat.png`,alt:"octocat",role:"presentation"}),"GitHub"]}),(0,s.jsx)(g.N,{}),(0,s.jsxs)(M,{label:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("i",{className:"material-icons",children:"edit"}),"Edit"]}),children:[(0,s.jsxs)(d.D,{children:[(0,s.jsx)("i",{className:"material-icons",children:"content_cut"}),"Cut"]}),(0,s.jsxs)(d.D,{children:[(0,s.jsx)("i",{className:"material-icons",children:"content_copy"}),"Copy"]}),(0,s.jsxs)(d.D,{children:[(0,s.jsx)("i",{className:"material-icons",children:"content_paste"}),"Paste"]})]})]})})}function eU(){return(0,s.jsx)(U,{data:el,children:(0,s.jsxs)(eB,{menuButton:(0,s.jsx)(c,{children:"Menu"}),children:[(0,s.jsx)(d.D,{children:e=>{let{hover:n}=e;return n?"Hovered!":"Hover me"}}),(0,s.jsx)(g.N,{}),(0,s.jsx)(d.D,{style:{justifyContent:"center"},children:e=>{let{hover:n}=e;return(0,s.jsx)("i",{className:"material-icons md-48",children:n?"sentiment_very_satisfied":"sentiment_very_dissatisfied"})}})]})})}function e_(){let[e,n]=(0,o.useState)(""),{vWidth:t,navbarHeight:i}=(0,R.sl)();return(0,s.jsx)(U,{data:er,children:(0,s.jsxs)(eB,{menuButton:(0,s.jsx)(c,{children:"Menu"}),direction:t<600?"top":"bottom",align:"center",onMenuChange:e=>e.open&&n(""),boundingBoxPadding:`${i} 0 0 0`,children:[(0,s.jsx)(y,{children:t=>{let{ref:o}=t;return(0,s.jsx)("input",{ref:o,type:"text",placeholder:"Type to filter",value:e,onChange:e=>n(e.target.value)})}}),["Apple","Banana","Blueberry","Cherry","Strawberry"].filter(n=>n.toUpperCase().includes(e.trim().toUpperCase())).map(e=>(0,s.jsx)(d.D,{children:e},e))]})})}function e$(){return(0,s.jsx)(U,{data:eu,children:(0,s.jsxs)(eB,{menuButton:e=>{let{open:n}=e;return(0,s.jsx)(c,{children:n?"Close":"Open"})},children:[(0,s.jsx)(d.D,{children:"Cut"}),(0,s.jsx)(d.D,{children:"Copy"}),(0,s.jsx)(d.D,{children:"Paste"})]})})}function eY(){return(0,s.jsx)(U,{data:ea,children:(0,s.jsxs)(eB,{menuButton:(0,s.jsx)("button",{type:"button",className:"btn btn-primary",children:"Menu"}),children:[(0,s.jsx)(d.D,{children:"Cut"}),(0,s.jsx)(d.D,{children:"Copy"}),(0,s.jsx)(d.D,{children:"Paste"})]})})}let eW=[["start"],["center"],["end"]],eL=[["default"],["arrow"],["gap"],["shift"]],eK=[["auto","keep in viewport"],["anchor","stick to the edges of anchor"],["initial","fixed to initial position"]],eq=[["initial","keep menu in place"],["auto","reposition menu"],["close","close menu"]];function eX(){let[e,n]=(0,o.useState)("arrow"),[t,i]=(0,o.useState)("center"),[r,l]=(0,o.useState)("anchor"),[u,a]=(0,o.useState)("auto"),{navbarHeight:h}=(0,R.sl)(),m=["right","top","bottom","left"].map(n=>(0,s.jsx)(eB,{menuButton:(0,s.jsx)(c,{children:n}),direction:n,boundingBoxPadding:`${h} 0 0 0`,align:t,position:r,viewScroll:u,arrow:"arrow"===e,gap:12*("gap"===e),shift:12*("shift"===e),children:["Apple","Banana","Blueberry","Cherry","Strawberry"].map(e=>(0,s.jsx)(d.D,{children:e},e))},n));return(0,s.jsxs)(U,{data:ec,children:[(0,s.jsxs)("form",{className:"option-form",children:[(0,s.jsx)(e8,{name:"alignGroup",title:"Align with anchor",data:eW,option:t,onOptionChange:i}),(0,s.jsx)(e8,{name:"displayGroup",title:"Menu to anchor",data:eL,option:e,onOptionChange:n}),(0,s.jsx)(e8,{name:"viewScrollGroup",title:"When window scrolls",data:eq,option:u,onOptionChange:a}),(0,s.jsx)(e8,{name:"positionGroup",title:"Menu position",data:eK,option:r,onOptionChange:l})]}),(0,s.jsxs)("p",{className:"alert-warning",children:[(0,s.jsx)("i",{className:"material-icons",children:"info"})," Try to select different option combinations and scroll page up and down to see the behaviour."]}),(0,s.jsx)("div",{className:"menus",children:m})]})}let eJ=[["visible"],["auto"],["hidden"]],eV=Array(100).fill(0);function eQ(){let[e,n]=(0,o.useState)("auto"),[t,i]=(0,o.useState)("auto"),[r,l]=(0,o.useState)(""),[u,a]=(0,o.useState)(""),{set:h}=R.Fy;return(0,s.jsxs)(U,{data:ed,children:[(0,s.jsxs)("form",{className:"option-form",children:[(0,s.jsx)(e8,{name:"overflowGroup",title:"Overflow",data:eJ,option:e,onOptionChange:n}),(0,s.jsx)(e8,{name:"positionGroup",title:"Menu position",data:eK,option:t,onOptionChange:i})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(eB,{menuButton:(0,s.jsx)(c,{children:"Overflow"}),overflow:e,position:t,align:"end",children:eV.map((e,n)=>{let t=`Item ${n+1}`;return(0,s.jsx)(d.D,{onClick:()=>h(t+" clicked"),children:t},n)})}),(0,s.jsxs)(eB,{menuButton:(0,s.jsx)(c,{style:{marginTop:"2rem"},children:"Grouping"}),setDownOverflow:!0,overflow:e,position:t,boundingBoxPadding:"10",onMenuChange:e=>{e.open&&(l(""),a(""))},align:"end",children:[(0,s.jsx)(y,{style:{padding:"0.375rem 1rem"},children:e=>{let{ref:n}=e;return(0,s.jsx)("input",{ref:n,type:"text",placeholder:"Type a number",value:r,onChange:e=>{let n=e.target.value;l(n),(0,o.startTransition)(()=>{a(n.trim())})}})}}),(0,s.jsx)(k,{takeOverflow:!0,children:eV.map((e,n)=>`Item ${n+1}`).filter(e=>e.includes(u)).map((e,n)=>(0,s.jsx)(d.D,{onClick:()=>h(e+" clicked"),children:e},n))}),(0,s.jsx)(d.D,{onClick:()=>h("Last item clicked"),children:"Last (fixed)"})]})]})]})}function eZ(){let e=(0,o.useRef)(null),n=(0,o.useRef)(null),t=(0,o.useRef)(null),[{state:i},r]=(0,S.E)(),[l,u]=(0,o.useState)(!1);(0,o.useEffect)(()=>{r(!0)},[r]);let a={state:i,captureFocus:!1,arrow:!0,role:"tooltip",align:"center",viewScroll:"auto",position:"anchor",boundingBoxPadding:"1 8 1 1"};return(0,s.jsxs)(U,{data:eh,children:[(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"checkbox",checked:l,onChange:e=>u(e.currentTarget.checked)}),"Render via portal"]}),(0,s.jsx)("div",{className:"scrollview",ref:e,children:(0,s.jsxs)("div",{className:"bounding-box",children:[(0,s.jsx)("div",{className:"anchor left",ref:n}),(0,o.createElement)(eN,{...a,menuClassName:`bounding-box-menu ${l&&"portal"}`,anchorRef:n,direction:"top",portal:l,key:l},l?"I'm rendered above the parent scrollable container via portal":"I can flip over if you scroll this block"),(0,s.jsx)("div",{className:"anchor right",ref:t}),(0,s.jsx)(eN,{...a,menuClassName:"bounding-box-menu",boundingBoxRef:e,anchorRef:t,direction:"right",repositionFlag:l.toString(),children:"I'm a tooltip built with React-Menu"})]})})]})}function e0(){let e=(0,o.useRef)(null),[n,t]=(0,o.useState)(!1),i=(0,B.k)(n,t);return(0,s.jsxs)(U,{data:em,style:{flexWrap:"wrap"},children:[(0,s.jsx)("button",{type:"button",className:"btn",ref:e,...i,children:"Menu"}),(0,s.jsxs)(eN,{state:n?"open":"closed",anchorRef:e,onClose:()=>t(!1),children:[(0,s.jsx)(d.D,{children:"Cut"}),(0,s.jsx)(d.D,{children:"Copy"}),(0,s.jsx)(d.D,{children:"Paste"})]})]})}function e1(){let e=(0,o.useRef)(null),[n,t]=(0,S.E)({transition:!0}),i=(0,B.k)(n.state,t);return(0,s.jsxs)(U,{data:ep,children:[(0,s.jsx)("button",{type:"button",className:"btn",ref:e,...i,children:"Menu"}),(0,s.jsxs)(eN,{...n,anchorRef:e,onClose:()=>t(!1),children:[(0,s.jsx)(d.D,{children:"Cut"}),(0,s.jsx)(d.D,{children:"Copy"}),(0,s.jsx)(d.D,{children:"Paste"})]})]})}let e2=()=>{let e=(0,o.useRef)(null),[n,t]=(0,o.useState)(!1),{anchorProps:i,hoverProps:r}=N(n,t);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"btn",style:{marginRight:"1rem"},ref:e,...i,children:"Hover"}),(0,s.jsxs)(eN,{...r,state:n?"open":"closed",arrow:!0,align:"end",anchorRef:e,onClose:()=>t(!1),children:[(0,s.jsx)(d.D,{children:"Cut"}),(0,s.jsx)(d.D,{children:"Copy"}),(0,s.jsx)(d.D,{children:"Paste"})]})]})},e4=()=>{let e=(0,o.useRef)(null),[n,t]=(0,S.E)({transition:!0}),{anchorProps:i,hoverProps:r}=N(n.state,t);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"btn",ref:e,...i,children:"Hover with transition"}),(0,s.jsxs)(eN,{...r,...n,arrow:!0,align:"end",anchorRef:e,onClose:()=>t(!1),children:[(0,s.jsx)(d.D,{children:"Cut"}),(0,s.jsx)(d.D,{children:"Copy"}),(0,s.jsx)(d.D,{children:"Paste"})]})]})};function e5(){return(0,s.jsxs)(U,{data:ex,children:[(0,s.jsx)(e2,{}),(0,s.jsx)(e4,{})]})}function e3(){let[e,n]=(0,o.useState)(!1),[t,i]=(0,o.useState)({x:0,y:0});return(0,s.jsxs)(U,{data:ej,onContextMenu:e=>{("function"!=typeof document.hasFocus||document.hasFocus())&&(e.preventDefault(),i({x:e.clientX,y:e.clientY}),n(!0))},children:["Right click to open context menu",(0,s.jsxs)(eN,{anchorPoint:t,state:e?"open":"closed",direction:"right",onClose:()=>n(!1),children:[(0,s.jsx)(d.D,{children:"Cut"}),(0,s.jsx)(d.D,{children:"Copy"}),(0,s.jsx)(d.D,{children:"Paste"})]})]})}let e9=e=>{let{hover:n}=e;return n?"my-menuitem-hover":"my-menuitem"};function e6(){return(0,s.jsx)(U,{data:ef,children:(0,s.jsxs)(eB,{menuButton:(0,s.jsx)(c,{children:"Menu"}),menuClassName:"my-menu",align:"center",children:[(0,s.jsx)(d.D,{children:"New File"}),(0,s.jsx)(d.D,{children:"Save"}),(0,s.jsx)(d.D,{className:e9,children:"I'm special"})]})})}function e8(e){let{title:n,name:t,data:o,option:i,onOptionChange:r}=e;return(0,s.jsxs)("fieldset",{className:"options",children:[(0,s.jsx)("legend",{children:n}),o.map(e=>{let[n,o]=e;return(0,s.jsxs)("label",{className:i===n?"checked":void 0,children:[(0,s.jsx)("input",{type:"radio",name:t,value:n,checked:i===n,onChange:e=>{let{target:n}=e;return n.checked&&r(n.value)}}),n,o&&` (${o})`]},n)})]})}let e7=eD},4835:(e,n,t)=>{"use strict";t.d(n,{G:()=>r});var s=t(6514),o=t(5834),i=t(9314);let r=(0,o.memo)(e=>{let{href:n,children:t}=e;return(0,s.jsxs)("a",{className:"external-link",target:"_blank",rel:"noopener noreferrer",href:n,children:[t,(0,s.jsx)(i.p,{})]})})},9040:(e,n,t)=>{"use strict";t.d(n,{E:()=>a});var s=t(6514),o=t(5834),i=t(7999),r=t(9314);let l="promo-spot",u=(0,o.memo)(function(e){let{label:n,title:t,desc:o,link:u}=e,a={[n.toLowerCase()]:!0};return(0,s.jsxs)("a",{className:(0,i.Tu)(l,null,a),target:"_blank",rel:"noopener noreferrer",href:u,children:[(0,s.jsxs)("div",{className:(0,i.Tu)(l,"label",a),children:[n,(0,s.jsx)(r.p,{})]}),(0,s.jsx)("strong",{children:t}),(0,s.jsx)("div",{className:(0,i.Tu)(l,"desc"),children:o})]})}),a=(0,o.memo)(function(){return(0,s.jsxs)("div",{children:[(0,s.jsx)(u,{label:"NEW",title:"Reactish-State",desc:"Simple, decentralized state management for React",link:"https://github.com/szhsin/reactish-state"}),(0,s.jsx)(u,{label:"Similar",title:"React-Accordion",desc:"Accessible, unstyled, headless accordion",link:"https://szhsin.github.io/react-accordion/"})]})})},9314:(e,n,t)=>{"use strict";t.d(n,{E:()=>i,p:()=>o});var s=t(6514);let o=()=>(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-external-link",width:24,height:24,viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,s.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),(0,s.jsx)("path",{d:"M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"}),(0,s.jsx)("line",{x1:10,y1:14,x2:20,y2:4}),(0,s.jsx)("polyline",{points:"15 4 20 4 20 9"})]}),i=()=>(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-brand-codesandbox",width:24,height:24,viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,s.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),(0,s.jsx)("path",{d:"M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z"}),(0,s.jsx)("path",{d:"M12 12l4 -2.25l4 -2.25"}),(0,s.jsx)("line",{x1:12,y1:12,x2:12,y2:21}),(0,s.jsx)("path",{d:"M12 12l-4 -2.25l-4 -2.25"}),(0,s.jsx)("path",{d:"M20 12l-4 2v4.75"}),(0,s.jsx)("path",{d:"M4 12l4 2l0 4.75"}),(0,s.jsx)("path",{d:"M8 5.25l4 2.25l4 -2.25"})]})},9654:(e,n,t)=>{"use strict";t.d(n,{P:()=>a});var s=t(6514),o=t(5834),i=t(8230),r=t.n(i),l=t(7999);let u="hash-heading",a=(0,o.memo)(function(e){let{id:n,title:t,heading:i="h1"}=e,a=(0,o.useRef)(null),[c,d]=(0,o.useState)(!1),[h,m]=(0,o.useState)();return(0,l.Nf)(()=>{m(getComputedStyle(a.current).getPropertyValue("font-size"))},[]),(0,s.jsxs)("div",{className:(0,l.Tu)(u),onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),children:[(0,o.createElement)(i,{id:n,ref:a,className:(0,l.Tu)(u,"heading")},t),(0,s.jsx)(r(),{href:`#${n}`,className:(0,l.Tu)(u,"link",{hover:c}),style:{fontSize:h},children:"#"})]})})}},e=>{var n=n=>e(e.s=n);e.O(0,[663,636,593,792],()=>n(2936)),_N_E=e.O()}]);