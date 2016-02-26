import { Base } from 'yeoman-generator';
import helper from '../_helper/initializing';

global.devjs = global.devjs || {};

class Gulp extends Base {
  initializing() { helper.call(this, 'gulp'); }

  prompting() {
    const done = this.async();
    const prompts = [];

    if (devjs.babel) prompts.push({
      name: 'gulp_babel',
      message: 'Babel plugin for Gulp?',
      type: 'confirm',
      default: true,
    });

    if (devjs.eslint) prompts.push({
      name: 'gulp_eslint',
      message: 'ESLint plugin for Gulp?',
      type: 'confirm',
      default: true,
    });

    this.prompt(prompts, gulp => {
      Object.assign(devjs, gulp);
      done();
    });
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
