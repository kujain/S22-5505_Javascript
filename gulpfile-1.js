'use strict';

// all plugins
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

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
        .pipe(gulp.dest('./dist/css/'));
};

// Expose the task by exporting it
// This allows you to run it from the command line using
// $ gulp sassworkflow
exports.sassworkflow = sassworkflow;

// build the parallal task
const build = gulp.parallel(sassworkflow);

// what runs when typing gulp
gulp.task('default', build);
