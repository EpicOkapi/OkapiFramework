'use strict';

const requireDir = require('require-dir');

requireDir('./gulp/tasks', { recurse: true });

global.$ = require('gulp-load-plugins')({
    camelize: true
});
