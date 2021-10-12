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
  presets: [['@babel/preset-env', { bugfixes: true }], '@babel/preset-react'],
  env: {
    modern: {
      presets: [['@babel/preset-react', { useSpread: true }]]
    }
  }
};
