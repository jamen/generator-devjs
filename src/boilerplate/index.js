import { Base } from 'yeoman-generator';
import { join } from 'path';
import user from 'github-user';

global.devjs = global.devjs || {};

class Boilerplate extends Base {
  initializing() {
    this.sourceRoot(join(__dirname, '..', '_template'));

    const done = this.async();
    this.prompt([
      {
        name: 'name',
        message: 'Project name?',
        type: 'input',
        default: this.appname,
      },
      {
        name: 'entry',
        message: 'Project entry?',
        type: 'input',
        default: 'lib',
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
      {
        name: 'private',
        message: 'Project private?',
        type: 'confirm',
        default: false,
      },
      {
        name: 'tester',
        message: 'Unit tester?',
        type: 'list',
        choices: ['ava', 'jest-cli', 'mocha', 'tap', 'tape', 'none'],
        default: 'ava',
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

  install() {
    const deps = [];
    if (devjs.tester !== 'none') deps.push(devjs.tester);
    this.npmInstall(deps, { saveDev: true });
  }

  writing() {
    ['README.md', 'package.json', '.gitignore', 'lib/index.js', 'test/index.js']
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
