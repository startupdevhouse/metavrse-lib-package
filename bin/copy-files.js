const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

const {
  TYPINGS_DIR,
  CHERRY_DIR,
  SRC_DIR,
  DIST_DIR,
} = require('../config/consts');

const pathsToCopy = [TYPINGS_DIR, CHERRY_DIR];

pathsToCopy.forEach((singlePath) => {
  const mergedSrcPath = path.join(SRC_DIR, singlePath);
  const mergedDistPath = path.join(DIST_DIR, singlePath);

  if (!fs.existsSync(mergedDistPath)) {
    fs.mkdirSync(mergedDistPath);
  }

  fse.copy(mergedSrcPath, mergedDistPath);
});
