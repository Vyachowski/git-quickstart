  import {
    copyImages,
    optimizeImages,
    styles,
    pugToHtml,
    scripts,
    faviconSvg,
    faviconIco,
    faviconApple,
    faviconPng,
    svg,
    bootstrapSprite,
    createWebp,
    cleanDeploy,
    copyDeploy,
    optimizeImagesDeploy,
    stylesDeploy,
    pugToHtmlDeploy,
    scriptsDeploy,
    faviconSvgDeploy,
    faviconIcoDeploy,
    faviconAppleDeploy,
    faviconPngDeploy,
    svgDeploy,
    bootstrapSpriteDeploy,
    createWebpDeploy,
    pugToHtmlBuild,
    stylesBuild,
    server,
    watcher,
    reload,
    clean,
    copy,
  } from './gulp_functions.js'
  import gulp from 'gulp';

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
