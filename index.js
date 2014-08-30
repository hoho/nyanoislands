var glob = require('glob'),
    path = require('path');

module.exports = {
    BASE: __dirname,
    FILES: glob.sync(path.join('nya', '**', '*.ctpl'), {cwd: __dirname}),
    LESS: {
        light: path.join(__dirname, 'nya', 'light.less'),
        dark: path.join(__dirname, 'nya', 'dark.less')
    }
};
