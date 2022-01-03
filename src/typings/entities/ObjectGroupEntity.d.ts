import { CherryKey } from '../cherry/CherryKey';
import { NODE_TYPES } from '../common/NODE_TYPES';
import { Vector3 } from '../common/Vector3';

export type ObjectGroupEntity = {
  key: CherryKey;
  type: NODE_TYPES.objectGroup;

  position: Vector3;
  rotate: Vector3;
  scale: Vector3;

  visible: boolean;
};
