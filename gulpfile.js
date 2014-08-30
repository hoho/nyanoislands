'use strict';

var gulp = require('gulp');

var eslint = require('gulp-eslint');
var prefix = require('gulp-autoprefixer');
var less = require('gulp-less');
var add = require('gulp-add');

var fs = require('fs');
var path = require('path');

// TODO: Replace with require.resolve() as soon as Bootstrap will release a fix.
var BOOTSTRAP_PATH = '.';
var DEST = 'nya';


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


// Copy Bootstrap variables and mixins. To be able to include them in projects.
gulp.task('copy-bootstrap', function() {
    return gulp
        .src([
            path.join(BOOTSTRAP_PATH, 'node_modules/bootstrap/less/variables.less'),
            path.join(BOOTSTRAP_PATH, 'node_modules/bootstrap/less/mixins.less'),
            path.join(BOOTSTRAP_PATH, 'node_modules/bootstrap/less/**/mixins/*.less')
        ])
        .pipe(gulp.dest(path.join(DEST, '_bootstrap')));
});


// Copy .less files with variables.
gulp.task('copy-less', function() {
    gulp.src(['src/dark.less', 'src/light.less'])
        .pipe(gulp.dest(DEST));
});


gulp.task('copy-templates', function() {
    gulp.src('src/**/*.ctpl')
        .pipe(gulp.dest(DEST));
});


gulp.task('copy-scripts', function() {
    gulp.src('src/**/*.js')
        .pipe(add('babydom.js', fs.readFileSync(require.resolve('babydom'), {encoding: 'utf8'})))
        .pipe(gulp.dest(DEST));
});


gulp.task('build-less', ['copy-bootstrap', 'copy-templates', 'copy-less', 'copy-scripts'], function() {
    return gulp.src(['src/nya.light.less', 'src/nya.dark.less', 'src/*/**/*.less'])
        .pipe(less({paths: [BOOTSTRAP_PATH, DEST]}))
        .pipe(prefix('last 1 version', '> 1%'))
        .pipe(gulp.dest(DEST));
});


gulp.task('default', ['eslint', 'build-less']);
