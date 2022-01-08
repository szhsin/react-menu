import hljs from 'highlight.js/es/core';
import javascript from 'highlight.js/es/languages/javascript';
import xml from 'highlight.js/es/languages/xml';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

export default hljs;
