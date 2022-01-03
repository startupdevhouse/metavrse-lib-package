import { CherryKey } from "../cherry/CherryKey";
import { NODE_TYPES } from "../common/NODE_TYPES";

export interface HudEntity {
  key: CherryKey;
  type: NODE_TYPES.hud;

  visible: boolean;
}
