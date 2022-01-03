import { CherryKey } from '../cherry/CherryKey';
import { NODE_TYPES } from '../common/NODE_TYPES';
import { Vector3 } from '../common/Vector3';

export type CameraEntity = {
  key: CherryKey;
  type: NODE_TYPES.camera;
  position: Vector3;
  target: Vector3;
  distance: number;
  visible: boolean;
};
