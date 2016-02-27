import { Base } from 'yeoman-generator';
import { join } from 'path';
import { init, write } from '../_helper';

global.devjs = global.devjs || {};

class Babel extends Base {
  initializing() { init.call(this, 'babel'); }
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
      opts.presets = opts.presets.split(/(?:\s+)?,(?:\s+)?/);
      opts.plugins = opts.plugins.split(/(?:\s+)?,(?:\s+)?/);
      Object.assign(devjs, opts);
      done();
    });
  }

  writing() {
    write.call(this, ['.babelrc', 'src/index.js']);
  }

  install() {
    const deps = ['babel-core'].concat(
      devjs.presets.map(n => `babel-preset-${n}`),
      devjs.plugins.map(n => `babel-plugin-${n}`)
    );

    this.npmInstall(deps, { saveDev: true });
  }
}

export default Babel;
