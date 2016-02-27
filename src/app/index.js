import { Base } from 'yeoman-generator';
import { join } from 'path';
import helper from '../_helper/initializing';
import { series } from 'async';

global.devjs = global.devjs || { _: true };

class DevJS extends Base {
  initializing() { helper.call(this, 'app'); }

  prompting() {
    const done = this.async();
    series([
      callback => {
        this.prompt({
          name: 'babel',
          message: 'Babel?',
          type: 'confirm',
          default: true,
        }, ({ babel }) => {
          if (babel) this.composeWith('devjs:babel');
          callback();
        });
      },

      callback => {
        this.prompt({
          name: 'react',
          message: 'React?',
          type: 'confirm',
          default: true,
        }, ({ react }) => {
          if (react) this.composeWith('devjs:react');
          callback();
        });
      },

      callback => {
        this.prompt({
          name: 'eslint',
          message: 'ESLint?',
          type: 'confirm',
          default: true,
        }, ({ eslint }) => {
          if (eslint) this.composeWith('devjs:eslint');
          callback();
        });
      },

      callback => {
        this.prompt({
          name: 'gulp',
          message: 'Gulp?',
          type: 'confirm',
          default: true,
        }, ({ gulp }) => {
          if (gulp) this.composeWith('devjs:gulp');
          callback();
        });
      },

      callback => {
        this.prompt({
          name: 'packager',
          message: 'Packager?',
          type: 'list',
          choices: ['browserify', 'webpack', 'none'],
          default: 'none',
        }, ({ packager }) => {
          if (packager !== 'none') this.composeWith(`devjs:${packager}`);
          devjs.packager = packager;
          callback();
        });
      }
    ], done);
  }
}

export default DevJS;
