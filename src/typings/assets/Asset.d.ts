import { CherryKey } from '../cherry/CherryKey';
import { Extensions } from '../common/Extensions';
import { AssetType } from './AssetType';

export interface Asset {
  key: CherryKey;
  title: string; // name will not work! See TreeNodeType
  type: AssetType;
  // TODO: [MET-588] Conditional parameter type
  children: IAsset[];
  hidden?: boolean;
  uiVisible?: boolean;
  uiHighlighted?: boolean;
  extension?: Extensions;
}
