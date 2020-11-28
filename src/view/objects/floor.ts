import obelisk from 'obelisk.js';
import { normalizeNumber } from '../../simulation/utils/number';

export function createFloor(
  pixelView: obelisk.PixelView,
  params: { width: number; length: number }
) {
  const cubeColor = new obelisk.CubeColor();
  const dimensionCube = new obelisk.CubeDimension(
    normalizeNumber(params.width),
    normalizeNumber(params.length),
    5
  );
  pixelView.renderObject(new obelisk.Cube(dimensionCube, cubeColor, true));
}
