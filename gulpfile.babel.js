import gulp from "gulp";
import sass from "gulp-sass";

const paths = {
  styles: {
    src: "src/assets/scss/styles.scss",
    dest: "static/styles"
  }
};

export const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.styles.dest));
};
