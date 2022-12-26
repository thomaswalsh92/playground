import { Box } from "@mui/material";
import DebugPanel from "./DebugPanel";
import TransportControl from "./TransportControl";

interface IUIProps {
  tick?: number;
}

const UI = ({ tick }: IUIProps) => {
  return (
    <Box sx={{ position: "fixed", p: 2 }}>
      <TransportControl />
      <DebugPanel tick={tick} />
    </Box>
  );
};

export default UI;
