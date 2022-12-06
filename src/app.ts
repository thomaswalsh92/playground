//render will go in here, all other functionality will be imported.
//app will be run from index.ts

import {
  AmbientLight,
  Light,
  PointLight,
  Scene,
  Texture,
  WebGLRenderer,
} from "three";
import { camera } from "./camera/camera";
import { grid } from "./grid/grid";
import { light } from "./light/light";

export const app = () => {
  const scene = new Scene();
  const mainCamera = camera(5, { x: 20, y: 20, z: 20 });
  const mainGrid = grid(16, 16);

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#e5e5e5");
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    mainCamera.updateProjectionMatrix();
  });

  mainCamera.lookAt(scene.position); // or the origin
  mainGrid.forEach((cube) => {
    scene.add(cube);
  });

  const light1 = light({ x: 10, y: 4, z: 0 }, 0.5);
  const light2 = light({ x: -2, y: 4, z: 0 }, 0.5);
  const light3 = light({ x: 0, y: 4, z: -2 }, 0.5);
  scene.add(light1);
  scene.add(light2);
  scene.add(light3);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, mainCamera);
  };

  animate();
};
