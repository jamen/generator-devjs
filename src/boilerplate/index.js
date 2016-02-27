import { Base } from 'yeoman-generator';
import { join } from 'path';
import helper from '../_helper/initializing';
import user from 'github-user';

global.devjs = global.devjs || {};

class Boilerplate extends Base {
  initializing() { helper.call(this, 'boilerplate'); }

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
      {
        name: 'repo',
        message: 'Project repository?',
        type: 'input',
        default: ({ private: p, username: u, name: n }) => {
          return p ? 'none' : `https://github.com/${u}/${n}`;
        },
      }
    ], opts => {
      user(opts.name, (err, github) => {
        opts.author = github.name;
        opts.avatar = github.avatar_url;

        Object.assign(devjs, opts);
        done();
      });
    });
  }

  configuring() {
    const pack = this.fs.readJSON(this.destinationPath('package.json'), {});

    pack.name = devjs.name;
    pack.author = devjs.author;
    pack.version = '0.0.0';
    pack.main = devjs.entry;
    pack.repository = { type: 'git', url: devjs.repo };
    pack.scripts = {
      test: `${devjs.tester !== 'none' ? devjs.tester : 'node'} test`,
    };
    if (devjs.gulp) pack.scripts.prepublish = 'gulp';
    pack.private = devjs.private;
    pack.files = [ 'lib' ];

    this.fs.writeJSON(this.destinationPath('package.json'), pack);
  }

  install() {
    const deps = [];
    if (devjs.tester !== 'none') deps.push(devjs.tester);
    this.npmInstall(deps, { saveDev: true });
  }

  writing() {
    ['README.md', '.gitignore', 'lib/index.js', 'test/index.js']
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
