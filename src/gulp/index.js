import { Base } from 'yeoman-generator';
import { init, write, configure } from '../_helper';

class Gulp extends Base {
  initializing() { init.call(this, 'gulp'); }

  configuring() {
    const pack = this.fs.readJSON(this.destinationPath('package.json'), {});
    configure.call(this, {
      scripts: {
        build: 'gulp',
        prepublish: 'gulp',
      },
    });

    if (typeof pack.scripts !== 'undefined' && pack.scripts.test) {
      configure.call(this, {
        scripts: {
          test: `gulp; ${pack.scripts.test}`,
        },
      });
    }
  }

  writing() {
    write.call(this, [devjs.babel ? 'gulpfile.babel.js' : 'gulpfile.js']);
  }

  install() {
    const deps = ['gulp'];

    if (devjs.babel) deps.push('gulp-babel', 'del');
    if (devjs.eslint) deps.push('gulp-eslint');

    this.npmInstall(deps, { saveDev: true });
  }
}

export default Gulp;
