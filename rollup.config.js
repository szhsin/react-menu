import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';

const sharedConfig = {
  external: ['react', 'react-dom', 'react/jsx-runtime', 'prop-types', 'react-transition-state'],
  plugins: [nodeResolve(), babel({ babelHelpers: 'bundled' })],
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false
  }
};

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  {
    ...sharedConfig,
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        interop: 'default'
      },
      {
        preserveModules: true,
        dir: 'dist/es',
        format: 'es'
      }
    ]
  },
  {
    ...sharedConfig,
    input: 'src/style-utils/index.js',
    output: [
      {
        file: 'dist/style-utils/index.cjs.js',
        format: 'cjs'
      },
      {
        file: 'dist/style-utils/index.js',
        format: 'es'
      }
    ]
  }
];
