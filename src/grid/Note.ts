import { Vector2, Vector3 } from "three";
import { generateUUID } from "three/src/math/MathUtils";
import { mainGrid } from "../App";
import Block, { SendBlock } from "./Block";
import { Grid } from "./Grid";

export default class Note {
  constructor(position: Vector3, dir: Vector3) {
    this.id = generateUUID();
    this.position = position;
    this.direction = dir;
    this.block = undefined;
  }

  id: string;
  position: Vector3;
  direction: Vector3;
  block?: Block;

  onTick = () => {};

  move = () => {
    this.position.x = this.position.x + this.direction.x;
    this.position.z = this.position.z + this.direction.z;
  };

  addToBlock = () => {
    mainGrid.blocks[this.position.x][this.position.z].addNoteToBlock(this);
  };
}
