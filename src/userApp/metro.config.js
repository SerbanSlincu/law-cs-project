const nodelibs = require('node-libs-react-native')
nodelibs.crypto = null;

module.exports = {
    resolver: {
        nodelibs
    }
};
