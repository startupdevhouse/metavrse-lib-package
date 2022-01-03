import { NODE_TYPES } from './NODE_TYPES';

export type TreeNodeType =
  | NODE_TYPES.hud
  | NODE_TYPES.light
  | NODE_TYPES.object
  | NODE_TYPES.objectHud
  | NODE_TYPES.objectGroup
  | NODE_TYPES.video
  | NODE_TYPES.camera;
