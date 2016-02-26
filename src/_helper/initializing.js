import { resolve } from 'path';

global.devjs = global.devjs || {};

export default function initializing(name) {
  if (this.args) this.args.forEach(arg => this.composeWith(arg));
  this.sourceRoot(resolve(__dirname, '..', '_template'));
  devjs[name] = true;
};
