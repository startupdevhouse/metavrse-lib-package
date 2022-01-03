import { CherryKey } from './CherryKey';
import { CherryObjectByPixel } from './CherryObjectByPixel';
import { CherrySurfaceSceneObject } from './CherrySurfaceSceneObject';

export type CherrySurfaceScene = {
  showRulerGrid: (value: boolean) => void;
  getObject: (key: CherryKey) => CherrySurfaceSceneObject;
  getObjectByPixel: (x: number, y: number) => CherryObjectByPixel;
  addObject: (key: CherryKey, path: string) => CherrySurfaceSceneObject;
  removeObject: (key: CherryKey) => void;
};
