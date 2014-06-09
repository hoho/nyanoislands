'use strict';

var gulp = require('gulp');

var eslint = require('gulp-eslint');
var filter = require('gulp-filter');
var conkitty = require('gulp-conkitty');
var concat = require('gulp-concat');

var BUILD_DIR = './build';


gulp.task('eslint', function() {
    return gulp.src(['gulpfile.js'])
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


gulp.task('index.html', function() {
    gulp.src('index.html')
        .pipe(gulp.dest(BUILD_DIR));
});


gulp.task('demo', function() {
    var cssFilter = filter(['**/*.css']);
    var jsFilter = filter(['**/*.js', '!tpl.js']);

    return gulp.src(['./page.ctpl'])
        .pipe(conkitty({
            common: 'common.js',
            templates: 'tpl.js',
            deps: true,
            libs: {nyanoislands: require('../index.js')}
        }))

        .pipe(cssFilter)
        .pipe(concat('deps.css'))
        .pipe(cssFilter.restore())

        .pipe(jsFilter)
        .pipe(concat('deps.js'))
        .pipe(jsFilter.restore())

        .pipe(gulp.dest(BUILD_DIR));
});


gulp.task('default', ['eslint', 'demo', 'index.html']);
