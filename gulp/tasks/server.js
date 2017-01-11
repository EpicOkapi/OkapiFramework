'use strict';

const gulp = require('gulp');
const conf = require('../config');

gulp.task('server', () => {
    $.nodemon({
        script: conf.paths.dist,
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
    });
});
