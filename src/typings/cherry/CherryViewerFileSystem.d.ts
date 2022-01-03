export type CherryViewerFileSystem = {
  readdir: (path: string) => string[];
  mkdir: (path: string) => void;
  writeFile: (path: string, data: Uint8Array) => void;
};
