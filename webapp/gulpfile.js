'use strict';

var gulp = require('gulp');
var syrup = require('syrup');
var reactBootstrap = require('react-bootstrap');

syrup.gulp.init(
  gulp,
  { compressJs: false, sourceMaps: false, disableJsHint: true, detectGlobals: true },
  { '%TITLE%': 'Profiler Visualizer' },
  {
    less: 'app/*.less',
    allLess: 'app/**/*.less',
    build: '../public'
  }
);
