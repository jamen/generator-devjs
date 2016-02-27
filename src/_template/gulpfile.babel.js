import gulp from 'gulp';
const master = [];
function task(...args) { gulp.task(...args); master.push(args[0]) };
<% if (typeof gulp_babel !== 'undefined' && gulp_babel) { %>
import babel from 'gulp-babel';
import del from 'del';
task('clean:javascript', () => del(['out/**.js']));
task('build:javascript', () =>
  gulp.src('src/**.js', { base: 'src' })
    .pipe(babel())
    .pipe(gulp.dest('lib'))
);
<% } if (typeof gulp_eslint !== 'undefined' && gulp_eslint) { %>
import eslint from 'gulp-eslint';
task('lint:javascript', () =>
  gulp.src('src/**.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);
<% } %>

gulp.task('default', master);
