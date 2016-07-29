const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const nodemon = require('nodemon');

var allFiles = ['**/*.js', '!./node_modules/**', '!./db/**'];
var testFiles = ['./test/**/*.js'];

gulp.task('lint', () => {
  return gulp.src(allFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('test:routes', () => {
  return gulp.src(testFiles)
  .pipe(mocha());
});

gulp.task('nodemon', () => {
  nodemon({
    script: 'server.js'
  })
  .on('start', () => {
    console.log('nodemon has started the server');
  })
  .on('quit', () => {
    console.log('nodemon has closed');
  })
  .on('restart', (files) => {
    console.log('nodemon restarting, changes to: ', files);
  });
});

gulp.task('default', ['lint', 'test:routes']);
