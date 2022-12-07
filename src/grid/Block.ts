import {
  BoxGeometry,
  Color,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
} from "three";

export class Block {
  constructor(xCoord: number, zCoord: number) {
    this.xCoord = xCoord;
    this.zCoord = zCoord;
  }

  xCoord: number;
  zCoord: number;
  block: Mesh<BoxGeometry, MeshBasicMaterial>;

  create = () => {
    const color = new Color("#4f94bc");
    const mat = new MeshBasicMaterial({ color: color });
    const edgesMat = new LineBasicMaterial({ color: 0x000000 });
    const geo = new BoxGeometry(1, 1, 1);
    const cube = new Mesh(geo, mat);
    const edges = new EdgesGeometry(cube.geometry);
    const wireframe = new LineSegments(edges, edgesMat);
    cube.add(wireframe);
    const xOffset = this.xCoord;
    const zOffset = this.zCoord;
    cube.position.set(xOffset, 0, zOffset);
    this.block = cube;
  };
}
