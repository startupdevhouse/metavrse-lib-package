const path = require('path');
const fs = require('fs');
const prettier = require('prettier');
const { DIST_DIR } = require('../config/consts.js');

const SRC_PACKAGE_JSON_PATH = path.resolve(__dirname, '..', 'package.json');
const DIST_PACKAGE_JSON_PATH = path.join(DIST_DIR, 'package.json');

const config = JSON.parse(fs.readFileSync(SRC_PACKAGE_JSON_PATH));

delete config.devDependencies;
delete config.scripts;

config.main = 'index.js';

fs.writeFileSync(
  DIST_PACKAGE_JSON_PATH,
  prettier.format(JSON.stringify(config), { parser: 'json' })
);
