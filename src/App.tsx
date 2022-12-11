import react from "react";

import { Scene, WebGLRenderer } from "three";
import { camera } from "./camera/camera";
import { Grid } from "./grid/Grid";
import { Block } from "./grid/Block";
import Synthesiser from "./synthesiser/Synthesiser";
import { MonoSynth } from "tone";

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
  mainGrid.create();
  mainGrid.shift(-7, -7);
  mainGrid.grid.forEach((block) => {
    scene.add(block.mesh);
  });

  const selectedBlock = mainGrid.getBlockAtCoords(15, 15);
  selectedBlock.setMode("logic");
  console.log(selectedBlock);

  const synth = new MonoSynth({
    oscillator: {
      type: "square",
    },
    envelope: {
      attack: 0.1,
    },
  }).toDestination();

  synth.triggerAttackRelease("C4", "8n");
  animate();
  return <p>Hello world</p>;
};

export default App;
