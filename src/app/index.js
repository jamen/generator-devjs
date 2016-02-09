import { Base } from 'yeoman-generator';

class DevJS extends Base {
  init() {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname // Default to current folder name
    }, function (answers) {
      this.log(answers.name);
      done();
    }.bind(this));
  }
  install() {}
}

export default DevJS;
