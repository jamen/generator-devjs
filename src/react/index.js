import { Base } from 'yeoman-generator';
import { init, prompt } from '../_helper';

class React extends Base {
  initializing() { init.call(this, 'react'); }

  prompting() {
    const done = this.async();
    prompt.call(this, [
      devjs.babel && 'reactJSX',
    ], () => done());
  }

  install() {
    const deps = ['react', 'react-dom'];
    if (devjs.reactJSX) deps.push('babel-preset-react');
    this.npmInstall(deps, { save: true });
  }
}

export default React;
