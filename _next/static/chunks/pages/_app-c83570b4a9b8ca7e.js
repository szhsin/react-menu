(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{3526:function(e,t,n){"use strict";function r(){return(r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function o(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}n.d(t,{g:function(){return r},v:function(){return o}})},2429:function(e,t,n){"use strict";n.d(t,{B:function(){return d}});var r=n(3526),o=n(7378),i=n(1542),u=n(4081),c=n(4246),a=n(5119),s=n(6367),f=n(4778),l=["aria-label","className","containerProps","initialMounted","unmountOnClose","transition","transitionTimeout","boundingBoxRef","boundingBoxPadding","reposition","submenuOpenDelay","submenuCloseDelay","skipOpen","viewScroll","portal","theming","onItemClick","onClose"],d=(0,o.forwardRef)(function(e,t){var n=e["aria-label"],d=e.className,h=e.containerProps,v=e.initialMounted,m=e.unmountOnClose,p=e.transition,g=e.transitionTimeout,b=e.boundingBoxRef,x=e.boundingBoxPadding,y=e.reposition,w=void 0===y?"auto":y,R=e.submenuOpenDelay,j=void 0===R?300:R,C=e.submenuCloseDelay,E=void 0===C?150:C,O=e.skipOpen,k=e.viewScroll,S=void 0===k?"initial":k,N=e.portal,T=e.theming,M=e.onItemClick,P=e.onClose,D=(0,r.v)(e,l),_=(0,o.useRef)(null),L=(0,o.useRef)({}),I=D.anchorRef,B=D.state,H=(0,o.useMemo)(function(){return{initialMounted:v,unmountOnClose:m,transition:p,transitionTimeout:g,boundingBoxRef:b,boundingBoxPadding:x,rootMenuRef:_,rootAnchorRef:I,scrollNodesRef:L,reposition:w,viewScroll:S}},[v,m,p,g,I,b,x,w,S]),A=(0,o.useMemo)(function(){return{submenuOpenDelay:j,submenuCloseDelay:E}},[j,E]),z=(0,o.useMemo)(function(){return{handleClick:function(e,t){e.stopPropagation||(0,f.Dx)(M,e);var n=e.keepOpen;void 0===n&&(n=t&&e.key===s.R8.SPACE),n||(0,f.Dx)(P,{value:e.value,key:e.key,reason:s.GB.CLICK})},handleClose:function(e){(0,f.Dx)(P,{key:e,reason:s.GB.CLICK})}}},[M,P]),U=function(e){var t=e.key;t===s.R8.ESC&&(0,f.Dx)(P,{key:t,reason:s.GB.CANCEL})},Z=function(e){(0,f.tr)(B)&&!e.currentTarget.contains(e.relatedTarget||document.activeElement)&&((0,f.Dx)(P,{reason:s.GB.BLUR}),O&&(O.current=!0,setTimeout(function(){return O.current=!1},300)))},Y=(0,f.us)(p,"item"),F=(0,o.useMemo)(function(){return{theme:T,itemTransition:Y}},[T,Y]),X=(0,c.jsx)("div",(0,r.g)({},(0,f.dG)({onKeyDown:U,onBlur:Z},h),{className:(0,a.l)({block:s.Kk,modifiers:F,className:d}),style:(0,r.g)({},null==h?void 0:h.style,{position:"relative"}),ref:_,children:B&&(0,c.jsx)(s.J6.Provider,{value:H,children:(0,c.jsx)(s.Bs.Provider,{value:A,children:(0,c.jsx)(s.AH.Provider,{value:z,children:(0,c.jsx)(u.q,(0,r.g)({},D,{ariaLabel:n||"Menu",externalRef:t,containerRef:_,onClose:P}))})})})}));return!0===N&&"undefined"!=typeof document?(0,i.createPortal)(X,document.body):N?N.target?(0,i.createPortal)(X,N.target):N.stablePosition?null:X:X})},979:function(e,t,n){"use strict";n.d(t,{v:function(){return h}});var r=n(3526),o=n(7378),i=n(2429),u=n(4246),c=n(7733),a=n(9600),s=n(4778),f=n(8711),l=n(6367),d=["aria-label","captureFocus","menuButton","instanceRef","onMenuChange"],h=(0,o.forwardRef)(function(e,t){var n=e["aria-label"],h=e.menuButton,v=e.instanceRef,m=e.onMenuChange,p=(0,r.v)(e,d),g=(0,c.i)(p),b=g[0],x=g[1],y=g[2],w=(0,s.tr)(b.state),R=(0,o.useRef)(!1),j=(0,o.useRef)(null),C=(0,o.useCallback)(function(e){x(!1),e.key&&j.current.focus()},[x]),E=function(e){R.current||y(0===e.detail?l.td.FIRST:void 0)},O=function(e){switch(e.key){case l.R8.UP:y(l.td.LAST);break;case l.R8.DOWN:y(l.td.FIRST);break;default:return}e.preventDefault()},k=(0,s.Dx)(h,{open:w});if(!k||!k.type)throw Error("Menu requires a menuButton prop.");var S=(0,r.g)({ref:(0,a.Q)(k.ref,j)},(0,s.dG)({onClick:E,onKeyDown:O},k.props));"MenuButton"===(0,s.oY)(k.type)&&(S.isOpen=w);var N=(0,o.cloneElement)(k,S);return(0,f.F)(m,w),(0,o.useImperativeHandle)(v,function(){return{openMenu:y,closeMenu:function(){return x(!1)}}}),(0,u.jsxs)(o.Fragment,{children:[N,(0,u.jsx)(i.B,(0,r.g)({},p,b,{"aria-label":n||("string"==typeof k.props.children?k.props.children:"Menu"),anchorRef:j,ref:t,onClose:C,skipOpen:R}))]})})},4457:function(e,t,n){"use strict";n.d(t,{R:function(){return s}});var r=n(3526),o=n(7378),i=n(4246),u=n(5119),c=n(6367),a=["className"],s=(0,o.memo)((0,o.forwardRef)(function(e,t){var n=e.className,o=(0,r.v)(e,a);return(0,i.jsx)("li",(0,r.g)({role:"separator"},o,{ref:t,className:(0,u.l)({block:c.nJ,element:c.IK,className:n})}))}))},4666:function(e,t,n){"use strict";n.d(t,{t:function(){return s}});var r=n(3526),o=n(7378),i=n(4246),u=n(5119),c=n(6367),a=["className"],s=(0,o.memo)((0,o.forwardRef)(function(e,t){var n=e.className,o=(0,r.v)(e,a);return(0,i.jsx)("li",(0,r.g)({role:"presentation"},o,{ref:t,className:(0,u.l)({block:c.nJ,element:c.Vg,className:n})}))}))},3542:function(e,t,n){"use strict";n.d(t,{s:function(){return v}});var r=n(3526),o=n(7378),i=n(4246),u=n(5587),c=n(257),a=n(6367),s=n(9600),f=n(5119),l=n(4778),d=["className","value","href","type","checked","disabled","children","onClick","isHovering","itemRef","externalRef"],h=["setHover"],v=(0,u.m)("MenuItem",function(e){var t=e.className,n=e.value,u=e.href,v=e.type,m=e.checked,p=e.disabled,g=e.children,b=e.onClick,x=e.isHovering,y=e.itemRef,w=e.externalRef,R=(0,r.v)(e,d),j=!!p,C=(0,c.Q)(y,y,x,j),E=C.setHover,O=(0,r.v)(C,h),k=(0,o.useContext)(a.AH),S=(0,o.useContext)(a.L1),N="radio"===v,T="checkbox"===v,M=!!u&&!j&&!N&&!T,P=N?S.value===n:!!T&&!!m,D=function(e){if(j){e.stopPropagation(),e.preventDefault();return}var t={value:n,syntheticEvent:e};void 0!==e.key&&(t.key=e.key),T&&(t.checked=!P),N&&(t.name=S.name),(0,l.Dx)(b,t),N&&(0,l.Dx)(S.onRadioChange,t),k.handleClick(t,T||N)},_=function(e){if(x)switch(e.key){case a.R8.ENTER:case a.R8.SPACE:M?y.current.click():D(e)}},L=(0,o.useMemo)(function(){return{type:v,disabled:j,hover:x,checked:P,anchor:M}},[v,j,x,P,M]),I=(0,l.dG)((0,r.g)({},O,{onPointerDown:E,onKeyDown:_,onClick:D}),R),B=(0,r.g)({role:N?"menuitemradio":T?"menuitemcheckbox":"menuitem","aria-checked":N||T?P:void 0},I,(0,l.$7)(j,x),{ref:(0,s.Q)(w,y),className:(0,f.l)({block:a.nJ,element:a.np,modifiers:L,className:t}),children:(0,o.useMemo)(function(){return(0,l.Dx)(g,L)},[g,L])});return M?(0,i.jsx)("li",{role:"presentation",children:(0,i.jsx)("a",(0,r.g)({href:u},B))}):(0,i.jsx)("li",(0,r.g)({},B))})},4081:function(e,t,n){"use strict";n.d(t,{q:function(){return y}});var r=n(3526),o=n(7378),i=n(1542),u=n(4246),c=n(6367),a=n(4778),s=function(e,t){var n=(0,o.useState)(),r=n[0],i=n[1],u=(0,o.useRef)({items:[],hoverIndex:-1,sorted:!1}).current,s=(0,o.useCallback)(function(e,n){var r=u.items;if(e){if(n)r.push(e);else{var o=r.indexOf(e);o>-1&&(r.splice(o,1),e.contains(document.activeElement)&&(t.current.focus(),i()))}}else u.items=[];u.hoverIndex=-1,u.sorted=!1},[u,t]);return{hoverItem:r,dispatch:(0,o.useCallback)(function(t,n,r){var o=u.items,s=u.hoverIndex,f=function(){if(!u.sorted){var t=e.current.querySelectorAll(".szh-menu__item");o.sort(function(e,n){return(0,a.O)(t,e)-(0,a.O)(t,n)}),u.sorted=!0}},l=-1,d=void 0;switch(t){case c.$U.RESET:break;case c.$U.SET:d=n;break;case c.$U.UNSET:d=function(e){return e===n?void 0:e};break;case c.$U.FIRST:f(),d=o[l=0];break;case c.$U.LAST:f(),d=o[l=o.length-1];break;case c.$U.SET_INDEX:f(),d=o[l=r];break;case c.$U.INCREASE:f(),(l=s)<0&&(l=o.indexOf(n)),++l>=o.length&&(l=0),d=o[l];break;case c.$U.DECREASE:f(),(l=s)<0&&(l=o.indexOf(n)),--l<0&&(l=o.length-1),d=o[l]}d||(l=-1),i(d),u.hoverIndex=l},[e,u]),updateItems:s}},f=function(e,t,n,r){var o=t.current.getBoundingClientRect(),i=e.current.getBoundingClientRect(),u=n===window?{left:0,top:0,right:document.documentElement.clientWidth,bottom:window.innerHeight}:n.getBoundingClientRect(),c=(0,a.dj)(r),s=function(e){return e+i.left-u.left-c.left},f=function(e){return e+i.left+o.width-u.right+c.right},l=function(e){return e+i.top-u.top-c.top},d=function(e){return e+i.top+o.height-u.bottom+c.bottom},h=function(e){var t=s(e);if(t<0)e-=t;else{var n=f(e);n>0&&(e-=n,(t=s(e))<0&&(e-=t))}return e},v=function(e){var t=l(e);if(t<0)e-=t;else{var n=d(e);n>0&&(e-=n,(t=l(e))<0&&(e-=t))}return e};return{menuRect:o,containerRect:i,getLeftOverflow:s,getRightOverflow:f,getTopOverflow:l,getBottomOverflow:d,confineHorizontally:h,confineVertically:v}},l=function(e){var t=e.arrowRef,n=e.menuY,r=e.anchorRect,o=e.containerRect,i=e.menuRect,u=r.top-o.top-n+r.height/2,c=1.25*t.current.offsetHeight;return Math.min(u=Math.max(c,u),i.height-c)},d=function(e){var t,n,r,o=e.anchorRect,i=e.containerRect,u=e.menuRect,c=e.placeLeftorRightY,a=e.placeLeftX,s=e.placeRightX,f=e.getLeftOverflow,d=e.getRightOverflow,h=e.confineHorizontally,v=e.confineVertically,m=e.arrowRef,p=e.arrow,g=e.direction,b=e.position,x=g,y=c;return"initial"!==b&&(y=v(y),"anchor"===b&&(y=Math.max(y=Math.min(y,o.bottom-i.top),o.top-i.top-u.height))),"left"===x?(t=a,"initial"!==b&&(n=f(t))<0&&((r=d(s))<=0||-n>r)&&(t=s,x="right")):(t=s,"initial"!==b&&(r=d(t))>0&&((n=f(a))>=0||-n<r)&&(t=a,x="left")),"auto"===b&&(t=h(t)),{arrowY:p?l({menuY:y,arrowRef:m,anchorRect:o,containerRect:i,menuRect:u}):void 0,x:t,y:y,computedDirection:x}},h=function(e){var t=e.arrowRef,n=e.menuX,r=e.anchorRect,o=e.containerRect,i=e.menuRect,u=r.left-o.left-n+r.width/2,c=1.25*t.current.offsetWidth;return Math.min(u=Math.max(c,u),i.width-c)},v=function(e){var t,n,r,o=e.anchorRect,i=e.containerRect,u=e.menuRect,c=e.placeToporBottomX,a=e.placeTopY,s=e.placeBottomY,f=e.getTopOverflow,l=e.getBottomOverflow,d=e.confineHorizontally,v=e.confineVertically,m=e.arrowRef,p=e.arrow,g=e.direction,b=e.position,x="top"===g?"top":"bottom",y=c;return"initial"!==b&&(y=d(y),"anchor"===b&&(y=Math.max(y=Math.min(y,o.right-i.left),o.left-i.left-u.width))),"top"===x?(t=a,"initial"!==b&&(n=f(t))<0&&((r=l(s))<=0||-n>r)&&(t=s,x="bottom")):(t=s,"initial"!==b&&(r=l(t))>0&&((n=f(a))>=0||-n<r)&&(t=a,x="top")),"auto"===b&&(t=v(t)),{arrowX:p?h({menuX:y,arrowRef:m,anchorRect:o,containerRect:i,menuRect:u}):void 0,x:y,y:t,computedDirection:x}},m=function(e){var t,n,o=e.arrow,i=e.align,u=e.direction,c=e.offsetX,a=e.offsetY,s=e.position,f=e.anchorRect,l=e.arrowRef,h=e.positionHelpers,m=h.menuRect,p=h.containerRect,g=c,b=a;o&&("left"===u||"right"===u?g+=l.current.offsetWidth:b+=l.current.offsetHeight);var x=f.left-p.left-m.width-g,y=f.right-p.left+g,w=f.top-p.top-m.height-b,R=f.bottom-p.top+b;"end"===i?(t=f.right-p.left-m.width,n=f.bottom-p.top-m.height):"center"===i?(t=f.left-p.left-(m.width-f.width)/2,n=f.top-p.top-(m.height-f.height)/2):(t=f.left-p.left,n=f.top-p.top),t+=g,n+=b;var j=(0,r.g)({},h,{anchorRect:f,placeLeftX:x,placeRightX:y,placeLeftorRightY:n,placeTopY:w,placeBottomY:R,placeToporBottomX:t,arrowRef:l,arrow:o,direction:u,position:s});switch(u){case"left":case"right":return d(j);default:return v(j)}},p=n(8392),g=n(5119),b=n(9600),x=["ariaLabel","menuClassName","menuStyle","arrowClassName","arrowStyle","anchorPoint","anchorRef","containerRef","externalRef","parentScrollingRef","arrow","align","direction","position","overflow","setDownOverflow","repositionFlag","captureFocus","state","endTransition","isDisabled","menuItemFocus","offsetX","offsetY","children","onClose"],y=function(e){var t,n,l=e.ariaLabel,d=e.menuClassName,h=e.menuStyle,v=e.arrowClassName,y=e.arrowStyle,w=e.anchorPoint,R=e.anchorRef,j=e.containerRef,C=e.externalRef,E=e.parentScrollingRef,O=e.arrow,k=e.align,S=void 0===k?"start":k,N=e.direction,T=void 0===N?"bottom":N,M=e.position,P=void 0===M?"auto":M,D=e.overflow,_=void 0===D?"visible":D,L=e.setDownOverflow,I=e.repositionFlag,B=e.captureFocus,H=void 0===B||B,A=e.state,z=e.endTransition,U=e.isDisabled,Z=e.menuItemFocus,Y=e.offsetX,F=void 0===Y?0:Y,X=e.offsetY,$=void 0===X?0:X,G=e.children,J=e.onClose,K=(0,r.v)(e,x),W=(0,o.useState)({x:0,y:0}),V=W[0],Q=W[1],q=(0,o.useState)({}),ee=q[0],et=q[1],en=(0,o.useState)(),er=en[0],eo=en[1],ei=(0,o.useState)(T),eu=ei[0],ec=ei[1],ea=(0,o.useState)(0),es=ea[0],ef=ea[1],el=(0,o.useReducer)(function(e){return e+1},1),ed=el[0],eh=el[1],ev=(0,o.useContext)(c.J6),em=ev.transition,ep=ev.boundingBoxRef,eg=ev.boundingBoxPadding,eb=ev.rootMenuRef,ex=ev.rootAnchorRef,ey=ev.scrollNodesRef,ew=ev.reposition,eR=ev.viewScroll,ej=(0,o.useContext)(c.b7).reposSubmenu||I,eC=(0,o.useRef)(null),eE=(0,o.useRef)(),eO=(0,o.useRef)(),ek=(0,o.useRef)(!1),eS=(0,o.useRef)({width:0,height:0}),eN=(0,o.useRef)(function(){}),eT=s(eC,eE),eM=eT.hoverItem,eP=eT.dispatch,eD=eT.updateItems,e_=(0,a.tr)(A),eL=(0,a.us)(em,"open"),eI=(0,a.us)(em,"close"),eB=ey.current,eH=function(e){switch(e.key){case c.R8.HOME:eP(c.$U.FIRST);break;case c.R8.END:eP(c.$U.LAST);break;case c.R8.UP:eP(c.$U.DECREASE,eM);break;case c.R8.DOWN:eP(c.$U.INCREASE,eM);break;case c.R8.SPACE:e.target&&-1!==e.target.className.indexOf(c.nJ)&&e.preventDefault();return;default:return}e.preventDefault(),e.stopPropagation()},eA=function(){"closing"===A&&eo(),(0,a.Dx)(z)},ez=(0,o.useCallback)(function(e){if(j.current){var t=R?R.current.getBoundingClientRect():w?{left:w.x,right:w.x,top:w.y,bottom:w.y,width:0,height:0}:null;if(t){eB.menu||(eB.menu=(ep?ep.current:(0,a.GZ)(eb.current))||window);var n=f(j,eC,eB.menu,eg),r=m({arrow:O,align:S,direction:T,offsetX:F,offsetY:$,position:P,anchorRect:t,arrowRef:eO,positionHelpers:n}),o=r.arrowX,i=r.arrowY,u=r.x,c=r.y,s=r.computedDirection,l=n.menuRect,d=l.height;if(!e&&"visible"!==_){var h,v,p=n.getTopOverflow,g=n.getBottomOverflow,b=eS.current.height,x=g(c);if(x>0||(0,a.eO)(x,0)&&(0,a.eO)(d,b))h=d-x,v=x;else{var y=p(c);(y<0||(0,a.eO)(y,0)&&(0,a.eO)(d,b))&&(h=d+y,v=0-y,h>=0&&(c-=y))}h>=0?(d=h,eo({height:h,overflowAmt:v})):eo()}O&&et({x:o,y:i}),Q({x:u,y:c}),ec(s),eS.current={width:l.width,height:d}}}},[O,S,eg,T,F,$,P,_,w,R,j,ep,eb,eB]);(0,p.b)(function(){e_&&(ez(),ek.current&&eh()),ek.current=e_,eN.current=ez},[e_,ez,ej]),(0,p.b)(function(){er&&!L&&(eC.current.scrollTop=0)},[er,L]),(0,p.b)(function(){return eD},[eD]),(0,o.useEffect)(function(){var e=eB.menu;if(e_&&e){if(e=e.addEventListener?e:window,!eB.anchors){eB.anchors=[];for(var t=(0,a.GZ)(ex&&ex.current);t&&t!==e;)eB.anchors.push(t),t=(0,a.GZ)(t)}var n=eR;if(eB.anchors.length&&"initial"===n&&(n="auto"),"initial"!==n){var r=function(){"auto"===n?(0,a.MA)(function(){return ez(!0)}):(0,a.Dx)(J,{reason:c.GB.SCROLL})},o=eB.anchors.concat("initial"!==eR?e:[]);return o.forEach(function(e){return e.addEventListener("scroll",r)}),function(){return o.forEach(function(e){return e.removeEventListener("scroll",r)})}}}},[ex,eB,e_,J,eR,ez]);var eU=!!er&&er.overflowAmt>0;(0,o.useEffect)(function(){if(!eU&&e_&&E){var e=function(){return(0,a.MA)(ez)},t=E.current;return t.addEventListener("scroll",e),function(){return t.removeEventListener("scroll",e)}}},[e_,eU,E,ez]),(0,o.useEffect)(function(){if("function"==typeof ResizeObserver&&"initial"!==ew){var e=new ResizeObserver(function(e){var t,n,r=e[0],o=r.borderBoxSize,u=r.target;if(o){var c=o[0]||o,s=c.inlineSize,f=c.blockSize;t=s,n=f}else{var l=u.getBoundingClientRect();t=l.width,n=l.height}0!==t&&0!==n&&((0,a.eO)(t,eS.current.width,1)&&(0,a.eO)(n,eS.current.height,1)||(0,i.flushSync)(function(){eN.current(),eh()}))}),t=eC.current;return e.observe(t,{box:"border-box"}),function(){return e.unobserve(t)}}},[ew]),(0,o.useEffect)(function(){if(!e_){eP(c.$U.RESET),eI||eo();return}var e=Z||{},t=e.position,n=e.alwaysUpdate,r=function(){t===c.td.FIRST?eP(c.$U.FIRST):t===c.td.LAST?eP(c.$U.LAST):t>=-1&&eP(c.$U.SET_INDEX,void 0,t)};if(n)r();else if(H){var o=setTimeout(function(){eC.current.contains(document.activeElement)||(eE.current.focus(),r())},eL?170:100);return function(){return clearTimeout(o)}}},[e_,eL,eI,H,Z,eP]);var eZ=es>0,eY=(0,o.useMemo)(function(){return{isParentOpen:e_,isSubmenuOpen:eZ,setOpenSubmenuCount:ef,dispatch:eP,updateItems:eD}},[e_,eZ,eP,eD]);er&&(L?n=er.overflowAmt:t=er.height);var eF=(0,o.useMemo)(function(){return{reposSubmenu:ed,overflow:_,overflowAmt:n,parentMenuRef:eC,parentDir:eu}},[ed,_,n,eu]),eX=t>=0?{maxHeight:t,overflow:_}:void 0,e$=(0,o.useMemo)(function(){return{state:A,dir:eu}},[A,eu]),eG=(0,o.useMemo)(function(){return{dir:eu}},[eu]),eJ=(0,g.l)({block:c.nJ,element:c.fM,modifiers:eG,className:v});return(0,u.jsxs)("ul",(0,r.g)({role:"menu","aria-label":l},(0,a.dG)({onKeyDown:eH,onAnimationEnd:eA},K),(0,a.$7)(U),{ref:(0,b.Q)(C,eC),className:(0,g.l)({block:c.nJ,modifiers:e$,className:d}),style:(0,r.g)({},h,eX,{margin:0,display:"closed"===A?"none":void 0,position:"absolute",left:V.x,top:V.y}),children:[(0,u.jsx)("div",{ref:eE,tabIndex:-1,style:{position:"absolute",left:0,top:0}}),O&&(0,u.jsx)("div",{className:eJ,style:(0,r.g)({},y,{position:"absolute",left:ee.x,top:ee.y}),ref:eO}),(0,u.jsx)(c.b7.Provider,{value:eF,children:(0,u.jsx)(c._X.Provider,{value:eY,children:(0,u.jsx)(c.c9.Provider,{value:eM,children:G})})})]}))}},5119:function(e,t,n){"use strict";n.d(t,{l:function(){return o}});var r=n(7378),o=function(e){var t=e.block,n=e.element,o=e.modifiers,i=e.className;return(0,r.useMemo)(function(){var e=n?t+"__"+n:t,r=e;o&&Object.keys(o).forEach(function(t){var n=o[t];n&&(r+=" "+e+"--"+(!0===n?t:t+"-"+n))});var u="function"==typeof i?i(o):i;return"string"==typeof u&&(u=u.trim())&&(r+=" "+u),r},[t,n,o,i])}},9600:function(e,t,n){"use strict";n.d(t,{Q:function(){return i}});var r=n(7378);function o(e,t){"function"==typeof e?e(t):e.current=t}var i=function(e,t){return(0,r.useMemo)(function(){return e?t?function(n){o(e,n),o(t,n)}:e:t},[e,t])}},8392:function(e,t,n){"use strict";n.d(t,{b:function(){return o}});var r=n(7378),o="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?r.useLayoutEffect:r.useEffect},7214:function(e,t,n){"use strict";n.d(t,{V:function(){return o}});var r=n(8392),o=function(e,t,n){(0,r.b)(function(){if(!e){var r=t.current;return n(r,!0),function(){n(r)}}},[e,t,n])}},257:function(e,t,n){"use strict";n.d(t,{Q:function(){return u}});var r=n(7378),o=n(7214),i=n(6367),u=function(e,t,n,u){var c=(0,r.useContext)(i.Bs).submenuCloseDelay,a=(0,r.useContext)(i._X),s=a.isParentOpen,f=a.isSubmenuOpen,l=a.dispatch,d=a.updateItems,h=(0,r.useRef)(0),v=function(){n||u||l(i.$U.SET,e.current)},m=function(){u||l(i.$U.UNSET,e.current)},p=function(e){n&&!e.currentTarget.contains(e.relatedTarget)&&m()},g=function(){f?h.current||(h.current=setTimeout(function(){h.current=0,v()},c)):v()},b=function(e,t){h.current&&(clearTimeout(h.current),h.current=0),t||m()};return(0,o.V)(u,e,d),(0,r.useEffect)(function(){return function(){return clearTimeout(h.current)}},[]),(0,r.useEffect)(function(){n&&s&&t.current&&t.current.focus()},[t,n,s]),{setHover:v,onBlur:p,onPointerMove:g,onPointerLeave:b}}},8711:function(e,t,n){"use strict";n.d(t,{F:function(){return i}});var r=n(7378),o=n(4778),i=function(e,t){var n=(0,r.useRef)(t);(0,r.useEffect)(function(){n.current!==t&&(0,o.Dx)(e,{open:t}),n.current=t},[e,t])}},9547:function(e,t,n){"use strict";n.d(t,{w:function(){return f}});var r=n(7378),o=["preEnter","entering","entered","preExit","exiting","exited","unmounted"],i=function(e){return e?6:5},u=function(e,t,n,r,i){clearTimeout(r.current),t(e),n.current=e,i&&i({state:o[e]})},c=function(e){var t,n,c=void 0===e?{}:e,a=c.enter,s=void 0===a||a,f=c.exit,l=void 0===f||f,d=c.preEnter,h=c.preExit,v=c.timeout,m=c.initialEntered,p=c.mountOnEnter,g=c.unmountOnExit,b=c.onChange,x=(0,r.useState)(m?2:i(p)),y=x[0],w=x[1],R=(0,r.useRef)(y),j=(0,r.useRef)();"object"==typeof v?(t=v.enter,n=v.exit):t=n=v;var C=(0,r.useCallback)(function(){var e;switch(R.current){case 1:case 0:e=2;break;case 4:case 3:e=i(g)}void 0!==e&&u(e,w,R,j,b)},[b,g]),E=(0,r.useCallback)(function(e){var r=function e(r){switch(u(r,w,R,j,b),r){case 1:t>=0&&(j.current=setTimeout(C,t));break;case 4:n>=0&&(j.current=setTimeout(C,n));break;case 0:case 3:j.current=setTimeout(function(){return e(r+1)},0)}},o=R.current<=2;"boolean"!=typeof e&&(e=!o),e?o||r(s?d?0:1:2):o&&r(l?h?3:4:i(g))},[C,b,s,l,d,h,t,n,g]);return(0,r.useEffect)(function(){return function(){return clearTimeout(j.current)}},[]),[o[y],E,C]},a=n(4778),s=n(6367),f=function(e){var t=void 0===e?{}:e,n=t.initialMounted,r=t.unmountOnClose,o=t.transition,i=t.transitionTimeout,u=c({mountOnEnter:!n,unmountOnExit:r,timeout:void 0===i?500:i,enter:(0,a.us)(o,"open"),exit:(0,a.us)(o,"close")}),f=u[0],l=u[1],d=u[2];return[{state:s._f[f],endTransition:d},l]}},7733:function(e,t,n){"use strict";n.d(t,{i:function(){return u}});var r=n(3526),o=n(7378),i=n(9547),u=function(e){var t=(0,i.w)(e),n=t[0],u=t[1],c=(0,o.useState)(),a=c[0],s=c[1],f=function(e,t){s({position:e,alwaysUpdate:t}),u(!0)};return[(0,r.g)({menuItemFocus:a},n),u,f]}},6367:function(e,t,n){"use strict";n.d(t,{$U:function(){return R},AH:function(){return g},Bs:function(){return y},GB:function(){return j},IK:function(){return s},J6:function(){return x},Kk:function(){return o},L1:function(){return b},Lz:function(){return l},R8:function(){return w},Vg:function(){return f},Zi:function(){return h},_X:function(){return m},_f:function(){return E},b7:function(){return p},c9:function(){return v},es:function(){return u},fM:function(){return c},nJ:function(){return i},np:function(){return a},td:function(){return C},uQ:function(){return d}});var r=n(7378),o="szh-menu-container",i="szh-menu",u="szh-menu-button",c="arrow",a="item",s="divider",f="header",l="group",d="submenu",h="radio-group",v=(0,r.createContext)(),m=(0,r.createContext)({}),p=(0,r.createContext)({}),g=(0,r.createContext)({}),b=(0,r.createContext)({}),x=(0,r.createContext)({}),y=(0,r.createContext)({}),w=Object.freeze({ENTER:"Enter",ESC:"Escape",SPACE:" ",HOME:"Home",END:"End",LEFT:"ArrowLeft",RIGHT:"ArrowRight",UP:"ArrowUp",DOWN:"ArrowDown"}),R=Object.freeze({RESET:0,SET:1,UNSET:2,INCREASE:3,DECREASE:4,FIRST:5,LAST:6,SET_INDEX:7}),j=Object.freeze({CLICK:"click",CANCEL:"cancel",BLUR:"blur",SCROLL:"scroll"}),C=Object.freeze({FIRST:"first",LAST:"last"}),E=Object.freeze({entering:"opening",entered:"open",exiting:"closing",exited:"closed"})},4778:function(e,t,n){"use strict";n.d(t,{$7:function(){return m},Dx:function(){return a},GZ:function(){return v},MA:function(){return i},O:function(){return p},dG:function(){return d},dj:function(){return h},eO:function(){return u},oY:function(){return f},tr:function(){return o},us:function(){return c},zi:function(){return l}});var r=n(1542),o=function(e){return!!e&&"o"===e[0]},i=r.unstable_batchedUpdates||function(e){return e()},u=function(e,t,n){return void 0===n&&(n=1e-4),Math.abs(e-t)<n},c=function(e,t){return!0===e||!!(e&&e[t])},a=function(e,t){return"function"==typeof e?e(t):e},s="_szhsinMenu",f=function(e){return e[s]},l=function(e,t){return Object.defineProperty(t,s,{value:e})},d=function(e,t){return t&&Object.keys(t).forEach(function(n){var r=e[n],o=t[n];"function"==typeof o&&r?e[n]=function(){o.apply(void 0,arguments),r.apply(void 0,arguments)}:e[n]=o}),e},h=function(e){if("string"!=typeof e)return{top:0,right:0,bottom:0,left:0};var t=e.trim().split(/\s+/,4).map(parseFloat),n=isNaN(t[0])?0:t[0],r=isNaN(t[1])?n:t[1];return{top:n,right:r,bottom:isNaN(t[2])?n:t[2],left:isNaN(t[3])?r:t[3]}},v=function(e){for(;e;){if(!(e=e.parentNode)||e===document.body)return;var t=getComputedStyle(e),n=t.overflow,r=t.overflowX,o=t.overflowY;if(/auto|scroll|overlay|hidden/.test(n+o+r))return e}};function m(e,t){return{"aria-disabled":e||void 0,tabIndex:t?0:-1}}function p(e,t){for(var n=0;n<e.length;n++)if(e[n]===t)return n;return -1}},5587:function(e,t,n){"use strict";n.d(t,{m:function(){return c}});var r=n(3526),o=n(7378),i=n(6367),u=n(4246),c=function(e,t){var n=(0,o.memo)(t),c=(0,o.forwardRef)(function(e,t){var c=(0,o.useRef)(null);return(0,u.jsx)(n,(0,r.g)({},e,{itemRef:c,externalRef:t,isHovering:(0,o.useContext)(i.c9)===c.current}))});return c.displayName="WithHovering("+e+")",c}},1118:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(2418)}])},2702:function(e){"use strict";e.exports={reactStrictMode:!0,basePath:"/react-menu",eslint:{dirs:["src"]}}},227:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=function(e,t,n,r){return!1},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1551:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4941).Z;n(5753).default,Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(2648).Z,i=n(7273).Z,u=o(n(7378)),c=n(1003),a=n(7795),s=n(4465),f=n(2692),l=n(8245),d=n(9246),h=n(227),v=n(3468),m=new Set;function p(e,t,n,r){if(c.isLocalURL(t)){if(!r.bypassPrefetchedCheck){var o=t+"%"+n+"%"+(void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0);if(m.has(o))return;m.add(o)}Promise.resolve(e.prefetch(t,n,r)).catch(function(e){})}}function g(e){return"string"==typeof e?e:a.formatUrl(e)}var b=u.default.forwardRef(function(e,t){var n,o,a=e.href,m=e.as,b=e.children,x=e.prefetch,y=e.passHref,w=e.replace,R=e.shallow,j=e.scroll,C=e.locale,E=e.onClick,O=e.onMouseEnter,k=e.onTouchStart,S=e.legacyBehavior,N=void 0===S?!0!==Boolean(!0):S,T=i(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=b,N&&("string"==typeof n||"number"==typeof n)&&(n=u.default.createElement("a",null,n));var M=!1!==x,P=u.default.useContext(f.RouterContext),D=u.default.useContext(l.AppRouterContext),_=null!=P?P:D,L=!P,I=u.default.useMemo(function(){if(!P){var e=g(a);return{href:e,as:m?g(m):e}}var t=r(c.resolveHref(P,a,!0),2),n=t[0],o=t[1];return{href:n,as:m?c.resolveHref(P,m):o||n}},[P,a,m]),B=I.href,H=I.as,A=u.default.useRef(B),z=u.default.useRef(H);N&&(o=u.default.Children.only(n));var U=N?o&&"object"==typeof o&&o.ref:t,Z=r(d.useIntersection({rootMargin:"200px"}),3),Y=Z[0],F=Z[1],X=Z[2],$=u.default.useCallback(function(e){(z.current!==H||A.current!==B)&&(X(),z.current=H,A.current=B),Y(e),U&&("function"==typeof U?U(e):"object"==typeof U&&(U.current=e))},[H,U,B,X,Y]);u.default.useEffect(function(){_&&F&&M&&p(_,B,H,{locale:C})},[H,B,F,C,M,null==P?void 0:P.locale,_]);var G={ref:$,onClick:function(e){N||"function"!=typeof E||E(e),N&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(e),_&&!e.defaultPrevented&&function(e,t,n,r,o,i,a,s,f,l){if("A"!==e.currentTarget.nodeName.toUpperCase()||(!(h=(d=e).currentTarget.target)||"_self"===h)&&!d.metaKey&&!d.ctrlKey&&!d.shiftKey&&!d.altKey&&(!d.nativeEvent||2!==d.nativeEvent.which)&&c.isLocalURL(n)){e.preventDefault();var d,h,v=function(){"beforePopState"in t?t[o?"replace":"push"](n,r,{shallow:i,locale:s,scroll:a}):t[o?"replace":"push"](r||n,{forceOptimisticNavigation:!l})};f?u.default.startTransition(v):v()}}(e,_,B,H,w,R,j,C,L,M)},onMouseEnter:function(e){N||"function"!=typeof O||O(e),N&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),_&&(M||!L)&&p(_,B,H,{locale:C,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){N||"function"!=typeof k||k(e),N&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),_&&(M||!L)&&p(_,B,H,{locale:C,priority:!0,bypassPrefetchedCheck:!0})}};if(!N||y||"a"===o.type&&!("href"in o.props)){var J=void 0!==C?C:null==P?void 0:P.locale,K=(null==P?void 0:P.isLocaleDomain)&&h.getDomainLocale(H,J,null==P?void 0:P.locales,null==P?void 0:P.domainLocales);G.href=K||v.addBasePath(s.addLocale(H,J,null==P?void 0:P.defaultLocale))}return N?u.default.cloneElement(o,G):u.default.createElement("a",Object.assign({},T,G),n)});t.default=b,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9246:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4941).Z;Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,n=e.rootMargin,s=e.disabled||!u,f=r(o.useState(!1),2),l=f[0],d=f[1],h=r(o.useState(null),2),v=h[0],m=h[1];return o.useEffect(function(){if(u){if(!s&&!l&&v&&v.tagName){var e,r,o,f,h;return e=function(e){return e&&d(e)},o=(r=function(e){var t,n={root:e.root||null,margin:e.rootMargin||""},r=a.find(function(e){return e.root===n.root&&e.margin===n.margin});if(r&&(t=c.get(r)))return t;var o=new Map;return t={id:n,observer:new IntersectionObserver(function(e){e.forEach(function(e){var t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e),elements:o},a.push(n),c.set(n,t),t}({root:null==t?void 0:t.current,rootMargin:n})).id,f=r.observer,(h=r.elements).set(v,e),f.observe(v),function(){if(h.delete(v),f.unobserve(v),0===h.size){f.disconnect(),c.delete(o);var e=a.findIndex(function(e){return e.root===o.root&&e.margin===o.margin});e>-1&&a.splice(e,1)}}}}else if(!l){var m=i.requestIdleCallback(function(){return d(!0)});return function(){return i.cancelIdleCallback(m)}}},[v,s,n,t,l]),[m,l,o.useCallback(function(){d(!1)},[])]};var o=n(7378),i=n(4686),u="function"==typeof IntersectionObserver,c=new Map,a=[];("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1305:function(e,t,n){"use strict";n.d(t,{T:function(){return f}});var r=n(4246),o=n(7378),i=n(979),u=n(4666),c=n(3542),a=n(4457),s=n(3185),f=o.memo(function(){var e=(0,r.jsxs)("div",{className:"app-logo",children:["React-Menu",(0,r.jsxs)("div",{className:"version",children:["v",s.i8]}),(0,r.jsx)("i",{className:"material-icons drop-down",children:"arrow_drop_down"})]});return(0,r.jsxs)(i.v,{initialMounted:!0,menuButton:e,offsetY:10,theming:o.useContext(s.Y7).theme,className:"version-menu",children:[(0,r.jsx)(u.t,{children:"Version history"}),(0,r.jsx)(c.s,{href:"https://szhsin.github.io/react-menu-v2",children:"v2.3.x"}),(0,r.jsx)(c.s,{href:"https://szhsin.github.io/react-menu-v1",children:"v1.11.x"}),(0,r.jsx)(a.R,{}),(0,r.jsx)(u.t,{children:"Migration guide"}),(0,r.jsx)(c.s,{href:"https://github.com/szhsin/react-menu/wiki/Migration-from-v2-to-v3",children:"v2 to v3"}),(0,r.jsx)(c.s,{href:"https://github.com/szhsin/react-menu/wiki/Migration-from-v1-to-v2",children:"v1 to v2"})]})})},2254:function(e,t,n){"use strict";n.d(t,{R:function(){return u}});var r=n(4246),o=n(7378),i=n(3185),u=o.memo(function(){var e=(0,o.useContext)(i.Y7),t=e.isDark,n=e.theme,u=e.setTheme;return(0,r.jsx)("input",{className:(0,i.PH)("theme-switch",null,{theme:n}),type:"checkbox",onChange:function(e){return u(e.target.checked?"dark":"light")},checked:t})})},2418:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return j}});var r=n(1799),o=n(4246);n(55),n(8532),n(7977),n(4366);var i=n(9008),u=n.n(i),c=n(828),a=n(7378),s=n(1163),f=n(3185),l=n(9396),d=n(1664),h=n.n(d),v=n(2702),m=n(1305);function p(e){var t=e.onClose,n=(0,a.useContext)(f.Bu).vWidth>700;return(0,o.jsxs)("div",{className:"header-banner",role:"alert",children:[n&&(0,o.jsxs)("span",{className:"banner-text",children:["This website is for React-Menu v",f.i8]}),(0,o.jsx)("a",{href:"https://szhsin.github.io/react-menu/",children:n?"You can find the latest version here.":"Visit the latest version"}),(0,o.jsx)("i",{className:"close-btn material-icons",onClick:t,children:"close"})]})}var g=n(2254),b="navbar",x=a.memo(function(){var e=(0,a.useContext)(f.Y7),t=e.theme,n=e.isDark,r=e.showBanner,i=e.setShowBanner,u=(0,a.useContext)(f.dJ).setTocOpen;return(0,o.jsxs)("header",{id:"header",children:[r&&(0,o.jsx)(p,{onClose:function(){return i(!1)}}),(0,o.jsxs)("nav",{className:(0,f.PH)(b,null,{theme:t}),"aria-label":"Site",children:[(0,o.jsx)("button",{className:(0,f.PH)(b,"toggle"),"aria-label":"Open table of contents",onClick:function(){return u(!0)},children:(0,o.jsx)("i",{className:"material-icons",children:"menu"})}),(0,o.jsx)(m.T,{}),(0,o.jsxs)("ul",{className:(0,f.PH)(b,"link-list"),children:[(0,o.jsx)(y,{href:"/",children:"Home"}),(0,o.jsx)(y,{href:"/docs",children:"Docs"}),(0,o.jsx)(y,{href:"/style-guide",children:"Styling"})]}),(0,o.jsx)(g.R,{}),(0,o.jsx)("a",{className:(0,f.PH)(b,"github"),title:"GitHub",href:"https://github.com/szhsin/react-menu",target:"_blank",rel:"noopener noreferrer",children:(0,o.jsx)("img",{src:"".concat(v.basePath,"/GitHub-Mark-").concat(n?"Light-":"","64px.png"),alt:"GitHub"})})]})]})});function y(e){var t=e.href,n=e.children,i=(0,s.useRouter)().pathname;return(0,o.jsx)("li",{className:(0,f.PH)(b,"link"),children:(0,o.jsx)(h(),(0,l.Z)((0,r.Z)({href:t},t===i?{"aria-current":"page",className:"active"}:void 0),{children:n}))})}var w=a.memo(function(){var e=(0,a.useContext)(f.Y7).isDark,t=(0,c.Z)((0,a.useState)("-"),2),n=t[0],r=t[1];return(0,a.useEffect)(function(){fetch("https://api.github.com/repos/szhsin/react-menu").then(function(e){return e.json()}).then(function(e){return r(e.stargazers_count.toLocaleString("en-US"))}).catch(function(e){return console.error(e)})},[]),(0,o.jsxs)("footer",{id:"footer",children:[(0,o.jsxs)("div",{className:"github",children:[(0,o.jsxs)("a",{className:"github-btn left",title:"GitHub",href:"https://github.com/szhsin/react-menu",target:"_blank",rel:"noopener noreferrer",children:[(0,o.jsx)("img",{className:"github-img",src:"".concat(v.basePath,"/GitHub-Mark-").concat(e?"Light-":"","32px.png"),alt:"GitHub"}),"Star"]}),(0,o.jsx)("a",{className:"github-btn right",title:"Stargazers",href:"https://github.com/szhsin/react-menu/stargazers",target:"_blank",rel:"noopener noreferrer",children:n})]}),(0,o.jsx)("p",{children:"Released under the MIT License."}),(0,o.jsxs)("p",{children:["Copyright \xa9 ",new Date().getFullYear()," Zheng Song."]}),(0,o.jsxs)("p",{className:"build",children:[f.i8,"+",f.J_]})]})}),R=function(e){var t=e.children,n=(0,c.Z)((0,a.useState)(!1),2),r=n[0],i=n[1],u=(0,c.Z)((0,a.useState)("dark"),2),l=u[0],d=u[1],h=(0,a.useCallback)(function(e){d(e),document.body.className=(0,f.PH)("szh-app",null,{theme:e});try{localStorage.setItem("theme",e)}catch(t){console.warn(t)}},[]),v=(0,a.useMemo)(function(){return{isDark:"dark"===l,theme:l,setTheme:h,showBanner:r,setShowBanner:i}},[l,h,r]);(0,f.bt)(function(){try{var e=localStorage.getItem("theme");"light"===e&&(d(e),document.body.className=(0,f.PH)("szh-app",null,{theme:e}))}catch(t){console.warn(t)}},[]);var m=(0,c.Z)((0,a.useState)(!1),2),p=m[0],g=m[1],b=(0,a.useMemo)(function(){return{isTocOpen:p,setTocOpen:g}},[p]),y=(0,c.Z)((0,a.useState)({}),2),R=y[0],j=y[1];(0,a.useEffect)(function(){var e=function(){var e={vWidth:document.documentElement.clientWidth,vHeight:window.innerHeight,navbarHeight:document.querySelector("#header").offsetHeight};e.vWidth>950&&g(!1),j(e)};return e(),window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}},[r]);var C=(0,c.Z)((0,a.useState)(null),2),E=C[0],O=C[1];(0,a.useEffect)(function(){if(E){var e=setTimeout(function(){return O(null)},2500);return function(){return clearTimeout(e)}}},[E]);var k=(0,s.useRouter)();return(0,a.useEffect)(function(){g(!1)},[k]),(0,o.jsx)(f.Bu.Provider,{value:R,children:(0,o.jsx)(f.Y7.Provider,{value:v,children:(0,o.jsx)(f.dJ.Provider,{value:b,children:(0,o.jsxs)(f.uL.Provider,{value:O,children:[(0,o.jsx)(x,{}),(0,o.jsx)("div",{id:"content",style:r?{marginTop:40}:void 0,children:t}),(0,o.jsx)(w,{}),E&&(0,o.jsx)("div",{className:(0,f.PH)("szh-app","toast"),role:"alert",children:E})]})})})})},j=function(e){var t=e.Component,n=e.pageProps;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(u(),{children:[(0,o.jsx)("title",{children:"React menu component - szhsin/react-menu"}),(0,o.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"})]}),(0,o.jsx)(R,{children:(0,o.jsx)(t,(0,r.Z)({},n))})]})}},3185:function(e,t,n){"use strict";n.d(t,{Bu:function(){return s},J_:function(){return a},PH:function(){return h},Y7:function(){return f},_5:function(){return v},bt:function(){return m},dJ:function(){return l},i8:function(){return c},uL:function(){return d}});var r=n(1799),o=n(9396),i=n(4246),u=n(7378),c="3.2.1",a="116",s=u.createContext({}),f=u.createContext({theme:"dark"}),l=u.createContext({}),d=u.createContext(function(){}),h=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=t?"".concat(e,"__").concat(t):e,o=r,i=!0,u=!1,c=void 0;try{for(var a,s=Object.keys(n)[Symbol.iterator]();!(i=(a=s.next()).done);i=!0){var f=a.value,l=n[f];l&&(o+=" ".concat(r,"--"),o+=!0===l?f:"".concat(f,"-").concat(l))}}catch(d){u=!0,c=d}finally{try{i||null==s.return||s.return()}finally{if(u)throw c}}return o},v=function(e){return function(t){return(0,i.jsx)(e,(0,o.Z)((0,r.Z)({},t),{transition:!0,theming:u.useContext(f).theme}))}},m=void 0!==window.document&&void 0!==window.document.createElement?u.useLayoutEffect:u.useEffect},55:function(){},8532:function(){},7977:function(){},4366:function(){},9008:function(e,t,n){e.exports=n(3121)},1664:function(e,t,n){e.exports=n(1551)},1163:function(e,t,n){e.exports=n(880)},943:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,{Z:function(){return r}})},3375:function(e,t,n){"use strict";function r(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}n.d(t,{Z:function(){return r}})},1799:function(e,t,n){"use strict";function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){var r,o;r=e,o=n[t],t in r?Object.defineProperty(r,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[t]=o})}return e}n.d(t,{Z:function(){return r}})},9396:function(e,t,n){"use strict";function r(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n})(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}n.d(t,{Z:function(){return r}})},828:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(3375),o=n(1566);function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||(0,r.Z)(e,t)||(0,o.Z)(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},1566:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(943);function o(e,t){if(e){if("string"==typeof e)return(0,r.Z)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return(0,r.Z)(e,t)}}}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return t(1118),t(880)}),_N_E=e.O()}]);