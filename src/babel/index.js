import { Base } from 'yeoman-generator';
import { init, write, prompts } from '../_helper';
import assign from 'deep-assign';

class Babel extends Base {
  initializing() { init.call(this, 'babel'); }
  prompting() {
    const done = this.async();
    this.prompt([
      prompts.babelPresets,
      prompts.babelPlugins,
    ], opts => {
      assign(devjs, {
        babelPresets: opts.babelPresets.split(/(?:\s+)?,(?:\s+)?/),
        babelPlugins: opts.babelPlugins.split(/(?:\s+)?,(?:\s+)?/),
      });
      done();
    });
  }

  writing() {
    write.call(this, ['.babelrc', 'src/index.js']);
  }

  install() {
    const deps = ['babel-core'].concat(
      devjs.babelPresets.map(n => `babel-preset-${n}`),
      devjs.babelPlugins.map(n => `babel-plugin-${n}`)
    );

    this.npmInstall(deps, { saveDev: true });
  }
}

export default Babel;
