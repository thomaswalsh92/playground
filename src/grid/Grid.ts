import { Vector3 } from "three";
import Block from "./Block";
import Note from "./Note";

export class Grid {
  constructor(x: number, z: number) {
    this.x = x;
    this.z = z;
    this.blocks = this.initBlocks();
    this.notes = {};
    this.tick = 0;
  }

  x: number;
  z: number;
  blocks: Block[][];
  notes: { [key: string]: Note };
  tick: number;

  initBlocks = () => {
    const arr: Block[][] = [];
    for (let i = 0; i < this.x; i++) {
      const columnArr = [];
      for (let j = 0; j < this.z; j++) {
        const thisBlock = new Block(new Vector3(i, 0, j));
        columnArr.push(thisBlock);
      }
      arr.push(columnArr);
    }
    console.log(arr);
    return arr;
  };

  getBlockAtPos = (x: number, z: number) => {
    if (x < this.x && z < this.x) {
      return this.blocks[x][z];
    }
    return undefined;
  };
}
