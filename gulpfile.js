'use strict';

var gulp = require('gulp');

var eslint = require('gulp-eslint');
var qunit = require('gulp-qunit');
var stylus = require('gulp-stylus');
var filter = require('gulp-filter');


gulp.task('eslint', function() {
    return gulp.src(['gulpfile.js', 'nya/**/*.js'])
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

    return gulp.src(['nya/*/**/button.styl', 'nya/**/*.js', 'nya/**/*.ctpl'])
        .pipe(stylFilter)
        .pipe(stylus({errors: true}))
        .pipe(stylFilter.restore())
        .pipe(gulp.dest('./blocks'));
});


gulp.task('qunit', ['build'], function() {
    //return gulp.src('./test/*.html')
    //    .pipe(qunit());
});


gulp.task('default', ['eslint', 'qunit']);
