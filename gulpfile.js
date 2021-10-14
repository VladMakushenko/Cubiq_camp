const gulp = require('gulp');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const del = require('del');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const mergeStream = require('merge-stream');
const fileinclude = require('gulp-file-include');
const babel = require('gulp-babel');


const path = {
    src: {
        html: './app/*.html',
        mainCss: './app/scss/main_style.scss',
        pagesCss: './app/scss/pages/*.scss',
        js: './app/js/*.js',
        img: './app/img/**/*.*',
        fonts: './app/fonts/**/*.*',
    },
    dist: {
        html: './dist/',
        mainCss: './dist/css/',
        pagesCss: './dist/css/pages/',
        js: './dist/js/',
        img: './dist/img/',
        fonts: './dist/fonts/',
    },
    watch: {
        html: './app/**/*.html',
        css: './app/scss/**/*.scss',
        js: './app/js/**/*.js',
        img: './app/img/**/*.*',
        fonts: './app/fonts/**/*.*',
    },
    clean: './dist'
};


const clean = () => {
    return del(path.clean);
};

const buildHTML = () => {
    return gulp
        .src(path.src.html)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(path.dist.html));
};

const buildCSS = () => {
    return mergeStream(
        gulp
            .src(path.src.mainCss)
            .pipe(plumber())
            .pipe(
                sass({
                    outputStyle: 'compressed',
                }).on('error', notify.onError())
            )
            .pipe(postcss(
                [autoprefixer(
                    [
                        'last 15 versions',
                    ],
                    [
                        'ie 6-8'
                    ]
                )]
            ))
            .pipe(cleancss({level: {1: {specialComments: 0}}}))
            .pipe(rename('style.min.css'))
            .pipe(gulp.dest(path.dist.mainCss)),

        gulp
            .src(path.src.pagesCss)
            .pipe(plumber())
            .pipe(
                sass({
                    outputStyle: 'compressed',
                }).on('error', notify.onError())
            )
            .pipe(postcss(
                [autoprefixer(
                    [
                        'last 15 versions',
                    ],
                    [
                        'ie 6-8'
                    ]
                )]
            ))
            .pipe(cleancss({level: {1: {specialComments: 0}}}))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(path.dist.pagesCss))
    );   
};

const buildJS = () => {
    return gulp
        .src(path.src.js)
        .pipe(plumber())
        .pipe(
            babel({
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            "targets": "> 0.25%, not dead"
                        }
                    ]
                ],
                plugins: [
                    [
                        '@babel/plugin-transform-arrow-functions'
                    ],
                ]
            })
        )
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest(path.dist.js));
};

const buildImages = () => {
    return gulp
        .src(path.src.img)
        .pipe(gulp.dest(path.dist.img));
};

const buildFonts = () => {
    return gulp
        .src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts));
};

const watchFiles = () => {
    gulp.watch(path.watch.html, buildHTML);
    gulp.watch(path.watch.css, buildCSS);
    gulp.watch(path.watch.js, buildJS);
    gulp.watch(path.watch.img, buildImages);
    gulp.watch(path.watch.fonts, buildFonts);
};


const build = gulp.series(clean, gulp.parallel(buildHTML, buildCSS, buildJS, buildImages, buildFonts));
const watch = gulp.parallel(watchFiles);
const dev = gulp.series(build, watch);

exports.build = build;
exports.watch = watch;
exports.dev = dev;
exports.default = dev;
