import assign from 'deep-assign';

export default function configure(options) {
  let pack = this.fs.readJSON(this.destinationPath('package.json'), {});
  pack = assign(pack, options);
  this.fs.writeJSON(this.destinationPath('package.json'), pack);
};
