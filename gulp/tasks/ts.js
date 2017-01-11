'use strict';

const gulp = require('gulp');
const conf = require('../config');

gulp.task('ts', () => {
    var tsProject = $.typescript.createProject(conf.ts.configFile);

    return gulp.src(conf.ts.src)
        .pipe(tsProject()).js
        .pipe(gulp.dest(conf.ts.dist));
});

module.exports.watchCb = () => {

    gulp.start('ts');
};
