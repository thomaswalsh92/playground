//three
import { Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from "three";
import { camera } from "./camera/camera";

//tone
import { Loop, Transport } from "tone";

//react
import { useEffect, useState, useContext } from "react";

//playground
import { Grid } from "./grid/Grid";
import UI from "./UI/UI";

//! global variables, these may be accessed by classes
export const gridDim = 32;
export const mainGrid = new Grid(gridDim, gridDim);
export const scene = new Scene();
const mainCamera = camera();
const renderer = new WebGLRenderer({ antialias: true });
export const debug = true;
export const bpm = 120;
//! global variables, these may be accessed by classes

const initApp = () => {
  //cam and renderer set up
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#e5e5e5");
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    mainCamera.updateProjectionMatrix();
  });
  mainCamera.lookAt(mainGrid.blocks[gridDim / 2][gridDim / 2].position);

  //constructs meshes and adds userData.
  for (let i = 0; i < mainGrid.blocks.length; i++) {
    for (let j = 0; j < mainGrid.blocks[i].length; j++) {
      const mesh = mainGrid.blocks[i][j].mesh;
      mesh.userData.position = new Vector3(i, 0, j);
      mesh.userData.name = "Block";
      scene.add(mesh);
    }
  }

  //loop controls note movement and tick based actions
  Transport.bpm.value = bpm;
  let count = 0;
  const loop = new Loop((time) => {
    mainGrid.tick = count;
    mainGrid.cleanUpNotes();
    mainGrid.updateNotes();
    mainGrid.createNotes();

    count++;
  }, "16n").start(0);
};

initApp();

export const App = () => {
  const [selectedBlockPos, setSelectedBlockPos] = useState<Vector3>();
  const raycaster = new Raycaster();
  const clickMouse = new Vector2();

  window.addEventListener("click", (event) => {
    clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(clickMouse, mainCamera);
    const found = raycaster.intersectObjects(scene.children, true);
    if (found.length === 0) return;
    const blocks = found.filter((x) => x.object.userData.name === "Block");
    if (blocks.length === 0) return;

    const pos =
      mainGrid.blocks[blocks[0].object.userData.position.x][
        blocks[0].object.userData.position.z
      ].position;
    setSelectedBlockPos(pos);
  });
  //three animation
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, mainCamera);
  };
  animate();
  return <UI selectedBlockPos={selectedBlockPos} />;
};

export default App;
