const { readdir, unlink } = require("fs");

function deleteFiles(folder, done) {
  readdir(folder, (error, files) => {
    if (error) return done(error);

    files = files.filter((file) => !file.startsWith("."));

    if (!files.length) return done();

    let count = 0;

    files.forEach((file) => {
      unlink(`${folder}/${file}`, (error) => {
        if (error) return done(error);

        count++;

        if (count === files.length) done();
      });
    });
  });
}

module.exports = deleteFiles;
