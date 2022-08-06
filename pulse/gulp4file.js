const {src, dest, parallel, series, watch} = require('gulp')
const browserSync = require("browser-sync").create();
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


// Static server
function browsersync () {
	browserSync.init({
		server: {baseDir: 'src/'}
	})
};

function styles () {
	return src("src/sass/**/*.+(scss|sass)")
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(rename({
			prefix: "",
			suffix: ".min",
		  }))
		.pipe(autoprefixer())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(dest("src/css"))
		.pipe(browserSync.stream());
};

function startwatch () {
	watch("src/sass/**/*.+(scss|sass)", styles);
	watch("src/*.html").on("change", browserSync.reload);
	watch("src/js/*.js").on("change", browserSync.reload);
}

exports.browsersync = browsersync;
exports.styles = styles;
exports.startwatch = startwatch;

exports.default = parallel(styles, browsersync , startwatch);