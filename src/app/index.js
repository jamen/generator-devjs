import { Base } from 'yeoman-generator';
import { init, prompts } from '../_helper';
// import { series } from 'async';

class DevJS extends Base {
  initializing() { init.call(this, 'app'); }

  prompting() {
    const done = this.async();

    this.prompt([
      prompts.babel,
      prompts.react,
      prompts.eslint,
      prompts.gulp,
    ], ({ babel, react, eslint, gulp }) => {
      if (babel) this.composeWith('devjs:babel');
      if (react) this.composeWith('devjs:react');
      if (eslint) this.composeWith('devjs:react');
      if (gulp) this.composeWith('devjs:gulp');
      done();
    });

    // series([
    //   callback => {
    //     this.prompt(prompts.babel, ({ babel }) => {
    //       if (babel) this.composeWith('devjs:babel');
    //       callback();
    //     });
    //   },
    //
    //   callback => {
    //     this.prompt(, ({ react }) => {
    //       if (react) this.composeWith('devjs:react');
    //       callback();
    //     });
    //   },
    //
    //   callback => {
    //     this.prompt(, ({ eslint }) => {
    //       if (eslint) this.composeWith('devjs:eslint');
    //       callback();
    //     });
    //   },
    //
    //   callback => {
    //     this.prompt(, ({ gulp }) => {
    //       if (gulp) this.composeWith('devjs:gulp');
    //       callback();
    //     });
    //   },
    //
    //   // callback => {
    //   //   this.prompt({
    //   //     name: 'packager',
    //   //     message: 'Packager?',
    //   //     type: 'list',
    //   //     choices: ['browserify', 'webpack', 'none'],
    //   //     default: 'none',
    //   //   }, ({ packager }) => {
    //   //     devjs.packager = packager === 'none' ? false : packager;
    //   //     if (devjs.packager) this.composeWith(`devjs:${devjs.packager}`);
    //   //     callback();
    //   //   });
    //   // }
    // ], done);
  }
}

export default DevJS;
