import { NODE_TYPES } from '../common/NODE_TYPES';

export type AssetType =
  | NODE_TYPES.folder
  | NODE_TYPES.javascript
  | NODE_TYPES.image
  | NODE_TYPES.object;
