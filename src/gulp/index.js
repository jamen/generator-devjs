import { Base } from 'yeoman-generator';
import { join } from 'path';

global.devjs = global.devjs || {};

class Gulp extends Base {
  initializing() {
    this.sourceRoot(join(__dirname, '..', '_template'));
  }

  writing() {
    [devjs.babel ? 'gulpfile.babel.js' : 'gulpfile.js']
    .forEach(file =>
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        devjs
      )
    );
  }

  install() {
    const deps = ['gulp'];

    if (devjs.babel) deps.push('gulp-babel', 'del');
    if (devjs.eslint) deps.push('gulp-eslint');

    this.npmInstall(deps, { saveDev: true });
  }
}

export default Gulp;
