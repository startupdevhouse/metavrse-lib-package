import { CherryMeshes } from './CherryMeshes';
import { Vector3 } from '../common/Vector3';

type SetParameter = {
  (arg0: string, arg1: any): void;
  (arg0: number, arg1: string, arg2: any): void;
  (arg0: number, arg1: number, arg2: number, arg3: number): void;
  (arg0: number, arg1: string, arg2: number, arg3: number, arg4: number): void;
};

export type CherrySurfaceSceneObject = {
  $$: {
    count: { value: number };
    ptr: number;
    ptrType: any;
  };
  getAnimationIndex: () => void;
  getAnimationTime: () => void;
  getAnimations: () => void;
  getMeshGroups: () => void;
  getMeshMaterials: () => void;
  /**
   * @description Use to get meshes information for current object
   */
  getMeshes: () => CherryMeshes;
  getNodeNames: () => void;
  getParameterBool: () => void;
  getParameterFloat: () => void;
  getParameterInt: () => void;
  getParameterString: () => void;
  getParameterVec3: (vector: Vector3) => any;
  pauseAnimation: () => void;
  playAnimation: () => void;
  resumeAnimation: () => void;
  save: () => void;
  setAnimationSpeed: () => void;
  setAnimationTime: () => void;
  setParameter: SetParameter;
  setTransformMatrix: (m: any) => any;
};
