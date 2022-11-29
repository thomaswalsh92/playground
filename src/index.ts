import * as THREE from "three";
import {
  BoxGeometry,
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
const box = new BoxGeometry(1, 1, 1);
const material = new MeshLambertMaterial({ color: "0x434242" });
const mesh = new Mesh(box, material);
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
const light1 = new PointLight(0x22a39f, 10, 15);
light1.position.set(0, 5, 3);
const light2 = new PointLight(0xff7000, 10, 15);
light1.position.set(0, 5, 4);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#e5e5e5");
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
});

scene.add(mesh);
scene.add(light1);
scene.add(light2);

camera.position.set(20, 20, 20); // all components equal
camera.lookAt(scene.position); // or the origin

let gettingBrighter1: boolean = true;
let gettingBrighter2: boolean = true;
const rate1 = 0.1;
const rate2 = 1;

const animate = () => {
  if (gettingBrighter1) {
    light1.intensity += rate1;
  }

  if (!gettingBrighter1) {
    light1.intensity -= rate1;
  }

  if (light1.intensity > 40) {
    gettingBrighter1 = false;
  }

  if (light1.intensity <= 10) {
    gettingBrighter1 = true;
  }

  if (gettingBrighter2) {
    light2.intensity += rate2;
  }

  if (!gettingBrighter2) {
    light2.intensity -= rate2;
  }

  if (light2.intensity > 40) {
    gettingBrighter2 = false;
  }

  if (light2.intensity <= 10) {
    gettingBrighter2 = true;
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
