'use strict';

var gulp = require('gulp');

var eslint = require('gulp-eslint');
var qunit = require('gulp-qunit');
var stylus = require('gulp-stylus');
var filter = require('gulp-filter');
var add = require('gulp-add');
var prefix = require('gulp-autoprefixer');
var fs = require('fs');


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
    var cssFilter = filter(['**/*.css']);

    return gulp.src(['src/*/**/*.styl', '!src/*/**/_*.styl', 'src/**/*.js', 'src/**/*.ctpl', 'src/nya.css'])
        .pipe(stylFilter)
        .pipe(stylus({errors: true}))
        .pipe(stylFilter.restore())
        .pipe(cssFilter)
        .pipe(prefix('last 1 version', '> 1%'))
        .pipe(cssFilter.restore())
        .pipe(add('babydom.js', fs.readFileSync(require.resolve('babydom'), {encoding: 'utf8'})))
        .pipe(gulp.dest('./nya'));
});


gulp.task('qunit', ['build'], function() {
    //return gulp.src('./test/*.html')
    //    .pipe(qunit());
});


gulp.task('default', ['eslint', 'qunit']);
