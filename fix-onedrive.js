const fs = require("fs");

const isOneDriveRoot = (p) => {
  if (typeof p !== "string") return false;
  const normalized = p.replace(/[\\/]+$/, "").toLowerCase();
  return (
    normalized === "c:\\users\\carin\\onedrive" ||
    normalized === "c:/users/carin/onedrive" ||
    normalized === "\\\\?\\c:\\users\\carin\\onedrive"
  );
};

const fakeDirectoryStat = {
  isDirectory: () => true,
  isFile: () => false,
  isSymbolicLink: () => false,
  isBlockDevice: () => false,
  isCharacterDevice: () => false,
  isFIFO: () => false,
  isSocket: () => false,
  mode: 16895, // directory mode 040777
  size: 0,
  ino: 0,
  dev: 0,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  blocks: 0,
  atimeMs: Date.now(),
  mtimeMs: Date.now(),
  ctimeMs: Date.now(),
  birthtimeMs: Date.now(),
  atime: new Date(),
  mtime: new Date(),
  ctime: new Date(),
  birthtime: new Date(),
};

// Patch statSync
const origStatSync = fs.statSync;
fs.statSync = function (path, options) {
  if (isOneDriveRoot(path)) {
    return fakeDirectoryStat;
  }
  return origStatSync.call(fs, path, options);
};

// Patch lstatSync
const origLstatSync = fs.lstatSync;
fs.lstatSync = function (path, options) {
  if (isOneDriveRoot(path)) {
    return fakeDirectoryStat;
  }
  return origLstatSync.call(fs, path, options);
};

// Patch stat (async)
const origStat = fs.stat;
fs.stat = function (path, options, callback) {
  const cb = typeof options === "function" ? options : callback;
  if (isOneDriveRoot(path)) {
    if (cb) process.nextTick(() => cb(null, fakeDirectoryStat));
    return;
  }
  return origStat.apply(fs, arguments);
};

// Patch realpathSync
const origRealpathSync = fs.realpathSync;
fs.realpathSync = function (path, options) {
  if (isOneDriveRoot(path)) {
    return "C:\\Users\\carin\\OneDrive";
  }
  try {
    return origRealpathSync.call(fs, path, options);
  } catch (err) {
    if (err && err.code === "EPERM" && isOneDriveRoot(err.path)) {
      return path;
    }
    throw err;
  }
};
