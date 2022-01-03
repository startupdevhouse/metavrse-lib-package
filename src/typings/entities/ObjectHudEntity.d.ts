import { NODE_TYPES } from "../common/NODE_TYPES";

export interface ObjectHudEntity extends Omit<Object, "type"> {
  type: NODE_TYPES.objectHud;
}
