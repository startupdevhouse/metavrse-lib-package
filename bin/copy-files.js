import path from "path";
import fs from "fs";

const SRC_PATH = "src";
const DIST_PATH = "dist";

const TYPINGS_PATH = "typings";
const CHERRY_PATH = "cherry";

const pathsToCopy = [TYPINGS_PATH, CHERRY_PATH];

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
