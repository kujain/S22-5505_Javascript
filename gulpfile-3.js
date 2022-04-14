'use strict';

// all plugins
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

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

function lint() {
    return gulp
        .src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
};
exports.lint = lint;

// Concatenate JS
function scripts() {
    return gulp
        .src('./src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
};
exports.scripts = scripts;


function watchtask(){
    browserSync.init({
        server: {
           baseDir: "./",
           index: "/index.html"
        }
    });

    gulp.watch( './src/sass/**/*.scss', sassworkflow );
    gulp.watch( './src/js/*.js', gulp.parallel( scripts, lint) );
}

// Expose the task by exporting it
exports.watchtask = watchtask;

// build the parallal task
const build = gulp.parallel(sassworkflow, scripts);

gulp.task('default', gulp.series(build, watchtask));
