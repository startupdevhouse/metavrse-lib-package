import { TreeNodeType } from './TreeNodeType';

export type TreeNode = {
  children: TreeNode[];
  // TODO: [MET-640] Change property visible to disable and add visible property (boolean)
  visible: boolean;
  id?: string; // asset key
  key: string;
  title: string; // name will not work with SceneGraph in 3dviewer assets
  type: TreeNodeType;
  uiVisible?: boolean;
  uiHighlighted?: boolean;
};
