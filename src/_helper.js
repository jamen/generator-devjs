import assign from 'deep-assign';

const prompts = {
  babel: {
    name: 'babel',
    message: 'Use Babel (ES6)?',
    type: 'confirm',
    default: true,
  },

  react: {
    name: 'react',
    message: 'Use React?',
    type: 'confirm',
    default: false,
  },

  eslint: {
    name: 'eslint',
    message: 'Use ESLint?',
    type: 'confirm',
    default: true,
  },

  gulp: {
    name: 'gulp',
    message: 'Gulp?',
    type: 'confirm',
    default: true,
  },

  name: {
    name: 'name',
    message: 'Project name?',
    type: 'input',
  },

  entry: {
    name: 'entry',
    message: 'Project entry?',
    type: 'input',
    default: 'lib',
  },

  username: {
    name: 'username',
    message: 'GitHub username?',
    type: 'input',
  },

  desc: {
    name: 'desc',
    message: 'Project description?',
    type: 'input',
  },

  private: {
    name: 'private',
    message: 'Project private?',
    type: 'confirm',
    default: false,
  },

  tester: {
    name: 'tester',
    message: 'Unit tester?',
    type: 'list',
    choices: ['ava', 'jest-cli', 'mocha', 'tap', 'tape', 'none'],
    default: 'ava',
  },

  repo: {
    name: 'repo',
    message: 'Project repository?',
    type: 'input',
    default: ({ username, name }) => `https://github.com/${devjs.username || username}/${devjs.name || name}`,
  },

  babelPresets: {
    name: 'babelPresets',
    message: 'Babel presets? (separated by commas)',
    type: 'input',
    default: () => `es2015${devjs.react ? ', react' : ''}`,
  },

  babelPlugins: {
    name: 'plugins',
    message: 'Babel plugins? (separated by commas)',
    type: 'input',
    default: 'add-module-exports',
  },

  gulpBabel: {
    name: 'gulpBabel',
    message: 'Babel plugin for Gulp?',
    type: 'confirm',
    default: true,
  },

  gulpEslint: {
    name: 'gulpEslint',
    message: 'ESLint plugin for Gulp?',
    type: 'confirm',
    default: true,
  },

  reactJSX: {
    name: 'reactJSX',
    message: 'JSX with React?',
    type: 'confirm',
    default: true,
  },

  eslintConfig: {
    name: 'eslintConfig',
    message: 'Use a popular ESLint config?',
    type: 'list',
    choices: ['airbnb', 'google', 'custom'],
    default: 'airbnb',
  },

  eslintReact: {
    name: 'eslintReact',
    message: 'Have ESLint check your React?',
    type: 'confirm',
    default: true,
  },
};

export default {
  init(name) {
    global.devjs = global.devjs || {};
    devjs[name] = true;

    assign(devjs, this.options);

    const done = this.async();
    if (typeof devjs.boilerplate === 'undefined') {
      this.prompt({
        name: 'boilerplate',
        message: 'Create boilerplate files?',
        type: 'confirm',
        default: true,
      }, ({ boilerplate }) => {
        devjs.boilerplate = boilerplate;
        if (boilerplate) {
          this.composeWith('devjs:boilerplate');
        }
        done();
      });
    } else done();
  },

  write(files) {
    files.forEach(file =>
      this.fs.copyTpl(
        this.templatePath((file[0] === '.' ? '@' : '') + file),
        this.destinationPath(file),
        devjs
      )
    );
  },

  configure(options) {
    let pack = this.fs.readJSON(this.destinationPath('package.json'), {});
    pack = assign(pack, options);
    this.fs.writeJSON(this.destinationPath('package.json'), pack);
  },

  prompt(names, done) {
    names.forEach(name => {
      if (name && typeof devjs[name] === 'undefined') {
        this.prompt(prompts[name], opts => {
          assign(devjs, opts);
          done(opts);
        });
      }
    });
  },

  prompts,
};
