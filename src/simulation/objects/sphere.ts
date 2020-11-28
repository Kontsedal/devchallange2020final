// @ts-ignore
import { Shape, Point, Color } from 'isomer';
import { normalizeNumber } from '../utils/number';

export function createSphere(
  iso: any,
  params: {
    length: number;
    height: number;
    x: number;
    y: number;
    z: number;
  }
) {
  const length = normalizeNumber(params.length);
  const height = normalizeNumber(params.height);
  const x = normalizeNumber(params.x);
  const y = normalizeNumber(params.y);
  const z = normalizeNumber(params.z);
  const color = new Color(255, 0, 0, 0.8);

  iso.add(
    Shape.Cylinder(Point(x, y, z + height * 0.5), length / 2, 24, height * 0.5),
    color
  );
  iso.add(
    Shape.Cylinder(
      Point(x + height * 0.3, y + height * 0.3, z + height * 0.3),
      length / 2.5,
      24,
      height * 0.7
    ),
    color
  );
}
