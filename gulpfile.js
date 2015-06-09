var gulp = require('gulp'),
    del = require('del'),
    run = require('gulp-run'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    htmlmin = require('gulp-htmlmin'),
    ngTemplates = require('gulp-ng-templates'),
    cssmin = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    gulpif = require('gulp-if'),
    zip = require('gulp-zip'),
    path = require('path'),
    browserSync = require('browser-sync'),
    minifyHTML = require('gulp-minify-html'),
    neat = require('node-neat').includePaths,
    imagemin = require('gulp-imagemin'),
    debug = require('gulp-debug'),
    pkg = require('./package.json'),
    reload = browserSync.reload;

/**
 * Running Bower
 */
gulp.task('bower', function() {
  run('bower install').exec();
})

/**
 * Cleaning dist/ folder
 */
.task('clean', function(cb) {
  del(['dist/**'], cb);
})

/**
 * Running livereload server
 */
.task('server', function() {
  browserSync({
    server: {
     baseDir: './' 
    }
  });
})

/**
 * Less compilation
 */
/*.task('less', function() {
  return gulp.src('assets/less/*.less')
  .pipe(less())
  .pipe(concat('style.css'))
  .pipe(gulp.dest('dist'));
})
.task('less:min', function() {
  return gulp.src('assets/less/*.less')
  .pipe(less())
  .pipe(concat('style.css'))
  .pipe(cssmin())
  .pipe(gulp.dest('dist'));
})*/

.task('sass', function() {
  return gulp.src('src/sass/main.scss')
  .pipe(sass())
  .pipe(concat('style.css'))
  .pipe(gulp.dest('dist'));
})

.task('sass:min', function() {
  return gulp.src('src/sass/main.scss')
  .pipe(sass())
  .pipe(concat('style.css'))
  .pipe(cssmin())
  .pipe(gulp.dest('dist'));
})

/**
 * JSLint/JSHint validation
 */
.task('lint', function() {
  return gulp.src(['./app/*.js','./app/*.js','./app/**/*.js','./app/**/**/*.js','./app/**/**/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
})


/** JavaScript compilation */
.task('js', function() {
  return gulp.src(['app/*.js', 'app/templates/*.html'])
  .pipe(gulpif(/\.html$/, htmlmin({ collapseWhitespace: true })))
  .pipe(gulpif(/\.html$/, ngTemplates()))
  .pipe(concat('app.js'))
  .pipe(gulp.dest('dist'));
})
.task('js:min', function() {
  return gulp.src(['app/*.js', 'app/templates/*.html'])
  .pipe(gulpif(/\.html$/, htmlmin({ collapseWhitespace: true })))
  .pipe(gulpif(/\.html$/, ngTemplates()))
  .pipe(uglify({ mangle: false }))
  .pipe(concat('app.js'))
  .pipe(gulp.dest('dist'));
})

/**
 * Compiling resources and serving application
 */
.task('serve', ['bower', 'clean', 'lint', 'js', 'server', 'sass'], function() {
  return gulp.watch([
    '*.js', 'app/*.js','app/**/*.js','app/**/**/*.js', '*.html', 'app/**/*.html', 'templates/*.html', 'src/sass/*.sass', 'src/sass/*.scss', 'src/sass/base/*.scss','src/sass/bourbon/*.scss','src/sass/components/*.scss',
    'src/sass/helpers/*.scss', 'src/sass/layout/*.scss', 'src/sass/neat/*.scss', 'src/sass/pages/*.scss', 'src/sass/themes/*.scss', 'src/sass/vendors/*.scss'
  ], [
   'lint', 'js', 'sass', browserSync.reload
  ]);
})

.task('serve:minified', ['bower', 'clean', 'lint', 'js:min', 'server', 'sass:min'], function() {
  return gulp.watch([
    '*.js', 'app/*.js', '*.html','views/*.html', 'src/sass/*.sass', 'src/sass/*.scss'
  ], [
   'lint', 'js:min', 'sass:min', browserSync.reload
  ]);
})

/**
 * Test Driven Development using Karma and JSHint
 */
.task('tdd', ['bower', 'lint'], function() {
  return gulp.watch([
    '*.js', 'app/*.js', '*.html','views/*.html'
  ], [
    'lint'
  ]);
})

/**
 * Packaging compiled resources
 */
.task('package', ['bower', 'clean', 'lint', 'js:min'], function() {
  return gulp.src(['index.html', 'dist/**', 'libs/**'], { base: './' })
  .pipe(zip(pkg.name + '-' + pkg.version + '.zip'))
  .pipe(gulp.dest('dist'));
});


/*Additional Tasks*/
