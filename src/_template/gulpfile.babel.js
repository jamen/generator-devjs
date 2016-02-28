import gulp from 'gulp';
const master = [];
const task = gulp.task;
gulp.task = function(...a) { master.push(a[0]); return task(...a) };
<% if (typeof gulp_babel !== 'undefined' && gulp_babel) { %>
import babel from 'gulp-babel';
import del from 'del';
gulp.task('clean:javascript', () => del(['out/**.js']));
gulp.task('build:javascript', () =>
  gulp.src('src/**.js', { base: 'src' })
    .pipe(babel())
    .pipe(gulp.dest('lib'))
);
<% } if (typeof gulp_eslint !== 'undefined' && gulp_eslint) { %>
import eslint from 'gulp-eslint';
gulp.task('lint:javascript', () =>
  gulp.src('src/**.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);
<% } %>

gulp.task('default', master);
