import { CherryKey } from "../cherry/CherryKey";
import { GroupMat } from "../GroupMat";
import { RGB } from "../common/RGB";
import { Vector3 } from "../common/Vector3";
import { NODE_TYPES } from "../common/NODE_TYPES";

export interface LightEntity {
  key: CherryKey;
  type: NODE_TYPES.light;

  position: Vector3;
  groupMat: GroupMat;
  color: RGB;
  intensity: number;

  visible: boolean;
}
