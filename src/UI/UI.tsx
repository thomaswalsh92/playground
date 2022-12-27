import { Paper } from "@mui/material";
import { Vector3 } from "three";
import BlockPanel from "./BlockPanel";
import DebugPanel from "./DebugPanel";
import TransportControl from "./TransportControl";

interface IUIProps {
  selectedBlock?: Vector3;
}

const UI = ({ selectedBlock }: IUIProps) => {
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
      <BlockPanel />
      <DebugPanel />
    </Paper>
  );
};

export default UI;
