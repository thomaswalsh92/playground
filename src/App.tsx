// import react from "react";

import { Scene, Vector3, WebGLRenderer } from "three";
import { camera } from "./camera/camera";
import { Grid } from "./grid/Grid";
import { start, MonoSynth, Loop, Transport } from "tone";

//! global variables, these may be accessed by classes !//
export const gridDim = 32;
export const mainGrid = new Grid(gridDim, gridDim);
export const scene = new Scene();

export const App = () => {
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

  Transport.bpm.value = 70;
  Transport.start();

  //the loop needs to run every tick and do the following:
  //check if a block is ready to send;
  //createNotes at block pos where send is ready'
  //updateIntervalsForBlocks;

  Transport.start();

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

  // const send4 = mainGrid.blocks[15][15];
  // send4.updateSend(1, new Vector3(-1, 0, 0));

  // const send2 = mainGrid.getBlockAtPos(4, 5);
  // send2 && send2.setMode("send");

  //add all meshes to render ->
  //loops through main grid and renders all blocks
  for (let i = 0; i < mainGrid.blocks.length; i++) {
    for (let j = 0; j < mainGrid.blocks[i].length; j++) {
      scene.add(mainGrid.blocks[i][j].mesh);
    }
  }

  // const addNotesToScene = (notes: Note[]): void => {
  //   notes.forEach((note) => {
  //     scene.add(note.mesh);
  //   });
  // };

  // const removeNotesFromScene = (notes: Note[]): void => {
  //   const notesInScene = scene.children.filter((child) => {
  //     if (child.name === "note" && notes.indexOf(child.uuid) {
  //       return child;
  //     }
  //   });
  // };
  let count = 0;
  const loop = new Loop((time) => {
    mainGrid.tick = count;
    mainGrid.cleanUpNotes();
    mainGrid.updateNotes();
    mainGrid.createNotes();
    // addNotesToScene(notesThisTick);
    // removeNotesFromScene(notesThisTick);
    //every tick we get the list of current active notes,
    //and compare against the meshes that are in the scene.
    //Notes not in the scene are added.
    //notes in the scene not currently in the notes array are removed.

    count++;
  }, "16n").start(0);

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
