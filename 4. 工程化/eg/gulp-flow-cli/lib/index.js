/*
 * @Author       : ganbowen
 * @Date         : 2021-09-17 22:17:47
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-17 23:35:03
 * @Descripttion : 
 */
const path = require('path')

const { src, dest, parallel, series, watch } = require('gulp')
const del = require('del')
const browserSync = require('browser-sync')
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const bs = browserSync.create()
const cwd = process.cwd()
let config = {
    build: {
        entry: 'src',
        output: 'dist',
        temp: 'temp',
        public: 'public',
        paths: {
            styles: 'assets/styles/*.scss',
            scripts: 'assets/scripts/*.js',
            pages: '*.html',
            images: 'assets/images/**',
            fonts: 'assets/fonts/**'
        }
    }
}

try {
    const loadConfig = require(path.join(cwd, 'gulpflow.config.js'))
    config = Object.assign({}, config, loadConfig) 
} catch(e) {}


const clean = () => {
  return del([config.build.output, config.build.temp])
}

const style = () => {
  return src(config.build.paths.styles, { base: config.build.entry, cwd: config.build.entry })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))
}

const script = () => {
  return src(config.build.paths.scripts, { base: config.build.entry, cwd: config.build.entry })
    .pipe(plugins.babel({ presets: [require('@babel/preset-env')] }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))
}

const page = () => {
  return src(config.build.paths.pages, { base: config.build.entry, cwd: config.build.entry })
    .pipe(plugins.swig({ data: config.config, defaults: { cache: false } })) // 防止模板缓存导致页面不能及时更新
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))
}

const image = () => {
  return src(config.build.paths.images, { base: config.build.entry, cwd: config.build.entry })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.output))
}

const font = () => {
  return src(config.build.paths.fonts, { base: config.build.entry, cwd: config.build.entry })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.output))
}

const extra = () => {
  return src('**', { base: config.build.public, cwd: config.build.public })
    .pipe(dest(config.build.output))
}

const serve = () => {
  watch(config.build.paths.styles, { cwd: config.build.entry }, style)
  watch(config.build.paths.scripts, { cwd: config.build.entry }, script)
  watch(config.build.paths.pages, { cwd: config.build.entry }, page)
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)
  watch([
    config.build.paths.images,
    config.build.paths.fonts,
  ], {
    cwd: config.build.entry
  }, bs.reload)
  watch('**',{
    cwd: config.build.public
  }, bs.reload)

  bs.init({
    notify: false,
    port: 2080,
    // open: false,
    // files: 'dist/**',
    server: {
      baseDir: [config.build.temp, config.build.entry, config.build.public],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

const useref = () => {
  return src(config.build.paths.pages, { base: config.build.temp, cwd: config.build.temp })
    .pipe(plugins.useref({ searchPath: [config.build.temp, '.'] }))
    // html js css
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest(config.build.output))
}

const compile = parallel(style, script, page)

// 上线之前执行的任务
const build =  series(
  clean,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

const develop = series(compile, serve)

module.exports = {
  clean,
  build,
  develop
}
