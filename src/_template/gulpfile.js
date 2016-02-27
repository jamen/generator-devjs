var gulp = require('gulp');
var master = [];
var task = gulp.task;
gulp.task = function(){ master.push(arguments[0]); return task.apply(gulp, arguments) };
<% if (typeof gulp_babel !== 'undefined' && gulp_babel) { %>
var babel = require('gulp-babel');
var del = require('del');
gulp.task('clean:javascript', function() { return del(['out/**.js']) });
gulp.task('build:javascript', function() {
  return gulp.src('src/**.js', { base: 'src' })
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});
<% } if (typeof gulp_eslint !== 'undefined' && gulp_eslint) { %>
var eslint = require('gulp-eslint');
gulp.task('lint:javascript', function() {
  return gulp.src('src/**.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
<% } %>

gulp.task('default', master);
