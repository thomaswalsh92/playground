// import react from "react";

import { Scene, Vector3, WebGLRenderer } from "three";
import { camera } from "./camera/camera";
import { Grid } from "./grid/Grid";
import { MonoSynth, Loop, Transport } from "tone";
import UI from "./UI/UI";
import { useState } from "react";

//! global variables, these may be accessed by classes !//
export const gridDim = 32;
export const mainGrid = new Grid(gridDim, gridDim);
export const scene = new Scene();
export const debug = true;

export const App = () => {
  const [tick, setTick] = useState<number>();
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
  mainCamera.lookAt(mainGrid.blocks[gridDim / 2][gridDim / 2].position);
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, mainCamera);
  };

  Transport.bpm.value = 120;

  const send1 = mainGrid.blocks[0][0];
  send1.updateSend(3, new Vector3(1, 0, 0));
  const send2 = mainGrid.blocks[2][5];
  send2.updateSend(6, new Vector3(1, 0, 0));
  const send3 = mainGrid.blocks[0][7];
  send3.updateSend(5, new Vector3(0, 0, 1));
  const send4 = mainGrid.blocks[15][15];
  send4.updateSend(2, new Vector3(0, 0, -1));
  const send5 = mainGrid.blocks[13][13];
  send5.updateSend(4, new Vector3(-1, 0, 0));

  for (let i = 0; i < mainGrid.blocks.length; i++) {
    for (let j = 0; j < mainGrid.blocks[i].length; j++) {
      scene.add(mainGrid.blocks[i][j].mesh);
    }
  }

  let count = 0;
  const loop = new Loop((time) => {
    mainGrid.tick = count;
    mainGrid.cleanUpNotes();
    mainGrid.updateNotes();
    mainGrid.createNotes();

    count++;
  }, "16n").start(0);

  animate();
  return <UI tick={tick} />;
};

export default App;
