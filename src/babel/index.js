import { Base } from 'yeoman-generator';
import { join } from 'path';

global.devjs = global.devjs || {};

class Babel extends Base {
  initializing() {
    this.sourceRoot(join(__dirname, '..', '_template'));
  }

  prompting() {
    const done = this.async();
    this.prompt([
      {
        name: 'presets',
        message: 'Babel presets? (separated by commas)',
        type: 'input',
        default: 'es2015',
      },
      {
        name: 'plugins',
        message: 'Babel plugins? (separated by commas)',
        type: 'input',
        default: 'add-module-exports',
      }
    ], opts => {
      Object.assign(this.options, opts);
      done();
    });
  }

  writing() {
    console.log('Writing babel');
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc'),
      this.options
    );
  }

  install() {
    const deps = [].concat([
      this.options.presets.split(/\s+,\s+/).map(n => `babel-preset-${n}`),
      this.options.plugins.split(/\s+,\s+/).map(n => `babel-plugin-${n}`)
    ]);
    this.npmInstall(deps, { saveDev: true });
  }
}

export default Babel;
