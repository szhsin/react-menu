(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{2429:function(e,t,n){"use strict";n.d(t,{B:function(){return s}});var r=n(7378),o=n(1542),i=n(733),u=n(4246),c=n(4778),a=n(6367);let s=(0,r.forwardRef)(function({"aria-label":e,className:t,containerProps:n,initialMounted:s,unmountOnClose:l,transition:f,transitionTimeout:d,boundingBoxRef:h,boundingBoxPadding:m,reposition:p="auto",submenuOpenDelay:v=300,submenuCloseDelay:b=150,viewScroll:g="initial",portal:x,theming:E,onItemClick:y,...j},R){let w=(0,r.useRef)(null),k=(0,r.useRef)({}),{anchorRef:C,state:S,onClose:_}=j,N=(0,r.useMemo)(()=>({initialMounted:s,unmountOnClose:l,transition:f,transitionTimeout:d,boundingBoxRef:h,boundingBoxPadding:m,rootMenuRef:w,rootAnchorRef:C,scrollNodesRef:k,reposition:p,viewScroll:g,submenuOpenDelay:v,submenuCloseDelay:b}),[s,l,f,d,C,h,m,p,g,v,b]),O=(0,r.useMemo)(()=>({handleClick(e,t){e.stopPropagation||(0,c.Dx)(y,e);let n=e.keepOpen;void 0===n&&(n=t&&e.key===a.R8.SPACE),n||(0,c.Dx)(_,{value:e.value,key:e.key,reason:a.GB.CLICK})},handleClose(e){(0,c.Dx)(_,{key:e,reason:a.GB.CLICK})}}),[y,_]);if(!S)return null;let T=(0,u.jsx)(a.J6.Provider,{value:N,children:(0,u.jsx)(a.AH.Provider,{value:O,children:(0,u.jsx)(i.q,{...j,ariaLabel:e||"Menu",externalRef:R,containerRef:w,containerProps:{className:t,containerRef:w,containerProps:n,theming:E,transition:f,onClose:_}})})});return!0===x&&"undefined"!=typeof document?(0,o.createPortal)(T,document.body):x?x.target?(0,o.createPortal)(T,x.target):x.stablePosition?null:T:T})},979:function(e,t,n){"use strict";n.d(t,{v:function(){return d}});var r=n(7378),o=n(2429),i=n(4246),u=n(7733),c=n(523),a=n(9600),s=n(4778),l=n(8711),f=n(6367);let d=(0,r.forwardRef)(function({"aria-label":e,captureFocus:t,initialOpen:n,menuButton:d,instanceRef:h,onMenuChange:m,...p},v){let[b,g,x]=(0,u.i)(p),{state:E}=b,y=(0,s.tr)(E),j=(0,r.useRef)(null),R=(0,c.e)(E,(e,t)=>x(t.detail?void 0:f.td.FIRST)),w=(0,r.useCallback)(e=>{g(!1),e.key&&j.current.focus()},[g]),k=(0,s.Dx)(d,{open:y});if(!k||!k.type)throw Error("Menu requires a menuButton prop.");let C={ref:(0,a.Q)(k.ref,j),...(0,s.dG)({onKeyDown:e=>{switch(e.key){case f.R8.UP:x(f.td.LAST);break;case f.R8.DOWN:x(f.td.FIRST);break;default:return}e.preventDefault()},...R},k.props)};"MenuButton"===(0,s.oY)(k.type)&&(C.isOpen=y);let S=(0,r.cloneElement)(k,C);return(0,l.F)(m,y),(0,r.useImperativeHandle)(h,()=>({openMenu:x,closeMenu:()=>g(!1)})),(0,i.jsxs)(r.Fragment,{children:[S,(0,i.jsx)(o.B,{...p,...b,"aria-label":e||("string"==typeof k.props.children?k.props.children:"Menu"),anchorRef:j,ref:v,onClose:w})]})})},4457:function(e,t,n){"use strict";n.d(t,{R:function(){return c}});var r=n(7378),o=n(4246),i=n(5119),u=n(6367);let c=(0,r.memo)((0,r.forwardRef)(function({className:e,...t},n){return(0,o.jsx)("li",{role:"separator",...t,ref:n,className:(0,i.l)({block:u.nJ,element:u.IK,className:e})})}))},4666:function(e,t,n){"use strict";n.d(t,{t:function(){return c}});var r=n(7378),o=n(4246),i=n(5119),u=n(6367);let c=(0,r.memo)((0,r.forwardRef)(function({className:e,...t},n){return(0,o.jsx)("li",{role:u.dW,...t,ref:n,className:(0,i.l)({block:u.nJ,element:u.Vg,className:e})})}))},3542:function(e,t,n){"use strict";n.d(t,{s:function(){return f}});var r=n(7378),o=n(4246),i=n(257),u=n(6367),c=n(9600),a=n(5119),s=n(5587),l=n(4778);let f=(0,s.m)("MenuItem",function({className:e,value:t,href:n,type:s,checked:f,disabled:d,children:h,onClick:m,isHovering:p,itemRef:v,externalRef:b,...g}){let x=!!d,{setHover:E,...y}=(0,i.Q)(v,v,p,x),j=(0,r.useContext)(u.AH),R=(0,r.useContext)(u.L1),w="radio"===s,k="checkbox"===s,C=!!n&&!x&&!w&&!k,S=w?R.value===t:!!k&&!!f,_=e=>{if(x){e.stopPropagation(),e.preventDefault();return}let n={value:t,syntheticEvent:e};void 0!==e.key&&(n.key=e.key),k&&(n.checked=!S),w&&(n.name=R.name),(0,l.Dx)(m,n),w&&(0,l.Dx)(R.onRadioChange,n),j.handleClick(n,k||w)},N=(0,r.useMemo)(()=>({type:s,disabled:x,hover:p,checked:S,anchor:C}),[s,x,p,S,C]),O=(0,l.dG)({...y,onPointerDown:E,onKeyDown:e=>{if(p)switch(e.key){case u.R8.ENTER:e.preventDefault();case u.R8.SPACE:C?v.current.click():_(e)}},onClick:_},g),T={role:w?"menuitemradio":k?"menuitemcheckbox":u.CM,"aria-checked":w||k?S:void 0,...(0,l.$7)(x,p),...O,ref:(0,c.Q)(b,v),className:(0,a.l)({block:u.nJ,element:u.np,modifiers:N,className:e}),children:(0,r.useMemo)(()=>(0,l.Dx)(h,N),[h,N])};return C?(0,o.jsx)("li",{role:u.dW,children:(0,o.jsx)("a",{href:n,...T})}):(0,o.jsx)("li",{...T})})},733:function(e,t,n){"use strict";n.d(t,{q:function(){return E}});var r=n(7378),o=n(1542),i=n(4246),u=n(4778),c=n(5119),a=n(6367);let s=({className:e,containerRef:t,containerProps:n,children:o,isOpen:s,theming:l,transition:f,onClose:d})=>{let h=(0,u.us)(f,"item");return(0,i.jsx)("div",{...(0,u.dG)({onKeyDown:({key:e})=>{e===a.R8.ESC&&(0,u.Dx)(d,{key:e,reason:a.GB.CANCEL})},onBlur:e=>{s&&!e.currentTarget.contains(e.relatedTarget)&&(0,u.Dx)(d,{reason:a.GB.BLUR})}},n),className:(0,c.l)({block:a.Kk,modifiers:(0,r.useMemo)(()=>({theme:l,itemTransition:h}),[l,h]),className:e}),style:{position:"absolute",...null==n?void 0:n.style},ref:t,children:o})},l=()=>{let e,t=0;return{toggle:e=>{e?t++:t--,t=Math.max(t,0)},on:(n,r,o)=>{t?e||(e=setTimeout(()=>{e=0,r()},n)):null==o||o()},off:()=>{e&&(clearTimeout(e),e=0)}}},f=(e,t)=>{let[n,o]=(0,r.useState)(),i=(0,r.useRef)({items:[],hoverIndex:-1,sorted:!1}),c=i.current,s=(0,r.useCallback)((e,n)=>{let{items:r}=c;if(e){if(n)r.push(e);else{let n=r.indexOf(e);n>-1&&(r.splice(n,1),e.contains(document.activeElement)&&(t.current.focus(),o()))}}else c.items=[];c.hoverIndex=-1,c.sorted=!1},[c,t]),l=(0,r.useCallback)((t,n,r)=>{let{items:i,hoverIndex:s}=c,l=()=>{if(c.sorted)return;let t=e.current.querySelectorAll(".szh-menu__item");i.sort((e,n)=>(0,u.O)(t,e)-(0,u.O)(t,n)),c.sorted=!0},f=-1,d;switch(t){case a.$U.RESET:break;case a.$U.SET:d=n;break;case a.$U.UNSET:d=e=>e===n?void 0:e;break;case a.$U.FIRST:l(),d=i[f=0];break;case a.$U.LAST:l(),f=i.length-1,d=i[f];break;case a.$U.SET_INDEX:l(),d=i[f=r];break;case a.$U.INCREASE:l(),(f=s)<0&&(f=i.indexOf(n)),++f>=i.length&&(f=0),d=i[f];break;case a.$U.DECREASE:l(),(f=s)<0&&(f=i.indexOf(n)),--f<0&&(f=i.length-1),d=i[f]}d||(f=-1),o(d),c.hoverIndex=f},[e,c]);return{hoverItem:n,dispatch:l,updateItems:s}},d=(e,t,n,r)=>{let o=t.current.getBoundingClientRect(),i=e.current.getBoundingClientRect(),c=n===window?{left:0,top:0,right:document.documentElement.clientWidth,bottom:window.innerHeight}:n.getBoundingClientRect(),a=(0,u.dj)(r),s=e=>e+i.left-c.left-a.left,l=e=>e+i.left+o.width-c.right+a.right,f=e=>e+i.top-c.top-a.top,d=e=>e+i.top+o.height-c.bottom+a.bottom;return{menuRect:o,containerRect:i,getLeftOverflow:s,getRightOverflow:l,getTopOverflow:f,getBottomOverflow:d,confineHorizontally:e=>{let t=s(e);if(t<0)e-=t;else{let n=l(e);n>0&&(e-=n,(t=s(e))<0&&(e-=t))}return e},confineVertically:e=>{let t=f(e);if(t<0)e-=t;else{let n=d(e);n>0&&(e-=n,(t=f(e))<0&&(e-=t))}return e}}},h=({arrowRef:e,menuY:t,anchorRect:n,containerRect:r,menuRect:o})=>{let i=n.top-r.top-t+n.height/2,u=1.25*e.current.offsetHeight;return Math.min(i=Math.max(u,i),o.height-u)},m=({anchorRect:e,containerRect:t,menuRect:n,placeLeftorRightY:r,placeLeftX:o,placeRightX:i,getLeftOverflow:u,getRightOverflow:c,confineHorizontally:a,confineVertically:s,arrowRef:l,arrow:f,direction:d,position:m})=>{let p,v,b,g=d,x=r;"initial"!==m&&(x=s(x),"anchor"===m&&(x=Math.max(x=Math.min(x,e.bottom-t.top),e.top-t.top-n.height))),"left"===g?(p=o,"initial"!==m&&(v=u(p))<0&&((b=c(i))<=0||-v>b)&&(p=i,g="right")):(p=i,"initial"!==m&&(b=c(p))>0&&((v=u(o))>=0||-v<b)&&(p=o,g="left")),"auto"===m&&(p=a(p));let E=f?h({menuY:x,arrowRef:l,anchorRect:e,containerRect:t,menuRect:n}):void 0;return{arrowY:E,x:p,y:x,computedDirection:g}},p=({arrowRef:e,menuX:t,anchorRect:n,containerRect:r,menuRect:o})=>{let i=n.left-r.left-t+n.width/2,u=1.25*e.current.offsetWidth;return Math.min(i=Math.max(u,i),o.width-u)},v=({anchorRect:e,containerRect:t,menuRect:n,placeToporBottomX:r,placeTopY:o,placeBottomY:i,getTopOverflow:u,getBottomOverflow:c,confineHorizontally:a,confineVertically:s,arrowRef:l,arrow:f,direction:d,position:h})=>{let m,v,b,g="top"===d?"top":"bottom",x=r;"initial"!==h&&(x=a(x),"anchor"===h&&(x=Math.max(x=Math.min(x,e.right-t.left),e.left-t.left-n.width))),"top"===g?(m=o,"initial"!==h&&(v=u(m))<0&&((b=c(i))<=0||-v>b)&&(m=i,g="bottom")):(m=i,"initial"!==h&&(b=c(m))>0&&((v=u(o))>=0||-v<b)&&(m=o,g="top")),"auto"===h&&(m=s(m));let E=f?p({menuX:x,arrowRef:l,anchorRect:e,containerRect:t,menuRect:n}):void 0;return{arrowX:E,x,y:m,computedDirection:g}},b=({arrow:e,align:t,direction:n,gap:r,shift:o,position:i,anchorRect:u,arrowRef:c,positionHelpers:a})=>{let s,l;let{menuRect:f,containerRect:d}=a,h="left"===n||"right"===n,p=h?r:o,b=h?o:r;if(e){let e=c.current;h?p+=e.offsetWidth:b+=e.offsetHeight}let g=u.left-d.left-f.width-p,x=u.right-d.left+p,E=u.top-d.top-f.height-b,y=u.bottom-d.top+b;"end"===t?(s=u.right-d.left-f.width,l=u.bottom-d.top-f.height):"center"===t?(s=u.left-d.left-(f.width-u.width)/2,l=u.top-d.top-(f.height-u.height)/2):(s=u.left-d.left,l=u.top-d.top),s+=p,l+=b;let j={...a,anchorRect:u,placeLeftX:g,placeRightX:x,placeLeftorRightY:l,placeTopY:E,placeBottomY:y,placeToporBottomX:s,arrowRef:c,arrow:e,direction:n,position:i};switch(n){case"left":case"right":return m(j);default:return v(j)}};var g=n(8392),x=n(9600);let E=({ariaLabel:e,menuClassName:t,menuStyle:n,arrow:h,arrowProps:m={},anchorPoint:p,anchorRef:v,containerRef:E,containerProps:y,focusProps:j,externalRef:R,parentScrollingRef:w,align:k="start",direction:C="bottom",position:S="auto",overflow:_="visible",setDownOverflow:N,repositionFlag:O,captureFocus:T=!0,state:M,endTransition:P,isDisabled:L,menuItemFocus:A,gap:D=0,shift:I=0,children:H,onClose:U,...z})=>{let F,$;let[B,G]=(0,r.useState)({x:-9999,y:-9999}),[K,J]=(0,r.useState)({}),[W,V]=(0,r.useState)(),[X,Z]=(0,r.useState)(C),[Q]=(0,r.useState)(l),[q,Y]=(0,r.useReducer)(e=>e+1,1),{transition:ee,boundingBoxRef:et,boundingBoxPadding:en,rootMenuRef:er,rootAnchorRef:eo,scrollNodesRef:ei,reposition:eu,viewScroll:ec,submenuCloseDelay:ea}=(0,r.useContext)(a.J6),{submenuCtx:es,reposSubmenu:el=O}=(0,r.useContext)(a.b7),ef=(0,r.useRef)(null),ed=(0,r.useRef)(),eh=(0,r.useRef)(),em=(0,r.useRef)(!1),ep=(0,r.useRef)({width:0,height:0}),ev=(0,r.useRef)(()=>{}),{hoverItem:eb,dispatch:eg,updateItems:ex}=f(ef,ed),eE=(0,u.tr)(M),ey=(0,u.us)(ee,"open"),ej=(0,u.us)(ee,"close"),eR=ei.current,ew=(0,r.useCallback)(e=>{var t;let n=v?null==(t=v.current)?void 0:t.getBoundingClientRect():p?{left:p.x,right:p.x,top:p.y,bottom:p.y,width:0,height:0}:null;if(!n)return;eR.menu||(eR.menu=(et?et.current:(0,u.GZ)(er.current))||window);let r=d(E,ef,eR.menu,en),{arrowX:o,arrowY:i,x:c,y:a,computedDirection:s}=b({arrow:h,align:k,direction:C,gap:D,shift:I,position:S,anchorRect:n,arrowRef:eh,positionHelpers:r}),{menuRect:l}=r,f=l.height;if(!e&&"visible"!==_){let e,t;let{getTopOverflow:n,getBottomOverflow:o}=r,i=ep.current.height,c=o(a);if(c>0||(0,u.eO)(c,0)&&(0,u.eO)(f,i))e=f-c,t=c;else{let r=n(a);(r<0||(0,u.eO)(r,0)&&(0,u.eO)(f,i))&&(e=f+r,t=0-r,e>=0&&(a-=r))}e>=0?(f=e,V({height:e,overflowAmt:t})):V()}h&&J({x:o,y:i}),G({x:c,y:a}),Z(s),ep.current={width:l.width,height:f}},[h,k,en,C,D,I,S,_,p,v,E,et,er,eR]);(0,g.b)(()=>{eE&&(ew(),em.current&&Y()),em.current=eE,ev.current=ew},[eE,ew,el]),(0,g.b)(()=>{W&&!N&&(ef.current.scrollTop=0)},[W,N]),(0,g.b)(()=>ex,[ex]),(0,r.useEffect)(()=>{let{menu:e}=eR;if(!eE||!e)return;if(e=e.addEventListener?e:window,!eR.anchors){eR.anchors=[];let t=(0,u.GZ)(eo&&eo.current);for(;t&&t!==e;)eR.anchors.push(t),t=(0,u.GZ)(t)}let t=ec;if(eR.anchors.length&&"initial"===t&&(t="auto"),"initial"===t)return;let n=()=>{"auto"===t?(0,u.MA)(()=>ew(!0)):(0,u.Dx)(U,{reason:a.GB.SCROLL})},r=eR.anchors.concat("initial"!==ec?e:[]);return r.forEach(e=>e.addEventListener("scroll",n)),()=>r.forEach(e=>e.removeEventListener("scroll",n))},[eo,eR,eE,U,ec,ew]);let ek=!!W&&W.overflowAmt>0;(0,r.useEffect)(()=>{if(ek||!eE||!w)return;let e=()=>(0,u.MA)(ew),t=w.current;return t.addEventListener("scroll",e),()=>t.removeEventListener("scroll",e)},[eE,ek,w,ew]),(0,r.useEffect)(()=>{if("function"!=typeof ResizeObserver||"initial"===eu)return;let e=new ResizeObserver(([e])=>{let t,n;let{borderBoxSize:r,target:i}=e;if(r){let{inlineSize:e,blockSize:o}=r[0]||r;t=e,n=o}else{let e=i.getBoundingClientRect();t=e.width,n=e.height}0!==t&&0!==n&&((0,u.eO)(t,ep.current.width,1)&&(0,u.eO)(n,ep.current.height,1)||(0,o.flushSync)(()=>{ev.current(),Y()}))}),t=ef.current;return e.observe(t,{box:"border-box"}),()=>e.unobserve(t)},[eu]),(0,r.useEffect)(()=>{if(!eE){eg(a.$U.RESET),ej||V();return}let{position:e,alwaysUpdate:t}=A||{},n=()=>{e===a.td.FIRST?eg(a.$U.FIRST):e===a.td.LAST?eg(a.$U.LAST):e>=-1&&eg(a.$U.SET_INDEX,void 0,e)};if(t)n();else if(T){let e=setTimeout(()=>{ef.current.contains(document.activeElement)||(ed.current.focus(),n())},ey?170:100);return()=>clearTimeout(e)}},[eE,ey,ej,T,A,eg]);let eC=(0,r.useMemo)(()=>({isParentOpen:eE,submenuCtx:Q,dispatch:eg,updateItems:ex}),[eE,Q,eg,ex]);W&&(N?$=W.overflowAmt:F=W.height);let eS=(0,r.useMemo)(()=>({reposSubmenu:q,submenuCtx:Q,overflow:_,overflowAmt:$,parentMenuRef:ef,parentDir:X}),[q,Q,_,$,X]),e_=F>=0?{maxHeight:F,overflow:_}:void 0,eN=(0,r.useMemo)(()=>({state:M,dir:X}),[M,X]),eO=(0,r.useMemo)(()=>({dir:X}),[X]),eT=(0,c.l)({block:a.nJ,element:a.fM,modifiers:eO,className:m.className}),eM=(0,i.jsxs)("ul",{role:"menu","aria-label":e,...(0,u.$7)(L),...(0,u.dG)({onPointerEnter:null==es?void 0:es.off,onPointerMove:e=>{e.stopPropagation(),Q.on(ea,()=>{eg(a.$U.RESET),ed.current.focus()})},onPointerLeave:e=>{e.target===e.currentTarget&&Q.off()},onKeyDown:e=>{switch(e.key){case a.R8.HOME:eg(a.$U.FIRST);break;case a.R8.END:eg(a.$U.LAST);break;case a.R8.UP:eg(a.$U.DECREASE,eb);break;case a.R8.DOWN:eg(a.$U.INCREASE,eb);break;case a.R8.SPACE:e.target&&-1!==e.target.className.indexOf(a.nJ)&&e.preventDefault();return;default:return}e.preventDefault(),e.stopPropagation()},onAnimationEnd:()=>{"closing"===M&&V(),(0,u.Dx)(P)}},z),ref:(0,x.Q)(R,ef),className:(0,c.l)({block:a.nJ,modifiers:eN,className:t}),style:{...n,...e_,margin:0,display:"closed"===M?"none":void 0,position:a.vK,left:B.x,top:B.y},children:[(0,i.jsx)("li",{tabIndex:-1,style:{position:a.vK,left:0,top:0,display:"block",outline:"none"},ref:ed,...a.yo,...j}),h&&(0,i.jsx)("li",{...a.yo,...m,className:eT,style:{display:"block",position:a.vK,left:K.x,top:K.y,...m.style},ref:eh}),(0,i.jsx)(a.b7.Provider,{value:eS,children:(0,i.jsx)(a._X.Provider,{value:eC,children:(0,i.jsx)(a.c9.Provider,{value:eb,children:(0,u.Dx)(H,eN)})})})]});return y?(0,i.jsx)(s,{...y,isOpen:eE,children:eM}):eM}},5119:function(e,t,n){"use strict";n.d(t,{l:function(){return o}});var r=n(7378);let o=({block:e,element:t,modifiers:n,className:o})=>(0,r.useMemo)(()=>{let r=t?`${e}__${t}`:e,i=r;n&&Object.keys(n).forEach(e=>{let t=n[e];t&&(i+=` ${r}--${!0===t?e:`${e}-${t}`}`)});let u="function"==typeof o?o(n):o;return"string"==typeof u&&(u=u.trim())&&(i+=` ${u}`),i},[e,t,n,o])},523:function(e,t,n){"use strict";n.d(t,{e:function(){return o}});var r=n(7378);let o=(e,t)=>{let[n]=(0,r.useState)({});return{onMouseDown:()=>{n.v=e&&"closed"!==e},onClick:e=>n.v?n.v=!1:t(!0,e)}}},9600:function(e,t,n){"use strict";n.d(t,{Q:function(){return i}});var r=n(7378);function o(e,t){"function"==typeof e?e(t):e.current=t}let i=(e,t)=>(0,r.useMemo)(()=>e?t?n=>{o(e,n),o(t,n)}:e:t,[e,t])},8392:function(e,t,n){"use strict";n.d(t,{b:function(){return o}});var r=n(7378);let o="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?r.useLayoutEffect:r.useEffect},7214:function(e,t,n){"use strict";n.d(t,{V:function(){return o}});var r=n(8392);let o=(e,t,n)=>{(0,r.b)(()=>{if(e)return;let r=t.current;return n(r,!0),()=>{n(r)}},[e,t,n])}},257:function(e,t,n){"use strict";n.d(t,{Q:function(){return u}});var r=n(7378),o=n(7214),i=n(6367);let u=(e,t,n,u)=>{let{submenuCloseDelay:c}=(0,r.useContext)(i.J6),{isParentOpen:a,submenuCtx:s,dispatch:l,updateItems:f}=(0,r.useContext)(i._X),d=()=>{n||u||l(i.$U.SET,e.current)},h=()=>{u||l(i.$U.UNSET,e.current)};return(0,o.V)(u,e,f),(0,r.useEffect)(()=>{n&&a&&t.current&&t.current.focus()},[t,n,a]),{setHover:d,onBlur:e=>{n&&!e.currentTarget.contains(e.relatedTarget)&&h()},onPointerMove:e=>{u||(e.stopPropagation(),s.on(c,d,d))},onPointerLeave:(e,t)=>{s.off(),t||h()}}}},8711:function(e,t,n){"use strict";n.d(t,{F:function(){return i}});var r=n(7378),o=n(4778);let i=(e,t)=>{let n=(0,r.useRef)(t);(0,r.useEffect)(()=>{n.current!==t&&(0,o.Dx)(e,{open:t}),n.current=t},[e,t])}},8028:function(e,t,n){"use strict";n.d(t,{w:function(){return h}});var r=n(7378);let o=["preEnter","entering","entered","preExit","exiting","exited","unmounted"],i=e=>({_s:e,status:o[e],isEnter:e<3,isMounted:6!==e,isResolved:2===e||e>4}),u=e=>e?6:5,c=(e,t)=>{switch(e){case 1:case 0:return 2;case 4:case 3:return u(t)}},a=e=>"object"==typeof e?[e.enter,e.exit]:[e,e],s=(e,t,n,r,o)=>{clearTimeout(r.current);let u=i(e);t(u),n.current=u,o&&o({current:u})},l=({enter:e=!0,exit:t=!0,preEnter:n,preExit:o,timeout:l,initialEntered:f,mountOnEnter:d,unmountOnExit:h,onStateChange:m}={})=>{let[p,v]=(0,r.useState)(()=>i(f?2:u(d))),b=(0,r.useRef)(p),g=(0,r.useRef)(),[x,E]=a(l),y=(0,r.useCallback)(()=>{let e=c(b.current._s,h);e&&s(e,v,b,g,m)},[m,h]),j=(0,r.useCallback)(r=>{let i=e=>{switch(s(e,v,b,g,m),e){case 1:x>=0&&(g.current=setTimeout(y,x));break;case 4:E>=0&&(g.current=setTimeout(y,E));break;case 0:case 3:g.current=setTimeout(()=>i(e+1),0)}},c=b.current.isEnter;"boolean"!=typeof r&&(r=!c),r?c||i(e?n?0:1:2):c&&i(t?o?3:4:u(h))},[y,m,e,t,n,o,x,E,h]);return(0,r.useEffect)(()=>()=>clearTimeout(g.current),[]),[p,j,y]};var f=n(4778),d=n(6367);let h=({initialOpen:e,initialMounted:t,unmountOnClose:n,transition:r,transitionTimeout:o=500}={})=>{let[{status:i},u,c]=l({initialEntered:e,mountOnEnter:!t,unmountOnExit:n,timeout:o,enter:(0,f.us)(r,"open"),exit:(0,f.us)(r,"close")});return[{state:d._f[i],endTransition:c},u]}},7733:function(e,t,n){"use strict";n.d(t,{i:function(){return i}});var r=n(7378),o=n(8028);let i=e=>{let[t,n]=(0,o.w)(e),[i,u]=(0,r.useState)();return[{menuItemFocus:i,...t},n,(e,t)=>{u({position:e,alwaysUpdate:t}),n(!0)}]}},6367:function(e,t,n){"use strict";n.d(t,{$U:function(){return y},AH:function(){return b},CM:function(){return S},GB:function(){return j},IK:function(){return s},J6:function(){return x},Kk:function(){return o},L1:function(){return g},Lz:function(){return f},R8:function(){return E},Vg:function(){return l},Zi:function(){return h},_X:function(){return p},_f:function(){return w},b7:function(){return v},c9:function(){return m},dW:function(){return C},es:function(){return u},fM:function(){return c},nJ:function(){return i},np:function(){return a},td:function(){return R},uQ:function(){return d},vK:function(){return k},yo:function(){return _}});var r=n(7378);let o="szh-menu-container",i="szh-menu",u="szh-menu-button",c="arrow",a="item",s="divider",l="header",f="group",d="submenu",h="radio-group",m=(0,r.createContext)(),p=(0,r.createContext)({}),v=(0,r.createContext)({}),b=(0,r.createContext)({}),g=(0,r.createContext)({}),x=(0,r.createContext)({}),E=Object.freeze({ENTER:"Enter",ESC:"Escape",SPACE:" ",HOME:"Home",END:"End",LEFT:"ArrowLeft",RIGHT:"ArrowRight",UP:"ArrowUp",DOWN:"ArrowDown"}),y=Object.freeze({RESET:0,SET:1,UNSET:2,INCREASE:3,DECREASE:4,FIRST:5,LAST:6,SET_INDEX:7}),j=Object.freeze({CLICK:"click",CANCEL:"cancel",BLUR:"blur",SCROLL:"scroll"}),R=Object.freeze({FIRST:"first",LAST:"last"}),w=Object.freeze({entering:"opening",entered:"open",exiting:"closing",exited:"closed"}),k="absolute",C="presentation",S="menuitem",_={"aria-hidden":!0,role:S}},4778:function(e,t,n){"use strict";n.d(t,{$7:function(){return p},Dx:function(){return a},GZ:function(){return m},MA:function(){return i},O:function(){return v},dG:function(){return d},dj:function(){return h},eO:function(){return u},oY:function(){return l},tr:function(){return o},us:function(){return c},zi:function(){return f}});var r=n(1542);let o=e=>!!e&&"o"===e[0],i=r.unstable_batchedUpdates||(e=>e());Object.values||(e=>Object.keys(e).map(t=>e[t]));let u=(e,t,n=1e-4)=>Math.abs(e-t)<n,c=(e,t)=>!0===e||!!(e&&e[t]),a=(e,t)=>"function"==typeof e?e(t):e,s="_szhsinMenu",l=e=>e[s],f=(e,t)=>Object.defineProperty(t,s,{value:e}),d=(e,t)=>(t&&Object.keys(t).forEach(n=>{let r=e[n],o=t[n];"function"==typeof o&&r?e[n]=(...e)=>{o(...e),r(...e)}:e[n]=o}),e),h=e=>{if("string"!=typeof e)return{top:0,right:0,bottom:0,left:0};let t=e.trim().split(/\s+/,4).map(parseFloat),n=isNaN(t[0])?0:t[0],r=isNaN(t[1])?n:t[1];return{top:n,right:r,bottom:isNaN(t[2])?n:t[2],left:isNaN(t[3])?r:t[3]}},m=e=>{for(;e;){if(!(e=e.parentNode)||e===document.body||!e.parentNode)return;let{overflow:t,overflowX:n,overflowY:r}=getComputedStyle(e);if(/auto|scroll|overlay|hidden/.test(t+r+n))return e}};function p(e,t){return{"aria-disabled":e||void 0,tabIndex:t?0:-1}}function v(e,t){for(let n=0;n<e.length;n++)if(e[n]===t)return n;return -1}},5587:function(e,t,n){"use strict";n.d(t,{m:function(){return u}});var r=n(7378),o=n(6367),i=n(4246);let u=(e,t)=>{let n=(0,r.memo)(t),u=(0,r.forwardRef)((e,t)=>{let u=(0,r.useRef)(null);return(0,i.jsx)(n,{...e,itemRef:u,externalRef:t,isHovering:(0,r.useContext)(o.c9)===u.current})});return u.displayName=`WithHovering(${e})`,u}},1118:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(3367)}])},3868:function(e){"use strict";e.exports={reactStrictMode:!0,basePath:"/react-menu",eslint:{dirs:["src"]}}},3991:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{PrefetchKind:function(){return r},ACTION_REFRESH:function(){return o},ACTION_NAVIGATE:function(){return i},ACTION_RESTORE:function(){return u},ACTION_SERVER_PATCH:function(){return c},ACTION_PREFETCH:function(){return a},ACTION_FAST_REFRESH:function(){return s},ACTION_SERVER_ACTION:function(){return l}});var n,r,o="refresh",i="navigate",u="restore",c="server-patch",a="prefetch",s="fast-refresh",l="server-action";(n=r||(r={})).AUTO="auto",n.FULL="full",n.TEMPORARY="temporary",("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1516:function(e,t,n){"use strict";function r(e,t,n,r){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return r}}),n(2387),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5569:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2253),o=n(7702),i=n(1309);n(8421),Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return y}});var u=n(8754)._(n(7378)),c=n(4532),a=n(3353),s=n(1410),l=n(9064),f=n(370),d=n(9955),h=n(4224),m=n(508),p=n(1516),v=n(4266),b=n(3991),g=new Set;function x(e,t,n,r,o,i){if(i||(0,a.isLocalURL)(t)){if(!r.bypassPrefetchedCheck){var u=t+"%"+n+"%"+(void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0);if(g.has(u))return;g.add(u)}Promise.resolve(i?e.prefetch(t,o):e.prefetch(t,n,r)).catch(function(e){})}}function E(e){return"string"==typeof e?e:(0,s.formatUrl)(e)}var y=u.default.forwardRef(function(e,t){var n,s,g=e.href,y=e.as,j=e.children,R=e.prefetch,w=void 0===R?null:R,k=e.passHref,C=e.replace,S=e.shallow,_=e.scroll,N=e.locale,O=e.onClick,T=e.onMouseEnter,M=e.onTouchStart,P=e.legacyBehavior,L=void 0!==P&&P,A=o._(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=j,L&&("string"==typeof n||"number"==typeof n)&&(n=u.default.createElement("a",null,n));var D=u.default.useContext(d.RouterContext),I=u.default.useContext(h.AppRouterContext),H=null!=D?D:I,U=!D,z=!1!==w,F=null===w?b.PrefetchKind.AUTO:b.PrefetchKind.FULL,$=u.default.useMemo(function(){if(!D){var e=E(g);return{href:e,as:y?E(y):e}}var t=i._((0,c.resolveHref)(D,g,!0),2),n=t[0],r=t[1];return{href:n,as:y?(0,c.resolveHref)(D,y):r||n}},[D,g,y]),B=$.href,G=$.as,K=u.default.useRef(B),J=u.default.useRef(G);L&&(s=u.default.Children.only(n));var W=L?s&&"object"==typeof s&&s.ref:t,V=i._((0,m.useIntersection)({rootMargin:"200px"}),3),X=V[0],Z=V[1],Q=V[2],q=u.default.useCallback(function(e){(J.current!==G||K.current!==B)&&(Q(),J.current=G,K.current=B),X(e),W&&("function"==typeof W?W(e):"object"==typeof W&&(W.current=e))},[G,W,B,Q,X]);u.default.useEffect(function(){H&&Z&&z&&x(H,B,G,{locale:N},{kind:F},U)},[G,B,Z,N,z,null==D?void 0:D.locale,H,U,F]);var Y={ref:q,onClick:function(e){L||"function"!=typeof O||O(e),L&&s.props&&"function"==typeof s.props.onClick&&s.props.onClick(e),H&&!e.defaultPrevented&&function(e,t,n,r,o,i,c,s,l,f){if("A"!==e.currentTarget.nodeName.toUpperCase()||(!(d=e.currentTarget.getAttribute("target"))||"_self"===d)&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&(!e.nativeEvent||2!==e.nativeEvent.which)&&(l||(0,a.isLocalURL)(n))){e.preventDefault();var d,h=function(){var e=null==c||c;"beforePopState"in t?t[o?"replace":"push"](n,r,{shallow:i,locale:s,scroll:e}):t[o?"replace":"push"](r||n,{forceOptimisticNavigation:!f,scroll:e})};l?u.default.startTransition(h):h()}}(e,H,B,G,C,S,_,N,U,z)},onMouseEnter:function(e){L||"function"!=typeof T||T(e),L&&s.props&&"function"==typeof s.props.onMouseEnter&&s.props.onMouseEnter(e),H&&(z||!U)&&x(H,B,G,{locale:N,priority:!0,bypassPrefetchedCheck:!0},{kind:F},U)},onTouchStart:function(e){L||"function"!=typeof M||M(e),L&&s.props&&"function"==typeof s.props.onTouchStart&&s.props.onTouchStart(e),H&&(z||!U)&&x(H,B,G,{locale:N,priority:!0,bypassPrefetchedCheck:!0},{kind:F},U)}};if((0,l.isAbsoluteUrl)(G))Y.href=G;else if(!L||k||"a"===s.type&&!("href"in s.props)){var ee=void 0!==N?N:null==D?void 0:D.locale,et=(null==D?void 0:D.isLocaleDomain)&&(0,p.getDomainLocale)(G,ee,null==D?void 0:D.locales,null==D?void 0:D.domainLocales);Y.href=et||(0,v.addBasePath)((0,f.addLocale)(G,ee,null==D?void 0:D.defaultLocale))}return L?u.default.cloneElement(s,Y):u.default.createElement("a",r._({},A,Y),n)});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},508:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1309);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return s}});var o=n(7378),i=n(29),u="function"==typeof IntersectionObserver,c=new Map,a=[];function s(e){var t=e.rootRef,n=e.rootMargin,s=e.disabled||!u,l=r._((0,o.useState)(!1),2),f=l[0],d=l[1],h=(0,o.useRef)(null),m=(0,o.useCallback)(function(e){h.current=e},[]);return(0,o.useEffect)(function(){if(u){if(!s&&!f){var e,r,o,l,m=h.current;if(m&&m.tagName)return r=(e=function(e){var t,n={root:e.root||null,margin:e.rootMargin||""},r=a.find(function(e){return e.root===n.root&&e.margin===n.margin});if(r&&(t=c.get(r)))return t;var o=new Map;return t={id:n,observer:new IntersectionObserver(function(e){e.forEach(function(e){var t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e),elements:o},a.push(n),c.set(n,t),t}({root:null==t?void 0:t.current,rootMargin:n})).id,o=e.observer,(l=e.elements).set(m,function(e){return e&&d(e)}),o.observe(m),function(){if(l.delete(m),o.unobserve(m),0===l.size){o.disconnect(),c.delete(r);var e=a.findIndex(function(e){return e.root===r.root&&e.margin===r.margin});e>-1&&a.splice(e,1)}}}}else if(!f){var p=(0,i.requestIdleCallback)(function(){return d(!0)});return function(){return(0,i.cancelIdleCallback)(p)}}},[s,n,t,f,h.current]),[m,f,(0,o.useCallback)(function(){d(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9981:function(e,t,n){"use strict";n.d(t,{T:function(){return f}});var r=n(4246),o=n(7378),i=n(979),u=n(4666),c=n(3542),a=n(4457),s=n(7550),l=n(5579),f=o.memo(function(){var e=(0,r.jsxs)("div",{className:"app-logo",children:["React-Menu",(0,r.jsxs)("div",{className:"version",children:["v",l.i8]}),(0,r.jsx)("i",{className:"material-icons drop-down",children:"arrow_drop_down"})]});return(0,r.jsxs)(i.v,{initialMounted:!0,menuButton:e,gap:10,theming:(0,s.Fg)().theme,className:"version-menu",children:[(0,r.jsx)(u.t,{children:"Version history"}),(0,r.jsx)(c.s,{href:"https://szhsin.github.io/react-menu-v3",children:"v3.5.x"}),(0,r.jsx)(c.s,{href:"https://szhsin.github.io/react-menu-v2",children:"v2.3.x"}),(0,r.jsx)(c.s,{href:"https://szhsin.github.io/react-menu-v1",children:"v1.11.x"}),(0,r.jsx)(a.R,{}),(0,r.jsx)(u.t,{children:"Migration guide"}),(0,r.jsx)(c.s,{href:"https://github.com/szhsin/react-menu/blob/master/docs/migration/v4.md",children:"migrating to v4"}),(0,r.jsx)(c.s,{href:"https://github.com/szhsin/react-menu/blob/master/docs/migration/v3.md",children:"migrating to v3"}),(0,r.jsx)(c.s,{href:"https://github.com/szhsin/react-menu/blob/master/docs/migration/v2.md",children:"migrating to v2"})]})})},4634:function(e,t,n){"use strict";n.d(t,{R:function(){return c}});var r=n(4246),o=n(7378),i=n(7550),u=n(5579),c=o.memo(function(){var e=(0,i.Fg)(),t=e.isDark,n=e.theme;return(0,r.jsx)("input",{className:(0,u.PH)("theme-switch",null,{theme:n}),type:"checkbox",onChange:function(e){return i.XG.set(e.target.checked?"dark":"light")},checked:t})})},3367:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return k}});var r=n(2253),o=n(4246);n(4088),n(8373),n(5940),n(5530);var i=n(9008),u=n.n(i),c=n(7378),a=n(6303),s=n(1163),l=n(5579),f=n(7550),d=n(4932),h=n(1664),m=n.n(h),p=n(3868),v=n(9981);function b(e){var t=e.onClose,n=(0,f.Nm)().vWidth>700;return(0,o.jsxs)("div",{className:"header-banner",role:"alert",children:[n&&(0,o.jsxs)("span",{className:"banner-text",children:["This website is for React-Menu v",l.i8]}),(0,o.jsx)("a",{href:"https://szhsin.github.io/react-menu/",children:n?"You can find the latest version here.":"Visit the latest version"}),(0,o.jsx)("i",{className:"close-btn material-icons",onClick:t,children:"close"})]})}var g=n(4634),x="navbar",E=c.memo(function(){var e=(0,f.Fg)(),t=e.theme,n=e.isDark,r=(0,a.R)(f.ww);return(0,o.jsxs)("header",{id:"header",children:[r&&(0,o.jsx)(b,{onClose:function(){return f.ww.set(!1)}}),(0,o.jsxs)("nav",{className:(0,l.PH)(x,null,{theme:t}),"aria-label":"Site",children:[(0,o.jsx)("button",{className:(0,l.PH)(x,"toggle"),"aria-label":"Open table of contents",onClick:function(){return f.B1.set(!0)},children:(0,o.jsx)("i",{className:"material-icons",children:"menu"})}),(0,o.jsx)(v.T,{}),(0,o.jsxs)("ul",{className:(0,l.PH)(x,"link-list"),children:[(0,o.jsx)(y,{href:"/",children:"Home"}),(0,o.jsx)(y,{href:"/docs",children:"Docs"}),(0,o.jsx)(y,{href:"/style-guide",children:"Styling"})]}),(0,o.jsx)(g.R,{}),(0,o.jsx)("a",{className:(0,l.PH)(x,"github"),title:"GitHub",href:"https://github.com/szhsin/react-menu",target:"_blank",rel:"noopener noreferrer",children:(0,o.jsx)("img",{src:"".concat(p.basePath,"/GitHub-Mark-").concat(n?"Light-":"","64px.png"),alt:"GitHub"})})]})]})});function y(e){var t=e.href,n=e.children,i=(0,s.useRouter)().pathname;return(0,o.jsx)("li",{className:(0,l.PH)(x,"link"),children:(0,o.jsx)(m(),(0,d._)((0,r._)({href:t},t===i?{"aria-current":"page",className:"active"}:void 0),{children:n}))})}var j=n(1309),R=c.memo(function(){var e=(0,f.Fg)().isDark,t=(0,j._)((0,c.useState)("-"),2),n=t[0],r=t[1];return(0,c.useEffect)(function(){fetch("https://api.github.com/repos/szhsin/react-menu").then(function(e){return e.json()}).then(function(e){return r(e.stargazers_count.toLocaleString("en-US"))}).catch(function(e){return console.error(e)})},[]),(0,o.jsxs)("footer",{id:"footer",children:[(0,o.jsxs)("div",{className:"github",children:[(0,o.jsxs)("a",{className:"github-btn left",title:"GitHub",href:"https://github.com/szhsin/react-menu",target:"_blank",rel:"noopener noreferrer",children:[(0,o.jsx)("img",{className:"github-img",src:"".concat(p.basePath,"/GitHub-Mark-").concat(e?"Light-":"","32px.png"),alt:"GitHub"}),"Star"]}),(0,o.jsx)("a",{className:"github-btn right",title:"Stargazers",href:"https://github.com/szhsin/react-menu/stargazers",target:"_blank",rel:"noopener noreferrer",children:n})]}),(0,o.jsx)("p",{children:"Released under the MIT License."}),(0,o.jsxs)("p",{children:["Copyright \xa9 ",new Date().getFullYear()," Zheng Song."]}),(0,o.jsxs)("p",{className:"build",children:[l.i8,"+",l.J_]})]})}),w=function(e){var t=e.children,n=(0,a.R)(f.ww),r=(0,a.R)(f.Jk);(0,l.bt)(function(){(0,f.ZB)()},[]),(0,c.useEffect)(function(){var e=function(){var e={vWidth:document.documentElement.clientWidth,vHeight:window.innerHeight,navbarHeight:document.querySelector("#header").offsetHeight};e.vWidth>950&&f.B1.set(!1),f.Ff.set(e)};return e(),window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}},[n]),(0,c.useEffect)(function(){if(r){var e=setTimeout(function(){return f.Jk.set(null)},2500);return function(){return clearTimeout(e)}}},[r]);var i=(0,s.useRouter)();return(0,c.useEffect)(function(){f.B1.set(!1)},[i]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(E,{}),(0,o.jsx)("div",{id:"content",style:n?{marginTop:40}:void 0,children:t}),(0,o.jsx)(R,{}),r&&(0,o.jsx)("div",{className:(0,l.PH)("szh-app","toast"),role:"alert",children:r})]})},k=function(e){var t=e.Component,n=e.pageProps;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(u(),{children:[(0,o.jsx)("title",{children:"React menu library - szhsin/react-menu"}),(0,o.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"})]}),(0,o.jsx)(w,{children:(0,o.jsx)(t,(0,r._)({},n))})]})}},7550:function(e,t,n){"use strict";n.d(t,{Ff:function(){return s},ZB:function(){return h},B1:function(){return c},ww:function(){return u},XG:function(){return f},Jk:function(){return a},Nm:function(){return l},Fg:function(){return d}});let r=(({middleware:e}={})=>(t,n,r)=>{let o=t,i=new Set,u=()=>o,c=e=>{let t="function"==typeof e?e(o):e;Object.is(o,t)||(o=t,i.forEach(e=>e()))},a=e=>(i.add(e),()=>i.delete(e));return e&&(c=e({set:c,get:u,subscribe:a},r)),{get:u,set:c,subscribe:a,actions:n&&n(c,u)}})();var o=n(6303),i=n(5579),u=r(!1),c=r(!1),a=r(null),s=r({}),l=function(){return(0,o.R)(s)},f=r("dark"),d=function(){var e=(0,o.R)(f);return{isDark:"dark"===e,theme:e}};f.subscribe(function(){var e=f.get();document.body.className=(0,i.PH)("szh-app",null,{theme:e});try{localStorage.setItem("theme",e)}catch(e){}});var h=function(){try{var e=localStorage.getItem("theme");"light"===e&&f.set(e)}catch(e){}}},5579:function(e,t,n){"use strict";n.d(t,{J_:function(){return a},PH:function(){return s},_5:function(){return l},bt:function(){return f},i8:function(){return c}});var r=n(2253),o=n(4246),i=n(7378),u=n(7550),c="4.0.3",a="133",s=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=t?"".concat(e,"__").concat(t):e,o=r,i=!0,u=!1,c=void 0;try{for(var a,s=Object.keys(n)[Symbol.iterator]();!(i=(a=s.next()).done);i=!0){var l=a.value,f=n[l];f&&(o+=" ".concat(r,"--")+(!0===f?l:"".concat(l,"-").concat(f)))}}catch(e){u=!0,c=e}finally{try{i||null==s.return||s.return()}finally{if(u)throw c}}return o},l=function(e){return function(t){return(0,o.jsx)(e,(0,r._)({transition:!0,theming:(0,u.Fg)().theme},t))}},f=void 0!==window.document&&void 0!==window.document.createElement?i.useLayoutEffect:i.useEffect},4088:function(){},8373:function(){},5940:function(){},5530:function(){},9008:function(e,t,n){e.exports=n(2636)},1664:function(e,t,n){e.exports=n(5569)},1163:function(e,t,n){e.exports=n(6885)},6303:function(e,t,n){"use strict";n.d(t,{R:function(){return o}});var r=n(1688);let o=({subscribe:e,get:t})=>(0,r.useSyncExternalStore)(e,t,t)},3250:function(e,t,n){"use strict";/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(7378),o="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},i=r.useState,u=r.useEffect,c=r.useLayoutEffect,a=r.useDebugValue;function s(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!o(e,n)}catch(e){return!0}}var l="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var n=t(),r=i({inst:{value:n,getSnapshot:t}}),o=r[0].inst,l=r[1];return c(function(){o.value=n,o.getSnapshot=t,s(o)&&l({inst:o})},[e,n,t]),u(function(){return s(o)&&l({inst:o}),e(function(){s(o)&&l({inst:o})})},[e]),a(n),n};t.useSyncExternalStore=void 0!==r.useSyncExternalStore?r.useSyncExternalStore:l},1688:function(e,t,n){"use strict";e.exports=n(3250)}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return t(1118),t(6885)}),_N_E=e.O()}]);