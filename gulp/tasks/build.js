const gulp          = require('gulp');
const runSequence   = require('run-sequence');

gulp.task('build', (done) => {
    runSequence(
        'clean',
        'ts',
        done
    );
});
