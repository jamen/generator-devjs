import { Base } from 'yeoman-generator';
import { EventEmitter } from 'events';
import user from 'github-user';

const evt = new EventEmitter();

const DevJS = Base.extend({
  init() {
    this.sourceRoot('../template');
    const done = this.async();

    evt.on('create', options => {
      user(options.username, (err, github) => {

        if (err) {
          this.log(`GitHub user "${options.username}" not found!  Try again.`);
          evt.emit('prompt');
          return;
        }

        options.author = github.name;
        options.avatar = github.avatar_url;
        options.website = github.blog;
        options.email = github.email;

        let files = [
          'package.json',
          'README.md',
          '.gitignore'
        ];

        if (options.travis) files.push('.travis.yml');
        const sd = { saveDev: true };

        const babel_files = ['src/index.js', 'gulpfile.babel.js', '.babelrc'];
        if (options.babel) {
          files.push(...babel_files);
          this.npmInstall(['babel-core', 'gulp-babel', 'gulp', 'babel-preset-es2015'], sd);
          if (options.react) this.npmInstall(['babel-preset-react'], sd)
        } else files.push('lib/index.js');

        if (options.eslint) {
          files.push('.eslintrc.json');
          this.npmInstall(['eslint', 'eslint-config-airbnb'], sd);
          if (options.react) this.npmInstall(['eslint-plugin-react'], sd);
        }

        if (options.react) {
          this.npmInstall(['react', 'react-dom'])
        }

        files.forEach(file =>
          this.fs.copyTpl(
            this.templatePath(file),
            this.destinationPath(file),
            options
          )
        );

        done();
      });
    });

    evt.on('prompt', () => {
      this.prompt([
        {
          name: 'name',
          message: 'Project name',
          type: 'input',
          default: this.appname,
        },
        {
          name: 'username',
          message: 'Author GitHub username',
          type: 'input',
          store: true,
        },
        {
          name: 'desc',
          message: 'Project description',
          type: 'input',
        },
        {
          name: 'version',
          message: 'Project version',
          type: 'input',
          default: '0.0.0',
        },
        {
          name: 'private',
          message: 'Project private',
          type: 'confirm',
          default: false,
        },
        {
          name: 'entry',
          message: 'Project entry point',
          type: 'input',
          default: 'lib',
        },
        {
          name: 'travis',
          message: 'Travis CI',
          type: 'confirm',
          default: true,
        },
        {
          name: 'env',
          message: 'Environment',
          type: 'list',
          choices: [ 'Node.js', 'Browser' ],
          default: 'Node.js',
        },
        {
          name: 'babel',
          message: 'Babel',
          type: 'confirm',
          default: true,
        },
        {
          name: 'cli',
          message: 'CLI',
          type: 'confirm',
          default: false,
        },
        {
          name: 'eslint',
          message: 'ESLint',
          type: 'confirm',
          default: true,
        },
        {
          name: 'react',
          message: 'ReactJS',
          type: 'confirm',
          default: false,
        }
      ], opts => evt.emit('create', opts));
    });

    evt.emit('prompt');
  }
});

export default DevJS;
