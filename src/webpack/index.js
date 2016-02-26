import { Base } from 'yeoman-generator';
import helper from '../_helper/initializing';

global.devjs = global.devjs || {};

class Webpack extends Base {
  initializing() { helper.call(this, 'babel'); }
}

export default Webpack;
