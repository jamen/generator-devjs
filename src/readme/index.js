import { Base } from 'yeoman-generator';
import { init, prompt } from '../_helper';

class Readme extends Base {
  initializing() {
    init.call(this, 'readme');
  }

  prompting() {
    const done = this.async();
    prompt.call(this, ['name', 'desc', 'cli'], () => done());
  }
}

export default Readme;
