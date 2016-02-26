import { Base } from 'yeoman-generator';
import helper from '../_helper/initializing';

global.devjs = global.devjs || {};

class Babel extends Base {
  initializing() { helper.call(this, 'babel'); }
  prompting() {
    const done = this.async();
    this.prompt([
      {
        name: 'presets',
        message: 'Babel presets? (separated by commas)',
        type: 'input',
        default: 'es2015' + (devjs.react ? ', react' : ''),
      },
      {
        name: 'plugins',
        message: 'Babel plugins? (separated by commas)',
        type: 'input',
        default: 'add-module-exports',
      }
    ], opts => {
      Object.assign(devjs, opts);
      done();
    });
  }

  writing() {
    ['.babelrc', 'src/index.js']
    .forEach(file =>
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        devjs
      )
    );
  }

  install() {
    const deps = ['babel-core'].concat(
      devjs.presets.split(/(?:\s+)?,(?:\s+)?/).map(n => `babel-preset-${n}`),
      devjs.plugins.split(/(?:\s+)?,(?:\s+)?/).map(n => `babel-plugin-${n}`)
    );

    this.npmInstall(deps, { saveDev: true });
  }
}

export default Babel;
