import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { controller } from "../App";

const BlockPanel = () => {
  const [selectedBlock, setSelectedBlock] = useState<Vector3>();

  useEffect(() => {
    console.log(controller);
    setSelectedBlock(controller.selectedBlock);
  }, [controller, controller.selectedBlock]);
  return <h1>X: {selectedBlock && selectedBlock.x}</h1>;
};

export default BlockPanel;
