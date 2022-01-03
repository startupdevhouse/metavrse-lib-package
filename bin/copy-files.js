import path from 'path';
import fs from 'fs';
import { TYPINGS_DIR, CHERRY_DIR } from '../config/consts';

const pathsToCopy = [TYPINGS_DIR, CHERRY_DIR];

pathsToCopy.forEach((singlePath) => {
  const mergedSrcPath = path.join(SRC_PATH, singlePath);
  const mergedDistPath = path.join(DIST_PATH, singlePath);

  if (!fs.existsSync(mergedDistPath)) {
    fs.mkdirSync(mergedDistPath);
  }

  fs.readdirSync(mergedSrcPath).forEach((file) => {
    fs.copyFileSync(
      path.join(mergedSrcPath, file),
      path.join(mergedDistPath, file)
    );
  });
});
