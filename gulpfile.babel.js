import gulp from 'gulp';
const master = [];

import babel from 'gulp-babel';
import del from 'del';
gulp.task('clean', () => del(['generators/**']));
gulp.task('build:javascript', ['clean'], () =>
  gulp.src(['src/**/*.js', '!src/**/template/**', '!src/_template/**'], { base: 'src' })
    .pipe(babel())
    .pipe(gulp.dest('generators'))
);
master.push('clean', 'build:javascript');

gulp.task('build:template', ['clean'], () =>
  gulp.src('src/**/template/*.*', { base: 'src' })
    .pipe(gulp.dest('generators'))
);
master.push('build:template');

import eslint from 'gulp-eslint';
gulp.task('lint:javascript', () =>
  gulp.src('src/**.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);
master.push('lint:javascript');


gulp.task('default', master);
