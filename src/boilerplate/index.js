import { Base } from 'yeoman-generator';
import { init, write, configure, prompts } from '../_helper';
import assign from 'deep-assign';
import user from 'github-user';

class Boilerplate extends Base {
  initializing() { init.call(this, 'boilerplate'); }

  prompting() {
    const done = this.async();
    this.prompt([
      prompts.name,
      prompts.entry,
      prompts.username,
      prompts.desc,
      prompts.private,
      prompts.tester,
      prompts.repo,
    ], opts => {
      assign(devjs, opts, { author: '', avatar: '' });
      user(devjs.username, (err, github) => {
        if (!err) {
          devjs.author = github.name;
          devjs.avatar = github.avatar_url;
        }
        done();
      });
    });
  }

  configuring() {
    configure.call(this, {
      name: devjs.name,
      author: devjs.author,
      version: devjs.version || '0.0.0',
      description: devjs.desc,
      main: devjs.entry,
      repository: {
        type: 'git',
        url: devjs.repo,
      },
      scripts: {
        test: `${devjs.tester !== 'none' ? devjs.tester : 'node'} test`,
      },
      private: devjs.private,
      files: ['lib'],
    });
  }

  install() {
    const deps = [];
    if (devjs.tester !== 'none') deps.push(devjs.tester);
    this.npmInstall(deps, { saveDev: true });
  }

  writing() {
    write.call(this, ['.gitignore', 'lib/index.js', 'test/index.js']);
  }
}

export default Boilerplate;
