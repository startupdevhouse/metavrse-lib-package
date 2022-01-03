import { CherryKey } from '../cherry/CherryKey';
import { NODE_TYPES } from '../common/NODE_TYPES';
import { Vector3 } from '../common/Vector3';
import { GroupMat } from '../common/GroupMat';

export type VideoEntity = {
  key: CherryKey;
  type: NODE_TYPES.video;

  position: Vector3;
  rotate: Vector3;
  scale: Vector3;
  groupMat: GroupMat;

  src: string;
  pixel: Vector3;

  isurl: boolean;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;

  startTime: string;
  endTime: string;
  volume: string;

  visible: boolean;
};
