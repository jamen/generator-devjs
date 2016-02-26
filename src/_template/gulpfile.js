var gulp = require('gulp');

<% if (typeof babel !== 'undefined') { %>
var babel = require('gulp-babel');
var del = require('del');
gulp.task('clean:javascript', function() { return del(['out/**.js']); });
gulp.task('build:javascript', function() {
  return gulp.src('src/**.js', { base: 'src' })
    .pipe(babel())
    .pipe(gulp.dest('out'));
});
<% } if (typeof eslint !== 'undefined') { %>
var eslint = require('gulp-eslint');
gulp.task('lint:javascript', function() {
  return gulp.src('src/**.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
<% } %>
