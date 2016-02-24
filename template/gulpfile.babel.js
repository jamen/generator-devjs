import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';

gulp.task('default', ['build']);

gulp.task('clean', () => del('lib'));

gulp.task('build', ['clean'], () => {
  return gulp.src('src/**', { base: 'src' })
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});
