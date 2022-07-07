const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const sync = require('browser-sync').create()


function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(dest('dist'))
}

function scss() {
    return src('src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist'))
}

// function clear() {
//     return del('dist')
// }
function serve() {
    sync.init({
        server: './dist'
    })

    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)

}


exports.serve = series(scss, html, serve)
exports.build = series(scss, html)
// exports.html = html
// exports.scss = scss
// exports.clear = clear
// exports.serve = series(clear, scss, html, serve)
// exports.build = series(clear, scss, html)

