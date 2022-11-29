import * as THREE from "three";
import {
  BoxGeometry,
  HalfFloatType,
  Light,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  OrthographicCamera,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";

const scene = new Scene();

const box = new BoxGeometry(0.7, 0.7, 0.7);
const material = new MeshLambertMaterial({ color: "0x434242" });

const boxConstructor = (x: number, z: number, gap: number) => {
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < z; j++) {
      const thisCube = new Mesh(box, material);
      const offsetX = i + gap;
      const offsetZ = j + gap;
      thisCube.position.set(offsetX, 0, offsetZ);
      scene.add(thisCube);
    }
  }
};

const aspect = window.innerWidth / window.innerHeight;
const d = 5;
const camera = new THREE.OrthographicCamera(
  -d * aspect,
  d * aspect,
  d,
  -d,
  1,
  1000
);
const light1 = new PointLight(0x22a39f, 10, 20, 2);
light1.position.set(1, 5, 3);
const light2 = new PointLight(0xff7000, 10, 20, 2);
light1.position.set(2, 5, 4);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#e5e5e5");
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
});

scene.add(light1);
scene.add(light2);

camera.position.set(20, 20, 20); // all components equal
camera.lookAt(scene.position); // or the origin
boxConstructor(10, 10, -4);
let gettingBrighter1: boolean = true;
let gettingBrighter2: boolean = true;
const rate1 = 0.05;
const rate2 = 0.02;
const min = 1;
const max = 10;
const animate = () => {
  if (gettingBrighter1) {
    light1.intensity += rate1;
  }

  if (!gettingBrighter1) {
    light1.intensity -= rate1;
  }

  if (light1.intensity > max) {
    gettingBrighter1 = false;
  }

  if (light1.intensity <= min) {
    gettingBrighter1 = true;
  }

  if (gettingBrighter2) {
    light2.intensity += rate2;
  }

  if (!gettingBrighter2) {
    light2.intensity -= rate2;
  }

  if (light2.intensity > max) {
    gettingBrighter2 = false;
  }

  if (light2.intensity <= min) {
    gettingBrighter2 = true;
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
