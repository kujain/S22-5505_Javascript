'use strict';

// all plugins
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();


// Expose the sas to css task
function sassworkflow() {
    return gulp
        .src('./src/sass/**/*.scss')
        // tasks go here
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
};

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp sassworkflow
exports.sassworkflow = sassworkflow;

function watchtask(){
    browserSync.init({
        server: {
           baseDir: "./",
           index: "/index.html"
        }
    });

    gulp.watch( './src/sass/**/*.scss', sassworkflow );
}

// Expose the task by exporting it
exports.watchtask = watchtask;

// build the parallal task
const build = gulp.parallel(sassworkflow);

gulp.task('default', gulp.series(build, watchtask));
