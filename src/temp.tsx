// import react from "react";

import { Scene, Vector3, WebGLRenderer } from "three";
import { camera } from "./camera/camera";
import { Grid } from "./grid/Grid";
import { start, MonoSynth, Loop, Transport } from "tone";

export const gridDim = 16;
export const mainGrid = new Grid(gridDim, gridDim);

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

  Transport.bpm.value = 120;
  Transport.start();

  //the loop needs to run every tick and do the following:
  //check if a block is ready to send;
  //createNotes at block pos where send is ready'
  //updateIntervalsForBlocks;

  Transport.start();

  const send1 = mainGrid.blocks[0][0];
  send1.setMode("send");

  const send2 = mainGrid.getBlockAtPos(4, 5);
  send2 && send2.setMode("send");

  //add all meshes to render ->
  //loops through main grid and renders all blocks
  for (let i = 0; i < mainGrid.blocks.length; i++) {
    for (let j = 0; j < mainGrid.blocks[i].length; j++) {
      scene.add(mainGrid.blocks[i][j].mesh);
    }
  }

  //renders all notes
  for (const note in mainGrid.notes) {
    console.log(note);
    scene.add(mainGrid.notes[note].mesh);
  }

  let count = 0;
  const loop = new Loop((time) => {
    mainGrid.tick = count;
    console.log(mainGrid.tick);
    for (const row of mainGrid.blocks) {
      for (const block of row) {
        if (block.mode === "send") {
          block.createNote();
        }
      }
    }
    for (const noteId in mainGrid.notes) {
      const note = mainGrid.notes[noteId];
      if (mainGrid.getBlockAtPos(note.position.x, note.position.z)) {
        note.update();
      } else {
        note.remove();
        scene.remove(note.mesh);
      }
    }
    console.log(mainGrid.notes);
    count++;
  }, "4n").start(0);

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
