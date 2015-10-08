'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    server = require('gulp-server-livereload');
    // autoprefixer = require('gulp-autoprefixer');
// translate sass to css
gulp.task('sass', function() {
    gulp.src('./sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        // .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
});

//initialize web server with livereload
gulp.task('webserver', function() {
    gulp.src('dist')
        .pipe(server({
            livereload: true,
            open: true
        }));
});

//check whether a sass file has change then trigger sass task
gulp.task('sass:watch', function() {
    gulp.watch('./sass/*.scss', ['sass']);
});

//default task will trigger webserver, sass and sass:watch task
//then by default it will watch any changes on the dist folder
//so when a sass file was converted to css the livereload-server will
//automatically reload the web because of changes in css files
gulp.task('default',['webserver', 'sass', 'sass:watch']);