//render will go in here, all other functionality will be imported.
//app will be run from index.ts

import { Scene, WebGLRenderer } from "three";
import { camera } from "./camera/camera";
import { Grid } from "./grid/Grid";
import { Block } from "./grid/Block";

export const app = () => {
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
  mainGrid.createGrid();
  mainGrid.grid.forEach((block) => {
    scene.add(block.block);
  });

  animate();
};
