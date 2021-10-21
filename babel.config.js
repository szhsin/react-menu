module.exports = {
  assumptions: {
    constantReexports: true,
    ignoreFunctionLength: true,
    ignoreToPrimitiveHint: true,
    iterableIsArray: true,
    noDocumentAll: true,
    noNewArrows: true,
    objectRestNoSymbols: true,
    pureGetters: true,
    setComputedProperties: true,
    setSpreadProperties: true,
    skipForOfIteratorClosing: true
  },
  shouldPrintComment: (val) => /[@#]__PURE__/.test(val),
  plugins: ['pure-annotations'],
  presets: [
    ['@babel/preset-env', { bugfixes: true, exclude: ['@babel/plugin-transform-typeof-symbol'] }],
    '@babel/preset-react'
  ]
};
