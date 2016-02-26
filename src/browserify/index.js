import { Base } from 'yeoman-generator';
import helper from '../_helper/initializing';

global.devjs = global.devjs || {};

class Browserify extends Base {
  initializing() { helper.call(this, 'browserify'); }
}

export default Browserify;
