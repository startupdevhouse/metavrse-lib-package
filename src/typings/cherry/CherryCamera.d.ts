import { Vector3 } from '../common/Vector3';

export type CherryCamera = {
  projection: Float32Array;
  view: Float32Array;
  position: Vector3;
  direction: Vector3;
  up: Vector3;
  viewport: [number, number, number, number];
  fov: number;
  near: number;
  far: number;
  center: Vector3;
};
