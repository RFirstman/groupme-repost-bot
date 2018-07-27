var resemble = require("resemblejs")

/**
 * Compares the two images pointed to by path1 and path2
 * @param {String} path1 
 * @param {String} path2 
 */
function compareImages(path1, path2, callback) {
    resemble.compare(path1, path2, callback);
}

module.exports = compareImages;