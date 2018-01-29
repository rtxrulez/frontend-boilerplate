const config = require("./config");
const gulp = require("gulp");
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');

const dev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

console.log('dev status: ', dev);

gulp.task(function images(cb) {
  gulp
    .src([config.path.img + "/picture/**/*"])
    .pipe(
      gulpIf(
        dev, // Если не для разработки то применяем сжатие 
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          // TODO падает в процессе сборки
          // imagemin.jpegtran({progressive: true}),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [
              { removeViewBox: true },
              { cleanupIDs: false },
              { removeComments: true },
              { removeXMLProclnst: true },
              { cleanupAttrs: true },
              { removeTitle: true },
              { removeDoctype: true },
              { removeDesc: true },
              { removeStyleElement: true },
              { convertShapeToPath: true },
              { mergePaths: true },
              {
                cleanupNumericValues: {
                  floatPrecision: 2
                }
              }
            ]
          })
        ])
      )
    )
    .pipe(gulp.dest(config.path.dist.img));
    cb();
});
