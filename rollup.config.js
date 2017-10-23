import vue from 'rollup-plugin-vue'
import templateCompiler from 'vue-template-compiler'
import scss from 'rollup-plugin-scss'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const plugins = [
  vue(),
  scss(),
  buble({ exclude: 'node_modules/**' }),
  nodeResolve(),
  commonjs()
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify())
}

if (process.env.NODE_ENV === 'development') {
  plugins.push(serve({
    open: true,
    verbose: false,
    contentBase: '',
    host: 'localhost',
    port: 10001,
  }))
  plugins.push(livereload({
    watch: 'dist'
  }));
}

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/build.js',
    format: 'iife'
  },
  sourceMap: true,
  plugins
}
