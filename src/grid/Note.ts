import {
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Vector2,
  Vector3,
} from "three";
import { generateUUID } from "three/src/math/MathUtils";
import { mainGrid } from "../App";
import Block from "./Block";
import { Grid } from "./Grid";

export default class Note {
  constructor(position: Vector3, dir: Vector3) {
    this.id = generateUUID();
    this.position = position;
    this.direction = dir;
    this.block = undefined;
    this.mesh = this.initMesh();
    this.yOffset = 1.2;
  }

  id: string;
  position: Vector3;
  direction: Vector3;
  block?: Block;
  mesh: Mesh<SphereGeometry, MeshBasicMaterial>;
  yOffset: number;

  initMesh = () => {
    const mat = new MeshBasicMaterial({ color: "#084887" });
    const geo = new SphereGeometry(0.4);
    const sphere = new Mesh(geo, mat);
    sphere.position.set(
      this.position.x,
      this.position.y + this.yOffset,
      this.position.z
    );
    return sphere;
  };

  move = () => {
    this.position.x = this.position.x + this.direction.x;
    this.position.z = this.position.z + this.direction.z;
  };

  update = () => {
    const posX = this.position.x;
    const posZ = this.position.z;

    //complete all actions if the note is still in the grid
    if (mainGrid.getBlockAtPos(posX, posZ)) {
      this.mesh.position.set(
        this.position.x,
        this.position.y + this.yOffset,
        this.position.z
      );
      this.move();
    }
  };

  remove = () => {
    delete mainGrid.notes[this.id];
  };

  addBlockToNote = (block: Block) => {
    this.block = block;
  };

  removeBlockFromNote = () => {
    this.block = undefined;
  };
}
