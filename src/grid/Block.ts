import {
  BoxGeometry,
  Color,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from "three";

type Mode = "ghost" | "send" | "receive" | "logic";

class Block {
  constructor(posX: number, posZ: number, mode: Mode) {
    this.posX = posX;
    this.posZ = posZ;
    this.mode = mode;
    this.mesh = this.create();
    this.sendInterval = 4;
    this.sendDirection = new Vector3(1, 0, 0);
    this.highlight = false;
  }

  posX: number;
  posZ: number;
  mesh: Mesh<BoxGeometry, MeshBasicMaterial>;
  mode: Mode;
  sendInterval: number;
  sendDirection: Vector3;
  highlight: boolean;

  color = () => {
    if (this.mode === "ghost" && !this.highlight) {
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
    if (this.highlight) {
      return new Color("#FFA500");
    }
    return new Color("#FFFFFF");
  };

  create = () => {
    const mat = new MeshBasicMaterial({ color: this.color() });
    const edgesMat = new LineBasicMaterial({ color: 0x000000 });
    const geo = new BoxGeometry(1, 1, 1);
    const cube = new Mesh(geo, mat);
    const edges = new EdgesGeometry(cube.geometry);
    const wireframe = new LineSegments(edges, edgesMat);
    cube.add(wireframe);
    const xOffset = this.posX;
    const zOffset = this.posZ;
    cube.position.set(xOffset, 0, zOffset);
    return cube;
  };

  setMode = (mode: Mode) => {
    this.mode = mode;
    this.mesh.material.color.set(this.color());
  };

  setHighlight = (bool: boolean) => {
    this.highlight = bool;
    this.mesh.material.color.set(this.color());
  };
}

export default Block;
