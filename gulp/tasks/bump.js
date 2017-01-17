const gulp  = require('gulp');

gulp.task('major-bump', () => {
    return bump('major');
});

gulp.task('minor-bump', () => {
    return bump('minor');
});

gulp.task('patch-bump', () => {
    return bump('patch');
});

function bump(type){

    var src = gulp.src('./package.json')
        .pipe($.bump({ type: type }))
        .pipe(gulp.dest('./'))
        .pipe($.git.commit('Package version bumped'))
        .pipe($.tagVersion());
}
