(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{2429:function(e,t,n){"use strict";n.d(t,{B:function(){return l}});var r=n(7378),o=n(1542),i=n(733),u=n(4246),c=n(4778),s=n(6367);let l=(0,r.forwardRef)(function({"aria-label":e,className:t,containerProps:n,initialMounted:l,unmountOnClose:a,transition:f,transitionTimeout:d,boundingBoxRef:h,boundingBoxPadding:p,reposition:m="auto",submenuOpenDelay:v=300,submenuCloseDelay:b=150,viewScroll:g="initial",portal:x,theming:E,onItemClick:y,...j},R){let w=(0,r.useRef)(null),S=(0,r.useRef)({}),{anchorRef:C,state:k,onClose:T}=j,N=(0,r.useMemo)(()=>({initialMounted:l,unmountOnClose:a,transition:f,transitionTimeout:d,boundingBoxRef:h,boundingBoxPadding:p,rootMenuRef:w,rootAnchorRef:C,scrollNodesRef:S,reposition:m,viewScroll:g,submenuOpenDelay:v,submenuCloseDelay:b}),[l,a,f,d,C,h,p,m,g,v,b]),O=(0,r.useMemo)(()=>({handleClick(e,t){e.stopPropagation||(0,c.Dx)(y,e);let n=e.keepOpen;void 0===n&&(n=t&&e.key===s.R8.SPACE),n||(0,c.Dx)(T,{value:e.value,key:e.key,reason:s.GB.CLICK})},handleClose(e){(0,c.Dx)(T,{key:e,reason:s.GB.CLICK})}}),[y,T]);if(!k)return null;let _=(0,u.jsx)(s.J6.Provider,{value:N,children:(0,u.jsx)(s.AH.Provider,{value:O,children:(0,u.jsx)(i.q,{...j,ariaLabel:e||"Menu",externalRef:R,containerRef:w,containerProps:{className:t,containerRef:w,containerProps:n,theming:E,transition:f,onClose:T}})})});return!0===x&&"undefined"!=typeof document?(0,o.createPortal)(_,document.body):x?x.target?(0,o.createPortal)(_,x.target):x.stablePosition?null:_:_})},979:function(e,t,n){"use strict";n.d(t,{v:function(){return d}});var r=n(7378),o=n(2429),i=n(4246),u=n(7733),c=n(523),s=n(9600),l=n(4778),a=n(8711),f=n(6367);let d=(0,r.forwardRef)(function({"aria-label":e,captureFocus:t,initialOpen:n,menuButton:d,instanceRef:h,onMenuChange:p,...m},v){let[b,g,x]=(0,u.i)(m),{state:E}=b,y=(0,l.tr)(E),j=(0,r.useRef)(null),R=(0,c.e)(E,(e,t)=>x(t.detail?void 0:f.td.FIRST)),w=(0,r.useCallback)(e=>{g(!1),e.key&&j.current.focus()},[g]),S=(0,l.Dx)(d,{open:y});if(!S||!S.type)throw Error("Menu requires a menuButton prop.");let C={ref:(0,s.Q)(S.ref,j),...(0,l.dG)({onKeyDown:e=>{switch(e.key){case f.R8.UP:x(f.td.LAST);break;case f.R8.DOWN:x(f.td.FIRST);break;default:return}e.preventDefault()},...R},S.props)};"MenuButton"===(0,l.oY)(S.type)&&(C.isOpen=y);let k=(0,r.cloneElement)(S,C);return(0,a.F)(p,y),(0,r.useImperativeHandle)(h,()=>({openMenu:x,closeMenu:()=>g(!1)})),(0,i.jsxs)(r.Fragment,{children:[k,(0,i.jsx)(o.B,{...m,...b,"aria-label":e||("string"==typeof S.props.children?S.props.children:"Menu"),anchorRef:j,ref:v,onClose:w})]})})},4457:function(e,t,n){"use strict";n.d(t,{R:function(){return c}});var r=n(7378),o=n(4246),i=n(5119),u=n(6367);let c=(0,r.memo)((0,r.forwardRef)(function({className:e,...t},n){return(0,o.jsx)("li",{role:"separator",...t,ref:n,className:(0,i.l)({block:u.nJ,element:u.IK,className:e})})}))},4666:function(e,t,n){"use strict";n.d(t,{t:function(){return c}});var r=n(7378),o=n(4246),i=n(5119),u=n(6367);let c=(0,r.memo)((0,r.forwardRef)(function({className:e,...t},n){return(0,o.jsx)("li",{role:u.dW,...t,ref:n,className:(0,i.l)({block:u.nJ,element:u.Vg,className:e})})}))},3542:function(e,t,n){"use strict";n.d(t,{s:function(){return f}});var r=n(7378),o=n(4246),i=n(257),u=n(6367),c=n(9600),s=n(5119),l=n(5587),a=n(4778);let f=(0,l.m)("MenuItem",function({className:e,value:t,href:n,type:l,checked:f,disabled:d,children:h,onClick:p,isHovering:m,itemRef:v,externalRef:b,...g}){let x=!!d,{setHover:E,...y}=(0,i.Q)(v,v,m,x),j=(0,r.useContext)(u.AH),R=(0,r.useContext)(u.L1),w="radio"===l,S="checkbox"===l,C=!!n&&!x&&!w&&!S,k=w?R.value===t:!!S&&!!f,T=e=>{if(x){e.stopPropagation(),e.preventDefault();return}let n={value:t,syntheticEvent:e};void 0!==e.key&&(n.key=e.key),S&&(n.checked=!k),w&&(n.name=R.name),(0,a.Dx)(p,n),w&&(0,a.Dx)(R.onRadioChange,n),j.handleClick(n,S||w)},N=(0,r.useMemo)(()=>({type:l,disabled:x,hover:m,checked:k,anchor:C}),[l,x,m,k,C]),O=(0,a.dG)({...y,onPointerDown:E,onKeyDown:e=>{if(m)switch(e.key){case u.R8.ENTER:e.preventDefault();case u.R8.SPACE:C?v.current.click():T(e)}},onClick:T},g),_={role:w?"menuitemradio":S?"menuitemcheckbox":u.CM,"aria-checked":w||S?k:void 0,...(0,a.$7)(x,m),...O,ref:(0,c.Q)(b,v),className:(0,s.l)({block:u.nJ,element:u.np,modifiers:N,className:e}),children:(0,r.useMemo)(()=>(0,a.Dx)(h,N),[h,N])};return C?(0,o.jsx)("li",{role:u.dW,children:(0,o.jsx)("a",{href:n,..._})}):(0,o.jsx)("li",{..._})})},733:function(e,t,n){"use strict";n.d(t,{q:function(){return y}});var r=n(7378),o=n(1542),i=n(4246),u=n(4778),c=n(5119),s=n(6367);let l=({className:e,containerRef:t,containerProps:n,children:o,isOpen:l,theming:a,transition:f,onClose:d})=>{let h=(0,u.us)(f,"item");return(0,i.jsx)("div",{...(0,u.dG)({onKeyDown:({key:e})=>{e===s.R8.ESC&&(0,u.Dx)(d,{key:e,reason:s.GB.CANCEL})},onBlur:e=>{l&&!e.currentTarget.contains(e.relatedTarget)&&(0,u.Dx)(d,{reason:s.GB.BLUR})}},n),className:(0,c.l)({block:s.Kk,modifiers:(0,r.useMemo)(()=>({theme:a,itemTransition:h}),[a,h]),className:e}),style:{position:"absolute",...null==n?void 0:n.style},ref:t,children:o})},a=()=>{let e,t=0;return{toggle:e=>{e?t++:t--,t=Math.max(t,0)},on:(n,r,o)=>{t?e||(e=setTimeout(()=>{e=0,r()},n)):null==o||o()},off:()=>{e&&(clearTimeout(e),e=0)}}},f=(e,t)=>{let[n,o]=(0,r.useState)(),i=(0,r.useRef)({items:[],hoverIndex:-1,sorted:!1}).current,c=(0,r.useCallback)((e,n)=>{let{items:r}=i;if(e){if(n)r.push(e);else{let n=r.indexOf(e);n>-1&&(r.splice(n,1),e.contains(document.activeElement)&&(t.current.focus(),o()))}}else i.items=[];i.hoverIndex=-1,i.sorted=!1},[i,t]);return{hoverItem:n,dispatch:(0,r.useCallback)((t,n,r)=>{let{items:c,hoverIndex:l}=i,a=()=>{if(i.sorted)return;let t=e.current.querySelectorAll(".szh-menu__item");c.sort((e,n)=>(0,u.O)(t,e)-(0,u.O)(t,n)),i.sorted=!0},f=-1,d;switch(t){case s.$U.RESET:break;case s.$U.SET:d=n;break;case s.$U.UNSET:d=e=>e===n?void 0:e;break;case s.$U.FIRST:a(),d=c[f=0];break;case s.$U.LAST:a(),f=c.length-1,d=c[f];break;case s.$U.SET_INDEX:a(),d=c[f=r];break;case s.$U.INCREASE:a(),(f=l)<0&&(f=c.indexOf(n)),++f>=c.length&&(f=0),d=c[f];break;case s.$U.DECREASE:a(),(f=l)<0&&(f=c.indexOf(n)),--f<0&&(f=c.length-1),d=c[f]}d||(f=-1),o(d),i.hoverIndex=f},[e,i]),updateItems:c}};var d=n(3134);let h=(e,t,n,r)=>{let o=(0,d.F)(t.current),i=e.current.getBoundingClientRect(),c=n===window?{left:0,top:0,right:document.documentElement.clientWidth,bottom:window.innerHeight}:n.getBoundingClientRect(),s=(0,u.dj)(r),l=e=>e+i.left-c.left-s.left,a=e=>e+i.left+o.width-c.right+s.right,f=e=>e+i.top-c.top-s.top,h=e=>e+i.top+o.height-c.bottom+s.bottom;return{menuRect:o,containerRect:i,getLeftOverflow:l,getRightOverflow:a,getTopOverflow:f,getBottomOverflow:h,confineHorizontally:e=>{let t=l(e);if(t<0)e-=t;else{let n=a(e);n>0&&(e-=n,(t=l(e))<0&&(e-=t))}return e},confineVertically:e=>{let t=f(e);if(t<0)e-=t;else{let n=h(e);n>0&&(e-=n,(t=f(e))<0&&(e-=t))}return e}}},p=({arrowRef:e,menuY:t,anchorRect:n,containerRect:r,menuRect:o})=>{let i=n.top-r.top-t+n.height/2,u=1.25*e.current.offsetHeight;return Math.min(i=Math.max(u,i),o.height-u)},m=({anchorRect:e,containerRect:t,menuRect:n,placeLeftorRightY:r,placeLeftX:o,placeRightX:i,getLeftOverflow:u,getRightOverflow:c,confineHorizontally:s,confineVertically:l,arrowRef:a,arrow:f,direction:d,position:h})=>{let m,v,b,g=d,x=r;return"initial"!==h&&(x=l(x),"anchor"===h&&(x=Math.max(x=Math.min(x,e.bottom-t.top),e.top-t.top-n.height))),"left"===g?(m=o,"initial"!==h&&(v=u(m))<0&&((b=c(i))<=0||-v>b)&&(m=i,g="right")):(m=i,"initial"!==h&&(b=c(m))>0&&((v=u(o))>=0||-v<b)&&(m=o,g="left")),"auto"===h&&(m=s(m)),{arrowY:f?p({menuY:x,arrowRef:a,anchorRect:e,containerRect:t,menuRect:n}):void 0,x:m,y:x,computedDirection:g}},v=({arrowRef:e,menuX:t,anchorRect:n,containerRect:r,menuRect:o})=>{let i=n.left-r.left-t+n.width/2,u=1.25*e.current.offsetWidth;return Math.min(i=Math.max(u,i),o.width-u)},b=({anchorRect:e,containerRect:t,menuRect:n,placeToporBottomX:r,placeTopY:o,placeBottomY:i,getTopOverflow:u,getBottomOverflow:c,confineHorizontally:s,confineVertically:l,arrowRef:a,arrow:f,direction:d,position:h})=>{let p,m,b,g="top"===d?"top":"bottom",x=r;return"initial"!==h&&(x=s(x),"anchor"===h&&(x=Math.max(x=Math.min(x,e.right-t.left),e.left-t.left-n.width))),"top"===g?(p=o,"initial"!==h&&(m=u(p))<0&&((b=c(i))<=0||-m>b)&&(p=i,g="bottom")):(p=i,"initial"!==h&&(b=c(p))>0&&((m=u(o))>=0||-m<b)&&(p=o,g="top")),"auto"===h&&(p=l(p)),{arrowX:f?v({menuX:x,arrowRef:a,anchorRect:e,containerRect:t,menuRect:n}):void 0,x,y:p,computedDirection:g}},g=({arrow:e,align:t,direction:n,gap:r,shift:o,position:i,anchorRect:u,arrowRef:c,positionHelpers:s})=>{let l,a;let{menuRect:f,containerRect:d}=s,h="left"===n||"right"===n,p=h?r:o,v=h?o:r;if(e){let e=c.current;h?p+=e.offsetWidth:v+=e.offsetHeight}let g=u.left-d.left-f.width-p,x=u.right-d.left+p,E=u.top-d.top-f.height-v,y=u.bottom-d.top+v;"end"===t?(l=u.right-d.left-f.width,a=u.bottom-d.top-f.height):"center"===t?(l=u.left-d.left-(f.width-u.width)/2,a=u.top-d.top-(f.height-u.height)/2):(l=u.left-d.left,a=u.top-d.top),l+=p,a+=v;let j={...s,anchorRect:u,placeLeftX:g,placeRightX:x,placeLeftorRightY:a,placeTopY:E,placeBottomY:y,placeToporBottomX:l,arrowRef:c,arrow:e,direction:n,position:i};switch(n){case"left":case"right":return m(j);default:return b(j)}};var x=n(8392),E=n(9600);let y=({ariaLabel:e,menuClassName:t,menuStyle:n,arrow:p,arrowProps:m={},anchorPoint:v,anchorRef:b,containerRef:y,containerProps:j,focusProps:R,externalRef:w,parentScrollingRef:S,align:C="start",direction:k="bottom",position:T="auto",overflow:N="visible",setDownOverflow:O,repositionFlag:_,captureFocus:M=!0,state:P,endTransition:L,isDisabled:A,menuItemFocus:I,gap:D=0,shift:H=0,children:U,onClose:z,...F})=>{let $,B;let[G,K]=(0,r.useState)({x:-9999,y:-9999}),[W,J]=(0,r.useState)({}),[X,V]=(0,r.useState)(),[Z,Q]=(0,r.useState)(k),[Y]=(0,r.useState)(a),[q,ee]=(0,r.useReducer)(e=>e+1,1),{transition:et,boundingBoxRef:en,boundingBoxPadding:er,rootMenuRef:eo,rootAnchorRef:ei,scrollNodesRef:eu,reposition:ec,viewScroll:es,submenuCloseDelay:el}=(0,r.useContext)(s.J6),{submenuCtx:ea,reposSubmenu:ef=_}=(0,r.useContext)(s.b7),ed=(0,r.useRef)(null),eh=(0,r.useRef)(),ep=(0,r.useRef)(),em=(0,r.useRef)(!1),ev=(0,r.useRef)({width:0,height:0}),eb=(0,r.useRef)(()=>{}),{hoverItem:eg,dispatch:ex,updateItems:eE}=f(ed,eh),ey=(0,u.tr)(P),ej=(0,u.us)(et,"open"),eR=(0,u.us)(et,"close"),ew=eu.current,eS=(0,r.useCallback)(e=>{var t;let n=b?null==(t=b.current)?void 0:t.getBoundingClientRect():v?{left:v.x,right:v.x,top:v.y,bottom:v.y,width:0,height:0}:null;if(!n)return;ew.menu||(ew.menu=(en?en.current:(0,u.GZ)(eo.current))||window);let r=h(y,ed,ew.menu,er),{arrowX:o,arrowY:i,x:c,y:s,computedDirection:l}=g({arrow:p,align:C,direction:k,gap:D,shift:H,position:T,anchorRect:n,arrowRef:ep,positionHelpers:r}),{menuRect:a}=r,f=a.height;if(!e&&"visible"!==N){let e,t;let{getTopOverflow:n,getBottomOverflow:o}=r,i=ev.current.height,c=o(s);if(c>0||(0,u.eO)(c,0)&&(0,u.eO)(f,i))e=f-c,t=c;else{let r=n(s);(r<0||(0,u.eO)(r,0)&&(0,u.eO)(f,i))&&(e=f+r,t=0-r,e>=0&&(s-=r))}e>=0?(f=e,V({height:e,overflowAmt:t})):V()}p&&J({x:o,y:i}),K({x:c,y:s}),Q(l),ev.current={width:a.width,height:f}},[p,C,er,k,D,H,T,N,v,b,y,en,eo,ew]);(0,x.b)(()=>{ey&&(eS(),em.current&&ee()),em.current=ey,eb.current=eS},[ey,eS,ef]),(0,x.b)(()=>{X&&!O&&(ed.current.scrollTop=0)},[X,O]),(0,x.b)(()=>eE,[eE]),(0,r.useEffect)(()=>{let{menu:e}=ew;if(!ey||!e)return;if(e=e.addEventListener?e:window,!ew.anchors){ew.anchors=[];let t=(0,u.GZ)(ei&&ei.current);for(;t&&t!==e;)ew.anchors.push(t),t=(0,u.GZ)(t)}let t=es;if(ew.anchors.length&&"initial"===t&&(t="auto"),"initial"===t)return;let n=()=>{"auto"===t?(0,u.MA)(()=>eS(!0)):(0,u.Dx)(z,{reason:s.GB.SCROLL})},r=ew.anchors.concat("initial"!==es?e:[]);return r.forEach(e=>e.addEventListener("scroll",n)),()=>r.forEach(e=>e.removeEventListener("scroll",n))},[ei,ew,ey,z,es,eS]);let eC=!!X&&X.overflowAmt>0;(0,r.useEffect)(()=>{if(eC||!ey||!S)return;let e=()=>(0,u.MA)(eS),t=S.current;return t.addEventListener("scroll",e),()=>t.removeEventListener("scroll",e)},[ey,eC,S,eS]),(0,r.useEffect)(()=>{if("function"!=typeof ResizeObserver||"initial"===ec)return;let e=new ResizeObserver(([e])=>{let t,n;let{borderBoxSize:r,target:i}=e;if(r){let{inlineSize:e,blockSize:o}=r[0]||r;t=e,n=o}else{let e=(0,d.F)(i);t=e.width,n=e.height}0!==t&&0!==n&&((0,u.eO)(t,ev.current.width,1)&&(0,u.eO)(n,ev.current.height,1)||(0,o.flushSync)(()=>{eb.current(),ee()}))}),t=ed.current;return e.observe(t,{box:"border-box"}),()=>e.unobserve(t)},[ec]),(0,r.useEffect)(()=>{if(!ey){ex(s.$U.RESET),eR||V();return}let{position:e,alwaysUpdate:t}=I||{},n=()=>{e===s.td.FIRST?ex(s.$U.FIRST):e===s.td.LAST?ex(s.$U.LAST):e>=-1&&ex(s.$U.SET_INDEX,void 0,e)};if(t)n();else if(M){let e=setTimeout(()=>{let e=ed.current;e&&!e.contains(document.activeElement)&&(eh.current.focus(),n())},ej?170:100);return()=>clearTimeout(e)}},[ey,ej,eR,M,I,ex]);let ek=(0,r.useMemo)(()=>({isParentOpen:ey,submenuCtx:Y,dispatch:ex,updateItems:eE}),[ey,Y,ex,eE]);X&&(O?B=X.overflowAmt:$=X.height);let eT=(0,r.useMemo)(()=>({reposSubmenu:q,submenuCtx:Y,overflow:N,overflowAmt:B,parentMenuRef:ed,parentDir:Z}),[q,Y,N,B,Z]),eN=$>=0?{maxHeight:$,overflow:N}:void 0,eO=(0,r.useMemo)(()=>({state:P,align:C,dir:Z}),[P,C,Z]),e_=(0,r.useMemo)(()=>({dir:Z}),[Z]),eM=(0,c.l)({block:s.nJ,element:s.fM,modifiers:e_,className:m.className}),eP=(0,i.jsxs)("ul",{role:"menu","aria-label":e,...(0,u.$7)(A),...(0,u.dG)({onPointerEnter:null==ea?void 0:ea.off,onPointerMove:e=>{e.stopPropagation(),Y.on(el,()=>{ex(s.$U.RESET),eh.current.focus()})},onPointerLeave:e=>{e.target===e.currentTarget&&Y.off()},onKeyDown:e=>{switch(e.key){case s.R8.HOME:ex(s.$U.FIRST);break;case s.R8.END:ex(s.$U.LAST);break;case s.R8.UP:ex(s.$U.DECREASE,eg);break;case s.R8.DOWN:ex(s.$U.INCREASE,eg);break;case s.R8.SPACE:e.target&&-1!==e.target.className.indexOf(s.nJ)&&e.preventDefault();return;default:return}e.preventDefault(),e.stopPropagation()},onAnimationEnd:()=>{"closing"===P&&V(),(0,u.Dx)(L)}},F),ref:(0,E.Q)(w,ed),className:(0,c.l)({block:s.nJ,modifiers:eO,className:t}),style:{...n,...eN,margin:0,display:"closed"===P?"none":void 0,position:s.vK,left:G.x,top:G.y},children:[(0,i.jsx)("li",{tabIndex:-1,style:{position:s.vK,left:0,top:0,display:"block",outline:"none"},ref:eh,...s.yo,...R}),p&&(0,i.jsx)("li",{...s.yo,...m,className:eM,style:{display:"block",position:s.vK,left:W.x,top:W.y,...m.style},ref:ep}),(0,i.jsx)(s.b7.Provider,{value:eT,children:(0,i.jsx)(s._X.Provider,{value:ek,children:(0,i.jsx)(s.c9.Provider,{value:eg,children:(0,u.Dx)(U,eO)})})})]});return j?(0,i.jsx)(l,{...j,isOpen:ey,children:eP}):eP}},5119:function(e,t,n){"use strict";n.d(t,{l:function(){return o}});var r=n(7378);let o=({block:e,element:t,modifiers:n,className:o})=>(0,r.useMemo)(()=>{let r=t?`${e}__${t}`:e,i=r;n&&Object.keys(n).forEach(e=>{let t=n[e];t&&(i+=` ${r}--${!0===t?e:`${e}-${t}`}`)});let u="function"==typeof o?o(n):o;return"string"==typeof u&&(u=u.trim())&&(i+=` ${u}`),i},[e,t,n,o])},523:function(e,t,n){"use strict";n.d(t,{e:function(){return o}});var r=n(7378);let o=(e,t)=>{let[n]=(0,r.useState)({});return{onMouseDown:()=>{n.v=e&&"closed"!==e},onClick:e=>n.v?n.v=!1:t(!0,e)}}},9600:function(e,t,n){"use strict";n.d(t,{Q:function(){return i}});var r=n(7378);function o(e,t){"function"==typeof e?e(t):e.current=t}let i=(e,t)=>(0,r.useMemo)(()=>e?t?n=>{o(e,n),o(t,n)}:e:t,[e,t])},8392:function(e,t,n){"use strict";n.d(t,{b:function(){return o}});var r=n(7378);let o="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?r.useLayoutEffect:r.useEffect},7214:function(e,t,n){"use strict";n.d(t,{V:function(){return o}});var r=n(8392);let o=(e,t,n)=>{(0,r.b)(()=>{if(e)return;let r=t.current;return n(r,!0),()=>{n(r)}},[e,t,n])}},257:function(e,t,n){"use strict";n.d(t,{Q:function(){return u}});var r=n(7378),o=n(7214),i=n(6367);let u=(e,t,n,u)=>{let{submenuCloseDelay:c}=(0,r.useContext)(i.J6),{isParentOpen:s,submenuCtx:l,dispatch:a,updateItems:f}=(0,r.useContext)(i._X),d=()=>{n||u||a(i.$U.SET,e.current)},h=()=>{u||a(i.$U.UNSET,e.current)};return(0,o.V)(u,e,f),(0,r.useEffect)(()=>{n&&s&&t.current&&t.current.focus()},[t,n,s]),{setHover:d,onBlur:e=>{n&&!e.currentTarget.contains(e.relatedTarget)&&h()},onPointerMove:e=>{u||(e.stopPropagation(),l.on(c,d,d))},onPointerLeave:(e,t)=>{l.off(),t||h()}}}},8711:function(e,t,n){"use strict";n.d(t,{F:function(){return i}});var r=n(7378),o=n(4778);let i=(e,t)=>{let n=(0,r.useRef)(t);(0,r.useEffect)(()=>{n.current!==t&&(0,o.Dx)(e,{open:t}),n.current=t},[e,t])}},8028:function(e,t,n){"use strict";n.d(t,{w:function(){return h}});var r=n(7378);let o=["preEnter","entering","entered","preExit","exiting","exited","unmounted"],i=e=>({_s:e,status:o[e],isEnter:e<3,isMounted:6!==e,isResolved:2===e||e>4}),u=e=>e?6:5,c=(e,t)=>{switch(e){case 1:case 0:return 2;case 4:case 3:return u(t)}},s=e=>"object"==typeof e?[e.enter,e.exit]:[e,e],l=(e,t,n,r,o)=>{clearTimeout(r.current);let u=i(e);t(u),n.current=u,o&&o({current:u})},a=({enter:e=!0,exit:t=!0,preEnter:n,preExit:o,timeout:a,initialEntered:f,mountOnEnter:d,unmountOnExit:h,onStateChange:p}={})=>{let[m,v]=(0,r.useState)(()=>i(f?2:u(d))),b=(0,r.useRef)(m),g=(0,r.useRef)(),[x,E]=s(a),y=(0,r.useCallback)(()=>{let e=c(b.current._s,h);e&&l(e,v,b,g,p)},[p,h]),j=(0,r.useCallback)(r=>{let i=e=>{switch(l(e,v,b,g,p),e){case 1:x>=0&&(g.current=setTimeout(y,x));break;case 4:E>=0&&(g.current=setTimeout(y,E));break;case 0:case 3:g.current=setTimeout(()=>i(e+1),0)}},c=b.current.isEnter;"boolean"!=typeof r&&(r=!c),r?c||i(e?n?0:1:2):c&&i(t?o?3:4:u(h))},[y,p,e,t,n,o,x,E,h]);return(0,r.useEffect)(()=>()=>clearTimeout(g.current),[]),[m,j,y]};var f=n(4778),d=n(6367);let h=({initialOpen:e,initialMounted:t,unmountOnClose:n,transition:r,transitionTimeout:o=500}={})=>{let[{status:i},u,c]=a({initialEntered:e,mountOnEnter:!t,unmountOnExit:n,timeout:o,enter:(0,f.us)(r,"open"),exit:(0,f.us)(r,"close")});return[{state:d._f[i],endTransition:c},u]}},7733:function(e,t,n){"use strict";n.d(t,{i:function(){return i}});var r=n(7378),o=n(8028);let i=e=>{let[t,n]=(0,o.w)(e),[i,u]=(0,r.useState)();return[{menuItemFocus:i,...t},n,(e,t)=>{u({position:e,alwaysUpdate:t}),n(!0)}]}},3134:function(e,t,n){"use strict";n.d(t,{F:function(){return o}});let r=(e,t)=>Math.round(e)===t?e:t,o=e=>{let t=e.getBoundingClientRect();return t.width=r(t.width,e.offsetWidth),t.height=r(t.height,e.offsetHeight),t}},6367:function(e,t,n){"use strict";n.d(t,{$U:function(){return y},AH:function(){return b},CM:function(){return k},GB:function(){return j},IK:function(){return l},J6:function(){return x},Kk:function(){return o},L1:function(){return g},Lz:function(){return f},R8:function(){return E},Vg:function(){return a},Zi:function(){return h},_X:function(){return m},_f:function(){return w},b7:function(){return v},c9:function(){return p},dW:function(){return C},es:function(){return u},fM:function(){return c},nJ:function(){return i},np:function(){return s},td:function(){return R},uQ:function(){return d},vK:function(){return S},yo:function(){return T}});var r=n(7378);let o="szh-menu-container",i="szh-menu",u="szh-menu-button",c="arrow",s="item",l="divider",a="header",f="group",d="submenu",h="radio-group",p=(0,r.createContext)(),m=(0,r.createContext)({}),v=(0,r.createContext)({}),b=(0,r.createContext)({}),g=(0,r.createContext)({}),x=(0,r.createContext)({}),E=Object.freeze({ENTER:"Enter",ESC:"Escape",SPACE:" ",HOME:"Home",END:"End",LEFT:"ArrowLeft",RIGHT:"ArrowRight",UP:"ArrowUp",DOWN:"ArrowDown"}),y=Object.freeze({RESET:0,SET:1,UNSET:2,INCREASE:3,DECREASE:4,FIRST:5,LAST:6,SET_INDEX:7}),j=Object.freeze({CLICK:"click",CANCEL:"cancel",BLUR:"blur",SCROLL:"scroll"}),R=Object.freeze({FIRST:"first",LAST:"last"}),w=Object.freeze({entering:"opening",entered:"open",exiting:"closing",exited:"closed"}),S="absolute",C="presentation",k="menuitem",T={"aria-hidden":!0,role:k}},4778:function(e,t,n){"use strict";n.d(t,{$7:function(){return m},Dx:function(){return s},GZ:function(){return p},MA:function(){return i},O:function(){return v},dG:function(){return d},dj:function(){return h},eO:function(){return u},oY:function(){return a},tr:function(){return o},us:function(){return c},zi:function(){return f}});var r=n(1542);let o=e=>!!e&&"o"===e[0],i=r.unstable_batchedUpdates||(e=>e());Object.values||(e=>Object.keys(e).map(t=>e[t]));let u=(e,t,n=1e-4)=>Math.abs(e-t)<n,c=(e,t)=>!0===e||!!(e&&e[t]),s=(e,t)=>"function"==typeof e?e(t):e,l="_szhsinMenu",a=e=>e[l],f=(e,t)=>Object.defineProperty(t,l,{value:e}),d=(e,t)=>(t&&Object.keys(t).forEach(n=>{let r=e[n],o=t[n];"function"==typeof o&&r?e[n]=(...e)=>{o(...e),r(...e)}:e[n]=o}),e),h=e=>{if("string"!=typeof e)return{top:0,right:0,bottom:0,left:0};let t=e.trim().split(/\s+/,4).map(parseFloat),n=isNaN(t[0])?0:t[0],r=isNaN(t[1])?n:t[1];return{top:n,right:r,bottom:isNaN(t[2])?n:t[2],left:isNaN(t[3])?r:t[3]}},p=e=>{for(;e;){if(!(e=e.parentNode)||e===document.body||!e.parentNode)return;let{overflow:t,overflowX:n,overflowY:r}=getComputedStyle(e);if(/auto|scroll|overlay|hidden/.test(t+r+n))return e}};function m(e,t){return{"aria-disabled":e||void 0,tabIndex:t?0:-1}}function v(e,t){for(let n=0;n<e.length;n++)if(e[n]===t)return n;return -1}},5587:function(e,t,n){"use strict";n.d(t,{m:function(){return u}});var r=n(7378),o=n(6367),i=n(4246);let u=(e,t)=>{let n=(0,r.memo)(t),u=(0,r.forwardRef)((e,t)=>{let u=(0,r.useRef)(null);return(0,i.jsx)(n,{...e,itemRef:u,externalRef:t,isHovering:(0,r.useContext)(o.c9)===u.current})});return u.displayName=`WithHovering(${e})`,u}},1118:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(7653)}])},984:function(e){"use strict";e.exports={reactStrictMode:!0,output:"export",basePath:"/react-menu",eslint:{dirs:["src"]}}},6691:function(e,t){"use strict";var n,r,o,i;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{ACTION_FAST_REFRESH:function(){return f},ACTION_NAVIGATE:function(){return c},ACTION_PREFETCH:function(){return a},ACTION_REFRESH:function(){return u},ACTION_RESTORE:function(){return s},ACTION_SERVER_ACTION:function(){return d},ACTION_SERVER_PATCH:function(){return l},PrefetchCacheEntryStatus:function(){return r},PrefetchKind:function(){return n},isThenable:function(){return h}});let u="refresh",c="navigate",s="restore",l="server-patch",a="prefetch",f="fast-refresh",d="server-action";function h(e){return e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then}(o=n||(n={})).AUTO="auto",o.FULL="full",o.TEMPORARY="temporary",(i=r||(r={})).fresh="fresh",i.reusable="reusable",i.expired="expired",i.stale="stale",("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4318:function(e,t,n){"use strict";function r(e,t,n,r){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return r}}),n(8364),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9577:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return E}});let r=n(8754),o=n(4246),i=r._(n(7378)),u=n(1401),c=n(2045),s=n(7420),l=n(7201),a=n(1443),f=n(9953),d=n(5320),h=n(2905),p=n(4318),m=n(953),v=n(6691),b=new Set;function g(e,t,n,r,o,i){if(i||(0,c.isLocalURL)(t)){if(!r.bypassPrefetchedCheck){let o=t+"%"+n+"%"+(void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0);if(b.has(o))return;b.add(o)}(async()=>i?e.prefetch(t,o):e.prefetch(t,n,r))().catch(e=>{})}}function x(e){return"string"==typeof e?e:(0,s.formatUrl)(e)}let E=i.default.forwardRef(function(e,t){let n,r;let{href:s,as:b,children:E,prefetch:y=null,passHref:j,replace:R,shallow:w,scroll:S,locale:C,onClick:k,onMouseEnter:T,onTouchStart:N,legacyBehavior:O=!1,..._}=e;n=E,O&&("string"==typeof n||"number"==typeof n)&&(n=(0,o.jsx)("a",{children:n}));let M=i.default.useContext(f.RouterContext),P=i.default.useContext(d.AppRouterContext),L=null!=M?M:P,A=!M,I=!1!==y,D=null===y?v.PrefetchKind.AUTO:v.PrefetchKind.FULL,{href:H,as:U}=i.default.useMemo(()=>{if(!M){let e=x(s);return{href:e,as:b?x(b):e}}let[e,t]=(0,u.resolveHref)(M,s,!0);return{href:e,as:b?(0,u.resolveHref)(M,b):t||e}},[M,s,b]),z=i.default.useRef(H),F=i.default.useRef(U);O&&(r=i.default.Children.only(n));let $=O?r&&"object"==typeof r&&r.ref:t,[B,G,K]=(0,h.useIntersection)({rootMargin:"200px"}),W=i.default.useCallback(e=>{(F.current!==U||z.current!==H)&&(K(),F.current=U,z.current=H),B(e),$&&("function"==typeof $?$(e):"object"==typeof $&&($.current=e))},[U,$,H,K,B]);i.default.useEffect(()=>{L&&G&&I&&g(L,H,U,{locale:C},{kind:D},A)},[U,H,G,C,I,null==M?void 0:M.locale,L,A,D]);let J={ref:W,onClick(e){O||"function"!=typeof k||k(e),O&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),L&&!e.defaultPrevented&&function(e,t,n,r,o,u,s,l,a){let{nodeName:f}=e.currentTarget;if("A"===f.toUpperCase()&&(function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!a&&!(0,c.isLocalURL)(n)))return;e.preventDefault();let d=()=>{let e=null==s||s;"beforePopState"in t?t[o?"replace":"push"](n,r,{shallow:u,locale:l,scroll:e}):t[o?"replace":"push"](r||n,{scroll:e})};a?i.default.startTransition(d):d()}(e,L,H,U,R,w,S,C,A)},onMouseEnter(e){O||"function"!=typeof T||T(e),O&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),L&&(I||!A)&&g(L,H,U,{locale:C,priority:!0,bypassPrefetchedCheck:!0},{kind:D},A)},onTouchStart:function(e){O||"function"!=typeof N||N(e),O&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),L&&(I||!A)&&g(L,H,U,{locale:C,priority:!0,bypassPrefetchedCheck:!0},{kind:D},A)}};if((0,l.isAbsoluteUrl)(U))J.href=U;else if(!O||j||"a"===r.type&&!("href"in r.props)){let e=void 0!==C?C:null==M?void 0:M.locale,t=(null==M?void 0:M.isLocaleDomain)&&(0,p.getDomainLocale)(U,e,null==M?void 0:M.locales,null==M?void 0:M.domainLocales);J.href=t||(0,m.addBasePath)((0,a.addLocale)(U,e,null==M?void 0:M.defaultLocale))}return O?i.default.cloneElement(r,J):(0,o.jsx)("a",{..._,...J,children:n})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2905:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return s}});let r=n(7378),o=n(3815),i="function"==typeof IntersectionObserver,u=new Map,c=[];function s(e){let{rootRef:t,rootMargin:n,disabled:s}=e,l=s||!i,[a,f]=(0,r.useState)(!1),d=(0,r.useRef)(null),h=(0,r.useCallback)(e=>{d.current=e},[]);return(0,r.useEffect)(()=>{if(i){if(l||a)return;let e=d.current;if(e&&e.tagName)return function(e,t,n){let{id:r,observer:o,elements:i}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=c.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=u.get(r)))return t;let o=new Map;return t={id:n,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e),elements:o},c.push(n),u.set(n,t),t}(n);return i.set(e,t),o.observe(e),function(){if(i.delete(e),o.unobserve(e),0===i.size){o.disconnect(),u.delete(r);let e=c.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&c.splice(e,1)}}}(e,e=>e&&f(e),{root:null==t?void 0:t.current,rootMargin:n})}else if(!a){let e=(0,o.requestIdleCallback)(()=>f(!0));return()=>(0,o.cancelIdleCallback)(e)}},[l,n,t,a,d.current]),[h,a,(0,r.useCallback)(()=>{f(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3525:function(e,t,n){"use strict";n.d(t,{T:function(){return f}});var r=n(4246),o=n(7378),i=n(979),u=n(4666),c=n(3542),s=n(4457),l=n(395),a=n(142);let f=o.memo(function(){let e=(0,r.jsxs)("div",{className:"app-logo",children:["React-Menu",(0,r.jsxs)("div",{className:"version",children:["v",a.i8]}),(0,r.jsx)("i",{className:"material-icons drop-down",children:"arrow_drop_down"})]});return(0,r.jsxs)(i.v,{initialMounted:!0,menuButton:e,gap:10,theming:(0,l.Fg)().theme,className:"version-menu",children:[(0,r.jsx)(u.t,{children:"Version history"}),(0,r.jsx)(c.s,{href:"https://szhsin.github.io/react-menu-v3",children:"v3.5.x"}),(0,r.jsx)(c.s,{href:"https://szhsin.github.io/react-menu-v2",children:"v2.3.x"}),(0,r.jsx)(c.s,{href:"https://szhsin.github.io/react-menu-v1",children:"v1.11.x"}),(0,r.jsx)(s.R,{}),(0,r.jsx)(u.t,{children:"Migration guide"}),(0,r.jsx)(c.s,{href:"https://github.com/szhsin/react-menu/blob/master/docs/migration/v4.md",children:"migrating to v4"}),(0,r.jsx)(c.s,{href:"https://github.com/szhsin/react-menu/blob/master/docs/migration/v3.md",children:"migrating to v3"}),(0,r.jsx)(c.s,{href:"https://github.com/szhsin/react-menu/blob/master/docs/migration/v2.md",children:"migrating to v2"})]})})},8197:function(e,t,n){"use strict";n.d(t,{R:function(){return c}});var r=n(4246),o=n(7378),i=n(395),u=n(142);let c=o.memo(function(){let{isDark:e,theme:t}=(0,i.Fg)();return(0,r.jsx)("input",{className:(0,u.PH)("theme-switch",null,{theme:t}),type:"checkbox",onChange:e=>i.XG.set(e.target.checked?"dark":"light"),checked:e})})},7653:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return j}});var r=n(4246);n(8258),n(389),n(8283),n(7798);var o=n(9008),i=n.n(o),u=n(7378),c=n(6303),s=n(1163),l=n(142),a=n(395),f=n(1664),d=n.n(f),h=n(984),p=n(3525);function m(e){let{onClose:t}=e,n=(0,a.Nm)().vWidth>700;return(0,r.jsxs)("div",{className:"header-banner",role:"alert",children:[n&&(0,r.jsxs)("span",{className:"banner-text",children:["This website is for React-Menu v",l.i8]}),(0,r.jsx)("a",{href:"https://szhsin.github.io/react-menu/",children:n?"You can find the latest version here.":"Visit the latest version"}),(0,r.jsx)("i",{className:"close-btn material-icons",onClick:t,children:"close"})]})}var v=n(8197);let b="navbar",g=u.memo(function(){let{theme:e,isDark:t}=(0,a.Fg)(),n=(0,c.R)(a.ww);return(0,r.jsxs)("header",{id:"header",children:[n&&(0,r.jsx)(m,{onClose:()=>a.ww.set(!1)}),(0,r.jsxs)("nav",{className:(0,l.PH)(b,null,{theme:e}),"aria-label":"Site",children:[(0,r.jsx)("button",{className:(0,l.PH)(b,"toggle"),"aria-label":"Open table of contents",onClick:()=>a.B1.set(!0),children:(0,r.jsx)("i",{className:"material-icons",children:"menu"})}),(0,r.jsx)(p.T,{}),(0,r.jsxs)("ul",{className:(0,l.PH)(b,"link-list"),children:[(0,r.jsx)(x,{href:"/",children:"Home"}),(0,r.jsx)(x,{href:"/docs",children:"Docs"}),(0,r.jsx)(x,{href:"/style-guide",children:"Styling"})]}),(0,r.jsx)(v.R,{}),(0,r.jsx)("a",{className:(0,l.PH)(b,"github"),title:"GitHub",href:"https://github.com/szhsin/react-menu",target:"_blank",rel:"noopener noreferrer",children:(0,r.jsx)("img",{src:"".concat(h.basePath,"/GitHub-Mark-").concat(t?"Light-":"","64px.png"),alt:"GitHub"})})]})]})});function x(e){let{href:t,children:n}=e,{pathname:o}=(0,s.useRouter)();return(0,r.jsx)("li",{className:(0,l.PH)(b,"link"),children:(0,r.jsx)(d(),{href:t,...t===o?{"aria-current":"page",className:"active"}:void 0,children:n})})}let E=u.memo(function(){let{isDark:e}=(0,a.Fg)(),[t,n]=(0,u.useState)("-");return(0,u.useEffect)(()=>{fetch("https://api.github.com/repos/szhsin/react-menu").then(e=>e.json()).then(e=>{let{stargazers_count:t}=e;return n(t.toLocaleString("en-US"))}).catch(e=>console.error(e))},[]),(0,r.jsxs)("footer",{id:"footer",children:[(0,r.jsxs)("div",{className:"github",children:[(0,r.jsxs)("a",{className:"github-btn left",title:"GitHub",href:"https://github.com/szhsin/react-menu",target:"_blank",rel:"noopener noreferrer",children:[(0,r.jsx)("img",{className:"github-img",src:"".concat(h.basePath,"/GitHub-Mark-").concat(e?"Light-":"","32px.png"),alt:"GitHub"}),"Star"]}),(0,r.jsx)("a",{className:"github-btn right",title:"Stargazers",href:"https://github.com/szhsin/react-menu/stargazers",target:"_blank",rel:"noopener noreferrer",children:t})]}),(0,r.jsx)("p",{children:"Released under the MIT License."}),(0,r.jsxs)("p",{children:["Copyright \xa9 ",new Date().getFullYear()," Zheng Song."]}),(0,r.jsxs)("p",{className:"build",children:[l.i8,"+",l.J_]})]})});var y=e=>{let{children:t}=e,n=(0,c.R)(a.ww),o=(0,c.R)(a.toastState);(0,l.bt)(()=>{(0,a.ZB)()},[]),(0,u.useEffect)(()=>{let e=()=>{let e={vWidth:document.documentElement.clientWidth,vHeight:window.innerHeight,navbarHeight:document.querySelector("#header").offsetHeight};e.vWidth>950&&a.B1.set(!1),a.Ff.set(e)};return e(),window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[n]),(0,u.useEffect)(()=>{if(!o)return;let e=setTimeout(()=>a.toastState.set(null),2500);return()=>clearTimeout(e)},[o]);let i=(0,s.useRouter)();return(0,u.useEffect)(()=>{a.B1.set(!1)},[i]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(g,{}),(0,r.jsx)("div",{id:"content",style:n?{marginTop:40}:void 0,children:t}),(0,r.jsx)(E,{}),o&&(0,r.jsx)("div",{className:(0,l.PH)("szh-app","toast"),role:"alert",children:o})]})},j=function(e){let{Component:t,pageProps:n}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(i(),{children:[(0,r.jsx)("title",{children:"React menu library - szhsin/react-menu"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"})]}),(0,r.jsx)(y,{children:(0,r.jsx)(t,{...n})})]})}},395:function(e,t,n){"use strict";n.d(t,{Ff:function(){return l},ZB:function(){return h},B1:function(){return c},ww:function(){return u},XG:function(){return f},toastState:function(){return s},Nm:function(){return a},Fg:function(){return d}});let r=(({middleware:e}={})=>(t,n,r)=>{let o=t,i=new Set,u=()=>o,c=e=>{let t="function"==typeof e?e(o):e;Object.is(o,t)||(o=t,i.forEach(e=>e()))},s=e=>(i.add(e),()=>i.delete(e));return e&&(c=e({set:c,get:u,subscribe:s},r)),{get:u,set:c,subscribe:s,actions:n&&n(c,u)}})();var o=n(6303),i=n(142);let u=r(!1),c=r(!1),s=r(null),l=r({}),a=()=>(0,o.R)(l),f=r("dark"),d=()=>{let e=(0,o.R)(f);return{isDark:"dark"===e,theme:e}};f.subscribe(()=>{let e=f.get();document.body.className=(0,i.PH)("szh-app",null,{theme:e});try{localStorage.setItem("theme",e)}catch{}});let h=()=>{try{let e=localStorage.getItem("theme");"light"===e&&f.set(e)}catch{}}},142:function(e,t,n){"use strict";n.d(t,{J_:function(){return c},PH:function(){return s},_5:function(){return l},bt:function(){return a},i8:function(){return u}});var r=n(4246),o=n(7378),i=n(395);let u="4.2.0",c="135",s=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=t?"".concat(e,"__").concat(t):e,o=r;for(let e of Object.keys(n)){let t=n[e];t&&(o+=" ".concat(r,"--")+(!0===t?e:"".concat(e,"-").concat(t)))}return o},l=e=>t=>(0,r.jsx)(e,{transition:!0,theming:(0,i.Fg)().theme,...t}),a=void 0!==window.document&&void 0!==window.document.createElement?o.useLayoutEffect:o.useEffect},8258:function(){},389:function(){},8283:function(){},7798:function(){},9008:function(e,t,n){e.exports=n(7828)},1664:function(e,t,n){e.exports=n(9577)},1163:function(e,t,n){e.exports=n(9090)},6303:function(e,t,n){"use strict";n.d(t,{R:function(){return o}});var r=n(1688);let o=({subscribe:e,get:t})=>(0,r.useSyncExternalStore)(e,t,t)},3250:function(e,t,n){"use strict";/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(7378),o="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},i=r.useState,u=r.useEffect,c=r.useLayoutEffect,s=r.useDebugValue;function l(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!o(e,n)}catch(e){return!0}}var a="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var n=t(),r=i({inst:{value:n,getSnapshot:t}}),o=r[0].inst,a=r[1];return c(function(){o.value=n,o.getSnapshot=t,l(o)&&a({inst:o})},[e,n,t]),u(function(){return l(o)&&a({inst:o}),e(function(){l(o)&&a({inst:o})})},[e]),s(n),n};t.useSyncExternalStore=void 0!==r.useSyncExternalStore?r.useSyncExternalStore:a},1688:function(e,t,n){"use strict";e.exports=n(3250)}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return t(1118),t(9090)}),_N_E=e.O()}]);