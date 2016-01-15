var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    svg2png = require('gulp-svg2png'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch');

var basePaths = {
  src: 'build/',
  dest: 'sprite/',
  destpng: 'pngicons/'
};

var paths = {
  sprite: {
    src: basePaths.src
  },
  png: {
    src: basePaths.src,
    dest: basePaths.destpng
  }
};


// SPRITE SVG =================================================================
  gulp.task('svgSprite', function () {
    return gulp.src( paths.sprite.src + '/*.svg' )
      .pipe(svgmin({
        plugins: [
          {convertColors: false},
          {removeAttrs: {attrs: ['fill']}}
        ]
      }))
      .pipe(svgSprite({
        dest: basePaths.dest,
        mode: {
          symbol: {
            dest: './',
            sprite: 'svg-sprite-icons',
            transform : [{svgo : {}}]
          }
        }
      }))
      .pipe(gulp.dest(basePaths.dest));
  });

  gulp.task('svg2png', function () {
    return gulp.src(paths.png.src + '/*.svg' )
      .pipe(svg2png())
      .pipe(gulp.dest(paths.png.dest));
  });

  gulp.task('sprite', function(callback) {
    runSequence(
      'svgSprite',
      'svg2png',
      callback);
  });

  gulp.task('svgWatch', function () {
    watch(paths.sprite.src + '/*.svg', batch(function (events, done) {
      gulp.start('sprite', done);
    }));
  });