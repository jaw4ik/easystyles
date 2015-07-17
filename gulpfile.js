var gulp = require('gulp'),
    del = require('del');

var $ = require('gulp-load-plugins')({
    lazy: true
});

var config = {
    output: './dev/'
};

gulp.task('css', function () {
    gulp.src(['./css/black.less', './css/lango.less', './css/green.less'])
        .pipe($.plumber({
            errorHandler: function (error) {
                console.log(error);
                this.emit('end');
            }
        }))
        .pipe($.less({
            strictMath: true,
            strictUnits: true
        }))
        .pipe($.csso())
        .pipe($.base64({
            maxImageSize: 165536
        }))
        .pipe($.autoprefixer({
            browsers: ['last 1 Chrome version', 'last 1 Firefox version', 'last 1 Explorer version', 'last 1 Safari version', 'last 1 iOS version'],
            cascade: false
        }))
        .pipe(gulp.dest(config.output))
});

gulp.task('watch', function () {
    gulp.run('css');
    gulp.watch('./css/*.less', ['css']);
});

gulp.task('webserver', function () {
    gulp.src('.')
        .pipe($.webserver({
            livereload: {
                enable: true,
                filter: function (fileName) {
                    return !fileName.match(/.less$/);
                }
            },
            directoryListing: true,
            open: "index.html"
        }));
});