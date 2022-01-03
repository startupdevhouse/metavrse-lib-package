import { RGB } from '../common/RGB';
import { Vector3 } from '../common/Vector3';
import { TreeNodeType } from '../common/TreeNodeType';
import { CherryKey } from './CherryKey';
import { CherryMesh } from './CherryMesh';

/**
 * @description ProjectManager.getObject(key) result
 */
export type CherryProjectManagerObject = {
  addToBucket: () => void;
  addToRedraw: () => void;
  insertIntoBucket: () => void;
  regenerateLink: () => void;
  toggleLink: () => void;
  setProperty: (prop: string, value: any, key: CherryKey) => void;
  getProperty: (prop: string, key: CherryKey) => [string, Vector3];
  removeLink: { (): void; (prop: string, key: CherryKey): boolean };
  clearRender: () => void;
  remove: () => void;

  addChangeListener: (callback) => void;
  removeChangeListener: (callback) => void;
  clearChangeHandlers: () => void;

  buckets: any;
  children: any;
  meshdata: Map<unknown, unknown>;
  /** @description Use to retrive mesh specify by index or update mesh by it index */
  mesh: {
    get: (index: number, property: string) => CherryMesh;
    set: (index: number, mesh: CherryMesh) => boolean;
  };

  color: RGB;
  groupMat: number[];
  intensity: number;
  position: Vector3;
  visible: boolean;
  finalPosition: Vector3;
  finalVisibility: boolean;
  parentOpts: { visible: boolean; transforms: Vector3; transform: any };
  transparent: boolean;
  pivot?: Vector3;
  item: {
    type: TreeNodeType;
    title: string;
    key: CherryKey;
  };
  scale: Vector3;
  rotate: Vector3;
  finalTransformation: Float32Array;
  parent?: any;
};
