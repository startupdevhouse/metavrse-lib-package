export type Surface = {
  $$: {
    count: { value: number };
    ptr: number;
    ptrType: any;
  };
  getScene: () => SurfaceScene;
  onSurfaceChange: () => void;
  /** @deprecated Use Module.FS / Viewer.FS to read binary from scenegraph */
  readBinary: () => void;
  /** @deprecated Use Module.FS / Viewer.FS to read file from scenegraph */
  readFile: () => void;
  /** @deprecated Use Module.FS / Viewer.FS to remove directory from scenegraph */
  removeDirectory: () => void;
  render: () => void;
  render_clear: () => void;
  render_clear_to_png: (
    r: number,
    g: number,
    b: number,
    a: number
  ) => Uint8Array;
  render_to_png: () => Uint8Array;
  /** @deprecated Use Module.FS / Viewer.FS to write file into scenegraph */
  writeFile: (title: string, data: any) => any;
};

export type SurfaceScene = {
  showRulerGrid: (value: boolean) => void;
  getObject: (key: IKey) => SurfaceSceneObject;
  getObjectByPixel: (x: number, y: number) => ObjectByPixel;
  addObject: (key: IKey, path: string) => SurfaceSceneObject;
  removeObject: (key: IKey) => void;
};

type SetParameter = {
  (arg0: string, arg1: any): void;
  (arg0: number, arg1: string, arg2: any): void;
  (arg0: number, arg1: number, arg2: number, arg3: number): void;
  (arg0: number, arg1: string, arg2: number, arg3: number, arg4: number): void;
};

type Mesh = {
  mesh_id: number;
  group_id: number;
  material_id: number;
  mesh_name: string;
  node_name: string;
  material_name: string;
};

type Meshes = {
  /**
   * @description Use to get specific mesh by index
   * @returns Mesh
   */
  get: (index: number) => Mesh;
  push_back: () => void;
  resize: () => void;
  /**
   * @description Use to set mesh by index
   * @property {number}
   * @property {Mesh}
   * @returns boolean
   */
  set: (index: number, mesh: Mesh) => boolean;
  /** @description Use to iterate over meshes (see method {get}) */
  size: () => number;
};

export type SurfaceSceneObject = {
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
  getMeshes: () => Meshes;
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

export type ProjectManager = {
  // File methods
  loadURL: (url: string, password: string) => void;
  reset: () => void;
  loadScene: (project: any, launch?: boolean) => void;
  loadFromFolder: (path: string) => void;
  loadFromArchive: (path: string) => void;
  render: (opts: any) => void;
  regenerate: (opt: string) => void;
  getObject: (key: IKey) => ProjectManagerObject;
  processRedraw: (opts: any) => void;
  addObject: (
    child: ITreeNode,
    data: Entities,
    parent?: ITreeNode,
    key?: IKey
  ) => any;
  removeObject: (key: IKey) => any;
  moveObject: (key: IKey, parent: IKey) => any;
  loadPaths: (tree: IAsset[]) => void;
  getAsset: (key: IKey) => IAsset;
  selectScene: (scene: string, callback: () => void) => void;
  // Other methods
  addChangeListener: (callback: (event: any) => void) => void;
  treeGenerated: () => void;
  // Setters getters
  isDirty: boolean;
  path: string;
  objects: { [key: number]: { key: IKey } };
  // TODO: [MET-836] Add typings for project data passed to the Scenegraph.js
  project?: any;
};

export type ObjectByPixel = {
  meshid: number;
  object: {
    object_ptr: () => any;
  };
  x: number;
  y: number;
  z: number;
};

/**
 * @description ProjectManager.getObject(key) result
 */
export type ProjectManagerObject = {
  addToBucket: () => void;
  addToRedraw: () => void;
  insertIntoBucket: () => void;
  regenerateLink: () => void;
  toggleLink: () => void;
  removeLink: () => void;
  setProperty: (prop: string, value: any, key: IKey) => void;
  getProperty: (prop: string, key: IKey) => [string, Vector3];
  removeLink: (prop: string, key: IKey) => boolean;
  clearRender: () => void;
  remove: () => void;

  addChangeListener: (callback) => void;
  removeChangeListener: (callback) => void;
  clearChangeHandlers: () => void;

  buckets: any;
  children: any;
  meshdata: Map;
  /** @description Use to retrive mesh specify by index or update mesh by it index */
  mesh: {
    get: (index: number, property: string) => Mesh;
    set: (index: number, mesh: Mesh) => boolean;
  };

  color: IRgb;
  groupMat: number[];
  intensity: number;
  position: Vector3;
  visible: boolean;
  finalPosition: vec3;
  finalVisibility: boolean;
  parentOpts: { visible: boolean; transforms: Vector3; transform: any };
  transparent: boolean;
  pivot?: Vector3;
  item: {
    type: ITreeNodeType;
    title: string;
    key: IKey;
  };
  scale: Vector3;
  rotate: Vector3;
  finalTransformation: Float32Array;
  parent?: any;
};

export type ViewerFileSystem = {
  readdir: (path: string) => string[];
  mkdir: (path: string) => void;
  writeFile: (path: string, data: Uint8Array) => void;
};

type Camera = {
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

type Controls = {
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
  camera: Camera;
  rotateEnabled: boolean;
  zoomEnabled: boolean;
  panEnabled: boolean;
  autoDollyEnabled: boolean;
  isDirty: boolean;
  clickEnabled: boolean;
};

export type Viewer = {
  // Asset files objects
  ProjectManager: ProjectManager;
  FS: ViewerFileSystem;
  // emscripten methods
  pixelDensity: number;
  controls: Controls;
  canvas?: HTMLCanvasElement;
  screen: {
    width: number;
    height: number;
  };
  camera: {
    viewport: number[];
    projection: Float32Array;
    view: Float32Array;
  };
  getSurface: () => Surface;
  toggleNativeLoader: (toggle: boolean) => void;
};

export type Viewer3D = {
  Handlers: any;
  logReadFiles: boolean;
  canvas?: HTMLCanvasElement;
  print: (text: string) => void;
  printErr: (text: string) => void;
  locateFile: (filename: string, prefix: string) => string;
};
