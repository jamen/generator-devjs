import { Base } from 'yeoman-generator';
import { init, write } from '../_helper';

global.devjs = global.devjs || {};

class Gulp extends Base {
  initializing() { init.call(this, 'gulp'); }

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
    write.call(this, [devjs.babel ? 'gulpfile.babel.js' : 'gulpfile.js']);
  }

  install() {
    const deps = ['gulp'];

    if (devjs.babel) deps.push('gulp-babel', 'del');
    if (devjs.eslint) deps.push('gulp-eslint');

    this.npmInstall(deps, { saveDev: true });
  }
}

export default Gulp;
