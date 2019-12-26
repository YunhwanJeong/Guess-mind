import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import bro from "gulp-bro";
import babelify from "babelify";
import del from "del";

sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "src/assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "src/assets/**/*.scss"
  },
  scripts: {
    src: "src/assets/js/main.js",
    dest: "src/static/scripts",
    watch: "src/assets/**/*.js"
  }
};

const clean = () => del(["src/static"]);

const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest));
};

const scripts = () => {
  return gulp
    .src(paths.scripts.src)
    .pipe(
      bro({
        transform: [babelify.configure({ presets: ["@babel/preset-env"] })]
      })
    )
    .pipe(gulp.dest(paths.scripts.dest));
};

const watchFiles = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.scripts.watch, scripts);
};

export const dev = gulp.series([clean, styles, scripts, watchFiles]);
export const build = gulp.series([clean, styles, scripts]);
