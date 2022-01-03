import { CherryKey } from '../cherry/CherryKey';
import { GroupMat } from '../common/GroupMat';
import { Vector3 } from '../common/Vector3';
import { EntityMeshes } from './EntityMeshes';
import { EntityConfiguration } from './EntityConfiguration';
import { NODE_TYPES } from '../common/NODE_TYPES';

export type ObjectEntity = {
  key: CherryKey;
  type: NODE_TYPES.object;

  position: Vector3;
  rotate: Vector3;
  scale: Vector3;
  anchor: Vector3;
  pivot: Vector3;
  groupMat: GroupMat;
  autoscale: number;

  data: {
    [key: string]: EntityMeshes;
  };

  hud: boolean;
  show_shadow: boolean;
  cast_shadow: boolean;
  visible: boolean;

  // INFO: Will be moved into components
  controller?: CherryKey;
  code?: {
    [key: string]: {
      configuration: EntityConfiguration[];
    };
  };
};
