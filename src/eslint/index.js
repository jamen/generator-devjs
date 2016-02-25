import { Base } from 'yeoman-generator';
import { join } from 'path';

global.devjs = global.devjs || {};

class ESLint extends Base {
  initializing() {
    this.sourceRoot(join(__dirname, '..', '_template'));
  }
}

export default ESLint;
