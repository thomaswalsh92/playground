import { Mesh, MeshPhongMaterial, PointLight, SphereGeometry } from "three";

export const light = (
  position: { x: number; y: number; z: number },
  intensity: number,
  debug?: boolean
): PointLight | Mesh => {
  if (debug) {
    const geo = new SphereGeometry();
    const mat = new MeshPhongMaterial();
    const mesh = new Mesh(geo, mat);
    mesh.position.set(position.x, position.y, position.z);
    return mesh;
  }
  if (!debug) {
    const light = new PointLight(0xffffff, intensity);
    light.position.set(position.x, position.y, position.z);
    return light;
  }
};
