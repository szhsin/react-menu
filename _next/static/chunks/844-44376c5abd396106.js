(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[844],{2703:function(e,n,t){"use strict";var i=t(414);function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction,e.exports=function(){function shim(e,n,t,a,r,s){if(s!==i){var o=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw o.name="Invariant Violation",o}}function getShim(){return shim}shim.isRequired=shim;var e={array:shim,bigint:shim,bool:shim,func:shim,number:shim,object:shim,string:shim,symbol:shim,any:shim,arrayOf:getShim,element:shim,elementType:shim,instanceOf:getShim,node:shim,objectOf:getShim,oneOf:getShim,oneOfType:getShim,shape:getShim,exact:getShim,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};return e.PropTypes=e,e}},5697:function(e,n,t){e.exports=t(2703)()},414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},3390:function(e){let Response=class Response{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function escapeHTML(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function inherit$1(e,...n){let t=Object.create(null);for(let n in e)t[n]=e[n];return n.forEach(function(e){for(let n in e)t[n]=e[n]}),t}let emitsWrappingTags=e=>!!e.scope,scopeToCSSClass=(e,{prefix:n})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let t=e.split(".");return[`${n}${t.shift()}`,...t.map((e,n)=>`${e}${"_".repeat(n+1)}`)].join(" ")}return`${n}${e}`};let HTMLRenderer=class HTMLRenderer{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=escapeHTML(e)}openNode(e){if(!emitsWrappingTags(e))return;let n=scopeToCSSClass(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){emitsWrappingTags(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}};let newNode=(e={})=>{let n={children:[]};return Object.assign(n,e),n};let TokenTree=class TokenTree{constructor(){this.rootNode=newNode(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){let n=newNode({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return"string"==typeof n?e.addText(n):n.children&&(e.openNode(n),n.children.forEach(n=>this._walk(e,n)),e.closeNode(n)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every(e=>"string"==typeof e)?e.children=[e.children.join("")]:e.children.forEach(e=>{TokenTree._collapse(e)}))}};let TokenTreeEmitter=class TokenTreeEmitter extends TokenTree{constructor(e){super(),this.options=e}addText(e){""!==e&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){let t=e.root;n&&(t.scope=`language:${n}`),this.add(t)}toHTML(){let e=new HTMLRenderer(this,this.options);return e.value()}finalize(){return this.closeAllNodes(),!0}};function source(e){return e?"string"==typeof e?e:e.source:null}function lookahead(e){return concat("(?=",e,")")}function anyNumberOfTimes(e){return concat("(?:",e,")*")}function optional(e){return concat("(?:",e,")?")}function concat(...e){let n=e.map(e=>source(e)).join("");return n}function either(...e){let n=function(e){let n=e[e.length-1];return"object"==typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}}(e),t="("+(n.capture?"":"?:")+e.map(e=>source(e)).join("|")+")";return t}function countMatchGroups(e){return RegExp(e.toString()+"|").exec("").length-1}let n=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function _rewriteBackreferences(e,{joinWith:t}){let i=0;return e.map(e=>{i+=1;let t=i,a=source(e),r="";for(;a.length>0;){let e=n.exec(a);if(!e){r+=a;break}r+=a.substring(0,e.index),a=a.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?r+="\\"+String(Number(e[1])+t):(r+=e[0],"("===e[0]&&i++)}return r}).map(e=>`(${e})`).join(t)}let t="[a-zA-Z]\\w*",i="[a-zA-Z_]\\w*",a="\\b\\d+(\\.\\d+)?",r="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",s="\\b(0b[01]+)",o={begin:"\\\\[\\s\\S]",relevance:0},COMMENT=function(e,n,t={}){let i=inherit$1({scope:"comment",begin:e,end:n,contains:[]},t);i.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let a=either("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return i.contains.push({begin:concat(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i},l=COMMENT("//","$"),c=COMMENT("/\\*","\\*/"),g=COMMENT("#","$");var u=Object.freeze({__proto__:null,MATCH_NOTHING_RE:/\b\B/,IDENT_RE:t,UNDERSCORE_IDENT_RE:i,NUMBER_RE:a,C_NUMBER_RE:r,BINARY_NUMBER_RE:s,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{let n=/^#![ ]*\//;return e.binary&&(e.begin=concat(n,/.*\b/,e.binary,/\b.*/)),inherit$1({scope:"meta",begin:n,end:/$/,relevance:0,"on:begin":(e,n)=>{0!==e.index&&n.ignoreMatch()}},e)},BACKSLASH_ESCAPE:o,APOS_STRING_MODE:{scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[o]},QUOTE_STRING_MODE:{scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[o]},PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},COMMENT:COMMENT,C_LINE_COMMENT_MODE:l,C_BLOCK_COMMENT_MODE:c,HASH_COMMENT_MODE:g,NUMBER_MODE:{scope:"number",begin:a,relevance:0},C_NUMBER_MODE:{scope:"number",begin:r,relevance:0},BINARY_NUMBER_MODE:{scope:"number",begin:s,relevance:0},REGEXP_MODE:{begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[o,{begin:/\[/,end:/\]/,relevance:0,contains:[o]}]}]},TITLE_MODE:{scope:"title",begin:t,relevance:0},UNDERSCORE_TITLE_MODE:{scope:"title",begin:i,relevance:0},METHOD_GUARD:{begin:"\\.\\s*"+i,relevance:0},END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})}});function skipIfHasPrecedingDot(e,n){let t=e.input[e.index-1];"."===t&&n.ignoreMatch()}function scopeClassName(e,n){void 0!==e.className&&(e.scope=e.className,delete e.className)}function beginKeywords(e,n){n&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=skipIfHasPrecedingDot,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function compileIllegal(e,n){Array.isArray(e.illegal)&&(e.illegal=either(...e.illegal))}function compileMatch(e,n){if(e.match){if(e.begin||e.end)throw Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function compileRelevance(e,n){void 0===e.relevance&&(e.relevance=1)}let beforeMatchExt=(e,n)=>{if(!e.beforeMatch)return;if(e.starts)throw Error("beforeMatch cannot be used with starts");let t=Object.assign({},e);Object.keys(e).forEach(n=>{delete e[n]}),e.keywords=t.keywords,e.begin=concat(t.beforeMatch,lookahead(t.begin)),e.starts={relevance:0,contains:[Object.assign(t,{endsParent:!0})]},e.relevance=0,delete t.beforeMatch},d=["of","and","for","in","not","or","if","then","parent","list","value"],h={},error=e=>{console.error(e)},warn=(e,...n)=>{console.log(`WARN: ${e}`,...n)},deprecated=(e,n)=>{h[`${e}/${n}`]||(console.log(`Deprecated as of ${e}. ${n}`),h[`${e}/${n}`]=!0)},p=Error();function remapScopeNames(e,n,{key:t}){let i=0,a=e[t],r={},s={};for(let e=1;e<=n.length;e++)s[e+i]=a[e],r[e+i]=!0,i+=countMatchGroups(n[e-1]);e[t]=s,e[t]._emit=r,e[t]._multi=!0}function MultiClass(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw error("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),p;if("object"!=typeof e.beginScope||null===e.beginScope)throw error("beginScope must be object"),p;remapScopeNames(e,e.begin,{key:"beginScope"}),e.begin=_rewriteBackreferences(e.begin,{joinWith:""})}}(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw error("skip, excludeEnd, returnEnd not compatible with endScope: {}"),p;if("object"!=typeof e.endScope||null===e.endScope)throw error("endScope must be object"),p;remapScopeNames(e,e.end,{key:"endScope"}),e.end=_rewriteBackreferences(e.end,{joinWith:""})}}(e)}let HTMLInjectionError=class HTMLInjectionError extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}};let f=Symbol("nomatch"),HLJS=function(e){let n=Object.create(null),t=Object.create(null),i=[],a=!0,r="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]},o={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:TokenTreeEmitter};function shouldNotHighlight(e){return o.noHighlightRe.test(e)}function highlight(e,n,t){let i="",a="";"object"==typeof n?(i=e,t=n.ignoreIllegals,a=n.language):(deprecated("10.7.0","highlight(lang, code, ...args) has been deprecated."),deprecated("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),a=e,i=n),void 0===t&&(t=!0);let r={code:i,language:a};fire("before:highlight",r);let s=r.result?r.result:_highlight(r.language,r.code,t);return s.code=r.code,fire("after:highlight",s),s}function _highlight(e,t,i,s){let l=Object.create(null);function processKeywords(){if(!p.keywords){b.addText(E);return}let e=0;p.keywordPatternRe.lastIndex=0;let n=p.keywordPatternRe.exec(E),t="";for(;n;){t+=E.substring(e,n.index);let i=g.case_insensitive?n[0].toLowerCase():n[0],a=p.keywords[i];if(a){let[e,r]=a;if(b.addText(t),t="",l[i]=(l[i]||0)+1,l[i]<=7&&(y+=r),e.startsWith("_"))t+=n[0];else{let t=g.classNameAliases[e]||e;emitKeyword(n[0],t)}}else t+=n[0];e=p.keywordPatternRe.lastIndex,n=p.keywordPatternRe.exec(E)}t+=E.substring(e),b.addText(t)}function processBuffer(){null!=p.subLanguage?function(){if(""===E)return;let e=null;if("string"==typeof p.subLanguage){if(!n[p.subLanguage]){b.addText(E);return}e=_highlight(p.subLanguage,E,!0,m[p.subLanguage]),m[p.subLanguage]=e._top}else e=highlightAuto(E,p.subLanguage.length?p.subLanguage:null);p.relevance>0&&(y+=e.relevance),b.__addSublanguage(e._emitter,e.language)}():processKeywords(),E=""}function emitKeyword(e,n){""!==e&&(b.startScope(n),b.addText(e),b.endScope())}function emitMultiClass(e,n){let t=1,i=n.length-1;for(;t<=i;){if(!e._emit[t]){t++;continue}let i=g.classNameAliases[e[t]]||e[t],a=n[t];i?emitKeyword(a,i):(E=a,processKeywords(),E=""),t++}}function startNewMode(e,n){return e.scope&&"string"==typeof e.scope&&b.openNode(g.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(emitKeyword(E,g.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),E=""):e.beginScope._multi&&(emitMultiClass(e.beginScope,n),E="")),p=Object.create(e,{parent:{value:p}})}let c={};function processLexeme(n,r){let s=r&&r[0];if(E+=n,null==s)return processBuffer(),0;if("begin"===c.type&&"end"===r.type&&c.index===r.index&&""===s){if(E+=t.slice(r.index,r.index+1),!a){let n=Error(`0 width match regex (${e})`);throw n.languageName=e,n.badRule=c.rule,n}return 1}if(c=r,"begin"===r.type)return function(e){let n=e[0],t=e.rule,i=new Response(t),a=[t.__beforeBegin,t["on:begin"]];for(let t of a)if(t&&(t(e,i),i.isMatchIgnored))return 0===p.matcher.regexIndex?(E+=n[0],1):(x=!0,0);return t.skip?E+=n:(t.excludeBegin&&(E+=n),processBuffer(),t.returnBegin||t.excludeBegin||(E=n)),startNewMode(t,e),t.returnBegin?0:n.length}(r);if("illegal"!==r.type||i){if("end"===r.type){let e=function(e){let n=e[0],i=t.substring(e.index),a=function endOfMode(e,n,t){let i=function(e,n){let t=e&&e.exec(n);return t&&0===t.index}(e.endRe,t);if(i){if(e["on:end"]){let t=new Response(e);e["on:end"](n,t),t.isMatchIgnored&&(i=!1)}if(i){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return endOfMode(e.parent,n,t)}(p,e,i);if(!a)return f;let r=p;p.endScope&&p.endScope._wrap?(processBuffer(),emitKeyword(n,p.endScope._wrap)):p.endScope&&p.endScope._multi?(processBuffer(),emitMultiClass(p.endScope,e)):r.skip?E+=n:(r.returnEnd||r.excludeEnd||(E+=n),processBuffer(),r.excludeEnd&&(E=n));do p.scope&&b.closeNode(),p.skip||p.subLanguage||(y+=p.relevance),p=p.parent;while(p!==a.parent);return a.starts&&startNewMode(a.starts,e),r.returnEnd?0:n.length}(r);if(e!==f)return e}}else{let e=Error('Illegal lexeme "'+s+'" for mode "'+(p.scope||"<unnamed>")+'"');throw e.mode=p,e}if("illegal"===r.type&&""===s)return 1;if(w>1e5&&w>3*r.index){let e=Error("potential infinite loop, way more iterations than matches");throw e}return E+=s,s.length}let g=getLanguage(e);if(!g)throw error(r.replace("{}",e)),Error('Unknown language: "'+e+'"');let u=function(e){function langRe(n,t){return RegExp(source(n),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(t?"g":""))}let MultiRegex=class MultiRegex{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,n){n.position=this.position++,this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),this.matchAt+=countMatchGroups(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);let e=this.regexes.map(e=>e[1]);this.matcherRe=langRe(_rewriteBackreferences(e,{joinWith:"|"}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;let n=this.matcherRe.exec(e);if(!n)return null;let t=n.findIndex((e,n)=>n>0&&void 0!==e),i=this.matchIndexes[t];return n.splice(0,t),Object.assign(n,i)}};let ResumableMultiRegex=class ResumableMultiRegex{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];let n=new MultiRegex;return this.rules.slice(e).forEach(([e,t])=>n.addRule(e,t)),n.compile(),this.multiRegexes[e]=n,n}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,n){this.rules.push([e,n]),"begin"===n.type&&this.count++}exec(e){let n=this.getMatcher(this.regexIndex);n.lastIndex=this.lastIndex;let t=n.exec(e);if(this.resumingScanAtSamePosition()){if(t&&t.index===this.lastIndex);else{let n=this.getMatcher(0);n.lastIndex=this.lastIndex+1,t=n.exec(e)}}return t&&(this.regexIndex+=t.position+1,this.regexIndex===this.count&&this.considerAll()),t}};if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=inherit$1(e.classNameAliases||{}),function compileMode(n,t){if(n.isCompiled)return n;[scopeClassName,compileMatch,MultiClass,beforeMatchExt].forEach(e=>e(n,t)),e.compilerExtensions.forEach(e=>e(n,t)),n.__beforeBegin=null,[beginKeywords,compileIllegal,compileRelevance].forEach(e=>e(n,t)),n.isCompiled=!0;let i=null;return"object"==typeof n.keywords&&n.keywords.$pattern&&(n.keywords=Object.assign({},n.keywords),i=n.keywords.$pattern,delete n.keywords.$pattern),i=i||/\w+/,n.keywords&&(n.keywords=function compileKeywords(e,n,t="keyword"){let i=Object.create(null);return"string"==typeof e?compileList(t,e.split(" ")):Array.isArray(e)?compileList(t,e):Object.keys(e).forEach(function(t){Object.assign(i,compileKeywords(e[t],n,t))}),i;function compileList(e,t){n&&(t=t.map(e=>e.toLowerCase())),t.forEach(function(n){var t,a;let r=n.split("|");i[r[0]]=[e,(t=r[0],(a=r[1])?Number(a):d.includes(t.toLowerCase())?0:1)]})}}(n.keywords,e.case_insensitive)),n.keywordPatternRe=langRe(i,!0),t&&(n.begin||(n.begin=/\B|\b/),n.beginRe=langRe(n.begin),n.end||n.endsWithParent||(n.end=/\B|\b/),n.end&&(n.endRe=langRe(n.end)),n.terminatorEnd=source(n.end)||"",n.endsWithParent&&t.terminatorEnd&&(n.terminatorEnd+=(n.end?"|":"")+t.terminatorEnd)),n.illegal&&(n.illegalRe=langRe(n.illegal)),n.contains||(n.contains=[]),n.contains=[].concat(...n.contains.map(function(e){var t;return((t="self"===e?n:e).variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return inherit$1(t,{variants:null},e)})),t.cachedVariants)?t.cachedVariants:!function dependencyOnParent(e){return!!e&&(e.endsWithParent||dependencyOnParent(e.starts))}(t)?Object.isFrozen(t)?inherit$1(t):t:inherit$1(t,{starts:t.starts?inherit$1(t.starts):null})})),n.contains.forEach(function(e){compileMode(e,n)}),n.starts&&compileMode(n.starts,t),n.matcher=function(e){let n=new ResumableMultiRegex;return e.contains.forEach(e=>n.addRule(e.begin,{rule:e,type:"begin"})),e.terminatorEnd&&n.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n}(n),n}(e)}(g),h="",p=s||u,m={},b=new o.__emitter(o);!function(){let e=[];for(let n=p;n!==g;n=n.parent)n.scope&&e.unshift(n.scope);e.forEach(e=>b.openNode(e))}();let E="",y=0,_=0,w=0,x=!1;try{if(g.__emitTokens)g.__emitTokens(t,b);else{for(p.matcher.considerAll();;){w++,x?x=!1:p.matcher.considerAll(),p.matcher.lastIndex=_;let e=p.matcher.exec(t);if(!e)break;let n=t.substring(_,e.index),i=processLexeme(n,e);_=e.index+i}processLexeme(t.substring(_))}return b.finalize(),h=b.toHTML(),{language:e,value:h,relevance:y,illegal:!1,_emitter:b,_top:p}}catch(n){if(n.message&&n.message.includes("Illegal"))return{language:e,value:escapeHTML(t),illegal:!0,relevance:0,_illegalBy:{message:n.message,index:_,context:t.slice(_-100,_+100),mode:n.mode,resultSoFar:h},_emitter:b};if(a)return{language:e,value:escapeHTML(t),illegal:!1,relevance:0,errorRaised:n,_emitter:b,_top:p};throw n}}function highlightAuto(e,t){t=t||o.languages||Object.keys(n);let i=function(e){let n={value:escapeHTML(e),illegal:!1,relevance:0,_top:s,_emitter:new o.__emitter(o)};return n._emitter.addText(e),n}(e),a=t.filter(getLanguage).filter(autoDetection).map(n=>_highlight(n,e,!1));a.unshift(i);let r=a.sort((e,n)=>{if(e.relevance!==n.relevance)return n.relevance-e.relevance;if(e.language&&n.language){if(getLanguage(e.language).supersetOf===n.language)return 1;if(getLanguage(n.language).supersetOf===e.language)return -1}return 0}),[l,c]=r;return l.secondBest=c,l}function highlightElement(e){let n=null,i=function(e){let n=e.className+" ";n+=e.parentNode?e.parentNode.className:"";let t=o.languageDetectRe.exec(n);if(t){let n=getLanguage(t[1]);return n||(warn(r.replace("{}",t[1])),warn("Falling back to no-highlight mode for this block.",e)),n?t[1]:"no-highlight"}return n.split(/\s+/).find(e=>shouldNotHighlight(e)||getLanguage(e))}(e);if(shouldNotHighlight(i))return;if(fire("before:highlightElement",{el:e,language:i}),e.children.length>0&&(o.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(e)),o.throwUnescapedHTML)){let n=new HTMLInjectionError("One of your code blocks includes unescaped HTML.",e.innerHTML);throw n}n=e;let a=n.textContent,s=i?highlight(a,{language:i,ignoreIllegals:!0}):highlightAuto(a);e.innerHTML=s.value,function(e,n,i){let a=n&&t[n]||i;e.classList.add("hljs"),e.classList.add(`language-${a}`)}(e,i,s.language),e.result={language:s.language,re:s.relevance,relevance:s.relevance},s.secondBest&&(e.secondBest={language:s.secondBest.language,relevance:s.secondBest.relevance}),fire("after:highlightElement",{el:e,result:s,text:a})}let l=!1;function highlightAll(){if("loading"===document.readyState){l=!0;return}let e=document.querySelectorAll(o.cssSelector);e.forEach(highlightElement)}function getLanguage(e){return n[e=(e||"").toLowerCase()]||n[t[e]]}function registerAliases(e,{languageName:n}){"string"==typeof e&&(e=[e]),e.forEach(e=>{t[e.toLowerCase()]=n})}function autoDetection(e){let n=getLanguage(e);return n&&!n.disableAutodetect}function fire(e,n){i.forEach(function(t){t[e]&&t[e](n)})}for(let r in"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",function(){l&&highlightAll()},!1),Object.assign(e,{highlight,highlightAuto,highlightAll,highlightElement,highlightBlock:function(e){return deprecated("10.7.0","highlightBlock will be removed entirely in v12.0"),deprecated("10.7.0","Please use highlightElement now."),highlightElement(e)},configure:function(e){o=inherit$1(o,e)},initHighlighting:()=>{highlightAll(),deprecated("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function(){highlightAll(),deprecated("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(t,i){let r=null;try{r=i(e)}catch(e){if(error("Language definition for '{}' could not be registered.".replace("{}",t)),a)error(e);else throw e;r=s}r.name||(r.name=t),n[t]=r,r.rawDefinition=i.bind(null,e),r.aliases&&registerAliases(r.aliases,{languageName:t})},unregisterLanguage:function(e){for(let i of(delete n[e],Object.keys(t)))t[i]===e&&delete t[i]},listLanguages:function(){return Object.keys(n)},getLanguage,registerAliases,autoDetection,inherit:inherit$1,addPlugin:function(e){var n;(n=e)["before:highlightBlock"]&&!n["before:highlightElement"]&&(n["before:highlightElement"]=e=>{n["before:highlightBlock"](Object.assign({block:e.el},e))}),n["after:highlightBlock"]&&!n["after:highlightElement"]&&(n["after:highlightElement"]=e=>{n["after:highlightBlock"](Object.assign({block:e.el},e))}),i.push(e)},removePlugin:function(e){let n=i.indexOf(e);-1!==n&&i.splice(n,1)}}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString="11.8.0",e.regex={concat:concat,lookahead:lookahead,either:either,optional:optional,anyNumberOfTimes:anyNumberOfTimes},u)"object"==typeof u[r]&&function deepFreeze(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(n=>{let t=e[n],i=typeof t;"object"!==i&&"function"!==i||Object.isFrozen(t)||deepFreeze(t)}),e}(u[r]);return Object.assign(e,u),e},m=HLJS({});m.newInstance=()=>HLJS({}),e.exports=m,m.HighlightJS=m,m.default=m},837:function(e,n,t){"use strict";var i=t(3390);n.Z=i},9622:function(e,n,t){"use strict";t.d(n,{Z:function(){return javascript}});let i="[A-Za-z$_][0-9A-Za-z$_]*",a=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],r=["true","false","null","undefined","NaN","Infinity"],s=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],o=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],l=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],c=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],g=[].concat(l,s,o);function javascript(e){var n;let t=e.regex,hasClosingTag=(e,{after:n})=>{let t="</"+e[0].slice(1),i=e.input.indexOf(t,n);return -1!==i},u={begin:"<>",end:"</>"},d={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,n)=>{let t;let i=e[0].length+e.index,a=e.input[i];if("<"===a||","===a){n.ignoreMatch();return}">"!==a||hasClosingTag(e,{after:i})||n.ignoreMatch();let r=e.input.substring(i);if((t=r.match(/^\s*=/))||(t=r.match(/^\s+extends\s+/))&&0===t.index){n.ignoreMatch();return}}},h={$pattern:i,keyword:a,literal:r,built_in:g,"variable.language":c},p="[0-9](_?[0-9])*",f=`\\.(${p})`,m="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",b={className:"number",variants:[{begin:`(\\b(${m})((${f})|\\.)?|(${f}))[eE][+-]?(${p})\\b`},{begin:`\\b(${m})\\b((${f})\\b|\\.)?|(${f})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},E={className:"subst",begin:"\\$\\{",end:"\\}",keywords:h,contains:[]},y={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,E],subLanguage:"xml"}},_={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,E],subLanguage:"css"}},w={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,E],subLanguage:"graphql"}},x={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,E]},N=e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:i+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),M={className:"comment",variants:[N,e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},S=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,y,_,w,x,{match:/\$\d+/},b];E.contains=S.concat({begin:/\{/,end:/\}/,keywords:h,contains:["self"].concat(S)});let v=[].concat(M,E.contains),A=v.concat([{begin:/\(/,end:/\)/,keywords:h,contains:["self"].concat(v)}]),O={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:h,contains:A},T={variants:[{match:[/class/,/\s+/,i,/\s+/,/extends/,/\s+/,t.concat(i,"(",t.concat(/\./,i),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,i],scope:{1:"keyword",3:"title.class"}}]},k={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...s,...o]}},R={match:t.concat(/\b/,(n=[...l,"super","import"],t.concat("(?!",n.join("|"),")")),i,t.lookahead(/\(/)),className:"title.function",relevance:0},L={begin:t.concat(/\./,t.lookahead(t.concat(i,/(?![0-9A-Za-z$_(])/))),end:i,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},I="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",C={match:[/const|var|let/,/\s+/,i,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(I)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[O]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:h,exports:{PARAMS_CONTAINS:A,CLASS_REFERENCE:k},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,y,_,w,x,M,{match:/\$\d+/},b,k,{className:"attr",begin:i+t.lookahead(":"),relevance:0},C,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[M,e.REGEXP_MODE,{className:"function",begin:I,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:h,contains:A}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:u.begin,end:u.end},{match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:d.begin,"on:begin":d.isTrulyOpeningTag,end:d.end}],subLanguage:"xml",contains:[{begin:d.begin,end:d.end,skip:!0,contains:["self"]}]}]},{variants:[{match:[/function/,/\s+/,i,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[O],illegal:/%/},{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[O,e.inherit(e.TITLE_MODE,{begin:i,className:"title.function"})]},{match:/\.\.\./,relevance:0},L,{match:"\\$"+i,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[O]},R,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"},T,{match:[/get|set/,/\s+/,i,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},O]},{match:/\$[(.]/}]}}},1042:function(e,n,t){"use strict";function xml(e){let n=e.regex,t=n.concat(/[\p{L}_]/u,n.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),i={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},a={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},r=e.inherit(a,{begin:/\(/,end:/\)/}),s=e.inherit(e.APOS_STRING_MODE,{className:"string"}),o=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),l={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:/[\p{L}0-9._:-]+/u,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[i]},{begin:/'/,end:/'/,contains:[i]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[a,o,s,r,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[a,r,o,s]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},i,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[o]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[l],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[l],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:n.concat(/</,n.lookahead(n.concat(t,n.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:t,relevance:0,starts:l}]},{className:"tag",begin:n.concat(/<\//,n.lookahead(n.concat(t,/>/))),contains:[{className:"name",begin:t,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}t.d(n,{Z:function(){return xml}})}}]);