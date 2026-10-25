const fs = require('fs');

const origRealpathSync = fs.realpathSync;
function patchedRealpathSync(p, options) {
  try {
    return origRealpathSync(p, options);
  } catch (err) {
    if (err && err.code === 'EPERM') {
      return p;
    }
    throw err;
  }
}
patchedRealpathSync.native = patchedRealpathSync;
fs.realpathSync = patchedRealpathSync;
