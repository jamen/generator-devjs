import { Base } from 'yeoman-generator';
import helper from '../_helper/initializing';

global.devjs = global.devjs || {};

class React extends Base {
  initializing() { helper.call(this, 'babel'); }

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
