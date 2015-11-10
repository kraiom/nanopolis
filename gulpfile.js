var gulp        = require('gulp'),
    babelify    = require('babelify'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    bufferify   = require('vinyl-buffer'),
    jshint      = require('gulp-jshint'),
    uglify      = require('gulp-uglify'),
    img         = require('gulp-imagemin'),
    jscs        = require('gulp-jscs'),
    argv        = require('yargs').argv,
    gulpif      = require('gulp-if'),
    connect     = require('gulp-connect');

var DEBUG = argv.production ? false : true;
var NAME = require('./package').name;

gulp.task('default', ['scripts', 'copylibs', 'html', 'img', 'audio']);

gulp.task('watch', ['default'], function () {
    gulp.watch('./src/js/**/*', ['scripts']);
    gulp.watch('./src/html/**/*', ['html']);
    gulp.watch('./src/json/**/*', ['json', 'scripts']);
});

gulp.task('copylibs', function () {
  return gulp
  .src([
    './node_modules/phaser/build/phaser.min.js',
    './node_modules/phaser-plugin-isometric/dist/phaser-plugin-isometric.min.js'
  ])
  .pipe(gulp.dest('./build/assets/js/lib/'));
});

gulp.task('code-check', function () {
  return gulp
  .src('./src/js/**/*')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jscs({configPath: './.jscsrc'}));
});

gulp.task('scripts', ['json'], function () {
    browserify({
        entries: './src/js/states/main.js',
        debug: DEBUG
    })
    .transform(babelify.configure({ stage: 0 }))
    .bundle()
    .pipe(source(NAME + '.min.js'))
    .pipe(bufferify())
    .pipe(gulpif(DEBUG === false, uglify()))
    .pipe(gulp.dest('./build/assets/js/'));
});

gulp.task('html', function() {
  return gulp
  .src('./src/html/**/*')
  .pipe(gulp.dest('./build/'));
});

gulp.task('json', function() {
  return gulp
  .src('./src/json/*')
  .pipe(gulp.dest('./build/assets/json'));
});

gulp.task('audio', function () {
  return gulp
  .src('./src/audio/*')
  .pipe(gulp.dest('./build/assets/audio'));
});

gulp.task('img', function() {
  return gulp
  .src('./src/img/*')
  // .pipe(img())
  .pipe(gulp.dest('./build/assets/img/'));
});

gulp.task('serve', ['watch'], function () {
  connect.server({
    root: './build/',
    livereload: true
  });
});
