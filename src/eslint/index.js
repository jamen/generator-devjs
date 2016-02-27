import { Base } from 'yeoman-generator';
import { waterfall } from 'async';
import { init, write } from '../_helper';

global.devjs = global.devjs || {};

class ESLint extends Base {
  initializing() { init.call(this, 'eslint'); }

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
    write.call(this, ['.eslintrc.json']);
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
