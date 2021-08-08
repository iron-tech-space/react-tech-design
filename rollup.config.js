import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import typeScript from 'rollup-plugin-typescript2';
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
        extract: false
    }),
    url(),
    svgr(),
    typeScript({tsconfig: "tsconfig.json"}), // подключение typescript
    babel({
      exclude: 'node_modules/**',
      plugins: [
          'external-helpers',
      ]
    }),
    resolve(),
    commonjs()
  ]
}
