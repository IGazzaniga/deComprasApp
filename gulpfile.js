var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss'],
  scripts: ['./www/scripts/**/*.js'],
  views: {
    main: './www/index.html',
    files: ['./www/scripts/modules/**/views/**/*.html']
  }
};

gulp.task('default', ['sass','inject']);

gulp.task('inject', function () {
  var target = gulp.src('www/index.html');
  var jsSources = gulp.src(['www/scripts/**/*.js'], {read: false});
  var cssSources = gulp.src(['www/css/*.min.css'], {read: false});
  return target.pipe(inject(jsSources, {relative: true}))
    .pipe(inject(cssSources, {relative: true}))
    .pipe(gulp.dest('www'));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/**/*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
