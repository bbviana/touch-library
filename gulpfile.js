var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


var paths = {
    src: 'src/main/webapp/js',
    target: 'target/rupees/js'
};

gulp.task('browserify', function () {
    gulp.src(paths.src + '/main.js')
        .pipe(browserify({transform: 'reactify', debug: true}))
        .on('error', function (err) {
            console.error('JSX ERROR in ' + err.fileName);
            console.error(err.message);
            this.end();
        })
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(paths.target));
});


gulp.task('default', ['browserify']);

gulp.task('watch', function () {
    gulp.watch(paths.src + '/**/*.*', ['default']);
});