const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const image = require('gulp-image');
const del = require('del');
const browserSync = require('browser-sync').create();

function styles() {
   return gulp.src('./src/styles/app.scss')
      .pipe(sass())
      .pipe(concat('main.css'))
      .pipe(autoprefixer({
         overrideBrowserslist: ['last 2 versions'],
         cascade: false
      }))
      .pipe(cleanCSS({
         level: 2
      }))
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream());
}

function images() {
   return gulp.src('./src/assets/pictures/**/*')
       .pipe(image())
       .pipe(gulp.dest('./dist/img'));
}

function fonts() {
   return gulp.src('./src/assets/fonts/**/*')
       .pipe(gulp.dest('dist/fonts'))
}

function clean() {
   return del(['dist/*'])
}

function watch() {
   browserSync.init({
      server: {
         baseDir: "./"
      }
   });
   gulp.watch('./src/styles/**/*.scss', styles);
   gulp.watch("./*.html").on('change', browserSync.reload);
}


gulp.task('styles', styles);
gulp.task('image', images);
gulp.task('fonts', fonts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, images, fonts)));
gulp.task('dev', gulp.series('build', 'watch'));
