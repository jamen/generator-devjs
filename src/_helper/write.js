global.devjs = global.devjs || {};

export default function write(files) {
  files.forEach(file =>
    this.fs.copyTpl(
      this.templatePath((file[0] == '.' ? '@' : '') + file),
      this.destinationPath(file),
      devjs
    )
  );
};
