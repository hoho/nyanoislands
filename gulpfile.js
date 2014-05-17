'use strict';

var gulp = require('gulp');

var eslint = require('gulp-eslint');
var qunit = require('gulp-qunit');


gulp.task('eslint', function() {
    return gulp.src(['gulpfile.js', 'blocks/**/*.js'])
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


gulp.task('qunit', [], function() {
    return gulp.src('./test/*.html')
        .pipe(qunit());
});


gulp.task('default', ['eslint', 'qunit']);
