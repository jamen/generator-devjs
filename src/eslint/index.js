import { Base } from 'yeoman-generator';
import { waterfall } from 'async';
import { init, write, prompts } from '../_helper';

class ESLint extends Base {
  initializing() { init.call(this, 'eslint'); }

  prompting() {
    const done = this.async();

    waterfall([
      callback => {
        this.prompt(prompts.eslintConfig, ({ eslintConfig }) => {
          devjs.eslintConfig = eslintConfig;
          callback(null, eslintConfig);
        });
      },

      (eslintConfig, callback) => {
        if (eslintConfig === 'airbnb' && devjs.react && devjs.jsx) {
          this.prompt(prompts.eslintReact, ({ eslintReact }) => {
            devjs.eslintReact = eslintReact;
            callback();
          });
        } else {
          devjs.eslintReact = false;
          callback();
        }
      },
    ], done);
  }

  writing() {
    write.call(this, ['.eslintrc.json']);
  }

  install() {
    const deps = ['eslint'];

    if (devjs.eslintConfig !== 'custom') {
      deps.push(`eslint-config-${devjs.eslintConfig}`);
    }

    this.npmInstall(deps, { saveDev: true });
  }
}

export default ESLint;
