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
const material = new MeshLambertMaterial({ color: "0xffffff" });
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
const light = new PointLight(0xff00ff, 10, 100);
light.position.set(0, 1, 10);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#e5e5e5");
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
});

scene.add(mesh);
scene.add(light);

camera.position.set(20, 20, 20); // all components equal
camera.lookAt(scene.position); // or the origin
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
