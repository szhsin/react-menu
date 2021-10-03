import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';

const getConfig = (env) => ({
    input: 'src/index.js',
    external: ['react', 'react-dom', 'prop-types', 'react-transition-state'],
    plugins: [nodeResolve(), babel({ babelHelpers: 'bundled', envName: env, browserslistEnv: env })]
});

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
    {
        ...getConfig('production'),
        output: {
            file: 'dist/index.js',
            format: 'cjs'
        },
    },
    {
        ...getConfig('modern'),
        output: {
            file: 'dist/index.modern.js',
            format: 'es'
        }
    }
];
