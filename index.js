var glob = require('glob');

module.exports = {
    BASE: __dirname,
    FILES: glob.sync('./blocks/**/*.ctpl', {cwd: __dirname})
};
