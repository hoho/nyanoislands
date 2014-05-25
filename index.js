var path = require('path');

module.exports = {
    nyaPattern: function() {
        return path.normalize(path.relative(
            path.resolve('.'),
            path.resolve(path.join(__dirname, 'blocks/**/*.ctpl'))
        ));
    }
};
