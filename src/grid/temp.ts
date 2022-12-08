import { Block } from "./Block";

export class Grid {
  constructor(x: number, z: number) {
    this.x = x;
    this.z = z;
  }

  x: number;
  z: number;
  grid: Block[];
  createGrid = () => {
    const arr: Block[] = [];
    for (let i = 0; i < this.x; i++) {
      for (let j = 0; j < this.z; j++) {
        const thisBlock = new Block(i, j, "ghost");
        thisBlock.create();
        arr.push(thisBlock);
      }
    }
    this.grid = arr;
  };
  getBlockAtCoords = (x: number, z: number): Block => {
    return this.grid.find((block) => block.xCoord === x && block.zCoord === z);
  };
}
