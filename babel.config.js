module.exports = {
  assumptions: {
    constantReexports: true,
    ignoreFunctionLength: true,
    ignoreToPrimitiveHint: true,
    iterableIsArray: true,
    noDocumentAll: true,
    noIncompleteNsImportDetection: true,
    noNewArrows: true,
    objectRestNoSymbols: true,
    pureGetters: true,
    setComputedProperties: true,
    setSpreadProperties: true,
    skipForOfIteratorClosing: true
  },
  shouldPrintComment: (val) => /[@#]__PURE__/.test(val),
  plugins: ['pure-annotations', ['transform-react-remove-prop-types', { mode: 'unsafe-wrap' }]],
  presets: [
    ['@babel/preset-env', { bugfixes: true, exclude: ['@babel/plugin-transform-typeof-symbol'] }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
};
