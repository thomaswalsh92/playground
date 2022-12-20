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
import Note from "./Note";

type Mode = "ghost" | "send" | "receive" | "logic";

const getMesh = () => {};
class Block {
  constructor(position: Vector3) {
    this.position = position;
    this.mesh = this.initMesh();
    this.sendDirection = new Vector3(0, 0, 0);
    this.notes = {};
    this.color = new Color("#FDFFFC");
    this.mode = "ghost";
  }

  mode: Mode;
  position: Vector3;
  color: Color;
  mesh: Mesh<BoxGeometry, MeshBasicMaterial>;
  sendDirection: Vector3;
  notes: { [key: string]: Note };

  initMesh = () => {
    const mat = new MeshBasicMaterial({ color: this.color });
    const edgesMat = new LineBasicMaterial({ color: 0x000000 });
    const geo = new BoxGeometry(1, 1, 1);
    const cube = new Mesh(geo, mat);
    const edges = new EdgesGeometry(cube.geometry);
    const wireframe = new LineSegments(edges, edgesMat);
    cube.add(wireframe);
    const xOffset = this.position.x;
    const zOffset = this.position.z;
    cube.position.set(xOffset, 0, zOffset);
    return cube;
  };

  addNoteToBlock = (note: Note) => {
    this.notes[note.id] = note;
    this.notes[note.id].block = this;
  };

  removeNoteFromBlock = (noteId: string) => {
    delete this.notes[noteId];
    this.notes[noteId].block = undefined;
  };
}

export class SendBlock extends Block {
  constructor(position: Vector3) {
    super(position);
    this.mesh = this.initMesh();
    this.sendDirection = new Vector3(0, 0, 0);
    this.notes = {};
    this.color = new Color("#FDFFFC");
    this.mode = "send";
  }
}

export default Block;
