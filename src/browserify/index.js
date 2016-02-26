import { Base } from 'yeoman-generator';
import { join } from 'path';

global.devjs = global.devjs || {};

class Browserify extends Base {
  initializing() {
    if (this.args) this.args.forEach(arg => this.composeWith(`devjs${arg}`));
    this.sourceRoot(join(__dirname, '..', '_template'));
    devjs.browserify = true;
  }
}

export default Browserify;
