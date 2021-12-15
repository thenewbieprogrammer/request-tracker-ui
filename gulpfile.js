const gulp = require('gulp');
const gap = require('gulp-append-prepend');

gulp.task('licenses', async () => {
  gulp
    .src('build/static/js/*chunk.js', { base: './' })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Material Kit React - v1.10.0
=========================================================


* Coded by Mohammad


*/`)
    )
    .pipe(gulp.dest('./', { overwrite: true }));

  // this is to add Creative Tim licenses in the production mode for the minified html
  gulp
    .src('build/index.html', { base: './' })
    .pipe(
      gap.prependText(`<!--

      =========================================================
      * Material Kit React - v1.10.0
      =========================================================
      
      
      * Coded by Mohammad
      
      
      */`)
    )
    .pipe(gulp.dest('./', { overwrite: true }));

  // this is to add Creative Tim licenses in the production mode for the minified css
  gulp
    .src('build/static/css/*chunk.css', { base: './' })
    .pipe(
      gap.prependText(`/*!

      =========================================================
      * Material Kit React - v1.10.0
      =========================================================
      
      
      * Coded by Mohammad
      
      
      */`)
    )
    .pipe(gulp.dest('./', { overwrite: true }));
});
