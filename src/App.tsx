// import react from "react";

import { Scene, WebGLRenderer } from "three";
import { camera } from "./camera/camera";
import { Grid } from "./grid/Grid";
import { start, MonoSynth, Loop, Transport } from "tone";

export const App = () => {
  const scene = new Scene();
  const mainCamera = camera();

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#e5e5e5");
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    mainCamera.updateProjectionMatrix();
  });

  mainCamera.lookAt(scene.position); // or the origin

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, mainCamera);
  };

  const mainGrid = new Grid(16, 16);
  mainGrid.shift(-7, -7);
  mainGrid.grid.forEach((block) => {
    scene.add(block.mesh);
  });

  const sendBlock = mainGrid.getBlockAtCoords(0, 0);
  sendBlock && sendBlock.setMode("send");

  Transport.bpm.value = 120;

  Transport.start();

  //the loop needs to run every tick and do the following:
  //check if a block is ready to send;
  //createNotes at block pos where send is ready'
  //updateIntervalsForBlocks;

  let count = 0;
  const loop = new Loop((time) => {
    // triggered every eighth note.
    mainGrid.makeNotes(count);
    mainGrid.moveNotes();
    mainGrid.highlightNotes();
    count++;
  }, "4n").start(0);
  Transport.start();

  animate();
  return (
    <>
      <button
        style={{ position: "fixed" }}
        onClick={() => {
          start();
        }}
      >
        Start
      </button>
    </>
  );
};

export default App;
