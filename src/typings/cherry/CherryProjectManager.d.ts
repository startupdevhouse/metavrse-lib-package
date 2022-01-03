import { CherryKey } from './CherryKey';
import { CherryProjectManagerObject } from './CherryProjectManagerObject';
import { Entities } from '../entities/Entities';
import { TreeNode } from '../common/TreeNode';
import { Asset } from '../assets/Asset';

export type CherryProjectManager = {
  // File methods
  loadURL: (url: string, password: string) => void;
  reset: () => void;
  loadScene: (project: any, launch?: boolean) => void;
  loadFromFolder: (path: string) => void;
  loadFromArchive: (path: string) => void;
  render: (opts: any) => void;
  regenerate: (opt: string) => void;
  getObject: (key: CherryKey) => CherryProjectManagerObject;
  processRedraw: (opts: any) => void;
  addObject: (
    child: TreeNode,
    data: Entities,
    parent?: TreeNode,
    key?: CherryKey
  ) => any;
  removeObject: (key: CherryKey) => any;
  moveObject: (key: CherryKey, parent: CherryKey) => any;
  loadPaths: (tree: Asset[]) => void;
  getAsset: (key: CherryKey) => Asset;
  selectScene: (scene: string, callback: () => void) => void;
  // Other methods
  addChangeListener: (callback: (event: any) => void) => void;
  treeGenerated: () => void;
  // Setters getters
  isDirty: boolean;
  path: string;
  objects: { [key: number]: { key: CherryKey } };
  // TODO: [MET-836] Add typings for project data passed to the Scenegraph.js
  project?: any;
};
