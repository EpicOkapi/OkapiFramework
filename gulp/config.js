'use strict';

let config = {};

config.paths = {
    src: './src',
    dist: './dist'
};

config.ts = {
    configFile: './tsconfig.json',
    src: config.paths.src + '/**/*.ts',
    dist: config.paths.dist
};

module.exports = config;
