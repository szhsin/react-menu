// @ts-check

import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import { addDirective } from 'rollup-plugin-add-directive';

/**
 * @type {import('rollup').RollupOptions}
 */
const sharedConfig = {
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react-transition-state'],
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false
  }
};

/**
 * @type {import('rollup').RollupOptions[]}
 */
export default [
  {
    ...sharedConfig,
    plugins: [
      nodeResolve(),
      babel({ babelHelpers: 'bundled' }),
      addDirective({ pattern: 'index' })
    ],
    input: 'src/index.js',
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs',
        interop: 'default',
        entryFileNames: '[name].cjs',
        preserveModules: true
      },
      {
        dir: 'dist/esm',
        format: 'es',
        entryFileNames: '[name].mjs',
        preserveModules: true
      }
    ]
  },
  {
    ...sharedConfig,
    plugins: [nodeResolve(), babel({ babelHelpers: 'bundled' })],
    input: 'src/style-utils/index.js',
    output: [
      {
        file: 'dist/style-utils/index.cjs',
        format: 'cjs'
      },
      {
        file: 'dist/style-utils/index.mjs',
        format: 'es'
      }
    ]
  }
];
