import { Paper } from "@mui/material";
import { Vector3 } from "three";
import BlockPanel from "./BlockPanel";
import DebugPanel from "./DebugPanel";
import TransportControl from "./TransportControl";

interface IUIProps {
  selectedBlockPos?: Vector3;
}

const UI = ({ selectedBlockPos }: IUIProps) => {
  return (
    <Paper
      elevation={2}
      sx={{
        position: "fixed",
        m: 2,
        p: 2,
      }}
    >
      <TransportControl />
      <BlockPanel selectedBlockPos={selectedBlockPos} />
      <DebugPanel />
    </Paper>
  );
};

export default UI;
