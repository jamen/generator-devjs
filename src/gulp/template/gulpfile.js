var gulp = require('gulp');
const master = [];
<% if (babel) { %>
var babel = require('gulp-babel');
var del = require('del');
gulp.task('clean', function() { return del(['<%= entry %>/**.js']) });
gulp.task('build:javascript', ['clean:javascript'], function() {
  return gulp.src('<%= babelSource %>/**.js', { base: '<%= babelSource %>' })
    .pipe(babel())
    .pipe(gulp.dest('<%= entry %>'));
});
master.push('clean:javascript', 'build:javascript');
<% } if (eslint) { %>
var eslint = require('gulp-eslint');
gulp.task('lint:javascript', function() {
  return gulp.src('<%= babel ? babelSource || entry %>/**.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
master.push('lint:javascript');
<% } %>

gulp.task('default', master);
