let project_folder = "dist";
let source_folder = "app";

let path = {
    build:{
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src:{
        html: source_folder + "/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/*.js",
        img: source_folder + "/img/*.*",
        fonts: source_folder + "/fonts/**/*.*",
    },
    watch:{
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.*",
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require("gulp"),
    gulp = require("gulp"),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    imagemin = require("gulp-imagemin"),
    concat = require('gulp-concat');

function browserSync() {
    browsersync.init({
        server:{
            baseDir: "./" + project_folder + "/",
        },
        port: 3000,
    })
}

function html(){
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css(){
     return src(['app/scss/main.scss'])
        .pipe(eval(scss)())
        .pipe(concat('main.css'))
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(group_media())
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src([ 
                'node_modules/jquery/dist/jquery.min.js',
                'node_modules/slick-carousel/slick/slick.min.js',
                'app/js/scripts.js'
        ])
        .pipe(concat('app.js'))//обьединение файлов js
        .pipe(fileinclude())
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images(){
    return src(path.src.img)
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
}

function fonts() {
    return src(path.src.fonts).pipe(dest(path.build.fonts))
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean(){
    return del(path.clean);
}

function cleanimg() {
        return del('app/img/dest/**')
    }

let build = gulp.series(clean, gulp.parallel(css, images, html, fonts, js));
let watch = gulp.parallel(watchFiles, browserSync);

exports.images = images;
exports.css = css;
exports.js = js;
exports.html = html;
exports.cleanimg = cleanimg;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;