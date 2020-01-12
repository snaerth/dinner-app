import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import alias from '@rollup/plugin-alias';
import svg from 'rollup-plugin-svg-import'
import config from 'sapper/config/rollup.js'
import sveltePreprocess from 'svelte-preprocess'
import sapperEnv from './env.config'
import pkg from './package.json'

const mode = process.env.NODE_ENV
const dev = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD
const customResolver = resolve({
  extensions: ['.svelte','.scss']
});
const projectRootDir = path.resolve(__dirname);


const onwarn = (warning, onwarn) =>
  (warning.code === 'CIRCULAR_DEPENDENCY' &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning)
const dedupe = importee =>
  importee === 'svelte' || importee.startsWith('svelte/')

const preprocess = sveltePreprocess({
  scss: {
    includePaths: [
      'node_modules',
      'src'
    ]
  },
  postcss: {
    plugins: [
      require('autoprefixer'),
    ]
  }
})

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      alias({
        entries: [
          {
            find: '@',
            replacement: path.resolve(projectRootDir, 'src')
          },
        ],
        customResolver
      }),
      replace({
        ...sapperEnv(),
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svg({ stringify: true }),
      svelte({
        dev,
        hydratable: true,
        emitCss: true,
        preprocess,
      }),
      resolve({
        browser: true,
        dedupe,
      }),
      commonjs(),

      legacy &&
        babel({
          extensions: ['.js', '.mjs', '.html', '.svelte'],
          runtimeHelpers: true,
          exclude: ['node_modules/@babel/**'],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: '> 0.25%, not dead',
              },
            ],
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
              '@babel/plugin-transform-runtime',
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),
    ],

    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      alias({
        entries: [
          {
            find: '@',
            replacement: path.resolve(projectRootDir, 'src')
          },
        ],
        customResolver
      }),
      replace({
        ...sapperEnv(),
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svg({ stringify: true }),
      svelte({
        generate: 'ssr',
        dev,
        preprocess,
      }),
      resolve({
        dedupe,
      }),
      commonjs(),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules ||
        Object.keys(process.binding('natives'))
    ),

    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      commonjs(),
      !dev && terser(),
    ],

    onwarn,
  },
}
