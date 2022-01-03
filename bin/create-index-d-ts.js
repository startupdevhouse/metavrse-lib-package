const path = require('path');
const fs = require('fs');
const glob = require('glob');
const prettier = require('prettier');
const { SRC_DIR, TYPINGS_DIR } = require('../config/consts');

const JOINED_TYPINGS_PATH = path.join(SRC_DIR, TYPINGS_DIR);

const filePaths = glob.sync(path.join(JOINED_TYPINGS_PATH, '**', '*.d.ts'));

const indexContent = filePaths.reduce((joined, filePath) => {
  const relativePath = path.relative(JOINED_TYPINGS_PATH, filePath);

  if (relativePath.startsWith('index')) {
    return joined;
  }

  const trimmedPath = relativePath.substring(0, relativePath.length - 5);
  return joined + `export * from './${trimmedPath}';`;
}, '');

fs.writeFileSync(
  path.join(JOINED_TYPINGS_PATH, 'index.d.ts'),
  prettier.format(indexContent, { parser: 'typescript' })
);
