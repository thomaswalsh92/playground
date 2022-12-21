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
    return arr;
  };

  getBlockAtPos = (x: number, z: number) => {
    if (x < this.x && x >= 0 && z < this.z && z >= 0) {
      return this.blocks[x][z];
    }
    return undefined;
  };

  //todo note this flattens the array in the order of z 0 - end, x 0 - end
  getBlocksArray = () => {
    return this.blocks.flat(2);
  };

  getNotesArray = () => {
    const arr = [];
    const { notes } = this;
    for (let noteId in notes) {
      arr.push(notes[noteId]);
    }
    return arr;
  };

  //todo naive way of sending blocks tbh
  createNotes = () => {
    this.getBlocksArray().forEach((block) => {
      if (block.mode === "send") {
        block.createNote();
      }
    });
  };

  updateNotes = () => {
    const { notes } = this;
    for (let noteId in notes) {
      notes[noteId].update();
    }
  };

  cleanUpNotes = () => {
    const { notes } = this;
    for (let noteId in notes) {
      const note = notes[noteId];
      if (!this.getBlockAtPos(note.position.x, note.position.z)) {
        note.remove();
        note.mesh.remove();
      }
    }
  };
}
