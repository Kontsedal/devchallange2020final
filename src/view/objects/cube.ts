import { Shape, Point, Color } from 'isomer';
import { normalizeNumber } from '../../simulation/utils/number';

export function createCube(
  iso: any,
  params: {
    width: number;
    length: number;
    height: number;
    x: number;
    y: number;
    z: number;
  }
) {
  const color = new Color(30, 204, 164, 1);
  iso.add(
    Shape.Prism(
      new Point(
        normalizeNumber(params.x),
        normalizeNumber(params.y),
        normalizeNumber(params.z)
      ),
      normalizeNumber(params.width),
      normalizeNumber(params.length),
      normalizeNumber(params.height)
    ),
    color
  );
}
