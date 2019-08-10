var del = require('del');
var gulp = require('gulp');
var rev = require('gulp-rev');
var gulpif = require('gulp-if');
var less = require('gulp-less');
var ngmin = require('gulp-ngmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var useref = require('gulp-useref');
var jshint = require("gulp-jshint");
var gulpCopy = require('gulp-copy');

var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var minifyCss = require('gulp-minify-css');  //CSS 压缩
var ngAnnotate = require('gulp-ng-annotate');
var revReplace = require('gulp-rev-replace');
var htmlminify = require('gulp-html-minify');

var htmlreplace = require('gulp-html-replace');
const stripDebug = require('gulp-strip-debug');
var autoprefixer = require('gulp-autoprefixer');

var templateCache = require('gulp-angular-templatecache');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

const env = process.env.NODE_ENV
var paths = {
  app: {
    src: 'app/**/*'
  },
  tmp: {
    dir: 'tmp/',
    src: 'tmp/**/*',
    js: 'tmp/**/*.js'
  },
  styles: {
    dir: 'app/css/',
    src: 'app/css/**/*.css',
  },
  scripts: {
    dir: 'app/core/',
    src: 'app/core/**/*.js',
  },
  view: {
    dir: 'app/view/',
    src: 'app/view/**/*.html',
  }
};

/**
 * 设置环境变量，通过替换配置文件实现
 * TODO 通过全局变量的形式 还是 service的形式
 * @returns {*}
 */
function setEnv() {

  return gulp.src('config/' + env + '.env.js')
    .pipe(rename("env.js"))
    .pipe(gulp.dest('app/static/config'));
}

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del(['dist', 'tmp', 'app/static/config/env.js']);
}

function cleanAfter() {
  return del(['tmp']);
}

function copy() {
  return gulp.src(['app/*.html', 'app/static/**/*'], {base: 'app'})
    .pipe(gulp.dest('tmp'));
}

function copyDirectives() {
  return gulp.src(['app/core/directives/*.html'], {base: 'app'})
    .pipe(htmlminify())
    .pipe(gulp.dest('dist'));
}

function copyImg() {
  return gulp.src(['app/static/img/*.png'], {base: 'app'})
    .pipe(imagemin())
    .pipe(gulp.dest('dist'));
}


function indexTemplates() {
  return gulp.src(['app/view/**/*'])
    .pipe(htmlminify())
    .pipe(templateCache('index.js', {root: 'view', module: 'indexApp'}))
    .pipe(gulp.dest('tmp/view/'));
}


function annotate1() {
  return gulp.src('app/core/**/*.js')
    .pipe(ngAnnotate())
    .pipe(gulp.dest('tmp/js/'));
}

function concats() {
  return gulp.src(['tmp/js/apps/indexApp.js', 'tmp/view/*.js'])
    .pipe(concat('indexApp.js'))
    .pipe(gulp.dest('tmp/js/apps'));
}

function annotate2() {
  return gulp.src('tmp/js/**/*.js')
    .pipe(ngmin({dynamic: false}))
    .pipe(stripDebug())  //删除log
    .pipe(gulp.dest('tmp/js/'));
}

function userefs() {
  return gulp.src('tmp/*.html')
    .pipe(useref({searchPath: ['tmp', 'app']}))
    .pipe(gulpif('!*.html', rev())) // 给css,js,html加上hash版本号
    .pipe(revReplace())
    .pipe(gulp.dest('./dist'))
    .pipe(rev.manifest())                   // 把引用的css和js替换成有版本号的名字
    .pipe(htmlminify())
    .pipe(gulp.dest('./dist'))
}

function uglifys() {
  return gulp.src('dist/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
}

function watch() {
  browserSync.init({     // 启动Browsersync服务
    port: 38080,         //自定义端口
    server: {
      baseDir: './app',   // 启动服务的目录 默认 index.html
      index: 'index.html' // 自定义启动文件名
    },
    // open: 'external',   // 决定Browsersync启动时自动打开的网址 external 表示 可外部打开 url, 可以在同一 wifi 下不同终端测试
    injectChanges: true // 注入CSS改变
  });
  gulp.watch(paths.app.src).on('change', reload);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(clean, setEnv, gulp.parallel(copy, copyDirectives), indexTemplates, annotate1, concats, annotate2, userefs, gulp.parallel(uglifys, cleanAfter, copyImg));

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.watch = gulp.series(clean, setEnv,  watch);
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = watch;
