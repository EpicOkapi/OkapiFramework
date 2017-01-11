const gulp  = require('gulp');
const del   = require('del');
const conf  = require('../config');

gulp.task('clean', () => {
    return del(conf.paths.dist);
});
