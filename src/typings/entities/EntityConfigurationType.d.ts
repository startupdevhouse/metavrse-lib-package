import { NODE_TYPES } from '../common/NODE_TYPES';

export type EntityConfigurationType =
  | NODE_TYPES.hudLink
  | NODE_TYPES.imageLink
  | NODE_TYPES.lightLink
  | NODE_TYPES.objectLink
  | NODE_TYPES.objectHudLink
  | NODE_TYPES.objectGroupLink
  | NODE_TYPES.videoLink;
