const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

gulp.task('styles', () => {
  const files = './client/scss/splash.scss';

  return gulp.src(files)
    .pipe(sass({
      includePaths: './node_modules/'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./static/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  const files = './client/js/main.js';

  return gulp.src(files)
    .pipe(babel())
    .pipe(gulp.dest('./static/js'))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  browserSync.init({
    proxy: 'localhost:3000'
  });

  gulp.watch('./client/js/**/*.js', ['scripts']);
  gulp.watch('./client/scss/**/*.scss', ['styles']);
  gulp.watch('./server/views/*.html').on('change', browserSync.reload);
});


gulp.task('default', ['styles', 'scripts', 'watch']);
