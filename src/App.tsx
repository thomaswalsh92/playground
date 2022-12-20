// import react from "react";

import { Scene, Vector3, WebGLRenderer } from "three";
import { camera } from "./camera/camera";
import { Grid } from "./grid/Grid";
import { start, MonoSynth, Loop, Transport } from "tone";
import Note from "./grid/Note";

export const mainGrid = new Grid(16, 16);

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

  const note = new Note(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
  const block = mainGrid.blocks[0][0];
  block.addNoteToBlock(note);
  console.log(mainGrid);

  Transport.bpm.value = 120;

  Transport.start();

  //the loop needs to run every tick and do the following:
  //check if a block is ready to send;
  //createNotes at block pos where send is ready'
  //updateIntervalsForBlocks;

  let count = 0;
  const loop = new Loop((time) => {
    // triggered every eighth note.
    // mainGrid.makeNotes(count);
    // mainGrid.moveNotes();
    // mainGrid.highlightNotes();
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
