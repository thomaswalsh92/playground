import Block from "./Block";
import Note from "./Note";

export class Grid {
  constructor(x: number, z: number) {
    this.x = x;
    this.z = z;
    this.grid = this.init();
    this.notes = [];
  }

  x: number;
  z: number;
  grid: Block[];
  notes: Note[];

  shift = (x: number, z: number) => {
    this.grid.forEach((block) => {
      block.mesh.position.set(block.posX + x, 0, block.posZ + z);
    });
  };

  init = () => {
    const arr: Block[] = [];
    for (let i = 0; i < this.x; i++) {
      for (let j = 0; j < this.z; j++) {
        const thisBlock = new Block(i, j, "ghost");
        thisBlock.create();
        arr.push(thisBlock);
      }
    }
    return arr;
  };

  getBlockAtCoords = (x: number, z: number): Block | undefined => {
    const block = this.grid.find(
      (block) => block.posX === x && block.posZ === z
    );
    if (block) {
      return block;
    }
    return undefined;
  };

  makeNotes = (tick: number) => {
    this.grid.forEach((block) => {
      if (block.mode === "send" && tick % block.sendInterval === 0) {
        const note = new Note(block.posX, block.posZ, block.sendDirection);
        this.notes.push(note);
      }
    });
  };

  moveNotes = () => {
    this.notes.forEach((note) => note.move());
  };

  highlightNotes = () => {
    this.grid.forEach((block) => {
      this.notes.forEach((note) => {
        if (block.posX === note.posX && block.posZ === block.posZ) {
          block.setHighlight(true);
        }
        if (block.posX !== note.posX || block.posZ !== note.posZ) {
          block.setHighlight(false);
        }
      });
    });
  };
}
