import { Base } from 'yeoman-generator';
import { join } from 'path';

global.devjs = global.devjs || {};

class React extends Base {
  initializing() {
    if (this.args) this.args.forEach(arg => this.composeWith(`devjs${arg}`));
    this.sourceRoot(join(__dirname, '..', '_template'));
    devjs.react = true;
  }

  prompting() {
    const done = this.async();
    const prompts = [];

    if (devjs.babel) {
      prompts.push({
        name: 'jsx',
        message: 'JSX with React?',
        type: 'confirm',
        default: true,
      });
    }

    this.prompt(prompts, options => {
      devjs.jsx = options.jsx || false;
      done();
    });
  }

  install() {
    this.npmInstall(['react', 'react-dom'], { save: true });
  }
}

export default React;
