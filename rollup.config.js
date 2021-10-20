import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  {
    input: 'src/index.js',
    external: ['react', 'react-dom', 'prop-types', 'react-transition-state'],
    plugins: [nodeResolve(), babel({ babelHelpers: 'bundled' })],
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs'
      },
      {
        preserveModules: true,
        dir: 'dist/es',
        format: 'es'
      }
    ],
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false
    }
  }
];
