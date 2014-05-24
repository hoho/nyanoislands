'use strict';

var gulp = require('gulp');

var eslint = require('gulp-eslint');
var qunit = require('gulp-qunit');
var stylus = require('gulp-stylus');
var filter = require('gulp-filter');
var conkitty = require('gulp-conkitty');
var concat = require('gulp-concat');


gulp.task('eslint', function() {
    return gulp.src(['gulpfile.js', 'src/**/*.js'])
        .pipe(eslint({
            rules: {
                'quotes': [2, 'single'],
                'no-shadow-restricted-names': 0,
                'no-underscore-dangle': 0
            },
            env: {
                'node': true,
                'browser': true
            }
        }))
        .pipe(eslint.format());
});


gulp.task('build', function() {
    var stylFilter = filter('**/*.styl');

    return gulp.src(['src/**/*.styl', 'src/**/*.js', 'src/**/*.ctpl'])
        .pipe(stylFilter)
        .pipe(stylus())
        .pipe(stylFilter.restore())
        .pipe(gulp.dest('./blocks'));
});


gulp.task('qunit', ['build'], function() {
    var cssFilter = filter('**/*.css');
    var jsFilter = filter(['**/*.js', '!tpl.js']);

    return gulp.src(['./test/*.ctpl', 'blocks/**/*.ctpl'])
        .pipe(conkitty({
            common: 'common.js',
            templates: 'tpl.js',
            deps: true
        }))

        .pipe(cssFilter)
        .pipe(concat('deps.css'))
        .pipe(cssFilter.restore())

        .pipe(jsFilter)
        .pipe(concat('deps.js'))
        .pipe(jsFilter.restore())

        .pipe(gulp.dest('./test'));

    //return gulp.src('./test/*.html')
    //    .pipe(qunit());
});


gulp.task('default', ['eslint', 'qunit']);
