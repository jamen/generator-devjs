import { Base } from 'yeoman-generator';
import { join } from 'path';

global.devjs = global.devjs || {};

class Gulp extends Base {
  initializing() {
    if (this.args) this.args.forEach(arg => this.composeWith(`devjs${arg}`));
    this.sourceRoot(join(__dirname, '..', '_template'));
    devjs.gulp = true;
  }

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
