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
import purgeCss from '@fullhuman/postcss-purgecss';
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
  purgeCss({
    content: ['source/**/*.pug', 'source/**/*.js']
  }),
  csso({
    sourceMap: true,
  })
  ]))
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
  .pipe(browser.stream());
  }

  export const stylesBuild = () => {
    return gulp.src('source/scss/*.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
    autoprefixer(),
    csso({
      sourceMap: true,
    })
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
    }

  export const stylesDeploy = () => {
    return gulp.src('source/scss/*.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
    autoprefixer(),
    purgeCss({
      content: ['source/**/*.pug', 'source/**/*.js']
    }),
    csso({
      sourceMap: true,
    })
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('deploy/css', { sourcemaps: '.' }))
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

  const faviconIcoDeploy = () => {
    return gulp.src('source/assets/favicon/*.ico')
    .pipe(rename('favicon.ico'))
    .pipe(gulp.dest('deploy'));
  }

  const faviconAppleDeploy = () => {
    return gulp.src('source/assets/favicon/*.png')
    .pipe(rename('apple-touch-icon.png'))
    .pipe(gulp.dest('deploy/img'));
  }

  const faviconPngDeploy = () => {
    return gulp.src('source/assets/favicon/*.png')
    .pipe(rename('favicon.png'))
    .pipe(gulp.dest('deploy/img'));
  }

  const faviconSvgDeploy = () => {
    return gulp.src('source/assets/favicon/*.svg')
    .pipe(rename('favicon.svg'))
    .pipe(gulp.dest('deploy/img'));
  }

  // PUG

  const pugToHtml = () => {
    return gulp.src('source/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('build'));
    }

  const pugToHtmlBuild = () => {
    return gulp.src('source/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(htmlmin({ collapseWhitespace: false }))
    .pipe(gulp.dest('build'));
    }

  const pugToHtmlDeploy = () => {
    return gulp.src('source/*.pug')
    .pipe(pug())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('deploy'));
    }

  // // HTML

  // const html = () => {
  // return gulp.src('source/*.html')
  // .pipe(htmlmin({ collapseWhitespace: false }))
  // .pipe(gulp.dest('build'));
  // }

  // Scripts

  const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(jsmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/js'))
  .pipe(browser.stream());
  }

  const scriptsDeploy = () => {
    return gulp.src('source/js/*.js')
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('deploy/js'));
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

  const optimizeImagesDeploy = () => {
    return gulp.src('source/assets/images/*.{png,jpg}')
    .pipe(imagemin())
    .pipe(gulp.dest('deploy/img'))
    }

  // WebP

  const createWebp = () => {
  return gulp.src('source/assets/images/*.{png,jpg}')
  .pipe(webp())
  .pipe(gulp.dest('build/img'))
  }

  const createWebpDeploy = () => {
    return gulp.src('source/assets/images/*.{png,jpg}')
    .pipe(webp())
    .pipe(gulp.dest('deploy/img'))
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

  const svgDeploy = () =>
  gulp.src(['source/assets/images/*.svg', '!source/assets/icons/*.svg'])
  .pipe(svgo())
  .pipe(gulp.dest('deploy/img'));

  const bootstrapSpriteDeploy = () => {
  return gulp.src('source/assets/icons/*.svg')
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('deploy/img'));
  }

  const spriteDeploy = () => {
  return gulp.src('source/assets/icons/*.svg')
  .pipe(svgo())
  .pipe(svgstore({
  inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('deploy/img'));
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

  const copyDeploy = (done) => {
    gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    ], {
    base: 'source'
    })
    .pipe(gulp.dest('deploy'))
    done();
    }

  // Clear Cache

  export const clearCache = () => cache.clearAll();

  // Clean

  const clean = () => {
  return del('build');
  };

  const cleanDeploy = () => {
    return del('deploy');
    };

  // Server

  export const server = (done) => {
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
  pugToHtmlBuild,
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

  // Deploy

  export const deploy = gulp.series(
    cleanDeploy,
    copyDeploy,
    optimizeImagesDeploy,
    gulp.parallel(
    stylesDeploy,
    pugToHtmlDeploy,
    scriptsDeploy,
    faviconSvgDeploy,
    faviconIcoDeploy,
    faviconAppleDeploy,
    faviconPngDeploy,
    svgDeploy,
    bootstrapSpriteDeploy,
    createWebpDeploy
    ),
    );

  // Start

  export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
  stylesBuild,
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
