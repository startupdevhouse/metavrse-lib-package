import { CherryControls } from './CherryControls';
import { CherryProjectManager } from './CherryProjectManager';
import { CherrySurface } from './CherrySurface';
import { CherryViewerFileSystem } from './CherryViewerFileSystem';

export type CherryViewer = {
  // Asset files objects
  ProjectManager: CherryProjectManager;
  FS: CherryViewerFileSystem;
  // emscripten methods
  pixelDensity: number;
  controls: CherryControls;
  canvas?: HTMLCanvasElement;
  screen: {
    width: number;
    height: number;
  };
  camera: {
    viewport: number[];
    projection: Float32Array;
    view: Float32Array;
  };
  getSurface: () => CherrySurface;
  toggleNativeLoader: (toggle: boolean) => void;
};
