// @ts-ignore
import { Shape, Point, Color } from 'isomer';
import { normalizeNumber } from '../utils/number';

export function createWalls(
  iso: any,
  params: { width: number; length: number; height: number }
) {
  const color = new Color(156, 156, 228, 0.1);
  iso.add(
    Shape.Prism(
      new Point(0, 0, 0),
      normalizeNumber(params.width),
      normalizeNumber(params.length),
      normalizeNumber(params.height)
    ),
    color
  );
}
