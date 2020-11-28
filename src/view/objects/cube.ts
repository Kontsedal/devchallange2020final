import obelisk from 'obelisk.js';
import { normalizeNumber } from '../../simulation/utils/number';

export function createCube(
  pixelView: obelisk.PixelView,
  params: {
    width: number;
    length: number;
    height: number;
    x: number;
    y: number;
    z: number;
  }
) {
  const cubeColor = new obelisk.CubeColor();
  const dimensionCube = new obelisk.CubeDimension(
    normalizeNumber(params.width),
    normalizeNumber(params.length),
    normalizeNumber(params.height)
  );
  const cube = new obelisk.Cube(dimensionCube, cubeColor, true);

  pixelView.renderObject(
    cube,
    new obelisk.Point3D(
      normalizeNumber(params.x),
      normalizeNumber(params.y),
      normalizeNumber(params.z)
    )
  );
}
