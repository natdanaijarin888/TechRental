const fs = require('fs');

const origRealpathSync = fs.realpathSync;
function patchedRealpathSync(p, options) {
  try {
    return origRealpathSync(p, options);
  } catch (err) {
    if (err && (err.code === 'EPERM' || err.code === 'EACCES')) {
      return p;
    }
    throw err;
  }
}
patchedRealpathSync.native = patchedRealpathSync;
fs.realpathSync = patchedRealpathSync;

const origReaddirSync = fs.readdirSync;
fs.readdirSync = function(p, options) {
  try {
    return origReaddirSync(p, options);
  } catch (err) {
    if (err && (err.code === 'EPERM' || err.code === 'EACCES')) {
      return [];
    }
    throw err;
  }
};

const origReaddir = fs.readdir;
fs.readdir = function(p, options, callback) {
  const cb = typeof options === 'function' ? options : callback;
  const opt = typeof options === 'function' ? undefined : options;
  return origReaddir(p, opt, (err, files) => {
    if (err && (err.code === 'EPERM' || err.code === 'EACCES')) {
      return cb(null, []);
    }
    return cb(err, files);
  });
};

const origReadlinkSync = fs.readlinkSync;
fs.readlinkSync = function(p, options) {
  try {
    return origReadlinkSync(p, options);
  } catch (err) {
    if (err && (err.code === 'EPERM' || err.code === 'EACCES')) {
      return p;
    }
    throw err;
  }
};

if (fs.promises) {
  const origPromisesReadlink = fs.promises.readlink;
  fs.promises.readlink = async function(p, options) {
    try {
      return await origPromisesReadlink(p, options);
    } catch (err) {
      if (err && (err.code === 'EPERM' || err.code === 'EACCES')) {
        return p;
      }
      throw err;
    }
  };

  const origPromisesRealpath = fs.promises.realpath;
  fs.promises.realpath = async function(p, options) {
    try {
      return await origPromisesRealpath(p, options);
    } catch (err) {
      if (err && (err.code === 'EPERM' || err.code === 'EACCES')) {
        return p;
      }
      throw err;
    }
  };
}
