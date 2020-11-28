import obelisk from 'obelisk.js';
import { normalizeNumber } from '../../simulation/utils/number';

export function createPyramid(
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
  const pyramidColor = new obelisk.PyramidColor();
  const dimensionPyramid = new obelisk.PyramidDimension(
    normalizeNumber(params.height), true
  );
  const pyramid = new obelisk.Pyramid(dimensionPyramid, pyramidColor);
  pixelView.renderObject(
    pyramid,
    new obelisk.Point3D(
      normalizeNumber(params.x),
      normalizeNumber(params.y),
      normalizeNumber(params.z)
    )
  );
}
