(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[761],{2703:function(e,n,t){"use strict";var a=t(414);function i(){}function r(){}r.resetWarningCache=i,e.exports=function(){function e(e,n,t,i,r,s){if(s!==a){var o=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw o.name="Invariant Violation",o}}function n(){return e}e.isRequired=e;var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,elementType:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:r,resetWarningCache:i};return t.PropTypes=t,t}},5697:function(e,n,t){e.exports=t(2703)()},414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},3390:function(e){var n={exports:{}};function t(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(function(n){var a=e[n];"object"!=typeof a||Object.isFrozen(a)||t(a)}),e}n.exports=t,n.exports.default=t;class a{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function i(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function r(e,...n){let t=Object.create(null);for(let a in e)t[a]=e[a];return n.forEach(function(e){for(let n in e)t[n]=e[n]}),t}let s=e=>!!e.scope||e.sublanguage&&e.language,o=(e,{prefix:n})=>{if(e.includes(".")){let t=e.split(".");return[`${n}${t.shift()}`,...t.map((e,n)=>`${e}${"_".repeat(n+1)}`)].join(" ")}return`${n}${e}`};class l{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=i(e)}openNode(e){if(!s(e))return;let n="";n=e.sublanguage?`language-${e.language}`:o(e.scope,{prefix:this.classPrefix}),this.span(n)}closeNode(e){s(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}let c=(e={})=>{let n={children:[]};return Object.assign(n,e),n};class u{constructor(){this.rootNode=c(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){let n=c({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return"string"==typeof n?e.addText(n):n.children&&(e.openNode(n),n.children.forEach(n=>this._walk(e,n)),e.closeNode(n)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every(e=>"string"==typeof e)?e.children=[e.children.join("")]:e.children.forEach(e=>{u._collapse(e)}))}}class g extends u{constructor(e){super(),this.options=e}addKeyword(e,n){""!==e&&(this.openNode(n),this.addText(e),this.closeNode())}addText(e){""!==e&&this.add(e)}addSublanguage(e,n){let t=e.root;t.sublanguage=!0,t.language=n,this.add(t)}toHTML(){let e=new l(this,this.options);return e.value()}finalize(){return!0}}function d(e){return e?"string"==typeof e?e:e.source:null}function h(e){return p("(?=",e,")")}function f(e){return p("(?:",e,")*")}function b(e){return p("(?:",e,")?")}function p(...e){let n=e.map(e=>d(e)).join("");return n}function m(...e){let n=function(e){let n=e[e.length-1];return"object"==typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}}(e),t="("+(n.capture?"":"?:")+e.map(e=>d(e)).join("|")+")";return t}function y(e){return RegExp(e.toString()+"|").exec("").length-1}let E=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function _(e,{joinWith:n}){let t=0;return e.map(e=>{t+=1;let n=t,a=d(e),i="";for(;a.length>0;){let r=E.exec(a);if(!r){i+=a;break}i+=a.substring(0,r.index),a=a.substring(r.index+r[0].length),"\\"===r[0][0]&&r[1]?i+="\\"+String(Number(r[1])+n):(i+=r[0],"("===r[0]&&t++)}return i}).map(e=>`(${e})`).join(n)}let x="[a-zA-Z]\\w*",w="[a-zA-Z_]\\w*",v="\\b\\d+(\\.\\d+)?",N="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",O="\\b(0b[01]+)",A=(e={})=>{let n=/^#![ ]*\//;return e.binary&&(e.begin=p(n,/.*\b/,e.binary,/\b.*/)),r({scope:"meta",begin:n,end:/$/,relevance:0,"on:begin"(e,n){0!==e.index&&n.ignoreMatch()}},e)},S={begin:"\\\\[\\s\\S]",relevance:0},k=function(e,n,t={}){let a=r({scope:"comment",begin:e,end:n,contains:[]},t);a.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let i=m("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return a.contains.push({begin:p(/[ ]+/,"(",i,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),a},R=k("//","$"),M=k("/\\*","\\*/"),T=k("#","$"),I=function(e){return Object.assign(e,{"on:begin"(e,n){n.data._beginMatch=e[1]},"on:end"(e,n){n.data._beginMatch!==e[1]&&n.ignoreMatch()}})};var j=Object.freeze({__proto__:null,MATCH_NOTHING_RE:/\b\B/,IDENT_RE:x,UNDERSCORE_IDENT_RE:w,NUMBER_RE:v,C_NUMBER_RE:N,BINARY_NUMBER_RE:O,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:A,BACKSLASH_ESCAPE:S,APOS_STRING_MODE:{scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[S]},QUOTE_STRING_MODE:{scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[S]},PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},COMMENT:k,C_LINE_COMMENT_MODE:R,C_BLOCK_COMMENT_MODE:M,HASH_COMMENT_MODE:T,NUMBER_MODE:{scope:"number",begin:v,relevance:0},C_NUMBER_MODE:{scope:"number",begin:N,relevance:0},BINARY_NUMBER_MODE:{scope:"number",begin:O,relevance:0},REGEXP_MODE:{begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[S,{begin:/\[/,end:/\]/,relevance:0,contains:[S]}]}]},TITLE_MODE:{scope:"title",begin:x,relevance:0},UNDERSCORE_TITLE_MODE:{scope:"title",begin:w,relevance:0},METHOD_GUARD:{begin:"\\.\\s*"+w,relevance:0},END_SAME_AS_BEGIN:I});function L(e,n){let t=e.input[e.index-1];"."===t&&n.ignoreMatch()}function B(e,n){void 0!==e.className&&(e.scope=e.className,delete e.className)}function C(e,n){n&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=L,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function P(e,n){Array.isArray(e.illegal)&&(e.illegal=m(...e.illegal))}function D(e,n){if(e.match){if(e.begin||e.end)throw Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function $(e,n){void 0===e.relevance&&(e.relevance=1)}let U=(e,n)=>{if(!e.beforeMatch)return;if(e.starts)throw Error("beforeMatch cannot be used with starts");let t=Object.assign({},e);Object.keys(e).forEach(n=>{delete e[n]}),e.keywords=t.keywords,e.begin=p(t.beforeMatch,h(t.begin)),e.starts={relevance:0,contains:[Object.assign(t,{endsParent:!0})]},e.relevance=0,delete t.beforeMatch},z=["of","and","for","in","not","or","if","then","parent","list","value"],H={},Z=e=>{console.error(e)},G=(e,...n)=>{console.log(`WARN: ${e}`,...n)},K=(e,n)=>{H[`${e}/${n}`]||(console.log(`Deprecated as of ${e}. ${n}`),H[`${e}/${n}`]=!0)},F=Error();function W(e,n,{key:t}){let a=0,i=e[t],r={},s={};for(let o=1;o<=n.length;o++)s[o+a]=i[o],r[o+a]=!0,a+=y(n[o-1]);e[t]=s,e[t]._emit=r,e[t]._multi=!0}function X(e){var n;(n=e).scope&&"object"==typeof n.scope&&null!==n.scope&&(n.beginScope=n.scope,delete n.scope),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw Z("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),F;if("object"!=typeof e.beginScope||null===e.beginScope)throw Z("beginScope must be object"),F;W(e,e.begin,{key:"beginScope"}),e.begin=_(e.begin,{joinWith:""})}}(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw Z("skip, excludeEnd, returnEnd not compatible with endScope: {}"),F;if("object"!=typeof e.endScope||null===e.endScope)throw Z("endScope must be object"),F;W(e,e.end,{key:"endScope"}),e.end=_(e.end,{joinWith:""})}}(e)}class J extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}let V=Symbol("nomatch");var q=function(e){let t=Object.create(null),s=Object.create(null),o=[],l=!0,c="Could not find the language '{}', did you forget to load/include a language module?",u={disableAutodetect:!0,name:"Plain text",contains:[]},E={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:g};function x(e){return E.noHighlightRe.test(e)}function w(e,n,t){let a="",i="";"object"==typeof n?(a=e,t=n.ignoreIllegals,i=n.language):(K("10.7.0","highlight(lang, code, ...args) has been deprecated."),K("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),i=e,a=n),void 0===t&&(t=!0);let r={code:a,language:i};I("before:highlight",r);let s=r.result?r.result:v(r.language,r.code,t);return s.code=r.code,I("after:highlight",s),s}function v(e,n,s,o){let u=Object.create(null);function g(){if(!A.keywords){k.addText(M);return}let e=0;A.keywordPatternRe.lastIndex=0;let n=A.keywordPatternRe.exec(M),t="";for(;n;){t+=M.substring(e,n.index);let a=x.case_insensitive?n[0].toLowerCase():n[0],i=A.keywords[a];if(i){let[r,s]=i;if(k.addText(t),t="",u[a]=(u[a]||0)+1,u[a]<=7&&(T+=s),r.startsWith("_"))t+=n[0];else{let o=x.classNameAliases[r]||r;k.addKeyword(n[0],o)}}else t+=n[0];e=A.keywordPatternRe.lastIndex,n=A.keywordPatternRe.exec(M)}t+=M.substring(e),k.addText(t)}function h(){null!=A.subLanguage?function(){if(""===M)return;let e=null;if("string"==typeof A.subLanguage){if(!t[A.subLanguage]){k.addText(M);return}e=v(A.subLanguage,M,!0,S[A.subLanguage]),S[A.subLanguage]=e._top}else e=N(M,A.subLanguage.length?A.subLanguage:null);A.relevance>0&&(T+=e.relevance),k.addSublanguage(e._emitter,e.language)}():g(),M=""}function f(e,n){let t=1,a=n.length-1;for(;t<=a;){if(!e._emit[t]){t++;continue}let i=x.classNameAliases[e[t]]||e[t],r=n[t];i?k.addKeyword(r,i):(M=r,g(),M=""),t++}}function b(e,n){return e.scope&&"string"==typeof e.scope&&k.openNode(x.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(k.addKeyword(M,x.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),M=""):e.beginScope._multi&&(f(e.beginScope,n),M="")),A=Object.create(e,{parent:{value:A}})}let p={};function m(t,i){let r=i&&i[0];if(M+=t,null==r)return h(),0;if("begin"===p.type&&"end"===i.type&&p.index===i.index&&""===r){if(M+=n.slice(i.index,i.index+1),!l){let o=Error(`0 width match regex (${e})`);throw o.languageName=e,o.badRule=p.rule,o}return 1}if(p=i,"begin"===i.type)return function(e){let n=e[0],t=e.rule,i=new a(t),r=[t.__beforeBegin,t["on:begin"]];for(let s of r)if(s&&(s(e,i),i.isMatchIgnored))return 0===A.matcher.regexIndex?(M+=n[0],1):(L=!0,0);return t.skip?M+=n:(t.excludeBegin&&(M+=n),h(),t.returnBegin||t.excludeBegin||(M=n)),b(t,e),t.returnBegin?0:n.length}(i);if("illegal"!==i.type||s){if("end"===i.type){let c=function(e){let t=e[0],i=n.substring(e.index),r=function e(n,t,i){let r=function(e,n){let t=e&&e.exec(n);return t&&0===t.index}(n.endRe,i);if(r){if(n["on:end"]){let s=new a(n);n["on:end"](t,s),s.isMatchIgnored&&(r=!1)}if(r){for(;n.endsParent&&n.parent;)n=n.parent;return n}}if(n.endsWithParent)return e(n.parent,t,i)}(A,e,i);if(!r)return V;let s=A;A.endScope&&A.endScope._wrap?(h(),k.addKeyword(t,A.endScope._wrap)):A.endScope&&A.endScope._multi?(h(),f(A.endScope,e)):s.skip?M+=t:(s.returnEnd||s.excludeEnd||(M+=t),h(),s.excludeEnd&&(M=t));do A.scope&&k.closeNode(),A.skip||A.subLanguage||(T+=A.relevance),A=A.parent;while(A!==r.parent);return r.starts&&b(r.starts,e),s.returnEnd?0:t.length}(i);if(c!==V)return c}}else{let u=Error('Illegal lexeme "'+r+'" for mode "'+(A.scope||"<unnamed>")+'"');throw u.mode=A,u}if("illegal"===i.type&&""===r)return 1;if(j>1e5&&j>3*i.index){let g=Error("potential infinite loop, way more iterations than matches");throw g}return M+=r,r.length}let x=R(e);if(!x)throw Z(c.replace("{}",e)),Error('Unknown language: "'+e+'"');let w=function(e){function n(n,t){return RegExp(d(n),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(t?"g":""))}class t{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,n){n.position=this.position++,this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),this.matchAt+=y(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);let e=this.regexes.map(e=>e[1]);this.matcherRe=n(_(e,{joinWith:"|"}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;let n=this.matcherRe.exec(e);if(!n)return null;let t=n.findIndex((e,n)=>n>0&&void 0!==e),a=this.matchIndexes[t];return n.splice(0,t),Object.assign(n,a)}}class a{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];let n=new t;return this.rules.slice(e).forEach(([e,t])=>n.addRule(e,t)),n.compile(),this.multiRegexes[e]=n,n}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,n){this.rules.push([e,n]),"begin"===n.type&&this.count++}exec(e){let n=this.getMatcher(this.regexIndex);n.lastIndex=this.lastIndex;let t=n.exec(e);if(this.resumingScanAtSamePosition()){if(t&&t.index===this.lastIndex);else{let a=this.getMatcher(0);a.lastIndex=this.lastIndex+1,t=a.exec(e)}}return t&&(this.regexIndex+=t.position+1,this.regexIndex===this.count&&this.considerAll()),t}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=r(e.classNameAliases||{}),function t(i,s){let o=i;if(i.isCompiled)return o;[B,D,X,U].forEach(e=>e(i,s)),e.compilerExtensions.forEach(e=>e(i,s)),i.__beforeBegin=null,[C,P,$].forEach(e=>e(i,s)),i.isCompiled=!0;let l=null;return"object"==typeof i.keywords&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=function e(n,t,a="keyword"){let i=Object.create(null);return"string"==typeof n?r(a,n.split(" ")):Array.isArray(n)?r(a,n):Object.keys(n).forEach(function(a){Object.assign(i,e(n[a],t,a))}),i;function r(e,n){t&&(n=n.map(e=>e.toLowerCase())),n.forEach(function(n){var t,a;let r=n.split("|");i[r[0]]=[e,(t=r[0],(a=r[1])?Number(a):z.includes(t.toLowerCase())?0:1)]})}}(i.keywords,e.case_insensitive)),o.keywordPatternRe=n(l,!0),s&&(i.begin||(i.begin=/\B|\b/),o.beginRe=n(o.begin),i.end||i.endsWithParent||(i.end=/\B|\b/),i.end&&(o.endRe=n(o.end)),o.terminatorEnd=d(o.end)||"",i.endsWithParent&&s.terminatorEnd&&(o.terminatorEnd+=(i.end?"|":"")+s.terminatorEnd)),i.illegal&&(o.illegalRe=n(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(e){var n;return((n="self"===e?i:e).variants&&!n.cachedVariants&&(n.cachedVariants=n.variants.map(function(e){return r(n,{variants:null},e)})),n.cachedVariants)?n.cachedVariants:!function e(n){return!!n&&(n.endsWithParent||e(n.starts))}(n)?Object.isFrozen(n)?r(n):n:r(n,{starts:n.starts?r(n.starts):null})})),i.contains.forEach(function(e){t(e,o)}),i.starts&&t(i.starts,s),o.matcher=function(e){let n=new a;return e.contains.forEach(e=>n.addRule(e.begin,{rule:e,type:"begin"})),e.terminatorEnd&&n.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n}(o),o}(e)}(x),O="",A=o||w,S={},k=new E.__emitter(E);!function(){let e=[];for(let n=A;n!==x;n=n.parent)n.scope&&e.unshift(n.scope);e.forEach(e=>k.openNode(e))}();let M="",T=0,I=0,j=0,L=!1;try{for(A.matcher.considerAll();;){j++,L?L=!1:A.matcher.considerAll(),A.matcher.lastIndex=I;let H=A.matcher.exec(n);if(!H)break;let G=n.substring(I,H.index),K=m(G,H);I=H.index+K}return m(n.substring(I)),k.closeAllNodes(),k.finalize(),O=k.toHTML(),{language:e,value:O,relevance:T,illegal:!1,_emitter:k,_top:A}}catch(F){if(F.message&&F.message.includes("Illegal"))return{language:e,value:i(n),illegal:!0,relevance:0,_illegalBy:{message:F.message,index:I,context:n.slice(I-100,I+100),mode:F.mode,resultSoFar:O},_emitter:k};if(l)return{language:e,value:i(n),illegal:!1,relevance:0,errorRaised:F,_emitter:k,_top:A};throw F}}function N(e,n){n=n||E.languages||Object.keys(t);let a=function(e){let n={value:i(e),illegal:!1,relevance:0,_top:u,_emitter:new E.__emitter(E)};return n._emitter.addText(e),n}(e),r=n.filter(R).filter(T).map(n=>v(n,e,!1));r.unshift(a);let s=r.sort((e,n)=>{if(e.relevance!==n.relevance)return n.relevance-e.relevance;if(e.language&&n.language){if(R(e.language).supersetOf===n.language)return 1;if(R(n.language).supersetOf===e.language)return -1}return 0}),[o,l]=s,c=o;return c.secondBest=l,c}function O(e){let n=null,t=function(e){let n=e.className+" ";n+=e.parentNode?e.parentNode.className:"";let t=E.languageDetectRe.exec(n);if(t){let a=R(t[1]);return a||(G(c.replace("{}",t[1])),G("Falling back to no-highlight mode for this block.",e)),a?t[1]:"no-highlight"}return n.split(/\s+/).find(e=>x(e)||R(e))}(e);if(x(t))return;if(I("before:highlightElement",{el:e,language:t}),e.children.length>0&&(E.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(e)),E.throwUnescapedHTML)){let a=new J("One of your code blocks includes unescaped HTML.",e.innerHTML);throw a}n=e;let i=n.textContent,r=t?w(i,{language:t,ignoreIllegals:!0}):N(i);e.innerHTML=r.value,function(e,n,t){let a=n&&s[n]||t;e.classList.add("hljs"),e.classList.add(`language-${a}`)}(e,t,r.language),e.result={language:r.language,re:r.relevance,relevance:r.relevance},r.secondBest&&(e.secondBest={language:r.secondBest.language,relevance:r.secondBest.relevance}),I("after:highlightElement",{el:e,result:r,text:i})}let A=()=>{k(),K("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},S=!1;function k(){if("loading"===document.readyState){S=!0;return}let e=document.querySelectorAll(E.cssSelector);e.forEach(O)}function R(e){return t[e=(e||"").toLowerCase()]||t[s[e]]}function M(e,{languageName:n}){"string"==typeof e&&(e=[e]),e.forEach(e=>{s[e.toLowerCase()]=n})}function T(e){let n=R(e);return n&&!n.disableAutodetect}function I(e,n){o.forEach(function(t){t[e]&&t[e](n)})}for(let L in"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",function(){S&&k()},!1),Object.assign(e,{highlight:w,highlightAuto:N,highlightAll:k,highlightElement:O,highlightBlock:function(e){return K("10.7.0","highlightBlock will be removed entirely in v12.0"),K("10.7.0","Please use highlightElement now."),O(e)},configure:function(e){E=r(E,e)},initHighlighting:A,initHighlightingOnLoad:function(){k(),K("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(n,a){let i=null;try{i=a(e)}catch(r){if(Z("Language definition for '{}' could not be registered.".replace("{}",n)),l)Z(r);else throw r;i=u}i.name||(i.name=n),t[n]=i,i.rawDefinition=a.bind(null,e),i.aliases&&M(i.aliases,{languageName:n})},unregisterLanguage:function(e){for(let n of(delete t[e],Object.keys(s)))s[n]===e&&delete s[n]},listLanguages:function(){return Object.keys(t)},getLanguage:R,registerAliases:M,autoDetection:T,inherit:r,addPlugin:function(e){var n;(n=e)["before:highlightBlock"]&&!n["before:highlightElement"]&&(n["before:highlightElement"]=e=>{n["before:highlightBlock"](Object.assign({block:e.el},e))}),n["after:highlightBlock"]&&!n["after:highlightElement"]&&(n["after:highlightElement"]=e=>{n["after:highlightBlock"](Object.assign({block:e.el},e))}),o.push(e)}}),e.debugMode=function(){l=!1},e.safeMode=function(){l=!0},e.versionString="11.6.0",e.regex={concat:p,lookahead:h,either:m,optional:b,anyNumberOfTimes:f},j)"object"==typeof j[L]&&n.exports(j[L]);return Object.assign(e,j),e}({});e.exports=q,q.HighlightJS=q,q.default=q},9534:function(e,n,t){"use strict";function a(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}t.d(n,{Z:function(){return a}})},6305:function(e,n,t){"use strict";t.d(n,{Z:function(){return s}});var a=t(943),i=t(3375),r=t(1566);function s(e){return function(e){if(Array.isArray(e))return(0,a.Z)(e)}(e)||(0,i.Z)(e)||(0,r.Z)(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},837:function(e,n,t){"use strict";var a=t(3390);n.Z=a},9622:function(e,n,t){"use strict";t.d(n,{Z:function(){return g}});let a="[A-Za-z$_][0-9A-Za-z$_]*",i=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],r=["true","false","null","undefined","NaN","Infinity"],s=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],o=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],l=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],c=["arguments","this","super","console","window","document","localStorage","module","global"],u=[].concat(l,s,o);function g(e){var n;let t=e.regex,g=(e,{after:n})=>{let t="</"+e[0].slice(1),a=e.input.indexOf(t,n);return -1!==a},d={begin:"<>",end:"</>"},h={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag(e,n){let t;let a=e[0].length+e.index,i=e.input[a];if("<"===i||","===i){n.ignoreMatch();return}">"!==i||g(e,{after:a})||n.ignoreMatch();let r=e.input.substring(a);if((t=r.match(/^\s+extends\s+/))&&0===t.index){n.ignoreMatch();return}}},f={$pattern:a,keyword:i,literal:r,built_in:u,"variable.language":c},b="[0-9](_?[0-9])*",p=`\\.(${b})`,m="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",y={className:"number",variants:[{begin:`(\\b(${m})((${p})|\\.)?|(${p}))[eE][+-]?(${b})\\b`},{begin:`\\b(${m})\\b((${p})\\b|\\.)?|(${p})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},E={className:"subst",begin:"\\$\\{",end:"\\}",keywords:f,contains:[]},_={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,E],subLanguage:"xml"}},x={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,E],subLanguage:"css"}},w={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,E]},v=e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:a+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),N={className:"comment",variants:[v,e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},O=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,_,x,w,y];E.contains=O.concat({begin:/\{/,end:/\}/,keywords:f,contains:["self"].concat(O)});let A=[].concat(N,E.contains),S=A.concat([{begin:/\(/,end:/\)/,keywords:f,contains:["self"].concat(A)}]),k={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:f,contains:S},R={variants:[{match:[/class/,/\s+/,a,/\s+/,/extends/,/\s+/,t.concat(a,"(",t.concat(/\./,a),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,a],scope:{1:"keyword",3:"title.class"}}]},M={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...s,...o]}},T={match:t.concat(/\b/,(n=[...l,"super"],t.concat("(?!",n.join("|"),")")),a,t.lookahead(/\(/)),className:"title.function",relevance:0},I={begin:t.concat(/\./,t.lookahead(t.concat(a,/(?![0-9A-Za-z$_(])/))),end:a,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},j="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",L={match:[/const|var|let/,/\s+/,a,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(j)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[k]};return{name:"Javascript",aliases:["js","jsx","mjs","cjs"],keywords:f,exports:{PARAMS_CONTAINS:S,CLASS_REFERENCE:M},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,_,x,w,N,y,M,{className:"attr",begin:a+t.lookahead(":"),relevance:0},L,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[N,e.REGEXP_MODE,{className:"function",begin:j,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:f,contains:S}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:d.begin,end:d.end},{match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:h.begin,"on:begin":h.isTrulyOpeningTag,end:h.end}],subLanguage:"xml",contains:[{begin:h.begin,end:h.end,skip:!0,contains:["self"]}]}]},{variants:[{match:[/function/,/\s+/,a,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[k],illegal:/%/},{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[k,e.inherit(e.TITLE_MODE,{begin:a,className:"title.function"})]},{match:/\.\.\./,relevance:0},I,{match:"\\$"+a,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[k]},T,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"},R,{match:[/get|set/,/\s+/,a,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},k]},{match:/\$[(.]/}]}}},1042:function(e,n,t){"use strict";function a(e){let n=e.regex,t=n.concat(/[\p{L}_]/u,n.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),a={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},i={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},r=e.inherit(i,{begin:/\(/,end:/\)/}),s=e.inherit(e.APOS_STRING_MODE,{className:"string"}),o=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),l={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:/[\p{L}0-9._:-]+/u,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[a]},{begin:/'/,end:/'/,contains:[a]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[i,o,s,r,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[i,r,o,s]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},a,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[o]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[l],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[l],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:n.concat(/</,n.lookahead(n.concat(t,n.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:t,relevance:0,starts:l}]},{className:"tag",begin:n.concat(/<\//,n.lookahead(n.concat(t,/>/))),contains:[{className:"name",begin:t,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}t.d(n,{Z:function(){return a}})}}]);