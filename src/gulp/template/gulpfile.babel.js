import gulp from 'gulp';
const master = [];
<% if (babel) { %>
import babel from 'gulp-babel';
import del from 'del';
gulp.task('clean:javascript', () => del(['<%= entry %>/**.js']));
gulp.task('build:javascript', ['clean:javascript'], () =>
  gulp.src('<%= babelSource %>/**.js', { base: '<%= babelSource %>' })
    .pipe(babel())
    .pipe(gulp.dest('<%= entry %>'))
);
master.push('clean:javascript', 'build:javascript');
<% } if (eslint) { %>
import eslint from 'gulp-eslint';
gulp.task('lint:javascript', () =>
  gulp.src('<%= babel ? babelSource || entry %>/**.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);
master.push('lint:javascript');
<% } %>

gulp.task('default', master);
