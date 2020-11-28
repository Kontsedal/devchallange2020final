type Vector = {
  x: number;
  y: number;
  z: number;
};
export const getTwoPointsDistance = (v1: Vector, v2: Vector): number => {
  const dx = v1.x - v2.x;
  const dy = v1.y - v2.y;
  const dz = v1.z - v2.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};
