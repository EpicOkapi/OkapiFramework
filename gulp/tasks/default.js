'use strict';

const gulp          = require('gulp');
const runSequence   = require('run-sequence');

gulp.task('default', ['build'], function() {
    gulp.start('watch');
});
