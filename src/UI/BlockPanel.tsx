import { useEffect, useState } from "react";
import { Vector3 } from "three";

interface IBlockPanelProps {
  selectedBlockPos?: Vector3;
}
const BlockPanel = ({ selectedBlockPos }: IBlockPanelProps) => {
  return (
    <h1>
      {selectedBlockPos && `X: ${selectedBlockPos.x} Z: ${selectedBlockPos.z}`}
    </h1>
  );
};

export default BlockPanel;
