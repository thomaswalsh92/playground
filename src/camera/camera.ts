//all camera related code will go in here

import { OrthographicCamera } from "three/src/cameras/OrthographicCamera";

export const camera = (
  d: number,
  position: { x: number; y: number; z: number }
): OrthographicCamera => {
  const aspect = window.innerWidth / window.innerHeight;
  const cam = new OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);

  cam.position.set(position.x, position.y, position.z);
  return cam;
};
