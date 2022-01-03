import { CherryMesh } from './CherryMesh';

export type CherryMeshes = {
  /**
   * @description Use to get specific mesh by index
   * @returns Mesh
   */
  get: (index: number) => CherryMesh;
  push_back: () => void;
  resize: () => void;
  /**
   * @description Use to set mesh by index
   * @property {number}
   * @property {Mesh}
   * @returns boolean
   */
  set: (index: number, mesh: CherryMesh) => boolean;
  /** @description Use to iterate over meshes (see method {get}) */
  size: () => number;
};
