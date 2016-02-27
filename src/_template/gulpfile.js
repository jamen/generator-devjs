var gulp = require('gulp');
const master = [];
function task() {gulp.task.apply(gulp, arguments); master.push(arguments[0]);};
<% if (typeof gulp_babel !== 'undefined' && gulp_babel) { %>
var babel = require('gulp-babel');
var del = require('del');
task('clean:javascript', function() { return del(['out/**.js']) });
task('build:javascript', function() {
  return gulp.src('src/**.js', { base: 'src' })
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});
<% } if (typeof gulp_eslint !== 'undefined' && gulp_eslint) { %>
var eslint = require('gulp-eslint');
task('lint:javascript', function() {
  return gulp.src('src/**.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
<% } %>

gulp.task('default', master);
