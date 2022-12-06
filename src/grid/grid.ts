import {
  BoxGeometry,
  Color,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Material,
  Mesh,
  MeshPhongMaterial,
  MeshStandardMaterial,
} from "three";

export const grid = (
  x: number,
  z: number
): Mesh<BoxGeometry, MeshStandardMaterial>[] => {
  const size = 0.5;
  const globalOffset = -4;
  const color = new Color("#4f94bc");
  const mat = new MeshStandardMaterial({ color: color });
  const edgesMat = new LineBasicMaterial({ color: 0x000000 });
  const geo = new BoxGeometry(size, size, size);
  const meshes = [];

  const randomRGBNum = () => {
    return Math.floor(Math.random() * 255);
  };

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < z; j++) {
      const cube = new Mesh(geo, mat);
      const edges = new EdgesGeometry(cube.geometry);
      const wireframe = new LineSegments(edges, edgesMat);
      cube.add(wireframe);
      const xOffset = i * size + globalOffset;
      const zOffset = j * size + globalOffset;
      cube.position.set(xOffset, 0, zOffset);
      meshes.push(cube);
    }
  }
  return meshes;
};
