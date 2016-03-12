import { Base } from 'yeoman-generator';
import { init, write, configure } from '../_helper';
import assign from 'deep-assign';

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
      assign(devjs, gulp);
      done();
    });
  }

  configuring() {
    const pack = this.fs.readJSON(this.destinationPath('package.json'), {});
    configure.call(this, {
      scripts: {
        build: 'gulp',
        prepublish: 'gulp',
      },
    });

    if (typeof pack.scripts !== 'undefined' && pack.scripts.test) {
      configure.call(this, {
        scripts: {
          test: 'gulp; ' + pack.scripts.test
        }
      });
    }
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
