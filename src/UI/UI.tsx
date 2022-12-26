import { Paper } from "@mui/material";
import DebugPanel from "./DebugPanel";
import TransportControl from "./TransportControl";

const UI = () => {
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
      <DebugPanel />
    </Paper>
  );
};

export default UI;
