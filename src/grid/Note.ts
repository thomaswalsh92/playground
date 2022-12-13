import { Vector2, Vector3 } from "three";
import { generateUUID } from "three/src/math/MathUtils";
import { Grid } from "./Grid";

export default class Note {
  constructor(posX: number, posZ: number, dir: Vector3) {
    this.id = generateUUID();
    this.posX = posX;
    this.posZ = posZ;
    this.direction = dir;
  }

  id: string;
  posX: number;
  posZ: number;
  direction: Vector3;

  move = () => {
    this.posX = this.posX + this.direction.x;
    this.posZ = this.posZ + this.direction.z;
  };
}
