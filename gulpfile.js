var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var pump = require('pump');
var ngAnnotate = require('gulp-ng-annotate');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

// Bootstrap
gulp.src([
    './node_modules/bootstrap/dist/**/*',
    '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
    '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
.pipe(gulp.dest('./vendor/bootstrap'))

// jQuery
gulp.src([
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js'
    ])
.pipe(gulp.dest('./vendor/jquery'))

})

// Default task
gulp.task('default', ['vendor']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Dev task
gulp.task('dev', ['browserSync'], function() {
    gulp.watch('./css/*.css', browserSync.reload);
    gulp.watch('./*.html', browserSync.reload);
});

//Compile and minify scss
gulp.task('styles', function () {
    gulp.src(['css/main.scss', 'components/**/*.scss'])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('css/'));
    gulp.start('css');
});

//Minify local css assets
gulp.task('css', function() {
    return gulp.src('css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('css/'));
});

// Minify JS scripts
gulp.task('scripts', function(cb) {
    pump([ 
        gulp.src('components/**/*.js'),
        concat('main.min.js'),
        ngAnnotate(),
        uglify(),
        gulp.dest('js/')
        ], cb);
});

//Minify and concat
gulp.task('minify', function(cb) {
    gulp.start('scripts');
    gulp.start('styles');
});