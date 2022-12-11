import {
  BoxGeometry,
  Color,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
} from "three";

type Mode = "ghost" | "send" | "receive" | "logic";
export class Block {
  constructor(xCoord: number, zCoord: number, mode: Mode) {
    this.xCoord = xCoord;
    this.zCoord = zCoord;
    this.mode = mode;
  }

  xCoord: number;
  zCoord: number;
  mesh: Mesh<BoxGeometry, MeshBasicMaterial>;
  mode: Mode;

  color = () => {
    if (this.mode === "ghost") {
      return new Color("#FDFFFC");
    }
    if (this.mode === "send") {
      return new Color("#235789");
    }
    if (this.mode === "receive") {
      return new Color("#C1292E");
    }
    if (this.mode === "logic") {
      return new Color("#F1D302");
    }
  };

  create = () => {
    const mat = new MeshBasicMaterial({ color: this.color() });
    const edgesMat = new LineBasicMaterial({ color: 0x000000 });
    const geo = new BoxGeometry(1, 1, 1);
    const cube = new Mesh(geo, mat);
    const edges = new EdgesGeometry(cube.geometry);
    const wireframe = new LineSegments(edges, edgesMat);
    cube.add(wireframe);
    const xOffset = this.xCoord;
    const zOffset = this.zCoord;
    cube.position.set(xOffset, 0, zOffset);
    this.mesh = cube;
  };

  setMode = (mode: Mode) => {
    this.mode = mode;
    this.mesh.material.color.set(this.color());
  };
}
