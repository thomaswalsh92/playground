//all camera related code will go in here

import { OrthographicCamera } from "three/src/cameras/OrthographicCamera";

export const camera = (): OrthographicCamera => {
  const d = 12;
  const pos = 120;
  const aspect = window.innerWidth / window.innerHeight;
  const cam = new OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);

  cam.position.set(pos, pos, pos);
  return cam;
};
