'use strict';

var gulp = require('gulp');

var eslint = require('gulp-eslint');
var prefix = require('gulp-autoprefixer');
var less = require('gulp-less');
var add = require('gulp-add');
var conkitty = require('gulp-conkitty');
var gulpFilter = require('gulp-filter');
var concat = require('gulp-concat');

var fs = require('fs');
var path = require('path');
var del = require('del');

var BOOTSTRAP_PATH = path.normalize(path.join(require.resolve('bootstrap'), '..', '..', '..'));
var DEST = 'nya';


gulp.task('clean', function(cb) {
    del([DEST, 'tmp', path.join('test-page', 'build')], cb);
});


gulp.task('eslint', function() {
    var rules = {
        'quotes': [2, 'single'],
        'no-shadow-restricted-names': 0,
        'no-underscore-dangle': 0,
        'key-spacing': 0,
        'no-use-before-define': 0
    };

    gulp.src('src/**/*.js')
        .pipe(eslint({rules: rules, env: {browser: true}}))
        .pipe(eslint.format());

    gulp.src('gulpfile.js')
        .pipe(eslint({rules: rules, env: {node: true}}))
        .pipe(eslint.format());
});


// Copy Bootstrap variables and mixins. To be able to include them in projects.
gulp.task('copy-bootstrap', function() {
    return gulp
        .src([
            path.join(BOOTSTRAP_PATH, 'less/variables.less'),
            path.join(BOOTSTRAP_PATH, 'less/mixins.less'),
            path.join(BOOTSTRAP_PATH, 'less/**/mixins/*.less')
        ])
        .pipe(gulp.dest(path.join(DEST, '_bootstrap')));
});


// Copy .less files with variables.
gulp.task('copy-less', function() {
    return gulp.src(['src/common.less', 'src/dark.less', 'src/light.less'])
        .pipe(gulp.dest(DEST));
});


gulp.task('copy-templates', function() {
    return gulp.src('src/**/*.ctpl')
        .pipe(gulp.dest(DEST));
});


gulp.task('copy-scripts', function() {
    return gulp.src(['src/**/*.js', require.resolve('babydom')])
        .pipe(gulp.dest(DEST));
});


gulp.task('build-less', ['copy-bootstrap', 'copy-less'], function() {
    return gulp.src(['src/**/*.light.less', 'src/**/*.dark.less'])
        .pipe(less({paths: [BOOTSTRAP_PATH, DEST]}))
        .pipe(prefix('last 1 version', '> 1%'))
        .pipe(gulp.dest(DEST));
});


gulp.task('build', ['build-less', 'copy-templates', 'copy-scripts']);


gulp.task('test-pages', ['build'], function() {
    var nyanoislands = require('./index.js');

    ['', 'light', 'dark'].forEach(function(theme) {
        var cssFilter = gulpFilter('**/*.css', {restore: true});
        var jsFilter = gulpFilter('**/*.js', {restore: true});

        return gulp.src('test-page/test-page.ctpl')
            .pipe(conkitty({
                common: 'common.js',
                templates: 'tpl.js',
                libs: {nyanoislands: nyanoislands},
                deps: true,
                env: theme ? {theme: theme} : undefined
            }))
            .pipe(cssFilter)
            .pipe(concat('test-page.css'))
            .pipe(cssFilter.restore)
            .pipe(jsFilter)
            .pipe(concat('test-page.js'))
            .pipe(jsFilter.restore)
            .pipe(add('test-page.html', fs.readFileSync('test-page/test-page.html', {encoding: 'utf8'})))
            .pipe(gulp.dest(path.join('test-page', 'build', theme)));
    });
});


gulp.task('default', ['eslint', 'build', 'test-pages']);
