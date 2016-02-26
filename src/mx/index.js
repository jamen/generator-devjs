import { Base } from 'yeoman-generator';
import helper from '../_helper/initializing';

global.devjs = global.devjs || {};

class Multiplexer extends Base {
  initializing() { helper.call(this, 'multiplexer'); }
}

export default Multiplexer;
