// Basic functionality
import gulp from 'gulp';
import plumber from 'gulp-plumber';
// SASS converting
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
// CSS optimizing
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
// File modifiers
import rename from 'gulp-rename';
import terser from 'gulp-terser';
// Image converting and minifying
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
// HTML converting
import pug from 'gulp-pug';
import htmlmin from 'gulp-htmlmin';
// JS converting
import jsmin from 'gulp-jsmin';
// Other tools
import { deleteAsync as del } from 'del';
import browser from 'browser-sync';
import cache from 'gulp-cache';

//---- GULP OPEARTIONS

// Styles

export const styles = () => {
  return gulp.src('source/scss/*.scss', { sourcemaps: true })
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
  autoprefixer(),
  csso()
  ]))
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
  .pipe(browser.stream());
  }
  // Favicon
  const faviconIco = () => {
    return gulp.src('source/assets/favicon/*.ico')
    .pipe(rename('favicon.ico'))
    .pipe(gulp.dest('build'));
  }

  const faviconApple = () => {
    return gulp.src('source/assets/favicon/*.png')
    .pipe(rename('apple-touch-icon.png'))
    .pipe(gulp.dest('build/img'));
  }

  const faviconPng = () => {
    return gulp.src('source/assets/favicon/*.png')
    .pipe(rename('favicon.png'))
    .pipe(gulp.dest('build/img'));
  }

  const faviconSvg = () => {
    return gulp.src('source/assets/favicon/*.svg')
    .pipe(rename('favicon.svg'))
    .pipe(gulp.dest('build/img'));
  }

  // PUG

  const pugToHtml = () => {
    return gulp.src('source/pages/*.pug')
    .pipe(pug())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
    }

  // HTML

  const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: false }))
  .pipe(gulp.dest('build'));
  }

  // Scripts

  const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(jsmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/js'))
  .pipe(browser.stream());
  }

  // Images

  const optimizeImages = () => {
  return gulp.src('source/assets/images/*.{png,jpg}')
  .pipe(imagemin())
  .pipe(gulp.dest('build/img'))
  }

  const copyImages = () => {
  return gulp.src('source/assets/images/*.{png,jpg}')
  .pipe(gulp.dest('build/img'))
  }

  // WebP

  const createWebp = () => {
  return gulp.src('source/assets/images/*.{png,jpg}')
  .pipe(webp())
  .pipe(gulp.dest('build/img'))
  }

  // SVG

  const svg = () =>
  gulp.src(['source/assets/images/*.svg', '!source/assets/icons/*.svg'])
  .pipe(svgo())
  .pipe(gulp.dest('build/img'));

  const bootstrapSprite = () => {
  return gulp.src('source/assets/icons/*.svg')
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));
  }

  const sprite = () => {
  return gulp.src('source/assets/icons/*.svg')
  .pipe(svgo())
  .pipe(svgstore({
  inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));
  }

  // Copy

  const copy = (done) => {
  gulp.src([
  'source/fonts/*.{woff2,woff}',
  'source/*.ico',
  ], {
  base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
  }

  // Clear Cache

  export const clearCache = () => cache.clearAll();

  // Clean

  const clean = () => {
  return del('build');
  };

  // Server

  const server = (done) => {
  browser.init({
  server: {
  baseDir: 'build'
  },
  cors: true,
  notify: false,
  ui: false,
  });
  done();
  }

  // Reload

  const reload = (done) => {
  browser.reload();
  done();
  }

  // Watcher

  const watcher = () => {
  gulp.watch('source/**/*.scss', gulp.series(styles, clearCache, reload));
  gulp.watch('source/*.js', gulp.series(scripts, clearCache, reload));
  gulp.watch('source/**/*.pug', gulp.series(pugToHtml, clearCache, reload));
  }


  //---- GULP TASKS

  // Reset

  export const reset = clean;

  // Build

  export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
  styles,
  pugToHtml,
  scripts,
  faviconSvg,
  faviconIco,
  faviconApple,
  faviconPng,
  svg,
  bootstrapSprite,
  createWebp
  ),
  );

  // Start

  export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
  styles,
  pugToHtml,
  scripts,
  faviconSvg,
  faviconIco,
  faviconApple,
  faviconPng,
  svg,
  bootstrapSprite,
  createWebp
  ),
  gulp.series(
  server,
  watcher
  ));
