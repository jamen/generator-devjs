import { Base } from 'yeoman-generator';
import { join } from 'path';
import user from 'github-user';

global.devjs = global.devjs || {};

class Boilerplate extends Base {
  initializing() {
    this.sourceRoot(join(__dirname, '..', '_template'));
  }

  prompting() {
    const done = this.async();
    this.prompt([
      {
        name: 'name',
        message: 'Project name?',
        type: 'input',
        default: this.appname,
      },
      {
        name: 'username',
        message: 'GitHub username?',
        type: 'input',
        store: true,
      },
      {
        name: 'desc',
        message: 'Project description?',
        type: 'input',
      },
    ], opts => {
      user(opts.name, (err, github) => {
        opts.author = github.name;
        opts.avatar = github.avatar_url;

        Object.assign(devjs, opts);
        done();
      });
    });
  }

  writing() {
    console.log('Writing boilerplate');
    ['README.md', 'package.json']
    .forEach(file =>
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        devjs
      )
    )
  }
}

export default Boilerplate;
