var gulp = require('gulp'),
    del = require('del'),
    folders = require('gulp-folders'),
    path = require('path'),
    argv = require('yargs').argv;

var $ = require('gulp-load-plugins')({
    lazy: true
});

var config = {
    output: './css/',
    pathToConfigs: './less/configs'
};

gulp.task('css', $.folders(config.pathToConfigs, function (folder) {
    return gulp.src(path.join(config.pathToConfigs, folder, '*.less'))
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
        .pipe($.autoprefixer({
            browsers: ['last 1 Chrome version', 'last 1 Firefox version', 'last 1 Explorer version', 'last 1 Safari version', 'last 1 iOS version'],
            cascade: false
        }))
        .pipe(gulp.dest(path.join(config.output, folder)));
}));

gulp.task('watch', function () {
    gulp.run('css');
    gulp.watch('./less/**/*.less', ['css']);
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