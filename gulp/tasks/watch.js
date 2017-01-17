'use strict';

const gulp = require('gulp');
const conf = require('../config');

//Watcher callbacks
const tsCb = require('./ts').watchCb;

gulp.task('watch', () => {
    //Start typescript watcher
    $.watch(conf.ts.src, tsCb);
});
