import { NODE_TYPES } from '../common/NODE_TYPES';

export type ObjectHudEntity = Omit<Object, 'type'> & {
  type: NODE_TYPES.objectHud;
};
