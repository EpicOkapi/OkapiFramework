'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', ['build'], function() {
    gulp.start('watch');

    setTimeout(function(){
        gulp.start('server');
    }, 3000);
});
