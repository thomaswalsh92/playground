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
import { mainGrid } from "../App";
import Note from "./Note";

type Mode = "ghost" | "send" | "receive" | "logic";

export default class Block {
  constructor(position: Vector3) {
    this.position = position;
    this.color = new Color("#FDFFFC");
    this.mesh = this.initMesh();
    this.mode = "ghost";
    this.sendDirection = new Vector3(1, 0, 0);
    this.sendInterval = 6;
  }

  mode: Mode;
  position: Vector3;
  color: Color;
  mesh: Mesh<BoxGeometry, MeshBasicMaterial>;
  sendDirection: Vector3;
  sendInterval: number;

  initMesh = () => {
    const mat = new MeshBasicMaterial({ color: this.color });
    const edgesMat = new LineBasicMaterial({ color: 0x060606 });
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

  // setMode = (mode: Mode) => {
  //   if (mode === this.mode) {
  //     console.log(`Block already set as ${mode} block`);
  //     return;
  //   }
  //   this.mode = mode;
  //   this.setColor();
  // };

  setColor = () => {
    if (this.mode === "ghost") {
      this.color = new Color("#FDFFFC");
    }

    if (this.mode === "send") {
      this.color = new Color("#E71D36");
    }

    if (this.mode === "receive") {
      this.color = new Color("#084887");
    }

    if (this.mode === "logic") {
      this.color = new Color("#F58A07");
    }

    this.mesh.material.color.set(this.color);
  };

  //send methods
  createNote = () => {
    if (this.mode !== "send") {
      console.log("Block is not in send mode");
      return;
    }
    if (this.mode === "send" && mainGrid.tick % this.sendInterval === 0) {
      const newNote = new Note(this.position, this.sendDirection);
      mainGrid.notes[newNote.id] = newNote;
    }
  };

  updateSend = (sendInterval: number, sendDirection: Vector3) => {
    this.mode = "send";
    this.sendInterval = sendInterval;
    this.sendDirection = sendDirection;
    this.setColor();
  };
}
