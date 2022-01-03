import CreateViewer from './cherry/CherryGL';
import MegaController from './scripts/MegaController.cjs';
export * from './typings/index';

export const CherryGL = CreateViewer;

export const scripts = {
  stringified: {
    MegaController: String(MegaController),
  },
};
