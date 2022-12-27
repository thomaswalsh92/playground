import { Vector3 } from "three";

export default class UIController {
  constructor() {
    this.selectedBlock = undefined;
  }

  selectedBlock?: Vector3;

  setSelectedBlock = (block: Vector3) => {
    this.selectedBlock = block;
  };
}
