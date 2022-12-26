// import react from "react";

import {
  Mesh,
  MeshBasicMaterial,
  Raycaster,
  Scene,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { camera } from "./camera/camera";
import { Grid } from "./grid/Grid";
import { Loop, Transport } from "tone";
import UI from "./UI/UI";
import { useEffect, useState } from "react";

//! global variables, these may be accessed by classes !//
export const gridDim = 32;
export const mainGrid = new Grid(gridDim, gridDim);
export const scene = new Scene();
export const debug = true;
export const bpm = 120;

export const App = () => {
  //state
  const [playing, setPlaying] = useState<boolean>(false);
  const [selectedBlock, setSelectedBlock] = useState<Vector3>();

  //effect hooks
  useEffect(() => {
    if (playing) {
      Transport.start();
    }
    if (!playing) {
      Transport.stop();
    }
  }, [playing]);
  //cam and rendered set up
  const mainCamera = camera();
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#e5e5e5");
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    mainCamera.updateProjectionMatrix();
  });
  mainCamera.lookAt(mainGrid.blocks[gridDim / 2][gridDim / 2].position);

  //manually set up send blocks
  // const send1 = mainGrid.blocks[0][0];
  // send1.updateSend(3, new Vector3(1, 0, 0));
  // const send2 = mainGrid.blocks[2][5];
  // send2.updateSend(6, new Vector3(1, 0, 0));
  // const send3 = mainGrid.blocks[0][7];
  // send3.updateSend(5, new Vector3(0, 0, 1));
  // const send4 = mainGrid.blocks[15][15];
  // send4.updateSend(2, new Vector3(0, 0, -1));
  // const send5 = mainGrid.blocks[13][13];
  // send5.updateSend(4, new Vector3(-1, 0, 0));

  //constructs meshes and adds event handlers
  for (let i = 0; i < mainGrid.blocks.length; i++) {
    for (let j = 0; j < mainGrid.blocks[i].length; j++) {
      const mesh = mainGrid.blocks[i][j].mesh;
      mesh.userData.position = new Vector3(i, 0, j);
      mesh.userData.name = "Block";
      scene.add(mesh);
    }
  }

  //click controls
  const raycaster = new Raycaster();
  const clickMouse = new Vector2();
  //const mouseMove = new Vector2();
  window.addEventListener("click", (event) => {
    clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(clickMouse, mainCamera);
    const found = raycaster.intersectObjects(scene.children, true);
    if (found.length === 0) return;
    const blocks = found.filter((x) => x.object.userData.name === "Block");
    if (blocks.length === 0) return;
    setSelectedBlock(blocks[0].object.userData.position);
  });

  // const rayGeo = new SphereGeometry();
  // const rayMat = new MeshBasicMaterial();
  // const rayMesh = new Mesh(rayGeo, rayMat);
  // scene.add(rayMesh);

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

  //three animation
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, mainCamera);
  };
  animate();
  return <UI />;
};

export default App;
