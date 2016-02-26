import { Base } from 'yeoman-generator';
import { join } from 'path';
import { waterfall } from 'async';

global.devjs = global.devjs || {};

class ESLint extends Base {
  initializing() {
    if (this.args) this.args.forEach(arg => this.composeWith(`devjs${arg}`));
    this.sourceRoot(join(__dirname, '..', '_template'));
    devjs.eslint = true;
  }

  prompting() {
    const done = this.async();
    const prompts = [];

    waterfall([
      callback => {
        this.prompt({
          name: 'config',
          message: 'Use a popular ESLint config?',
          type: 'list',
          choices: ['airbnb', 'google', 'custom'],
          default: 'airbnb',
        }, ({ config }) => {
          devjs.eslint_config = config;
          callback(null, config);
        });
      },

      (config, callback) => {
        if (config === 'airbnb' && devjs.react && devjs.jsx) this.prompt({
          name: 'lint_react',
          message: 'Have ESLint check your React?',
          type: 'confirm',
          default: true,
        }, ({ lint_react }) => {
          devjs.lint_react = lint_react
          callback();
        });
        else {
          devjs.lint_react = false;
          callback();
        }
      }
    ], done);
  }

  writing() {
    ['.eslintrc.json']
    .forEach(file =>
      this.fs.copyTpl(
        this.templatePath('.eslintrc.json'),
        this.destinationPath('.eslintrc.json'),
        devjs
      )
    );
  }

  install() {
    const deps = ['eslint'];

    if (devjs.eslint_config !== 'custom') {
      deps.push(`eslint-config-${devjs.eslint_config}`);
    }

    this.npmInstall(deps, { saveDev: true });
  }
}

export default ESLint;
