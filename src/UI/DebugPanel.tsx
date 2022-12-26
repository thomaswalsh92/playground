import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { mainGrid } from "../App";

const DebugPanel = () => {
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
          <Typography variant="body1">Debug will go here</Typography>
        </Box>
      )}
    </Box>
  );
};

export default DebugPanel;
