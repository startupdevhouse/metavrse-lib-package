import path from 'path';
import fs from 'fs';
import prettier from 'prettier';
import { DIST_DIR } from '../config/consts';

const SRC_PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');
const DIST_PACKAGE_JSON_PATH = path.join(DIST_DIR, 'package.json');

const config = JSON.parse(fs.readFileSync(SRC_PACKAGE_JSON_PATH));

delete config.devDependencies;
delete config.scripts;

config.main = 'index.js';

fs.writeFileSync(
  DIST_PACKAGE_JSON_PATH,
  prettier.format(JSON.stringify(config), { parser: 'json' })
);
