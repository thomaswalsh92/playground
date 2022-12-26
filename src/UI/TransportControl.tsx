import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { start, Transport } from "tone";

const TransportControl = () => {
  return (
    <>
      <Button
        variant="contained"
        startIcon={<PlayArrowIcon />}
        onClick={() => {
          Transport.start();
          start();
        }}
      >
        Start
      </Button>
      <Button
        sx={{ ml: 1 }}
        variant="contained"
        startIcon={<PauseIcon />}
        onClick={() => {
          Transport.pause();
        }}
      >
        Pause
      </Button>
    </>
  );
};

export default TransportControl;
