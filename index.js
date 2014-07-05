var glob = require('glob');

module.exports = {
    BASE: __dirname,
    FILES: glob.sync('./nya/**/*.ctpl', {cwd: __dirname})
};
