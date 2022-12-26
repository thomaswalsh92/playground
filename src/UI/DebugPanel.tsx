import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { mainGrid } from "../App";

interface IDebugPanelProps {
  tick?: number;
}
const DebugPanel = ({ tick }: IDebugPanelProps) => {
  const [debugOpen, setDebugOpen] = useState<boolean>(false);

  return (
    <Box>
      <FormControlLabel
        label="Debug Mode"
        control={
          <Switch onChange={(event) => setDebugOpen(event.target.checked)} />
        }
      ></FormControlLabel>

      {debugOpen && (
        <Box>
          <Typography variant="body1">Tick: {tick}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default DebugPanel;
