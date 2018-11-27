const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const pug = require('gulp-pug');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
// watch all files
gulp.task('watch', () => {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/**/*.pug', ['pug']);
    gulp.watch('src/js/**/*.js', ['js-concat']);

});
// compile sass to css
gulp.task('sass', () => {
    sass('src/sass/style.scss', {
        sourcemap: true,
        style: 'compressed'
    })
    .on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('assets/css'))
    .pipe(connect.reload())
});
// compile pug to html
gulp.task('pug', () => {
    return gulp.src('src/pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(connect.reload())
});
// concat js files
gulp.task('js-concat', () => {
    return gulp.src(['./src/js/vendors/*.js', 'src/js/partials/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./assets/js'))
        .pipe(connect.reload());
});
// localhost live
gulp.task('connect', () => {
    connect.server({
        port: 8000,
        root: './',
        livereload: true
    })
});
// default task in gulp
gulp.task('default', ['connect', 'watch']);
