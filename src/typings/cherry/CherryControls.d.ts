import { Vector3 } from '../common/Vector3';
import { CherryCamera } from './CherryCamera';

export type CherryControls = {
  position: Vector3;
  direction: Vector3;
  up: Vector3;
  target: Vector3;
  distance: number;
  damping: number;
  rotateSpeed: number;
  zoomSpeed: number;
  pinchSpeed: number;
  panSpeed: number;
  pinch: boolean;
  zoom: boolean;
  rotate: boolean;
  phiBounds: [number, number];
  thetaBounds: [number, number];
  distanceBounds: [number, number];
  pinchBounds: [number, number];
  camera: CherryCamera;
  rotateEnabled: boolean;
  zoomEnabled: boolean;
  panEnabled: boolean;
  autoDollyEnabled: boolean;
  isDirty: boolean;
  clickEnabled: boolean;
};
